/* eslint-disable func-style */
/* eslint-disable id-length */
/* eslint-disable no-console */
/**
 * bin/lib/token-telemetry.ts
 *
 * Slice 3 of Tier 2 batch B — per-canary token + cost telemetry.
 *
 * Why: operators have no visibility into "this canary cost $X" from the
 * orchestrator alone (today's analysis required external billing-dashboard
 * inspection). Each agent invocation logs usage in its session jsonl at
 * `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl`. We parse those
 * post-invocation, aggregate per iter and per canary, and write
 * `migration-runs/<date>/<id>/cost.json` so the run dir is self-contained.
 *
 * Why post-invocation read instead of streaming: the orchestrator
 * currently invokes claude with default text output (`-p`), not
 * `--output-format json`. Switching format would lose the human-readable
 * agent log. The session jsonl gives us machine-readable telemetry
 * without changing the invocation surface.
 *
 * Costs are estimates based on Sonnet 4.5 list pricing — actual billing
 * may differ (volume discounts, model fallbacks, etc.). Use the
 * Anthropic console for ground-truth.
 */

import { promises as fs, existsSync } from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

/**
 * Sonnet 4.5 pricing (USD per 1M tokens) as of 2025-09. Update when
 * Anthropic publishes new tiers. Cache pricing has two windows; we
 * use 5-minute cache create (the default for Claude Code's prompt
 * caching) and the standard read.
 */
const PRICING_USD_PER_M = {
  input: 3,
  output: 15,
  cache_write_5m: 3.75,
  cache_write_1h: 6,
  cache_read: 0.3,
}

export interface InvocationUsage {
  /** Wall-clock seconds for the agent invocation (caller-supplied). */
  durationSeconds?: number
  inputTokens: number
  outputTokens: number
  cacheCreation5mTokens: number
  cacheCreation1hTokens: number
  cacheReadTokens: number
  /** Estimated cost in USD based on PRICING_USD_PER_M. */
  costUsd: number
  /** Number of assistant messages observed in the session log. */
  messageCount: number
  /** Path to the session jsonl this was read from (debug). */
  sessionLogPath: string
}

interface RawUsage {
  input_tokens?: number
  output_tokens?: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
  cache_creation?: {
    ephemeral_5m_input_tokens?: number
    ephemeral_1h_input_tokens?: number
  }
}

interface RawJsonlEntry {
  type?: string
  message?: { usage?: RawUsage; role?: string; id?: string }
}

/**
 * Encode a cwd path the way Claude Code does to find its project session
 * directory. Convention (observed empirically):
 *   /Users/foo/bar  →  -Users-foo-bar
 *   /a/b            →  -a-b
 * Leading `/` becomes `-`, every other `/` becomes `-`. Other characters
 * pass through unchanged (this matches the actual directory names under
 * `~/.claude/projects/`).
 */
function encodeCwd(cwd: string): string {
  return cwd.replace(/\//g, '-')
}

/**
 * Locate the session log file for a given (cwd, sessionId). Returns the
 * absolute path if the file exists, else null.
 */
export function findSessionLog(cwd: string, sessionId: string): string | null {
  const projectDir = path.join(
    os.homedir(),
    '.claude',
    'projects',
    encodeCwd(cwd)
  )
  const candidate = path.join(projectDir, `${sessionId}.jsonl`)

  return existsSync(candidate) ? candidate : null
}

/**
 * Read a session jsonl and aggregate token usage across all assistant
 * messages. Each line is a JSON event; we only count ones with
 * `message.usage` (assistant turns).
 *
 * Handles the gotcha that streaming-mode message events repeat the same
 * usage block across multiple chunks (the totals are cumulative for a
 * single message). We dedupe by message id.
 */
export async function readSessionUsage(
  sessionLogPath: string
): Promise<InvocationUsage> {
  const body = await fs.readFile(sessionLogPath, 'utf8')
  const lines = body.split('\n').filter((l) => l.trim().length > 0)
  const seenMessageIds = new Set<string>()
  let inputTokens = 0
  let outputTokens = 0
  let cacheCreation5mTokens = 0
  let cacheCreation1hTokens = 0
  let cacheReadTokens = 0

  for (const line of lines) {
    let entry: RawJsonlEntry

    try {
      entry = JSON.parse(line) as RawJsonlEntry
    } catch {
      continue
    }
    if (entry.type !== 'assistant') {continue}
    const usage = entry.message?.usage

    if (!usage) {continue}
    const msgId = entry.message?.id

    if (msgId && seenMessageIds.has(msgId)) {continue}
    if (msgId) {seenMessageIds.add(msgId)}

    inputTokens += usage.input_tokens ?? 0
    outputTokens += usage.output_tokens ?? 0
    cacheReadTokens += usage.cache_read_input_tokens ?? 0
    cacheCreation5mTokens += usage.cache_creation?.ephemeral_5m_input_tokens ?? 0
    cacheCreation1hTokens += usage.cache_creation?.ephemeral_1h_input_tokens ?? 0
  }

  const costUsd =
    (inputTokens / 1_000_000) * PRICING_USD_PER_M.input +
    (outputTokens / 1_000_000) * PRICING_USD_PER_M.output +
    (cacheCreation5mTokens / 1_000_000) * PRICING_USD_PER_M.cache_write_5m +
    (cacheCreation1hTokens / 1_000_000) * PRICING_USD_PER_M.cache_write_1h +
    (cacheReadTokens / 1_000_000) * PRICING_USD_PER_M.cache_read

  return {
    inputTokens,
    outputTokens,
    cacheCreation5mTokens,
    cacheCreation1hTokens,
    cacheReadTokens,
    costUsd,
    messageCount: seenMessageIds.size,
    sessionLogPath,
  }
}

export interface CostReport {
  /** Component / item id. */
  itemId: string
  /** Anthropic session id (one per item, even across iters). */
  sessionId: string
  /** Last update timestamp (ISO). */
  updatedAt: string
  /** Aggregated usage across all observed messages. */
  total: InvocationUsage
  /**
   * Per-invocation snapshots, captured by the orchestrator after each
   * agent.invoke call. Each entry is the cumulative usage AT THAT
   * MOMENT — diff successive entries for per-iter usage.
   */
  snapshots: {
    iteration: number
    at: string
    inputTokens: number
    outputTokens: number
    cacheReadTokens: number
    costUsd: number
  }[]
}

/**
 * Read the existing cost.json (or initialize) and append an iteration
 * snapshot, then write back. Idempotent if the same iteration is
 * snapshotted twice.
 */
export async function appendCostSnapshot(args: {
  runDir: string
  itemId: string
  sessionId: string
  iteration: number
  cwd: string
}): Promise<InvocationUsage | null> {
  const sessionLog = findSessionLog(args.cwd, args.sessionId)

  if (!sessionLog) {return null}
  const usage = await readSessionUsage(sessionLog)
  const costPath = path.join(args.runDir, 'cost.json')
  let report: CostReport

  if (existsSync(costPath)) {
    try {
      report = JSON.parse(await fs.readFile(costPath, 'utf8')) as CostReport
    } catch {
      report = freshReport(args.itemId, args.sessionId, usage)
    }
  } else {
    report = freshReport(args.itemId, args.sessionId, usage)
  }

  report.total = usage
  report.updatedAt = new Date().toISOString()
  // Replace the snapshot for this iteration if already present (rerun
  // safety), else append.
  const existingIdx = report.snapshots.findIndex(
    (s) => s.iteration === args.iteration
  )
  const snapshot = {
    iteration: args.iteration,
    at: new Date().toISOString(),
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    cacheReadTokens: usage.cacheReadTokens,
    costUsd: Number(usage.costUsd.toFixed(4)),
  }

  if (existingIdx >= 0) {
    report.snapshots[existingIdx] = snapshot
  } else {
    report.snapshots.push(snapshot)
  }

  await fs.writeFile(costPath, JSON.stringify(report, null, 2), 'utf8')

  return usage
}

function freshReport(
  itemId: string,
  sessionId: string,
  usage: InvocationUsage
): CostReport {
  return {
    itemId,
    sessionId,
    updatedAt: new Date().toISOString(),
    total: usage,
    snapshots: [],
  }
}
