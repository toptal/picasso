/* eslint-disable max-lines -- single cohesive module: analyze one diff PNG pair end-to-end (pixelmatch + bbox + shift search + verdict). Splitting it would just move the same ~360 LOC into two files with no callsite outside happo-fetch. */
/**
 * Pixel-diff analyzer for Happo diff PNG pairs.
 *
 * Why this module exists: the migration agent can READ the baseline + after
 * PNGs as images (Claude is multimodal), and it can dump computed styles
 * via Playwright. But neither path gives a QUANTITATIVE answer to "did your
 * last edit move the thumb 1 pixel in the right direction?" or "is this
 * diff a positional offset vs a shadow/blur rendering difference?". Without
 * that signal the agent iterates on speculative Tailwind edits — observed
 * empirically on Slider PR #4955: 5+ rounds of `translate-x-1/2`,
 * `ml-[1.5px]`, `top-[50%]`, `!absolute` restructuring without converging.
 *
 * What we compute for each diff pair (baseline.png + after.png):
 *
 *   1. **Raw pixelmatch count** — how many pixels differ at (0,0) shift,
 *      with anti-aliasing skipped (the default we want: real differences
 *      only, not AA artifacts).
 *
 *   2. **Diff bounding box** — where on the slot does the diff live?
 *      Walk the diff output buffer, find min/max x/y of red-marked pixels.
 *      Gives the agent a coordinate anchor + a semantic region hint
 *      ("top-center → likely thumb", "bottom-middle → likely focus ring").
 *
 *   3. **Shift analysis** — brute-force translate the "after" image by
 *      (dx, dy) in a small window (-SHIFT_RANGE..+SHIFT_RANGE on each
 *      axis = 49 trials). Pick the (dx, dy) that minimizes the diff. If
 *      a shift drops the diff below POSITIONAL_RESIDUAL_RATIO * (diff at
 *      zero), we have proof the diff is "the element is shifted by N
 *      pixels" rather than "the element looks different at the same
 *      position." That's the key signal the agent's other tools cannot
 *      produce: `getComputedStyle()` returns the SAME property values for
 *      two renders that nonetheless rasterize at different pixel offsets
 *      (sub-pixel positioning, GPU compositing, rounding behavior).
 *
 *   4. **Verdict** — collapses the analysis into one of three buckets the
 *      agent can act on:
 *      - `negligible` (< NEGLIGIBLE_THRESHOLD pixels): treat as noise,
 *        likely AA flake; no action needed.
 *      - `positional_offset` (shift explains the diff): agent applies a
 *        targeted positioning correction matching `bestDx`/`bestDy`.
 *      - `structural_difference` (no shift helps): agent stops trying
 *        positional fixes — the diff is shape/color/shadow/blur. Either
 *        compensates with explicit CSS (operator-supplied values) or
 *        flags for designer accept.
 *
 * Performance: ~50-200ms per pair for typical Happo dimensions (400x300 to
 * 1024x768). Slider's 8 diffs analyze in ~1.5s. Compared to the ~7min CI
 * cycle this is negligible; well worth the agent-iteration signal it
 * unlocks.
 *
 * Failure modes handled non-fatally (return analysis with verdict set
 * appropriately, never throw to caller):
 *   - PNG decode failure → verdict: 'structural_difference', diffPixels: -1
 *   - Dimension mismatch between old + new → verdict: 'structural_difference',
 *     special hint "image dimensions differ"
 *   - Empty bbox after pixelmatch reports diffs (defensive) → bbox: null
 */

import { promises as fs } from 'node:fs'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

/** Verdict drives the agent's per-slot fix strategy. */
export type DiffVerdict =
  | 'negligible'
  | 'positional_offset'
  | 'structural_difference'
  | 'dimension_mismatch'
  | 'analysis_failed'

export interface DiffBbox {
  x: number
  y: number
  width: number
  height: number
}

export interface ShiftAnalysis {
  /** Best dx that minimizes diff, in [-SHIFT_RANGE, +SHIFT_RANGE]. */
  bestDx: number
  /** Best dy that minimizes diff. */
  bestDy: number
  /** Diff pixel count at naive (0,0) comparison. */
  diffAtZero: number
  /** Diff pixel count after applying (bestDx, bestDy). */
  diffAtBest: number
  /** diffAtBest / diffAtZero — <POSITIONAL_RESIDUAL_RATIO means the shift "explains" the diff. */
  residualRatio: number
}

export interface PixelDiffAnalysis {
  /** Image width — null on PNG decode failure. */
  width: number | null
  /** Image height — null on PNG decode failure. */
  height: number | null
  /** Pixels different at zero shift; -1 on failure. */
  diffPixels: number
  /** Bounding box of diff regions; null if no diff or analysis failed. */
  diffBbox: DiffBbox | null
  /** Semantic location hint based on bbox center: top-left, center, etc. */
  regionHint: string
  /** Shift analysis — null when verdict is `dimension_mismatch` or `analysis_failed`. */
  shiftAnalysis: ShiftAnalysis | null
  /** Final verdict. */
  verdict: DiffVerdict
  /** One-line action hint surfaced to the agent. */
  suggestedAction: string
}

const SHIFT_RANGE = 3
const NEGLIGIBLE_THRESHOLD = 5
const POSITIONAL_RESIDUAL_RATIO = 0.2
const PIXELMATCH_THRESHOLD = 0.1

/** When the (0,0) diff exceeds this fraction of total pixels, skip the shift
 * search — no 3-px translation could possibly explain a near-full-frame
 * difference. Saves ~3s per pair on full-screen Cypress snapshots (Drawer
 * variants where the drawer-open vs drawer-closed states span the entire
 * viewport). */
const HUGE_DIFF_FRACTION = 0.5

const PIXEL_BYTES = 4

const readPng = async (filePath: string): Promise<PNG> => {
  const buffer = await fs.readFile(filePath)

  return PNG.sync.read(buffer)
}

/**
 * Read only the dimensions of a PNG (no pixel analysis). Used by the
 * orchestrator's small-residual-diff gate to measure how much a
 * `dimension_mismatch` pair grew/shrank. Returns null on decode failure.
 */
export const readPngDimensions = async (
  filePath: string
): Promise<{ width: number; height: number } | null> => {
  try {
    const png = await readPng(filePath)

    return { width: png.width, height: png.height }
  } catch {
    return null
  }
}

/**
 * Test whether a pixel at offset `idx` in pixelmatch's output buffer is
 * a diff-marker. Default pixelmatch settings write diff pixels as red
 * (R=255, G=0, B=0, A=255). Non-diff pixels are the original image faded
 * to ~10% alpha. Tolerate slight variance from alpha-blend rounding.
 */
const isDiffPixel = (output: Uint8Array, idx: number): boolean => {
  const red = output[idx]
  const grn = output[idx + 1]
  const blu = output[idx + 2]
  const alp = output[idx + 3]

  return alp >= 250 && red >= 250 && grn <= 20 && blu <= 20
}

/**
 * Compute the bounding box of diff-marked pixels in pixelmatch's output
 * buffer. Returns null if no pixel matches the diff-marker pattern.
 */
const computeBbox = (
  output: Uint8Array,
  width: number,
  height: number
): DiffBbox | null => {
  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = (row * width + col) * PIXEL_BYTES

      if (!isDiffPixel(output, idx)) {
        continue
      }

      if (col < minX) {
        minX = col
      }

      if (row < minY) {
        minY = row
      }

      if (col > maxX) {
        maxX = col
      }

      if (row > maxY) {
        maxY = row
      }
    }
  }

  if (maxX < 0) {
    return null
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  }
}

const regionHintFor = (
  bbox: DiffBbox,
  width: number,
  height: number
): string => {
  const cx = bbox.x + bbox.width / 2
  const cy = bbox.y + bbox.height / 2
  const xZone =
    cx < width / 3 ? 'left' : cx < (2 * width) / 3 ? 'center' : 'right'
  const yZone =
    cy < height / 3 ? 'top' : cy < (2 * height) / 3 ? 'middle' : 'bottom'

  return `${yZone}-${xZone}`
}

interface ImageDims {
  width: number
  height: number
}

interface ShiftVector {
  dx: number
  dy: number
}

/**
 * Build a shifted copy of `src`: write `src[col, row]` to
 * `dst[col + dx, row + dy]`, leaving border pixels as transparent
 * (alpha=0) where the shift would read out-of-bounds. pixelmatch treats
 * transparent-vs-transparent as "no diff" so border pixels don't
 * pollute the count.
 */
const buildShifted = (
  src: Uint8Array,
  dims: ImageDims,
  shift: ShiftVector
): Uint8Array => {
  const { width, height } = dims
  const { dx, dy } = shift
  const dst = new Uint8Array(src.length)

  for (let row = 0; row < height; row++) {
    const srcRow = row - dy

    if (srcRow < 0 || srcRow >= height) {
      continue
    }

    for (let col = 0; col < width; col++) {
      const srcCol = col - dx

      if (srcCol < 0 || srcCol >= width) {
        continue
      }
      const srcIdx = (srcRow * width + srcCol) * PIXEL_BYTES
      const dstIdx = (row * width + col) * PIXEL_BYTES

      dst[dstIdx] = src[srcIdx]
      dst[dstIdx + 1] = src[srcIdx + 1]
      dst[dstIdx + 2] = src[srcIdx + 2]
      dst[dstIdx + 3] = src[srcIdx + 3]
    }
  }

  return dst
}

/**
 * Brute-force find the (dx, dy) shift in [-SHIFT_RANGE, +SHIFT_RANGE]
 * that minimizes diff pixels. Returns the best shift + residual diff.
 *
 * Includes the (0,0) trial so callers can read `diffAtZero` from the
 * same pass. When the best shift IS (0,0), `diffAtZero === diffAtBest`
 * and `residualRatio === 1` (no improvement from shifting).
 */
interface ShiftPairData {
  oldData: Uint8Array
  newData: Uint8Array
  dims: ImageDims
}

/** Single pixelmatch call for one shift trial. */
const countDiffAtShift = (data: ShiftPairData, shift: ShiftVector): number => {
  const { oldData, newData, dims } = data
  const shifted =
    shift.dx === 0 && shift.dy === 0
      ? newData
      : buildShifted(newData, dims, shift)
  const tmpOutput = new Uint8Array(oldData.length)

  return pixelmatch(oldData, shifted, tmpOutput, dims.width, dims.height, {
    threshold: PIXELMATCH_THRESHOLD,
    includeAA: false,
  })
}

const analyzeShift = (data: ShiftPairData): ShiftAnalysis => {
  let bestDx = 0
  let bestDy = 0
  let bestDiff = Infinity
  let diffAtZero = -1

  for (let dy = -SHIFT_RANGE; dy <= SHIFT_RANGE; dy++) {
    for (let dx = -SHIFT_RANGE; dx <= SHIFT_RANGE; dx++) {
      const count = countDiffAtShift(data, { dx, dy })

      if (dx === 0 && dy === 0) {
        diffAtZero = count
      }

      if (count < bestDiff) {
        bestDiff = count
        bestDx = dx
        bestDy = dy
      }
    }
  }
  const residualRatio = diffAtZero > 0 ? bestDiff / diffAtZero : 1

  return {
    bestDx,
    bestDy,
    diffAtZero,
    diffAtBest: bestDiff,
    residualRatio,
  }
}

const verdictFrom = (
  diffPixels: number,
  shift: ShiftAnalysis
): { verdict: DiffVerdict; suggestedAction: string } => {
  if (diffPixels <= NEGLIGIBLE_THRESHOLD) {
    return {
      verdict: 'negligible',
      suggestedAction:
        'Diff is below noise threshold (<5 pixels); likely AA or compression artifact. No source change needed.',
    }
  }

  if (
    (shift.bestDx !== 0 || shift.bestDy !== 0) &&
    shift.residualRatio < POSITIONAL_RESIDUAL_RATIO
  ) {
    const direction = `(dx=${shift.bestDx}, dy=${shift.bestDy})`
    const remainPct = Math.round(shift.residualRatio * 100)

    return {
      verdict: 'positional_offset',
      suggestedAction:
        `Diff explained by a ${direction} pixel shift — shifting the rendered slot by this offset closes ` +
        `${100 - remainPct}% of the diff. Apply a positional CSS correction: ` +
        `target the affected element and add a translate/inset/margin offset matching this magnitude. ` +
        `Likely cause: a translate/margin/padding calculation differs from baseline by exactly this many pixels. ` +
        'Check inline-style assignments in the @base-ui/react source AND any Tailwind centering classes for double-application.',
    }
  }

  return {
    verdict: 'structural_difference',
    suggestedAction:
      `No positional shift in [-${SHIFT_RANGE}..+${SHIFT_RANGE}] reduces the diff meaningfully ` +
      `(best shift is (dx=${shift.bestDx}, dy=${shift.bestDy}) with ` +
      `${Math.round(shift.residualRatio * 100)}% residual). ` +
      'This is NOT a positional offset — stop iterating on translate/margin/inset fixes. ' +
      'Diff is shape/color/shadow/blur/opacity/compositing. Run the computed-style diff to find ' +
      'which non-positional property differs (box-shadow, filter, opacity, background-color, border, ' +
      'border-radius, font-weight, letter-spacing). If no computed-style property differs but the ' +
      'render still diverges, the cause is rendering-pipeline (GPU compositing, sub-pixel rasterization) ' +
      'and needs explicit operator-supplied values OR designer accept.',
  }
}

/** Build a no-shift placeholder ShiftAnalysis for early-exit paths. */
const zeroShiftAnalysis = (diffPixels: number): ShiftAnalysis => ({
  bestDx: 0,
  bestDy: 0,
  diffAtZero: diffPixels,
  diffAtBest: diffPixels,
  residualRatio: 1,
})

/** Load both PNGs concurrently; returns null on decode failure. */
const tryLoadPair = async (
  oldPath: string,
  newPath: string
): Promise<{ oldPng: PNG; newPng: PNG } | { error: string }> => {
  try {
    const [oldPng, newPng] = await Promise.all([
      readPng(oldPath),
      readPng(newPath),
    ])

    return { oldPng, newPng }
  } catch (err) {
    return { error: (err as Error).message }
  }
}

/**
 * Analyze one diff pair. Returns analysis result; never throws — failures
 * are encoded in the verdict so the caller can still surface useful info
 * to the agent prompt.
 */
export const analyzeDiffPair = async (
  oldPath: string,
  newPath: string
): Promise<PixelDiffAnalysis> => {
  const loaded = await tryLoadPair(oldPath, newPath)

  if ('error' in loaded) {
    return {
      width: null,
      height: null,
      diffPixels: -1,
      diffBbox: null,
      regionHint: 'unknown',
      shiftAnalysis: null,
      verdict: 'analysis_failed',
      suggestedAction: `Could not decode one of the diff PNGs: ${loaded.error}. Inspect the PNGs manually via Read.`,
    }
  }
  const { oldPng, newPng } = loaded

  if (oldPng.width !== newPng.width || oldPng.height !== newPng.height) {
    return {
      width: oldPng.width,
      height: oldPng.height,
      diffPixels: -1,
      diffBbox: null,
      regionHint: 'unknown',
      shiftAnalysis: null,
      verdict: 'dimension_mismatch',
      suggestedAction:
        `Image dimensions differ between baseline (${oldPng.width}x${oldPng.height}) ` +
        `and after (${newPng.width}x${newPng.height}). This is NOT a positional ` +
        'offset — the element changed size. Look for layout-level changes: ' +
        'box-sizing, padding, margin, border-width, line-height, or content reflow. ' +
        'This is ALWAYS a real, fixable property change in your diff — never environmental. ' +
        'Diff the old createStyles / PicassoProvider.override against the new Tailwind; ' +
        'a dropped pinned line-height (becomes line-height: normal) is the classic miss (Checkbox PF-1994).',
    }
  }

  const dims: ImageDims = { width: oldPng.width, height: oldPng.height }
  const oldData = new Uint8Array(oldPng.data)
  const newData = new Uint8Array(newPng.data)

  // First pass: naive comparison at (0,0) to get bbox + diff count.
  const output = new Uint8Array(oldData.length)
  const diffPixels = pixelmatch(
    oldData,
    newData,
    output,
    dims.width,
    dims.height,
    { threshold: PIXELMATCH_THRESHOLD, includeAA: false }
  )

  const diffBbox = computeBbox(output, dims.width, dims.height)
  const regionHint = diffBbox
    ? regionHintFor(diffBbox, dims.width, dims.height)
    : 'none'

  // Negligible diff: skip shift analysis (would just return zero shift anyway).
  if (diffPixels <= NEGLIGIBLE_THRESHOLD) {
    return {
      width: dims.width,
      height: dims.height,
      diffPixels,
      diffBbox,
      regionHint,
      shiftAnalysis: zeroShiftAnalysis(diffPixels),
      verdict: 'negligible',
      suggestedAction:
        'Diff is below noise threshold (<5 pixels); likely AA or compression artifact. No source change needed.',
    }
  }

  // Huge diff: skip the shift search. No 3-pixel translation could
  // possibly explain a near-full-frame difference (e.g. drawer-open vs
  // drawer-closed full-viewport snapshots). Saves ~3s per pair.
  const totalPixels = dims.width * dims.height

  if (diffPixels > totalPixels * HUGE_DIFF_FRACTION) {
    return {
      width: dims.width,
      height: dims.height,
      diffPixels,
      diffBbox,
      regionHint,
      shiftAnalysis: zeroShiftAnalysis(diffPixels),
      verdict: 'structural_difference',
      suggestedAction:
        `Diff covers >${Math.round(
          HUGE_DIFF_FRACTION * 100
        )}% of the image (${diffPixels} of ${totalPixels} pixels). ` +
        'This is not a positional offset and not a small CSS regression — the entire rendered region differs. ' +
        'Likely cause: the snapshot captured different component STATES (e.g. open vs closed), different content, ' +
        'or a layout-level change that reflowed everything. Read both PNGs to confirm what changed, then either ' +
        'fix the underlying state-shape issue or post a PR comment for designer review.',
    }
  }

  const shiftAnalysis = analyzeShift({ oldData, newData, dims })
  const { verdict, suggestedAction } = verdictFrom(diffPixels, shiftAnalysis)

  return {
    width: dims.width,
    height: dims.height,
    diffPixels,
    diffBbox,
    regionHint,
    shiftAnalysis,
    verdict,
    suggestedAction,
  }
}

/**
 * Render the analysis as a compact markdown bullet list ready to embed
 * under each diff pair in the agent prompt.
 *
 * Layout (verdict-dependent):
 *
 *   - analysis: <verdict>
 *   - diff pixels: <N> at (0,0); best shift (dx=<X>, dy=<Y>) → <M> residual (<P>%)
 *   - diff bbox: x=<x>, y=<y>, w=<w>, h=<h> (region: <hint>)
 *   - hint: <suggestedAction>
 */
export const renderAnalysisForPrompt = (
  analysis: PixelDiffAnalysis
): string => {
  const lines: string[] = []

  lines.push(`     - analysis verdict: ${analysis.verdict}`)

  if (analysis.diffPixels >= 0) {
    if (analysis.shiftAnalysis) {
      const shift = analysis.shiftAnalysis
      const pct = Math.round(shift.residualRatio * 100)

      lines.push(
        `     - diff pixels: ${analysis.diffPixels} at (0,0); best shift ` +
          `(dx=${shift.bestDx}, dy=${shift.bestDy}) → ${shift.diffAtBest} residual (${pct}% of original)`
      )
    } else {
      lines.push(`     - diff pixels: ${analysis.diffPixels}`)
    }
  }

  if (analysis.diffBbox) {
    const box = analysis.diffBbox

    lines.push(
      `     - diff bbox: x=${box.x}, y=${box.y}, w=${box.width}, h=${box.height} ` +
        `(region: ${analysis.regionHint})`
    )
  }
  lines.push(`     - hint: ${analysis.suggestedAction}`)

  return lines.join('\n')
}
