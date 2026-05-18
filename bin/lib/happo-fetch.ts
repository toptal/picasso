/* eslint-disable max-lines -- single cohesive module: fetch/parse/resolve Happo URLs + download PNGs. Splitting it would just move the same 320 LOC into two files with a circular-ish dependency. */
/**
 * Happo report fetcher — pulls the structured diff list + per-snapshot
 * PNGs for a failed Happo check, so the migration agent can actually SEE
 * the visual diffs (via Claude's multimodal Read tool) and classify them
 * regression / intentional / unrelated flake.
 *
 * Why this module exists: the prior flow handed the agent only the Happo
 * report URL (`detailsUrl` on the GitHub check). `WebFetch` on that URL
 * returns the SPA shell, NOT the snapshot images, because Happo's report
 * page loads its data via XHR after the page mounts. The agent had no way
 * to inspect the actual pixels and would write structured-but-blind
 * "likely flake" diagnoses (observed on Backdrop PR #4954 sweep tick
 * 2026-05-14: "I can't see the specific snapshot diffs without
 * authenticated access to Happo").
 *
 * What we do instead: server-side, using HAPPO_API_KEY/SECRET that the
 * operator already exports (same creds the gate's local Happo run uses),
 * we call the internal compare-results endpoint and download each diff
 * pair's old + new PNG. The agent then `Read`s the local PNG paths —
 * Claude is multimodal and Read of an image file presents the pixels
 * directly in the conversation context.
 *
 * Endpoint discovery (2026-05-15): inspected the Happo report HTML for
 * Backdrop PR #4954's compare URL — found a single XHR target:
 *   /api/a/{accountId}/p/{projectId}/comparisons/{baseSha}/{headSha}/compare-results
 * Auth: HTTP Basic with apiKey:apiSecret (same as `pnpm happo` CLI).
 * Returns { diffs: [[old, new], ...], unchangedCount, summary, ... } where
 * each snapshot has { component, variant, target, url: "/a/.../img/..." }.
 * The `url` is relative; full URL = `https://happo.io${url}` — also Basic
 * auth, returns PNG. No public docs for these endpoints; confirmed via
 * `curl -u` smoke test (see commit message).
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'

import { analyzeDiffPair, type PixelDiffAnalysis } from './happo-pixel-diff'

const HAPPO_HOST = 'https://happo.io'

/** Parsed account/project/sha tuple from a Happo report URL. */
export interface HappoReportRef {
  accountId: string
  projectId: string
  baseSha: string
  headSha: string
}

/**
 * One snapshot side (old or new) within a diff pair, as returned by
 * Happo's compare-results endpoint. Only the fields we need are typed —
 * the endpoint includes extra metadata (snapRequestId, renderTime, etc.)
 * we don't use here.
 */
interface HappoSnapshot {
  id: string
  component: string
  variant: string
  target: string
  url: string // relative — prepend HAPPO_HOST for full URL
  width?: number
  height?: number
}

/** Raw compare-results JSON response shape (only fields we consume). */
interface HappoCompareResults {
  diffs: HappoSnapshot[][]
  unchangedCount?: number
  summary?: string
  compareUrl?: string
}

/**
 * One downloaded diff pair, ready to embed in the agent prompt.
 * `oldPath` and `newPath` are absolute paths under the migration run
 * directory; Claude's Read tool reads them as images.
 */
export interface LocalHappoDiff {
  component: string
  variant: string
  target: string
  oldPath: string
  newPath: string
  /** Original Happo URLs — kept for the agent in case it wants to deep-link. */
  oldUrl: string
  newUrl: string
  width?: number
  height?: number
  /** Quantitative pixel-diff analysis (pixelmatch + bbox + shift search).
   *  Absent when analyzer failed (network race during download, PNG decode
   *  error). The orchestrator surfaces this to the agent prompt so the
   *  agent has a measurable target — "thumb is offset (1, 0) pixels" —
   *  instead of just visual inspection. */
  analysis?: PixelDiffAnalysis
}

/** Full result of `fetchHappoDiffsForCheck` for one failed Happo check.
 *
 * `pending` is true when the failed check's target_url was a Happo `/jobs/{id}`
 * URL pointing at a job that hasn't finished yet (Happo Cypress in-flight) OR
 * a job Happo cancelled (e.g. superseded by a newer commit's job). In those
 * cases `diffs` is empty and `pendingReason` describes why — the prompt
 * builder can surface this so the agent doesn't hallucinate a fix from no
 * evidence. */
export interface HappoCheckDiffs {
  checkName: string
  reportUrl: string
  summary: string
  unchangedCount: number
  totalDiffs: number
  diffs: LocalHappoDiff[]
  pending?: boolean
  pendingReason?: string
}

/**
 * Parse `https://happo.io/a/{account}/p/{project}/compare/{base}/{head}` →
 * structured ref. Returns null on URLs that don't match the expected shape
 * (different host, missing segments, etc.).
 */
export const parseHappoReportUrl = (url: string): HappoReportRef | null => {
  const match = url.match(
    /^https?:\/\/happo\.io\/a\/([^/]+)\/p\/([^/]+)\/compare\/([0-9a-f]+)\/([0-9a-f]+)/i
  )

  if (!match) {
    return null
  }

  return {
    accountId: match[1],
    projectId: match[2],
    baseSha: match[3],
    headSha: match[4],
  }
}

/**
 * Parse `https://happo.io/a/{account}/jobs/{jobId}` → structured tuple,
 * else null. Happo's GitHub commit status sets `target_url` to this shape
 * (NOT the compare URL) while a job is still running OR for the
 * Cypress-driven flow which posts a job-id rather than a compare URL.
 */
interface HappoJobRef {
  accountId: string
  jobId: string
}

const parseHappoJobUrl = (url: string): HappoJobRef | null => {
  const match = url.match(/^https?:\/\/happo\.io\/a\/([^/]+)\/jobs\/(\d+)/i)

  if (!match) {
    return null
  }

  return { accountId: match[1], jobId: match[2] }
}

const basicAuthHeader = (apiKey: string, apiSecret: string): string =>
  `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`

/**
 * Resolve a Happo `/jobs/{id}` URL to the underlying compare URL(s).
 *
 * The jobs endpoint returns metadata including each project's compare URL
 * under `projects[].item.href`. A job has 1–N projects (Picasso typically
 * has one: "Picasso/Cypress" XOR "Picasso/Storybook"). We match by the
 * check name's project label (the orchestrator passes it in) and return
 * the resolved compare URL.
 *
 * Returns:
 *   - `{ status: 'resolved', compareUrl: ... }` — happy path
 *   - `{ status: 'pending' }` — Happo hasn't finished the job yet
 *     (CI Cypress still running). Caller should surface this to the agent
 *     as "no diff data yet; wait for CI."
 *   - `{ status: 'cancelled', message: ... }` — Happo cancelled this job
 *     (typically: newer commit pushed; the next commit's job supersedes).
 *     Caller should treat as "stale, ignore"; fresh PNG fetch will happen
 *     on the next sweep tick.
 */
type ResolveJobResult =
  | { status: 'resolved'; compareUrl: string }
  | { status: 'pending' }
  | { status: 'cancelled'; message: string }
  | { status: 'project-not-found'; available: readonly string[] }

interface ResolveJobArgs {
  jobRef: HappoJobRef
  /** Project label from the check name, e.g. "Picasso/Cypress". */
  projectLabel: string
  apiKey: string
  apiSecret: string
}

interface HappoJobApiProjectItem {
  href?: string
  status?: string
  statusMessage?: string
  message?: string
}

interface HappoJobApiProject {
  name?: string
  id?: number
  item?: HappoJobApiProjectItem
}

interface HappoJobApiResponse {
  status?: string
  finishedAt?: string | null
  sha1?: string
  sha2?: string
  projects?: HappoJobApiProject[]
}

const resolveHappoJob = async ({
  jobRef,
  projectLabel,
  apiKey,
  apiSecret,
}: ResolveJobArgs): Promise<ResolveJobResult> => {
  const url = `${HAPPO_HOST}/api/a/${jobRef.accountId}/jobs/${jobRef.jobId}`
  const resp = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: basicAuthHeader(apiKey, apiSecret),
    },
  })

  if (!resp.ok) {
    throw new Error(
      `Happo jobs API fetch failed: ${resp.status} ${resp.statusText} for ${url}`
    )
  }
  const data = (await resp.json()) as HappoJobApiResponse

  // A job with no `finishedAt` is still running. The Cypress check posts a
  // jobs URL before the job completes; status will move to success/failure
  // once Happo finishes diffing.
  if (!data.finishedAt) {
    return { status: 'pending' }
  }

  const projects = data.projects ?? []
  const match = projects.find(proj => proj.name === projectLabel)

  if (!match) {
    return {
      status: 'project-not-found',
      available: projects.map(proj => proj.name ?? '?'),
    }
  }
  const itemStatus = match.item?.status
  const itemMessage =
    match.item?.message ?? match.item?.statusMessage ?? '(no message)'

  // Happo cancels jobs when a newer commit is pushed. The job won't have
  // diff data; the new commit's job supersedes. Treat as stale.
  if (itemStatus === 'cancelled' || /cancelled/i.test(itemMessage)) {
    return { status: 'cancelled', message: itemMessage }
  }
  const href = match.item?.href

  if (!href) {
    throw new Error(
      `Happo job ${jobRef.jobId} has no item.href for project "${projectLabel}"`
    )
  }

  return {
    status: 'resolved',
    compareUrl: href.startsWith('http') ? href : `${HAPPO_HOST}${href}`,
  }
}

/**
 * Extract the project label from a check name like
 * "Happo (Picasso/Cypress)" → "Picasso/Cypress". Returns null if the
 * name doesn't match the expected shape.
 */
const extractProjectLabel = (checkName: string): string | null => {
  const match = checkName.match(/^Happo\s*\(\s*([^)]+?)\s*\)\s*$/i)

  return match ? match[1] : null
}

const fetchCompareResults = async (
  ref: HappoReportRef,
  apiKey: string,
  apiSecret: string
): Promise<HappoCompareResults> => {
  const url =
    `${HAPPO_HOST}/api/a/${ref.accountId}/p/${ref.projectId}` +
    `/comparisons/${ref.baseSha}/${ref.headSha}/compare-results`
  const resp = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: basicAuthHeader(apiKey, apiSecret),
    },
  })

  if (!resp.ok) {
    const body = await resp.text().catch(() => '')

    throw new Error(
      `Happo compare-results fetch failed: ${resp.status} ${
        resp.statusText
      } ${body.slice(0, 200)}`
    )
  }

  return (await resp.json()) as HappoCompareResults
}

interface DownloadArgs {
  imageUrl: string
  destPath: string
  apiKey: string
  apiSecret: string
}

const downloadImage = async ({
  imageUrl,
  destPath,
  apiKey,
  apiSecret,
}: DownloadArgs): Promise<void> => {
  const resp = await fetch(imageUrl, {
    headers: { Authorization: basicAuthHeader(apiKey, apiSecret) },
  })

  if (!resp.ok) {
    throw new Error(
      `Happo image fetch failed: ${resp.status} ${resp.statusText} for ${imageUrl}`
    )
  }
  const buffer = Buffer.from(await resp.arrayBuffer())

  await fs.writeFile(destPath, buffer)
}

/**
 * Slugify a string for safe use as a path segment: lowercase, alnum +
 * dash only, collapsed dashes. "Picasso/Cypress" → "picasso-cypress",
 * "PageTopBarMenu" → "pagetopbarmenu", "chrome-desktop-width-1439" →
 * "chrome-desktop-width-1439". Avoids collisions across components +
 * variants by including all three (component + variant + target) in the
 * filename, so a single destDir can hold dozens of diffs.
 */
const slug = (raw: string): string =>
  raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Fetch the compare-results JSON for one failed Happo check + download
 * every diff pair's old/new PNG into `destDir`. Returns structured
 * metadata for embedding into the agent prompt.
 *
 * `destDir` is created if missing. Filenames are stable across runs so a
 * re-invocation of the same sweep tick reuses existing files (cheap idempotency).
 *
 * Throws if the Happo URL is unparseable, if creds are missing/invalid,
 * if the API endpoint returns non-2xx, or if any image fetch fails. The
 * caller (orchestrator) catches and logs — fallback is the existing
 * URL-only prompt section, which keeps the flow non-fatal.
 */
export interface FetchHappoDiffsArgs {
  checkName: string
  reportUrl: string
  destDir: string
  apiKey: string
  apiSecret: string
}

export const fetchHappoDiffsForCheck = async ({
  checkName,
  reportUrl,
  destDir,
  apiKey,
  apiSecret,
}: FetchHappoDiffsArgs): Promise<HappoCheckDiffs> => {
  // Resolve to a compare URL. Two input shapes:
  //   - `/a/{acct}/p/{proj}/compare/{base}/{head}` — direct compare URL
  //     (typical for Happo Storybook, completed jobs)
  //   - `/a/{acct}/jobs/{jobId}` — job URL (typical for Happo Cypress
  //     while in-flight, or job-driven workflows). Resolved via the
  //     jobs API → underlying compare URL, with pending/cancelled
  //     non-throwing outcomes.
  let resolvedCompareUrl = reportUrl
  let ref = parseHappoReportUrl(reportUrl)

  if (!ref) {
    const jobRef = parseHappoJobUrl(reportUrl)

    if (!jobRef) {
      throw new Error(
        `Cannot parse Happo report URL: ${reportUrl} — expected /a/{account}/p/{project}/compare/{base}/{head} or /a/{account}/jobs/{jobId}`
      )
    }

    const projectLabel = extractProjectLabel(checkName)

    if (!projectLabel) {
      throw new Error(
        `Cannot extract project label from check name: "${checkName}" — expected "Happo (Project/Subproject)" shape`
      )
    }
    const resolved = await resolveHappoJob({
      jobRef,
      projectLabel,
      apiKey,
      apiSecret,
    })

    if (resolved.status === 'pending') {
      return {
        checkName,
        reportUrl,
        summary: 'Happo job still running — no diff data yet',
        unchangedCount: 0,
        totalDiffs: 0,
        diffs: [],
        pending: true,
        pendingReason:
          'Happo Cypress job is still in flight (no finishedAt timestamp). The agent should NOT speculate on diffs from this check; wait for the next sweep tick.',
      }
    }

    if (resolved.status === 'cancelled') {
      return {
        checkName,
        reportUrl,
        summary: `Happo job cancelled: ${resolved.message}`,
        unchangedCount: 0,
        totalDiffs: 0,
        diffs: [],
        pending: true,
        pendingReason: `Happo cancelled this job (${resolved.message}). A newer commit's job supersedes; no diff data is meaningful here.`,
      }
    }

    if (resolved.status === 'project-not-found') {
      throw new Error(
        `Happo job has no project matching "${projectLabel}". Available: [${resolved.available.join(
          ', '
        )}]`
      )
    }
    resolvedCompareUrl = resolved.compareUrl
    ref = parseHappoReportUrl(resolvedCompareUrl)

    if (!ref) {
      throw new Error(
        `Resolved compare URL from job is unparseable: ${resolvedCompareUrl}`
      )
    }
  }

  const results = await fetchCompareResults(ref, apiKey, apiSecret)

  await fs.mkdir(destDir, { recursive: true })

  // Each pair is [oldSnap, newSnap]. Some pairs may have empty old (added
  // examples) or empty new (deleted examples) — current Happo flow only
  // surfaces both-present pairs as "diffs"; added/deleted go to separate
  // top-level arrays. So we treat pair[0] and pair[1] as required here.
  const diffs: LocalHappoDiff[] = []

  for (let i = 0; i < results.diffs.length; i++) {
    const pair = results.diffs[i]

    if (pair.length < 2) {
      continue
    }
    const [oldSnap, newSnap] = pair
    const filenameBase =
      String(i + 1).padStart(2, '0') +
      `-${slug(oldSnap.component)}-${slug(oldSnap.variant)}-${slug(
        oldSnap.target
      )}`
    const oldPath = path.join(destDir, `${filenameBase}.old.png`)
    const newPath = path.join(destDir, `${filenameBase}.new.png`)
    const oldUrl = `${HAPPO_HOST}${oldSnap.url}`
    const newUrl = `${HAPPO_HOST}${newSnap.url}`

    await downloadImage({
      imageUrl: oldUrl,
      destPath: oldPath,
      apiKey,
      apiSecret,
    })
    await downloadImage({
      imageUrl: newUrl,
      destPath: newPath,
      apiKey,
      apiSecret,
    })

    // Run quantitative pixel-diff analysis on the downloaded pair.
    // Non-fatal on errors — the analyzer encodes failures in the verdict
    // field so the prompt builder can still surface what it has. Without
    // this signal the agent has been observed iterating on speculative
    // CSS edits (Slider PR #4955: 5+ rounds without converging) because
    // its other tools (visual Read, getComputedStyle) can't reveal sub-
    // pixel positional offsets or distinguish them from shadow/blur
    // rendering differences.
    let analysis: PixelDiffAnalysis | undefined

    try {
      analysis = await analyzeDiffPair(oldPath, newPath)
    } catch {
      // Defensive — analyzeDiffPair shouldn't throw, but if it does the
      // surrounding sweep tick should continue with the diff PNGs alone.
      analysis = undefined
    }

    diffs.push({
      component: oldSnap.component,
      variant: oldSnap.variant,
      target: oldSnap.target,
      oldPath,
      newPath,
      oldUrl,
      newUrl,
      width: oldSnap.width,
      height: oldSnap.height,
      analysis,
    })
  }

  return {
    checkName,
    reportUrl: resolvedCompareUrl,
    summary: results.summary ?? '',
    unchangedCount: results.unchangedCount ?? 0,
    totalDiffs: results.diffs.length,
    diffs,
  }
}
