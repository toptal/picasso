/* eslint-disable id-length */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/**
 * bin/lib/confluence-sync.ts
 *
 * Part 4 (2026-05-14): syncs the migration manifest to a Confluence status
 * page so the team has a single live view of progress (no Slack-watching,
 * no manifest.json reading).
 *
 * Sync triggers (called from orchestrator-core.ts):
 *   1. After `run()` opens a PR and transitions to `awaiting_review`
 *   2. After every `sweepOne()` iteration that changes manifest state
 *
 * Sync target:
 *   https://toptal-core.atlassian.net/wiki/spaces/PF/pages/6011256873
 *
 * Authentication:
 *   - ATLASSIAN_EMAIL + ATLASSIAN_API_TOKEN env vars (Basic auth)
 *   - Token generated at https://id.atlassian.com/manage-profile/security/api-tokens
 *   - If unset: sync skipped with warning (non-fatal, matches Happo opt-out)
 *
 * Failure mode: non-fatal. Confluence sync should never block a migration.
 * If the API call fails, log the error and continue.
 */

import { readFileSync } from 'node:fs'
// `marked` is a transitive dep via @storybook/* — using it directly to
// avoid adding a new top-level dep + lockfile churn. Eslint flags this
// because marked isn't in our direct package.json; the disable is
// intentional and low-risk (the dep has been stable for years).
// eslint-disable-next-line import/no-extraneous-dependencies
import { marked } from 'marked'

import type { Manifest, ManifestItem, VariantState } from './workflow'

export interface ConfluenceSyncConfig {
  cloudId: string
  pageId: string
  spaceId?: string
  /** Defaults from env: ATLASSIAN_EMAIL */
  email?: string
  /** Defaults from env: ATLASSIAN_API_TOKEN */
  apiToken?: string
}

export const DEFAULT_CONFLUENCE_CONFIG: ConfluenceSyncConfig = {
  cloudId: 'toptal-core.atlassian.net',
  pageId: '6011256873',
  spaceId: '4250435588',
}

/**
 * Status icons keyed by manifest status. Used in the Confluence table for
 * visual scanning. Markdown-compatible (Confluence renders these via
 * standard Unicode).
 */
const STATUS_ICON: Record<string, string> = {
  done: '✅',
  ready_to_merge: '🟢',
  awaiting_review: '🟡',
  awaiting_ci: '⏳',
  in_progress: '🔄',
  needs_human: '🛑',
  blocked: '⛔',
  queued: '⚪',
}

/**
 * Per-tier headings + descriptions. Iteration order matches the migration
 * plan's logical sequence (Tier 0 first, ..., picasso-provider last).
 */
const TIER_LABELS: Record<number, string> = {
  0: 'Tier 0 — `@mui/base` → `@base-ui/react` (light path)',
  1: 'Tier 1 — cleanup (peer-dep + type fixes)',
  2: 'Tier 2 — heavy path (MUI v4 + JSS rewrite)',
  3: 'Tier 3 — heavy composites',
  4: 'Tier 4 — sibling packages',
  5: 'Tier 5 — provider runtime canary',
}

interface VariantRow {
  variantId: string
  state: VariantState
}

/** Pull the per-variant rows for an item (uses variants object if present). */
const variantRows = (item: ManifestItem): VariantRow[] => {
  if (item.variants && Object.keys(item.variants).length > 0) {
    return Object.entries(item.variants).map(([variantId, state]) => ({
      variantId,
      state,
    }))
  }
  // Legacy item (no variants object) — synthesize one row from flat fields.
  if (item.pr || item.branch || item.worktree || item.status !== 'queued') {
    return [
      {
        variantId: 'v1',
        state: {
          status: item.status,
          pr: item.pr,
          branch: item.branch,
          worktree: item.worktree,
          iterations: item.iterations,
          merged_at: item.merged_at,
          escalation_reason: item.escalation_reason ?? null,
          last_ci_green_at: item.last_ci_green_at ?? null,
          last_review_seen_at: item.last_review_seen_at ?? null,
          review_iterations: item.review_iterations,
          session_id: item.session_id ?? null,
          awaiting_ci_since: item.awaiting_ci_since ?? null,
        },
      },
    ]
  }

  // Queued item with no runs — single placeholder row.
  return [
    {
      variantId: '—',
      state: {
        status: 'queued',
        pr: null,
        branch: null,
        worktree: null,
        iterations: 0,
        merged_at: null,
      },
    },
  ]
}

/** Format a PR URL as a markdown link `[#<num>](url)`, or `—` if null. */
const formatPr = (pr: string | null): string => {
  if (!pr) {
    return '—'
  }
  const m = pr.match(/\/pull\/(\d+)/)

  return m ? `[#${m[1]}](${pr})` : `[link](${pr})`
}

/** Truncate notes to a reasonable width for the table cell. */
const formatNotes = (notes: string | undefined): string => {
  if (!notes) {
    return '—'
  }
  const oneLine = notes.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()

  return oneLine.length > 120 ? oneLine.slice(0, 117) + '...' : oneLine
}

/** Build the full markdown body for the Confluence page from the manifest. */
export const buildStatusPageMarkdown = (manifest: Manifest): string => {
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')

  // Aggregate progress across all (component, variant) tuples — each row in
  // the table is one variant, so the totals reflect work units rather than
  // "components done". A component with 2 variants both at awaiting_review
  // counts as 2 awaiting_review units.
  const counts: Record<string, number> = {
    done: 0,
    ready_to_merge: 0,
    awaiting_review: 0,
    awaiting_ci: 0,
    in_progress: 0,
    needs_human: 0,
    blocked: 0,
    queued: 0,
  }
  let totalUnits = 0
  let totalComponents = 0

  const items = Object.values(manifest.components)

  for (const item of items) {
    totalComponents += 1
    const rows = variantRows(item)

    for (const r of rows) {
      totalUnits += 1
      counts[r.state.status] = (counts[r.state.status] ?? 0) + 1
    }
  }

  // Group items by tier for table sections.
  const itemsByTier: Record<number, [string, ManifestItem][]> = {}

  for (const [key, item] of Object.entries(manifest.components)) {
    const tier = item.tier as number

    itemsByTier[tier] = itemsByTier[tier] || []
    itemsByTier[tier].push([key, item])
  }
  for (const tier of Object.keys(itemsByTier)) {
    itemsByTier[Number(tier)].sort(([a], [b]) => a.localeCompare(b))
  }

  const lines: string[] = []

  lines.push(
    '> **Auto-updated** by `pnpm orchestrate` (run + review-sweep). Last sync: ' +
      now
  )
  lines.push('')
  lines.push('## Progress')
  lines.push('')

  const pct = (n: number): string =>
    totalUnits === 0 ? '0%' : `${Math.round((n / totalUnits) * 100)}%`

  lines.push(`- **Total components**: ${totalComponents}`)
  lines.push(`- **Total migration units** (component × variant): ${totalUnits}`)
  lines.push(
    `- ${STATUS_ICON.done} **Done**: ${counts.done} (${pct(counts.done)})`
  )
  lines.push(
    `- ${STATUS_ICON.ready_to_merge} **Ready to merge**: ${
      counts.ready_to_merge
    } (${pct(counts.ready_to_merge)})`
  )
  lines.push(
    `- ${STATUS_ICON.awaiting_review} **Awaiting review**: ${counts.awaiting_review}`
  )
  lines.push(
    `- ${STATUS_ICON.awaiting_ci} **Awaiting CI**: ${counts.awaiting_ci}`
  )
  lines.push(
    `- ${STATUS_ICON.in_progress} **In progress**: ${counts.in_progress}`
  )
  lines.push(
    `- ${STATUS_ICON.needs_human} **Needs human**: ${counts.needs_human}`
  )
  lines.push(`- ${STATUS_ICON.blocked} **Blocked**: ${counts.blocked}`)
  lines.push(`- ${STATUS_ICON.queued} **Queued**: ${counts.queued}`)
  lines.push('')

  // Per-tier tables.
  const tierIds = Object.keys(itemsByTier)
    .map(Number)
    .sort((a, b) => a - b)

  for (const tier of tierIds) {
    lines.push(`## ${TIER_LABELS[tier] ?? `Tier ${tier}`}`)
    lines.push('')
    lines.push(
      '| Component | Variant | Status | PR | Branch | Iterations | Notes |'
    )
    lines.push('|---|---|---|---|---|---|---|')

    for (const [key, item] of itemsByTier[tier]) {
      const rows = variantRows(item)

      for (let i = 0; i < rows.length; i++) {
        const r = rows[i]
        const status = `${STATUS_ICON[r.state.status] ?? ''} ${r.state.status}`
        const pr = formatPr(r.state.pr)
        const branch = r.state.branch ?? '—'
        const iters = String(r.state.iterations ?? 0)
        // Show component name only on first variant row for readability.
        const componentCell = i === 0 ? `**${key}**` : ''
        // Notes only on first row (they're component-level, not per-variant).
        const notesCell = i === 0 ? formatNotes(item.notes) : ''

        lines.push(
          `| ${componentCell} | ${r.variantId} | ${status} | ${pr} | ${branch} | ${iters} | ${notesCell} |`
        )
      }
    }
    lines.push('')
  }

  lines.push('---')
  lines.push('')
  lines.push(
    '_Generated by `bin/lib/confluence-sync.ts`. Manual edits will be overwritten on next orchestrator run. To pause auto-sync, unset `ATLASSIAN_API_TOKEN`._'
  )

  return lines.join('\n')
}

/**
 * Sync the manifest to Confluence. Non-fatal — logs errors and returns
 * false on failure.
 *
 * Skips silently if ATLASSIAN_EMAIL or ATLASSIAN_API_TOKEN aren't set
 * (operator hasn't configured Confluence sync). This is the equivalent
 * of MIGRATION_GATE_HAPPO=skip — explicit opt-out via missing creds.
 */
export const syncToConfluence = async (
  manifestPath: string,
  config: ConfluenceSyncConfig = DEFAULT_CONFLUENCE_CONFIG,
  logger: (msg: string) => void = console.log
): Promise<boolean> => {
  const email = config.email ?? process.env.ATLASSIAN_EMAIL
  const apiToken = config.apiToken ?? process.env.ATLASSIAN_API_TOKEN

  if (!email || !apiToken) {
    logger(
      '[confluence-sync] ATLASSIAN_EMAIL / ATLASSIAN_API_TOKEN unset — skipping. ' +
        'Set both env vars to enable Confluence status page sync.'
    )

    return false
  }

  let manifest: Manifest

  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    // Inject `id` from the keys (orchestrator-core's manifest.read does this
    // too — replicating here to keep confluence-sync standalone).
    for (const [id, item] of Object.entries(manifest.components)) {
      Object.defineProperty(item, 'id', {
        value: id,
        enumerable: false,
        writable: false,
        configurable: false,
      })
    }
  } catch (err) {
    logger(
      `[confluence-sync] failed to read manifest: ${(err as Error).message}`
    )

    return false
  }

  const markdownBody = buildStatusPageMarkdown(manifest)
  // Confluence v2 PUT endpoint supports `representation: 'storage'` with
  // XHTML content. We convert our markdown via the `marked` library
  // (already a transitive dep) — produces clean HTML that Confluence
  // renders correctly (headings, lists, tables, links, bold all map
  // cleanly to storage format).
  //
  // Alternative formats tried and rejected:
  //   - `representation: 'wiki'` with raw markdown: renders `**bold**` as
  //     literal text (wiki uses `*bold*`), tables don't parse.
  //   - `representation: 'atlas_doc_format'` (ADF JSON): correct but
  //     requires a markdown→ADF converter (~200 LOC of nested structs).
  // Storage with marked-HTML is the simplest robust path.
  const htmlBody = await marked.parse(markdownBody, {
    gfm: true,
    breaks: false,
  })

  // Confluence REST API v2: PUT /wiki/api/v2/pages/{id}
  // Requires `version.number` of NEXT version (current+1), `title`, `status`,
  // `body.representation` and `body.value`.
  const apiBase = `https://${config.cloudId}/wiki/api/v2`

  try {
    // First fetch current version + title.
    const getResp = await fetch(`${apiBase}/pages/${config.pageId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString(
          'base64'
        )}`,
      },
    })

    if (!getResp.ok) {
      logger(
        `[confluence-sync] GET page failed: ${getResp.status} ${getResp.statusText}`
      )

      return false
    }
    const page: {
      version?: { number?: number }
      title?: string
    } = await getResp.json()
    const nextVersion = (page.version?.number ?? 1) + 1
    const title = page.title ?? 'Picasso Modernization - Status'

    // Then PUT with the new body.
    const putResp = await fetch(`${apiBase}/pages/${config.pageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString(
          'base64'
        )}`,
      },
      body: JSON.stringify({
        id: config.pageId,
        status: 'current',
        title,
        body: {
          representation: 'storage',
          value: htmlBody,
        },
        version: {
          number: nextVersion,
          message: `orchestrator auto-sync ${new Date().toISOString()}`,
        },
      }),
    })

    if (!putResp.ok) {
      const errText = await putResp.text().catch(() => '')

      logger(
        `[confluence-sync] PUT failed: ${putResp.status} ${
          putResp.statusText
        } ${errText.slice(0, 200)}`
      )

      return false
    }

    logger(
      `[confluence-sync] updated page ${config.pageId} (version ${nextVersion})`
    )

    return true
  } catch (err) {
    logger(`[confluence-sync] error: ${(err as Error).message}`)

    return false
  }
}
