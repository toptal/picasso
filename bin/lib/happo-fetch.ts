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
}

/** Full result of `fetchHappoDiffsForCheck` for one failed Happo check. */
export interface HappoCheckDiffs {
  checkName: string
  reportUrl: string
  summary: string
  unchangedCount: number
  totalDiffs: number
  diffs: LocalHappoDiff[]
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

const basicAuthHeader = (apiKey: string, apiSecret: string): string =>
  `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`

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
  const ref = parseHappoReportUrl(reportUrl)

  if (!ref) {
    throw new Error(
      `Cannot parse Happo report URL: ${reportUrl} — expected /a/{account}/p/{project}/compare/{base}/{head}`
    )
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
    })
  }

  return {
    checkName,
    reportUrl,
    summary: results.summary ?? '',
    unchangedCount: results.unchangedCount ?? 0,
    totalDiffs: results.diffs.length,
    diffs,
  }
}
