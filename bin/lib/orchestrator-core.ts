/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable max-params */
/* eslint-disable complexity */
/* eslint-disable func-style */
/* eslint-disable id-length */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-console */
/* eslint-disable todo-plz/ticket-ref */
/**
 * bin/lib/orchestrator-core.ts
 *
 * Workflow-agnostic orchestrator core. Implements the 14-step agent loop from
 * `docs/migration/references/agent-loop.md`. Per-workflow logic plugs in via
 * the `Workflow` descriptor (`./workflow.ts`).
 *
 * Lint exemptions above match the precedent set by `bin/build.js`:
 * tooling-style files (CLIs, dispatchers) carry inline-doc comments and
 * monolithic submodule layouts that don't fit Picasso's product-code rules
 * (`max-lines: 300`, `max-statements: 20`, `max-params: 3`, etc.). The
 * orchestrator is reviewed for correctness, not style conformance.
 *
 * NO migration-specific vocabulary appears in this file — search for the word
 * "migration" and you should find it only in comments / log strings, never in
 * type names, identifiers, or branching logic. The migration workflow lives in
 * `bin/migration-orchestrator.ts`.
 *
 * Submodules (inline below):
 *   - manifest: read/write/atomic-rename
 *   - worktree: git worktree add/remove
 *   - gh:       PR create/view/merge/comment wrappers
 *   - gate:     spawn workflow.gate(id), capture logs, parse report
 *   - agent:    assemble prompt + context, shell out to claude/cursor/codex
 *   - loop:     the 14 steps; calls workflow hooks at each branching point
 */

import { spawn, spawnSync, type SpawnOptions } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { promises as fs, existsSync, readFileSync, writeFileSync } from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'

import { classifyCIFailure } from './failure-classifier'
import {
  classifyReview,
  aggregateReviewDecisions,
  type Review as RawReview,
} from './review-classifier'
import { appendCostSnapshot } from './token-telemetry'
import type {
  EscalationDecision,
  GateReport,
  Manifest,
  ManifestItem,
  OrchestratorOptions,
  RunState,
  Workflow,
} from './workflow'

// ---------------------------------------------------------------------------
// utilities
// ---------------------------------------------------------------------------

const ISO = (): string => new Date().toISOString()
const TODAY = (): string => new Date().toISOString().slice(0, 10)
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Phase 3.1 — gh status-check-rollup terminology bridge.
// CheckRun (Actions): status ∈ {QUEUED,IN_PROGRESS,COMPLETED};
//                     conclusion ∈ {SUCCESS,FAILURE,SKIPPED,NEUTRAL,
//                                   CANCELLED,TIMED_OUT,ACTION_REQUIRED}.
// StatusContext (commit-status API used by Happo + a few others):
//                     state ∈ {PENDING,SUCCESS,FAILURE,ERROR}.
// We normalize everything to uppercase and treat the StatusContext `state`
// as both `status` and `conclusion`. PENDING means "still running".
const TERMINAL_STATUSES = new Set([
  'COMPLETED',
  'SUCCESS',
  'FAILURE',
  'ERROR',
  'NEUTRAL',
  'SKIPPED',
  'CANCELLED',
  'TIMED_OUT',
  'ACTION_REQUIRED',
])
const FAILURE_CONCLUSIONS = new Set([
  'FAILURE',
  'ERROR',
  'CANCELLED',
  'TIMED_OUT',
  'ACTION_REQUIRED',
])

interface RawCheckEntry {
  name?: string
  context?: string
  status?: string
  state?: string
  conclusion?: string
  detailsUrl?: string
  targetUrl?: string
}

interface CheckSnapshot {
  name: string
  status: string
  conclusion: string
  detailsUrl: string
}

type PollChecksResult =
  | { state: 'success'; checks: readonly CheckSnapshot[] }
  | {
      state: 'failure'
      failed: readonly CheckSnapshot[]
      checks: readonly CheckSnapshot[]
    }
  | {
      state: 'timeout'
      pending: readonly CheckSnapshot[]
      checks: readonly CheckSnapshot[]
    }

function log(prefix: string, message: string): void {
  // eslint-disable-next-line no-console
  console.log(`[${ISO()}] [${prefix}] ${message}`)
}

function repoRoot(): string {
  const out = spawnSync('git', ['rev-parse', '--show-toplevel'], {
    encoding: 'utf8',
  })

  if (out.status !== 0) {
    throw new Error(`Not in a git repo: ${out.stderr}`)
  }

  return out.stdout.trim()
}

interface ShellResult {
  exitCode: number
  stdout: string
  stderr: string
}

function shell(
  cmd: string,
  args: string[],
  opts: SpawnOptions = {}
): Promise<ShellResult> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { ...opts, stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''

    child.stdout?.on('data', (d) => {
      stdout += d
    })
    child.stderr?.on('data', (d) => {
      stderr += d
    })
    child.on('close', (code) => {
      resolve({ exitCode: code ?? 1, stdout, stderr })
    })
  })
}

/** Spawn a shell command via `bash -c` so the workflow can pass complex command lines. */
/**
 * Patterns indicating an agent failure where retrying makes no sense — the
 * external constraint blocks every subsequent invocation identically.
 *
 * Covers:
 *   - Anthropic spending cap (per canary 25: "Spending cap reached resets 3:10pm")
 *   - API quota / rate-limit surfaces (Anthropic, OpenAI variants)
 *   - Auth failures (revoked or missing API keys, OAuth token expiry)
 *   - Model availability (deprecated/unavailable model errors)
 *   - Local CLI auth ("not logged in") — claude / cursor / codex variants
 *
 * Returned string is the matched substring + ~60 chars of context, used as
 * the escalation reason. Empty string means "no known fast-fail pattern".
 */
const NO_PROGRESS_PATTERNS: readonly (readonly [RegExp, string])[] = [
  [/Spending cap reached[^\n]{0,100}/i, 'Anthropic spending cap reached'],
  [/quota (?:exceeded|exhausted)[^\n]{0,100}/i, 'API quota exhausted'],
  [/rate limit (?:exceeded|reached)[^\n]{0,100}/i, 'API rate limit exceeded'],
  [/insufficient_quota[^\n]{0,100}/i, 'Insufficient API quota'],
  [/401 Unauthorized[^\n]{0,100}/i, 'API auth failure (401)'],
  [/403 Forbidden[^\n]{0,100}/i, 'API auth failure (403)'],
  [/Authentication (?:failed|error)[^\n]{0,100}/i, 'API authentication failed'],
  [/Invalid API key[^\n]{0,100}/i, 'Invalid API key'],
  [/(?:not logged in|please log in)[^\n]{0,100}/i, 'CLI not logged in'],
  [/Model (?:.*?)not (?:available|found)[^\n]{0,100}/i, 'Model unavailable'],
  // Anthropic API 529 "Overloaded" — transient capacity issue. Retrying
  // immediately rarely helps (capacity is shared); a re-run 5-10 min
  // later usually succeeds. We escalate so the orchestrator stops
  // burning iterations (canary 28 wasted 5/10 iters on this) — the
  // operator decides when to re-run.
  [
    /API Error:\s*529[^\n]{0,200}/i,
    'Anthropic API overloaded (529) — retry the canary in a few minutes',
  ],
  [
    /"type":"overloaded_error"[^\n]{0,100}/,
    'Anthropic API overloaded — retry the canary in a few minutes',
  ],
]

/**
 * Phase 3 resilience — direnv-aware env bootstrapping.
 *
 * Picasso operators store secrets (HAPPO_API_KEY, NPM_TOKEN, ...) in
 * `~/Projects/.envrc` and rely on the `direnv hook` to inject them into
 * their interactive shell. When the orchestrator runs from a non-direnv-
 * hooked shell (e.g. an automation runner, an LLM Bash tool, a cron job),
 * those vars are missing → the gate's Happo / Cypress-Happo stages SKIP
 * silently → CI catches problems the gate could have caught locally.
 *
 * Workaround: walk up from `cwd` looking for `.envrc`. If found and
 * `direnv` is on PATH, exec `direnv export bash` and parse its output
 * into `process.env`. Vars that are already set in the parent env take
 * precedence (we never overwrite). Idempotent + best-effort: any error
 * (no direnv, .envrc not allowed, parse failure) is a silent no-op
 * because the original "skip Happo" behavior is still safe.
 *
 * Returns the list of newly-injected variable names so the orchestrator
 * can log a one-liner for transparency.
 */
async function loadEnvrcUpwards(cwd: string): Promise<readonly string[]> {
  // Skip if already populated by parent shell.
  if (process.env.HAPPO_API_KEY && process.env.HAPPO_API_SECRET) {
    return []
  }

  // Find nearest .envrc walking up.
  let dir = cwd
  let envrcDir: string | null = null

  while (dir && dir !== '/') {
    if (existsSync(path.join(dir, '.envrc'))) {
      envrcDir = dir
      break
    }
    const parent = path.dirname(dir)

    if (parent === dir) {break}
    dir = parent
  }
  if (!envrcDir) {return []}

  // Bail if direnv unavailable.
  const direnvCheck = await shell('which', ['direnv'])

  if (direnvCheck.exitCode !== 0) {return []}

  // Run `direnv export bash` from the .envrc's directory. Output is a
  // sequence of `export KEY=$'value';` statements.
  const exportResult = await shell('direnv', ['export', 'bash'], {
    cwd: envrcDir,
  })

  if (exportResult.exitCode !== 0 || !exportResult.stdout) {return []}

  const injected: string[] = []
  const exportRe = /export\s+([A-Z_][A-Z0-9_]*)=\$?'((?:[^'\\]|\\.)*)'/gi
  let match

  while ((match = exportRe.exec(exportResult.stdout)) !== null) {
    const [, key, rawValue] = match

    if (process.env[key]) {continue} // never overwrite an existing var
    // ANSI-C decoding is partial: \\, \', \n. Sufficient for direnv's
    // typical output (most secrets are alphanumeric).
    const value = rawValue
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\')
      .replace(/\\n/g, '\n')

    process.env[key] = value
    injected.push(key)
  }

  return injected
}

/**
 * Tier 2 batch B / Slice 3 — log a non-fatal warning if telemetry fails.
 * Token snapshots are best-effort: if Claude Code didn't write a session
 * jsonl (yet), or our jsonl parser hits a malformed line, we'd rather
 * carry on than abort the canary.
 */
async function recordTokenSnapshot(
  runDir: string,
  itemId: string,
  sessionId: string,
  iteration: number,
  cwd: string
): Promise<void> {
  try {
    const usage = await appendCostSnapshot({
      runDir,
      itemId,
      sessionId,
      iteration,
      cwd,
    })

    if (usage) {
      log(
        'cost',
        `iter ${iteration}: total $${usage.costUsd.toFixed(3)} (in=${usage.inputTokens}, out=${usage.outputTokens}, cache_read=${usage.cacheReadTokens})`
      )
    }
  } catch (err) {
    log('cost', `snapshot failed (non-fatal): ${(err as Error).message}`)
  }
}

async function detectNoProgressFailure(
  agentLogPath: string
): Promise<string | null> {
  if (!existsSync(agentLogPath)) {return null}
  const log_ = await fs.readFile(agentLogPath, 'utf8').catch(() => '')

  if (!log_) {return null}

  for (const [pattern, label] of NO_PROGRESS_PATTERNS) {
    const match = log_.match(pattern)

    if (match) {
      return `${label}: ${match[0].trim()}`
    }
  }

  return null
}

async function shellLine(
  line: string,
  opts: SpawnOptions = {}
): Promise<ShellResult> {
  return shell('bash', ['-c', line], opts)
}

/**
 * Poll an HTTP URL until it responds 200 OR timeout. Used to wait for
 * Storybook to be ready before invoking the agent with `--with-mcp`.
 */
async function waitForUrl(url: string, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: 'GET' })

      if (res.ok || res.status === 304) {return true}
    } catch {
      // network not ready yet — wait + retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return false
}

// ---------------------------------------------------------------------------
// manifest
// ---------------------------------------------------------------------------

const manifest = {
  read(absPath: string): Manifest {
    const parsed = JSON.parse(readFileSync(absPath, 'utf8')) as Manifest

    // Inject `id` from the keys so consumers can rely on `item.id` everywhere.
    // The on-disk format keeps id as the map key for compactness; in-memory we
    // want a self-describing object. **Non-enumerable** so JSON.stringify in
    // manifest.write skips it — otherwise the field leaks back to disk.
    for (const [id, item] of Object.entries(parsed.components)) {
      Object.defineProperty(item, 'id', {
        value: id,
        enumerable: false,
        writable: false,
        configurable: false,
      })
    }

    return parsed
  },

  /** Atomic write: tmp file + rename. */
  write(absPath: string, m: Manifest): void {
    const tmp = `${absPath}.tmp.${process.pid}`

    writeFileSync(tmp, JSON.stringify(m, null, 2) + '\n', 'utf8')
    // fs.rename is atomic on POSIX as long as src/dst are on the same filesystem.
    // require sync version because we use this in error paths.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('node:fs').renameSync(tmp, absPath)
  },

  /** Pick the next queued item whose dependencies are all merged. */
  pickNext(m: Manifest, opts: OrchestratorOptions): ManifestItem | null {
    const items = Object.values(m.components)

    // Direct selection by --component flag.
    if (opts.component) {
      const item = m.components[opts.component]

      if (!item) {
        throw new Error(`No manifest entry for --component=${opts.component}`)
      }

      return item
    }

    const candidates = items.filter((item) => {
      if (item.status !== 'queued') {return false}
      if (opts.tier !== null && item.tier !== opts.tier) {return false}

      // All dependencies must be done.
      return item.depends_on.every((dep) => m.components[dep]?.status === 'done')
    })

    // Tier order, then alphabetical for stability.
    candidates.sort((a, b) => a.tier - b.tier || a.id.localeCompare(b.id))

    return candidates[0] ?? null
  },

  /** Mark an item with status + extra fields, persist immediately. */
  update(
    absPath: string,
    id: string,
    patch: Partial<ManifestItem>
  ): Manifest {
    const m = manifest.read(absPath)
    const current = m.components[id]

    if (!current) {throw new Error(`No manifest entry for ${id}`)}
    m.components[id] = { ...current, ...patch }
    manifest.write(absPath, m)

    return m
  },
}

// ---------------------------------------------------------------------------
// worktree
// ---------------------------------------------------------------------------

const worktree = {
  /**
   * Path the orchestrator uses for an item's worktree.
   *
   * TODO(workflow #2): the `migration-runs/` prefix is the only workflow-
   * specific bake-in left in this file. When the second workflow lands, lift
   * this to `Workflow.runDirRoot` (default: `agent-runs/<workflow.id>/`) and
   * thread the value through `bin/migration-gate.sh` and `bin/migration-diff.sh`
   * via the `MIGRATION_RUN_ROOT` env var (already plumbed for `MIGRATION_RUN_DATE`).
   */
  pathFor(itemId: string, runDate: string): string {
    return path.join('migration-runs', runDate, itemId, 'worktree')
  },

  /**
   * Create a worktree at `worktreePath` with a new branch `branch` rooted at `base`.
   *
   * Default base is `HEAD` (the current branch tip), not `master`. Rationale:
   * during PF-1992 self-validation, `master` does not yet have the orchestrator
   * infrastructure (gate / diff scripts, docs/migration/), so worktreeing off
   * master means the worktree's snapshot/gate stages fail with "No such file
   * or directory". HEAD-based worktrees inherit whatever branch the operator
   * is currently on. Post-PF-1992-merge, operators typically run from master
   * (or a fresh feature branch off master) — both cases resolve to a valid
   * base via HEAD.
   *
   * For workflows that need a different base (e.g. always master regardless of
   * operator's current branch), pass `base` explicitly. CLI: `--base=<ref>`.
   */
  async add(branch: string, worktreePath: string, base = 'HEAD'): Promise<void> {
    await fs.mkdir(path.dirname(worktreePath), { recursive: true })

    // Defensive cleanup: a previous run that crashed mid-flight (e.g. the
    // worktree-add half-succeeded by creating the branch but failed on the
    // checkout step) can leave a stale branch + partial worktree. Without
    // this cleanup, every retry would fail with "branch already exists" or
    // "directory already exists" until the operator manually purges. Detect
    // and remove both before retrying. This is safe because an in-flight
    // orchestrator holds an exclusive lock on the manifest item — if we
    // got here, no other run is using these refs.
    if (existsSync(worktreePath)) {
      log('worktree', `pre-existing path ${worktreePath} — removing stale partial`)
      await shell('git', ['worktree', 'remove', '--force', worktreePath]).catch(() => {})
      // shell-out can leave the dir if `git worktree remove` failed (e.g.
      // worktree was never registered with git); fall back to rm -rf.
      if (existsSync(worktreePath)) {
        await fs.rm(worktreePath, { recursive: true, force: true })
      }
    }
    const branchCheck = await shell('git', ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`])

    if (branchCheck.exitCode === 0) {
      log('worktree', `pre-existing branch ${branch} — deleting stale ref`)
      await shell('git', ['branch', '-D', branch]).catch(() => {})
    }

    const result = await shell('git', [
      'worktree',
      'add',
      '-b',
      branch,
      worktreePath,
      base,
    ])

    if (result.exitCode !== 0) {
      throw new Error(
        `git worktree add failed: ${result.stderr || result.stdout}`
      )
    }
    // Bootstrap: symlink node_modules from the main repo so the worktree's
    // gate stages (eslint, tsc, jest, cypress, happo) can resolve their
    // binaries via node_modules/.bin and so type-resolution finds @types/*.
    //
    // Trade-off: yarn workspaces' internal symlinks under node_modules/@toptal/*
    // point at the main repo's `packages/`, NOT the worktree's. For Tier 1
    // cleanup migrations (package.json delta only, no source change) this is
    // correct — main and worktree carry identical source. For source-changing
    // migrations (Tier 0 / 2 / 3 / 4 / 5) the bootstrap should instead run
    // `yarn install --frozen-lockfile` in the worktree so internal symlinks
    // resolve to the worktree's packages.
    //
    // TODO(PF-1994): add a `workflow.bootstrapWorktree(worktreePath)` hook so
    // each workflow descriptor can choose between the symlink (fast, correct
    // for cleanup-only) and a real install (slow, correct for source changes).
    const mainRepoModules = path.join(repoRoot(), 'node_modules')
    const worktreeModules = path.join(worktreePath, 'node_modules')

    if (existsSync(mainRepoModules) && !existsSync(worktreeModules)) {
      await fs.symlink(mainRepoModules, worktreeModules, 'dir')
    }
  },

  /**
   * Phase 2.5 fix — workspace shadowing for source-changing migrations.
   *
   * Background. The default `worktree.add` symlinks `worktree/node_modules ->
   * main/node_modules`. Yarn's workspace symlinks under
   * `node_modules/@toptal/<pkg>` are stored as RELATIVE targets like
   * `../../packages/base/Button`. Relative symlinks resolve from their
   * physical location — not from the access path — so even though we access
   * via the worktree, the package resolves to MAIN's `packages/base/Button`,
   * not the worktree's. For Tier 1 cleanup migrations (no source change), this
   * is correct; main and worktree carry identical source. For source-changing
   * migrations (Tier 0 / 2 / 3 / 4 / 5), this is a silent correctness bug:
   * consumer-package tests that import via `@toptal/picasso-<migrating>` see
   * the OLD source from main, masking real ripple-effect regressions until
   * full-repo CI runs against a clean checkout.
   *
   * Empirically validated on canary 20 (PR #4927): Phase 2.5's consumer-stage
   * jest passed against 17 Button consumers locally; CI fresh-checkout caught
   * the same 2 Pagination snapshot regressions canary 19 had hit.
   *
   * Fix. Convert `worktree/node_modules` from a top-level symlink-to-main to
   * a real directory with absolute symlinks for each top-level entry pointing
   * at main's node_modules. Then carve out a real `@toptal/` overlay where
   * the migrating workspace points at the worktree's own source and the rest
   * point back at main. Cost ~2-3s for ~1500 top-level symlinks + ~50 @toptal
   * entries. Vastly cheaper than `yarn install --frozen-lockfile` (~3-5min)
   * and surgical (no main-repo state touched).
   *
   * Idempotent: if `worktree/node_modules` is already a real dir, skips.
   */
  async overlayWorkspaceForSourceChange(
    worktreePath: string,
    workspaceShortName: string,
    workspacePackagePath: string
  ): Promise<void> {
    const mainNodeModules = path.join(repoRoot(), 'node_modules')
    const wtNodeModules = path.join(worktreePath, 'node_modules')

    if (!existsSync(mainNodeModules)) {return}

    // If wtNodeModules is a symlink, convert to real dir.
    const stat = await fs.lstat(wtNodeModules).catch(() => null)

    if (stat?.isSymbolicLink()) {
      await fs.unlink(wtNodeModules)
    } else if (stat?.isDirectory()) {
      // Already a real dir — assume previously overlaid; idempotent skip.
      return
    }

    await fs.mkdir(wtNodeModules, { recursive: true })

    // Top-level absolute-symlink overlay (skip @toptal — handled below).
    const topEntries = await fs.readdir(mainNodeModules)

    await Promise.all(
      topEntries.map(async (name) => {
        if (name === '@toptal') {return}
        const target = path.join(mainNodeModules, name)
        const link = path.join(wtNodeModules, name)

        await fs.symlink(target, link).catch(() => {})
      })
    )

    // @toptal/ overlay: real dir; absolute-symlink each entry except the
    // migrating workspace which is symlinked to the worktree's source.
    const wtAtToptal = path.join(wtNodeModules, '@toptal')

    await fs.mkdir(wtAtToptal, { recursive: true })
    const mainAtToptal = path.join(mainNodeModules, '@toptal')

    if (existsSync(mainAtToptal)) {
      const toptalEntries = await fs.readdir(mainAtToptal)

      await Promise.all(
        toptalEntries.map(async (name) => {
          const link = path.join(wtAtToptal, name)

          if (name === workspaceShortName) {
            // Migrating workspace -> worktree's own source.
            await fs.symlink(
              path.join(worktreePath, workspacePackagePath),
              link
            ).catch(() => {})
          } else {
            // All other @toptal/* -> main repo's symlink target.
            await fs.symlink(path.join(mainAtToptal, name), link).catch(() => {})
          }
        })
      )
    }
  },

  /** Remove the worktree on success. Leave it for inspection on escalation. */
  async remove(worktreePath: string): Promise<void> {
    if (!existsSync(worktreePath)) {return}
    await shell('git', ['worktree', 'remove', '--force', worktreePath])
  },
}

// ---------------------------------------------------------------------------
// gate
// ---------------------------------------------------------------------------

const gate = {
  /**
   * Run the workflow's gate command and consume its report.
   *
   * Tier 2.2 — prefers `report.json` (structured, schema-stable) when
   * present; falls back to regex-parsing `report.md` for backward-compat
   * with worktrees forked before the JSON emit landed. Both formats
   * carry the same data; JSON just removes the parser brittleness.
   */
  async run(
    workflowGateCmd: string,
    itemId: string,
    cwd: string,
    runDate: string
  ): Promise<GateReport> {
    log('gate', `running: ${workflowGateCmd} (cwd=${cwd})`)
    const result = await shellLine(workflowGateCmd, {
      cwd,
      env: { ...process.env, MIGRATION_RUN_DATE: runDate },
    })

    log(
      'gate',
      `exit=${result.exitCode} (${result.stdout.length} bytes stdout, ${result.stderr.length} bytes stderr)`
    )

    const reportDir = path.join(cwd, 'migration-runs', runDate, itemId)
    const reportPath = path.join(reportDir, 'report.md')
    const jsonReportPath = path.join(reportDir, 'report.json')

    let stages: GateReport['stages'] = []
    let composite: GateReport['composite'] = result.exitCode === 0 ? 'PASS' : 'FAIL'

    // Tier 2.2 — prefer JSON.
    if (existsSync(jsonReportPath)) {
      try {
        const body = readFileSync(jsonReportPath, 'utf8')
        const parsed = JSON.parse(body) as {
          composite: 'PASS' | 'FAIL'
          stages: {
            name: string
            status: 'PASS' | 'FAIL' | 'SKIP'
            durationSeconds: number
            logPath: string
          }[]
        }

        composite = parsed.composite
        stages = parsed.stages

        return { composite, stages, reportPath }
      } catch (err) {
        log(
          'gate',
          `report.json parse failed (${(err as Error).message}); falling back to report.md`
        )
      }
    }

    // Fallback: parse the markdown report.
    if (existsSync(reportPath)) {
      const body = readFileSync(reportPath, 'utf8')
      // Parse "| <name> | <status> | <Ns> | `<log>` |" rows.
      const tableRegex = /^\|\s*([^|]+?)\s*\|\s*(PASS|FAIL|SKIP)\s*\|\s*(\d+)s\s*\|\s*`([^`]+)`\s*\|/gm
      const parsed: typeof stages = []

      for (let m: RegExpExecArray | null; (m = tableRegex.exec(body)); ) {
        parsed.push({
          name: m[1],
          status: m[2] as 'PASS' | 'FAIL' | 'SKIP',
          durationSeconds: Number(m[3]),
          logPath: m[4],
        })
      }
      stages = parsed
      const compositeMatch = body.match(/\*\*Composite:\*\*\s+(PASS|FAIL)/)

      if (compositeMatch) {
        composite = compositeMatch[1] as 'PASS' | 'FAIL'
      }
    }

    return { composite, stages, reportPath }
  },
}

// ---------------------------------------------------------------------------
// gh CLI wrapper
// ---------------------------------------------------------------------------

const gh = {
  /** Pre-flight: ensure auth + scopes. */
  async assertAuth(): Promise<void> {
    const out = await shell('gh', ['auth', 'status'])

    if (out.exitCode !== 0) {
      throw new Error(`gh auth status failed: ${out.stderr || out.stdout}`)
    }
  },

  async createPR(opts: {
    title: string
    base: string
    head: string
    bodyFile: string
    cwd: string
    /**
     * GitHub usernames to assign to the new PR. `@me` is supported by gh and
     * resolves to the authenticated user. Picasso's Danger CI requires at
     * least one assignee before merge.
     */
    assignees?: readonly string[]
  }): Promise<string> {
    const args: string[] = [
      'pr',
      'create',
      '--title',
      opts.title,
      '--base',
      opts.base,
      '--head',
      opts.head,
      '--body-file',
      opts.bodyFile,
    ]

    for (const assignee of opts.assignees ?? []) {
      args.push('--assignee', assignee)
    }

    // Resilience — `gh pr create` IS retry-safe despite being a write API:
    //   1. GitHub's REST/GraphQL idempotently rejects a second create for
    //      the same branch with "a pull request for branch X already
    //      exists" (no duplicate-PR hazard).
    //   2. If the server committed but the response 504'd (canary 27),
    //      the duplicate-detection branch finds the existing PR and we
    //      return its URL via `gh pr list --head <branch>`.
    // Same retry budget + transient-error filter as gh.viewPR.
    const maxAttempts = 4
    const baseDelayMs = 3000

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const result = await shell('gh', args, { cwd: opts.cwd })

      if (result.exitCode === 0) {
        return result.stdout.trim()
      }
      const msg = result.stderr || result.stdout

      // "PR already exists" — server accepted a previous (504-truncated)
      // attempt. Recover the URL via list lookup.
      if (/already exists/i.test(msg)) {
        log('gh', `PR for ${opts.head} already exists; recovering URL`)
        const list = await shell(
          'gh',
          [
            'pr',
            'list',
            '--head',
            opts.head,
            '--json',
            'url',
            '--state',
            'open',
          ],
          { cwd: opts.cwd }
        )

        if (list.exitCode === 0) {
          const parsed = JSON.parse(list.stdout) as { url: string }[]

          if (parsed.length > 0) {return parsed[0].url}
        }
        throw new Error(
          `gh pr create reported "already exists" but lookup failed: ${msg}`
        )
      }

      const isTransient = /HTTP 5\d\d|Gateway Timeout|timeout|ECONNRESET|ECONNREFUSED|ETIMEDOUT/i.test(
        msg
      )

      if (!isTransient || attempt === maxAttempts) {
        throw new Error(
          `gh pr create failed (attempt ${attempt}/${maxAttempts}): ${msg}`
        )
      }
      const backoffMs = baseDelayMs * 2 ** (attempt - 1)

      log(
        'gh',
        `transient error on gh pr create (attempt ${attempt}/${maxAttempts}); retrying in ${backoffMs}ms: ${msg.slice(0, 120).replace(/\n.*/s, '')}`
      )
      await sleep(backoffMs)
    }
    throw new Error('gh pr create: exhausted retries (unreachable)')
  },

  async viewPR(
    numberOrUrl: string,
    fields: string,
    cwd: string
  ): Promise<unknown> {
    // Resilience — read API calls retry on GitHub transient errors (504
    // Gateway Timeout, 502 Bad Gateway, 503 Service Unavailable,
    // ECONNRESET, etc.). The CI poll loop calls this 30+ times per cycle;
    // a single transient blip otherwise kills the whole run. Empirically
    // hit on canary 26 (PR #4932): one 504 mid-poll → orchestrator died
    // → wasted iter budget on what was just GitHub having a moment.
    //
    // Write APIs (createPR, mergePR, comment) are NOT wrapped — retrying
    // could create duplicate PRs / stack merge attempts. Read-only calls
    // are safe to retry.
    const maxAttempts = 4
    const baseDelayMs = 3000

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const result = await shell(
        'gh',
        ['pr', 'view', numberOrUrl, '--json', fields],
        { cwd }
      )

      if (result.exitCode === 0) {
        return JSON.parse(result.stdout)
      }
      const msg = result.stderr || result.stdout
      const isTransient = /HTTP 5\d\d|Gateway Timeout|timeout|ECONNRESET|ECONNREFUSED|ETIMEDOUT/i.test(
        msg
      )

      if (!isTransient || attempt === maxAttempts) {
        throw new Error(
          `gh pr view failed (attempt ${attempt}/${maxAttempts}): ${msg}`
        )
      }
      const backoffMs = baseDelayMs * 2 ** (attempt - 1)

      log(
        'gh',
        `transient error on gh pr view (attempt ${attempt}/${maxAttempts}); retrying in ${backoffMs}ms: ${msg.slice(0, 120).replace(/\n.*/s, '')}`
      )
      await sleep(backoffMs)
    }
    throw new Error('gh pr view: exhausted retries (unreachable)')
  },

  /**
   * Poll the PR's check rollup until every check completes or the timeout
   * fires. Phase 3.1 — Steps 12-13 of the agent loop. Until this lands the
   * orchestrator stops at PR-creation, leaving CI feedback on the floor and
   * forcing the operator to manually retry on snapshot drift, lint slip-ups,
   * Happo diffs, etc.
   *
   * Return shape:
   *   { state: 'success' }           — every check COMPLETED with a non-failure
   *                                    conclusion (SUCCESS, NEUTRAL, SKIPPED).
   *   { state: 'failure', failed }   — at least one check FAILED / CANCELLED /
   *                                    TIMED_OUT / ACTION_REQUIRED.
   *   { state: 'timeout', pending }  — wall-clock budget exhausted before all
   *                                    checks completed.
   *
   * Failure / pending lists carry per-check {name, conclusion, detailsUrl} so
   * downstream classification + iteration logic (Phase 3.2 / 3.3) can decide
   * how to react without re-querying gh.
   *
   * Polling cadence: 30s by default. Picasso CI on the integration branch
   * runs in ~7-12 minutes; 30s × ~30 polls covers the 15-minute default
   * timeout with low API pressure (gh's rate limit is 5000/hr).
   */
  async pollChecks(
    numberOrUrl: string,
    cwd: string,
    opts: {
      timeoutMinutes: number
      intervalSeconds: number
      onTick?: (snapshot: readonly CheckSnapshot[]) => void
    }
  ): Promise<PollChecksResult> {
    const deadline = Date.now() + opts.timeoutMinutes * 60_000
    const intervalMs = Math.max(5_000, opts.intervalSeconds * 1_000)
    // GitHub Actions registers workflow runs ~5-30s after the PR is opened.
    // Polling immediately can return an empty rollup that would otherwise be
    // interpreted as "all checks done — success". Require at least one
    // observation that checks exist before honoring an empty rollup as a
    // genuine "no CI configured" success.
    let everSawChecks = false
    let pollNumber = 0
    const WARMUP_POLLS = 3

    while (Date.now() < deadline) {
      pollNumber++
      const view = (await gh.viewPR(
        numberOrUrl,
        'statusCheckRollup',
        cwd
      )) as { statusCheckRollup?: readonly RawCheckEntry[] } | null

      const rollup = view?.statusCheckRollup ?? []
      const snapshot: CheckSnapshot[] = rollup.map((c) => ({
        name: c.name ?? c.context ?? '(unnamed)',
        // CheckRun uses `status` (QUEUED/IN_PROGRESS/COMPLETED) +
        // `conclusion` (SUCCESS/FAILURE/...). Statuses use lower-case
        // `state` (PENDING/SUCCESS/FAILURE) without the split. Normalize.
        status: (c.status ?? c.state ?? '').toUpperCase(),
        conclusion: (c.conclusion ?? c.state ?? '').toUpperCase(),
        detailsUrl: c.detailsUrl ?? c.targetUrl ?? '',
      }))

      if (snapshot.length > 0) {everSawChecks = true}

      opts.onTick?.(snapshot)

      // Empty rollup during warmup → keep polling; might be Actions still
      // spinning up. After warmup, an empty rollup is treated as "no CI
      // configured for this PR" → success (downstream merge/escalation
      // logic decides whether that's acceptable per workflow).
      if (snapshot.length === 0 && pollNumber < WARMUP_POLLS) {
        await sleep(intervalMs)
        continue
      }

      // Done = every check has a terminal conclusion.
      const pending = snapshot.filter((c) => !TERMINAL_STATUSES.has(c.status))

      if (pending.length === 0) {
        const failed = snapshot.filter((c) =>
          FAILURE_CONCLUSIONS.has(c.conclusion)
        )

        // Empty + post-warmup + never-saw-checks = "no CI" → success.
        // Empty + post-warmup + saw-then-disappeared shouldn't happen, but
        // if it does, treat as success (best-effort).
        if (snapshot.length === 0 && !everSawChecks) {
          return { state: 'success', checks: [] }
        }

        return failed.length === 0
          ? { state: 'success', checks: snapshot }
          : { state: 'failure', failed, checks: snapshot }
      }

      await sleep(intervalMs)
    }

    // Wall-clock budget exhausted. Take a final snapshot — if all
    // checks reached a terminal state during the last sleep window, the
    // run is actually success/failure (deadline fired between poll and
    // sleep, missing the natural exit). Empirically observed on canary
    // 25 (PR #4931): Happo transitioned PENDING → SUCCESS in the final
    // ~60s of a 15min window; without this branch the orchestrator
    // wrongly escalated as "timeout with 0 pending".
    const view = (await gh.viewPR(
      numberOrUrl,
      'statusCheckRollup',
      cwd
    )) as { statusCheckRollup?: readonly RawCheckEntry[] } | null
    const rollup = view?.statusCheckRollup ?? []
    const snapshot: CheckSnapshot[] = rollup.map((c) => ({
      name: c.name ?? c.context ?? '(unnamed)',
      status: (c.status ?? c.state ?? '').toUpperCase(),
      conclusion: (c.conclusion ?? c.state ?? '').toUpperCase(),
      detailsUrl: c.detailsUrl ?? c.targetUrl ?? '',
    }))
    const pending = snapshot.filter((c) => !TERMINAL_STATUSES.has(c.status))

    if (pending.length === 0) {
      const failed = snapshot.filter((c) =>
        FAILURE_CONCLUSIONS.has(c.conclusion)
      )

      return failed.length === 0
        ? { state: 'success', checks: snapshot }
        : { state: 'failure', failed, checks: snapshot }
    }

    return { state: 'timeout', pending, checks: snapshot }
  },

  /**
   * Fetch the raw log of a single Actions job, given its detailsUrl from the
   * status-check rollup. Used by Phase 3.2/3.3 to feed CI failure context
   * into the failure classifier.
   *
   * detailsUrl format: `https://github.com/<owner>/<repo>/actions/runs/<run>/job/<jobId>`
   * `gh api repos/<owner>/<repo>/actions/jobs/<jobId>/logs` → text.
   *
   * Returns empty string on any error after retry exhaustion (best-effort
   * — caller handles missing log gracefully via classifier's "unclassified
   * → escalate" branch). Transient 5xx / network failures retried up to
   * `maxAttempts` with exp backoff; unrecoverable errors (404, malformed
   * URL) return empty immediately.
   */
  async fetchJobLog(detailsUrl: string, cwd: string): Promise<string> {
    const m = detailsUrl.match(
      /github\.com\/([^/]+)\/([^/]+)\/actions\/runs\/\d+\/job\/(\d+)/
    )

    if (!m) {return ''}
    const [, owner, repo, jobId] = m
    const maxAttempts = 4
    const baseDelayMs = 3000

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const result = await shell(
        'gh',
        ['api', `repos/${owner}/${repo}/actions/jobs/${jobId}/logs`],
        { cwd }
      )

      if (result.exitCode === 0) {return result.stdout}
      const msg = result.stderr || result.stdout

      // Permanent errors (404 — job deleted/not found, malformed) → bail
      // immediately. Transient errors retry.
      if (/HTTP 404|Not Found/i.test(msg)) {return ''}
      const isTransient = /HTTP 5\d\d|Gateway Timeout|timeout|ECONNRESET|ECONNREFUSED|ETIMEDOUT/i.test(
        msg
      )

      if (!isTransient || attempt === maxAttempts) {
        log(
          'gh',
          `fetchJobLog gave up (attempt ${attempt}/${maxAttempts}): ${msg.slice(0, 120).replace(/\n.*/s, '')}`
        )

        return ''
      }
      const backoffMs = baseDelayMs * 2 ** (attempt - 1)

      log(
        'gh',
        `transient error on fetchJobLog (attempt ${attempt}/${maxAttempts}); retrying in ${backoffMs}ms`
      )
      await sleep(backoffMs)
    }

    return ''
  },

  /**
   * Phase 3.5 — fetch the PR's reviews + issue comments in a single call,
   * normalize into the `Review` shape the classifier expects, and return
   * deduplicated entries. We treat formal reviews and issue comments
   * uniformly: both can carry signal (LGTM, nit, question).
   *
   * Each entry carries an `at` timestamp (ISO) so the sweep can filter
   * to only NEW reviews since `last_review_seen_at`. Reviews use
   * `submittedAt`; issue comments use `createdAt`.
   */
  async fetchReviews(numberOrUrl: string, cwd: string): Promise<RawReview[]> {
    const view = (await gh.viewPR(
      numberOrUrl,
      'reviews,comments',
      cwd
    )) as {
      reviews?: {
        state?: string
        body?: string
        submittedAt?: string
        author?: { login?: string }
      }[]
      comments?: {
        body?: string
        createdAt?: string
        author?: { login?: string }
      }[]
    } | null

    const reviews = view?.reviews ?? []
    const comments = view?.comments ?? []
    const result: RawReview[] = []

    for (const r of reviews) {
      result.push({
        state: r.state ?? '',
        body: r.body ?? '',
        author: r.author?.login ?? '',
        at: r.submittedAt ?? '',
      })
    }
    for (const c of comments) {
      result.push({
        state: '',
        body: c.body ?? '',
        author: c.author?.login ?? '',
        at: c.createdAt ?? '',
      })
    }

    return result
  },

  /**
   * Phase 3.5 — poll for reviews up to a budget. First poll happens
   * immediately so a PR that already has reviews is acted on without
   * delay. Returns the list of reviews when ANY exist, OR an empty
   * list on timeout. Caller decides what to do (merge / iterate /
   * escalate) based on the classifier's aggregated decision.
   */
  async pollReviews(
    numberOrUrl: string,
    cwd: string,
    opts: { timeoutMinutes: number; intervalSeconds: number }
  ): Promise<RawReview[]> {
    const deadline = Date.now() + opts.timeoutMinutes * 60_000
    const intervalMs = Math.max(30_000, opts.intervalSeconds * 1_000)

    while (Date.now() < deadline) {
      const reviews = await gh.fetchReviews(numberOrUrl, cwd)

      if (reviews.length > 0) {return reviews}
      await sleep(intervalMs)
    }

    return []
  },

  async mergePR(numberOrUrl: string, cwd: string): Promise<void> {
    const result = await shell(
      'gh',
      ['pr', 'merge', numberOrUrl, '--squash', '--auto', '--delete-branch'],
      { cwd }
    )

    if (result.exitCode !== 0) {
      throw new Error(`gh pr merge failed: ${result.stderr || result.stdout}`)
    }
  },

  async commentPR(
    numberOrUrl: string,
    body: string,
    cwd: string
  ): Promise<void> {
    const result = await shell(
      'gh',
      ['pr', 'comment', numberOrUrl, '--body', body],
      { cwd }
    )

    if (result.exitCode !== 0) {
      throw new Error(`gh pr comment failed: ${result.stderr || result.stdout}`)
    }
  },
}

// ---------------------------------------------------------------------------
// agent
// ---------------------------------------------------------------------------

interface AgentInvocation {
  /** Concatenated prompt + context to feed the agent. */
  prompt: string
  /** Directory the agent should operate in (the worktree). */
  cwd: string
  /** Agent vendor. */
  agent: OrchestratorOptions['agent']
  /**
   * If true, pass `--mcp-config bin/lib/agent-mcp-config.json` to claude and
   * grant `mcp__playwright__*` tools. Caller is responsible for ensuring
   * Storybook is running before invoke and tearing it down after.
   */
  withMcp?: boolean
  /**
   * Session continuity across iterations — Tier 2.1 of post-canary-15 plan.
   * Iteration 1: pass `--session-id <uuid>` so claude tags the conversation.
   * Iteration 2+: pass `--resume <uuid>` so claude continues the same
   * conversation with prior message history in context. Cuts re-sent token
   * count + preserves the agent's reasoning state across attempts.
   */
  sessionId?: string
  /** True for iter 1 (use --session-id); false for iter 2+ (use --resume). */
  isFirstIteration?: boolean
}

const agent = {
  /**
   * Assemble a prompt by concatenating the workflow's promptFor(item) result,
   * contextPack, the per-item plan, and tier-conditional extras.
   *
   * On iteration 2+, also embeds the agent's accumulated diff (`git diff` in
   * the worktree vs its HEAD) so the agent sees what it already changed
   * across prior iterations and doesn't repeat or undo edits — Tier 1.1 of
   * the post-canary-15 improvements plan.
   */
  async assemblePrompt(
    workflow: Workflow,
    item: ManifestItem,
    iteration: number,
    feedback: string | null,
    repoRootDir: string,
    worktreePath?: string
  ): Promise<string> {
    const sections: string[] = []

    // 1. Canonical prompt — workflow picks the path per item (e.g. light vs heavy).
    const promptFile = workflow.promptFor(item)
    const promptAbs = path.join(repoRootDir, promptFile)

    if (existsSync(promptAbs)) {
      sections.push(
        `# ${workflow.displayName} — canonical prompt (${promptFile})\n\n` +
          (await fs.readFile(promptAbs, 'utf8'))
      )
    } else {
      sections.push(
        `# ${workflow.displayName} — canonical prompt (MISSING: ${promptFile})\n\n` +
          `_Workflow's promptFor(item) returned a path that does not exist on disk. ` +
          `The agent runs without the canonical prompt body — this should be flagged in the gate report._`
      )
    }

    // 2. Always-on context pack (rule docs, references).
    for (const file of workflow.contextPack) {
      const abs = path.join(repoRootDir, file)

      if (existsSync(abs)) {
        sections.push(`# ${file}\n\n${await fs.readFile(abs, 'utf8')}`)
      }
    }

    // 3. Per-item plan.
    const planPath = path.join(repoRootDir, workflow.perItemPlan(item.id))

    if (existsSync(planPath)) {
      sections.push(
        `# Per-item plan: ${item.id}\n\n${await fs.readFile(planPath, 'utf8')}`
      )
    }

    // 4. Tier-aware extras (complexityFor decides depth).
    const complexity = workflow.complexityFor(item)

    if (complexity >= 2) {
      // Include subagent playbook for compound work.
      const sp = path.join(
        repoRootDir,
        'docs/migration/references/subagent-playbook.md'
      )

      if (existsSync(sp)) {
        sections.push(
          `# references/subagent-playbook.md\n\n${await fs.readFile(sp, 'utf8')}`
        )
      }
    }

    // 5. Iteration feedback (gate report from the previous run).
    if (iteration > 0 && feedback) {
      sections.push(
        `# Previous iteration feedback (iteration ${iteration})\n\n` +
          `The previous attempt failed. Apply the fixes implied by this report:\n\n${feedback}`
      )
    }

    // 5b. Accumulated diff so far — Tier 1.1.
    // On iter 2+, run `git diff` inside the worktree to show all accumulated
    // edits from prior iterations. The worktree's HEAD is the pre-iteration
    // baseline (orchestrator commits only after gates pass). Truncate if huge
    // to avoid context bloat.
    if (iteration > 0 && worktreePath) {
      const stat = await shell('git', ['diff', '--stat'], { cwd: worktreePath })
      const patch = await shell('git', ['diff'], { cwd: worktreePath })

      if (stat.exitCode === 0 && patch.exitCode === 0 && stat.stdout.trim()) {
        const MAX_PATCH_BYTES = 50_000
        const truncated = patch.stdout.length > MAX_PATCH_BYTES
        const patchBody = truncated
          ? patch.stdout.slice(0, MAX_PATCH_BYTES) +
            `\n\n[truncated; full patch is ${patch.stdout.length} bytes — view via \`git diff\` in the worktree]`
          : patch.stdout

        sections.push(
          `# Your diff so far (accumulated across ${iteration} prior iteration${iteration === 1 ? '' : 's'})\n\n` +
            `Stats:\n\n\`\`\`\n${stat.stdout}\n\`\`\`\n\n` +
            `Full patch:\n\n\`\`\`diff\n${patchBody}\n\`\`\`\n\n` +
            `This is what you've already changed. Don't repeat or undo edits unless the gate report explicitly says they're wrong. Build on this state.`
        )
      }
    }

    // 6. The item itself.
    sections.push(
      `# Item to migrate\n\n` +
        `Package directory: \`${item.package}\`\n` +
        `Manifest ID: \`${item.id}\`\n` +
        `Tier: ${item.tier}\n`
    )

    return sections.join('\n\n---\n\n')
  },

  /**
   * Build a delta-only prompt for iter 2+ when session resume is in use.
   * Claude keeps the iter-1 canonical prompt + rules + per-item plan in
   * conversation memory; the orchestrator only needs to send the gate
   * feedback + accumulated diff. Tier 2.1 of post-canary-15 plan.
   */
  async assembleDeltaPrompt(
    iteration: number,
    feedback: string | null,
    worktreePath: string
  ): Promise<string> {
    const sections: string[] = []

    sections.push(
      `# Iteration ${iteration + 1} feedback\n\n` +
        `The orchestrator ran the gate on your previous iteration. Failures:\n\n` +
        (feedback ?? '_(no feedback available)_')
    )

    const stat = await shell('git', ['diff', '--stat'], { cwd: worktreePath })
    const patch = await shell('git', ['diff'], { cwd: worktreePath })

    if (stat.exitCode === 0 && patch.exitCode === 0 && stat.stdout.trim()) {
      const MAX_PATCH_BYTES = 50_000
      const patchBody = patch.stdout.length > MAX_PATCH_BYTES
        ? patch.stdout.slice(0, MAX_PATCH_BYTES) +
          `\n\n[truncated; full patch is ${patch.stdout.length} bytes — view via \`git diff\` in the worktree]`
        : patch.stdout

      sections.push(
        `# Your accumulated diff so far\n\n` +
          `Stats:\n\n\`\`\`\n${stat.stdout}\n\`\`\`\n\n` +
          `Full patch:\n\n\`\`\`diff\n${patchBody}\n\`\`\``
      )
    }

    sections.push(
      `# What to do\n\n` +
        `Apply the fixes implied by the gate report. **Before exiting, you MUST run these self-verification commands and confirm each exits 0:**\n\n` +
        `1. \`yarn davinci-syntax lint code packages/base/<NAME>/src\` — auto-fix mode (no --check). Resolves padding/blank-line/import-order rules automatically.\n` +
        `2. \`yarn davinci-syntax lint code --check packages/base/<NAME>/src\` — verify zero errors remain. If non-zero, read the actual error rule name and fix manually.\n` +
        `3. \`yarn workspace @toptal/picasso-<NAME> build:package\` — confirm types still compile.\n\n` +
        `**Do not exit if step 2 reports any error.** Iterate locally until the scoped lint passes. The orchestrator's outer-loop gate runs the same scoped lint command — if you exit before lint passes, the gate fails identically and you've wasted an iteration.\n\n` +
        `If you see a "padding-line-between-statements" or similar formatting error, step 1's auto-fix resolves it. Don't try to manually re-jig type imports — those aren't the cause.\n\n` +
        `Don't fall back to \`any\` to placate lint warnings — preserve the public type and cast at the call site instead (per rules/api-preservation.md).`
    )

    return sections.join('\n\n---\n\n')
  },

  /** Invoke the agent. Captures the conversation; returns exit status. */
  async invoke(
    inv: AgentInvocation,
    logPath: string
  ): Promise<{ exitCode: number }> {
    const cmd = ((): { bin: string; args: string[] } => {
      switch (inv.agent) {
        case 'claude': {
          // `claude -p` reads prompt from stdin and runs non-interactively.
          // `--allowedTools` is a curated allowlist matching Picasso's gate
          // stages plus read-only git inspection. Rationale (per the PR #4906
          // comparison documented in `docs/migration/components/Button.md`):
          //
          //   - File ops (Edit/Write/Read/Glob/Grep): the agent edits source.
          //   - Bash(yarn typecheck...) / Bash(yarn workspace:*) / etc.: the
          //     agent verifies its own work between edits within a single
          //     `claude -p` session. Without these, the agent edits blind
          //     and depends on the orchestrator's outer-loop gate (~90s/cycle)
          //     for feedback. With them the agent runs typecheck → reads the
          //     error → edits → re-runs typecheck within seconds, mirroring
          //     how a human dev iterates.
          //
          // ALLOWED for dep management (since 2026-05-07 — see PR #4940
          // post-mortem):
          //   - Bash(yarn install): when the agent edits a package.json's
          //     dependencies, it must refresh yarn.lock so CI's "Build
          //     packages" step can resolve the new dep. Previously excluded
          //     under "orchestrator owns dep management", but the new
          //     `lockfile-drift` gate stage made that ownership untenable —
          //     the agent edits package.json, the agent must update the lock.
          //
          // EXCLUDED on purpose:
          //   - Bash(yarn add): orchestrator avoids ad-hoc adds; package.json
          //     edits are explicit. The agent uses Edit on package.json, not
          //     `yarn add`, so the dep set stays auditable in the diff.
          //   - Bash(git commit | push): orchestrator owns commit lifecycle
          //     (Fix G `--no-verify` lives at the orchestrator layer).
          //   - Bash(gh:*): orchestrator owns PR lifecycle.
          //   - bare Bash(*) / --dangerously-skip-permissions: too broad for
          //     non-Docker host runs. Worktree provides physical isolation
          //     for state mutations; this allowlist provides the verification
          //     surface the agent needs without unbounded shell.
          //
          // When `inv.withMcp === true`, also pass `--mcp-config` and grant
          // Playwright MCP tools. Caller is responsible for Storybook lifecycle.
          const baseTools = [
            'Edit',
            'Write',
            'Read',
            'Glob',
            'Grep',
            // Self-verification: yarn build / typecheck / lint / unit / cypress / happo
            'Bash(yarn typecheck)',
            'Bash(yarn typecheck:*)',
            'Bash(yarn lint:*)',
            'Bash(yarn workspace:*)',
            'Bash(yarn workspaces info)',
            'Bash(yarn davinci-qa:*)',
            'Bash(yarn build:package)',
            'Bash(yarn cypress:*)',
            'Bash(yarn test:integration:*)',
            'Bash(yarn happo:*)',
            // Lockfile maintenance — required when agent edits package.json deps
            'Bash(yarn install)',
            'Bash(yarn install:*)',
            // Live npm-registry lookups for "what does package X export at v Y"
            'Bash(yarn info:*)',
            'Bash(npm view:*)',
            // Read-only git inspection (diff/status/log/show/blame)
            'Bash(git diff:*)',
            'Bash(git status:*)',
            'Bash(git log:*)',
            'Bash(git show:*)',
            'Bash(git blame:*)',
          ]
          const mcpTools = inv.withMcp
            ? [
                'mcp__playwright__browser_navigate',
                'mcp__playwright__browser_screenshot',
                'mcp__playwright__browser_console_logs',
                'mcp__playwright__browser_click',
                'mcp__playwright__browser_hover',
                'mcp__playwright__browser_evaluate',
                'mcp__playwright__browser_snapshot',
              ]
            : []
          const args = [
            '-p',
            '--allowedTools',
            [...baseTools, ...mcpTools].join(' '),
          ]

          if (inv.withMcp) {
            args.push('--mcp-config', 'bin/lib/agent-mcp-config.json')
          }

          // Session continuity (Tier 2.1). On iter 1, set the session id so
          // claude tags the conversation. On iter 2+, resume it — claude has
          // the full prior message history in context, so the orchestrator
          // sends only the delta (gate report + new diff).
          if (inv.sessionId) {
            if (inv.isFirstIteration) {
              args.push('--session-id', inv.sessionId)
            } else {
              args.push('--resume', inv.sessionId)
            }
          }

          return { bin: 'claude', args }
        }
        case 'cursor':
          // Placeholder — Cursor's CLI shape differs; document and stub.
          return { bin: 'cursor', args: ['agent'] }
        case 'codex':
          return { bin: 'codex', args: ['--non-interactive'] }
      }
    })()

    await fs.writeFile(logPath, `# prompt\n${inv.prompt}\n\n# stdout\n`, 'utf8')

    return new Promise((resolve) => {
      const child = spawn(cmd.bin, cmd.args, {
        cwd: inv.cwd,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: process.env,
      })

      child.stdin?.write(inv.prompt)
      child.stdin?.end()

      // Visibility: track per-tool-call activity so the orchestrator can
      // surface "agent is doing X right now" in heartbeat ticks. We parse
      // claude's stream-json output for `tool_use` events, but also fall
      // back to a regex scan of textual content for unrecognised shapes.
      let lastTool = '(thinking)'
      let lastActivityAt = Date.now()
      let bytesWritten = 0
      const tag = (() => {
        // Derive a short tag like "agent.1" / "agent.2" from the log path.
        const m = /agent\.(\d+)\.log$/.exec(logPath)

        return m ? `agent.${m[1]}` : 'agent'
      })()
      let toolCallCount = 0
      const detectTool = (chunk: string): void => {
        // claude stream-json emits one JSON object per line. Cheap path:
        // just regex for `"name":"<Tool>"` near `"type":"tool_use"`. We also
        // try to extract a single-line summary of the tool's input (e.g.
        // file_path for Edit/Read, or the first ~80 chars of a Bash command)
        // so the operator sees what's actually happening.
        const matches = chunk.matchAll(/"type"\s*:\s*"tool_use"[^}]*?"name"\s*:\s*"([^"]+)"[^}]*?"input"\s*:\s*\{([^}]{0,400})/g)

        for (const m of matches) {
          const name = m[1] ?? '?'
          const inputBlob = m[2] ?? ''
          // Common shapes: file_path / path / command / pattern / query.
          const fp = /"file_path"\s*:\s*"([^"]+)"/.exec(inputBlob)?.[1]
            ?? /"path"\s*:\s*"([^"]+)"/.exec(inputBlob)?.[1]
          const cmd = /"command"\s*:\s*"([^"]+)"/.exec(inputBlob)?.[1]
          const pattern = /"pattern"\s*:\s*"([^"]+)"/.exec(inputBlob)?.[1]
          const summary = fp ?? cmd ?? pattern ?? ''
          const trimmed = summary.length > 80 ? summary.slice(0, 77) + '...' : summary
          const display = trimmed ? `${name} ${trimmed}` : name

          lastTool = display
          toolCallCount += 1
          // Announce inline so operator sees activity in real time.
          log(tag, `tool_use[${toolCallCount}]: ${display}`)
        }
      }

      child.stdout?.on('data', (d: Buffer) => {
        require('node:fs').appendFileSync(logPath, d)
        bytesWritten += d.length
        lastActivityAt = Date.now()
        detectTool(d.toString('utf8'))
      })
      child.stderr?.on('data', (d: Buffer) => {
        require('node:fs').appendFileSync(logPath, `[stderr] ${d}`)
        bytesWritten += d.length
        lastActivityAt = Date.now()
      })

      // Heartbeat tick every 30s — log progress to orchestrator stderr so
      // the operator sees "agent is alive" without tailing the log file.
      // Stuck detection: if no log growth for >120s, escalate the warning.
      const startedAt = Date.now()
      const heartbeat = setInterval(() => {
        const elapsed = Math.round((Date.now() - startedAt) / 1000)
        const idle = Math.round((Date.now() - lastActivityAt) / 1000)
        const kb = (bytesWritten / 1024).toFixed(1)
        const stuck = idle > 120 ? ` ⚠️  no progress ${idle}s` : ''

        log(tag, `alive (${elapsed}s elapsed, ${kb}KB written, last tool: ${lastTool})${stuck}`)
      }, 30_000)

      const cleanup = () => clearInterval(heartbeat)

      child.on('close', (code) => {
        cleanup()
        resolve({ exitCode: code ?? 1 })
      })
      child.on('error', (err) => {
        cleanup()
        require('node:fs').appendFileSync(logPath, `[spawn-error] ${err}\n`)
        resolve({ exitCode: 127 })
      })
    })
  },
}

// ---------------------------------------------------------------------------
// lessons (Tier 1.3: auto-accumulate migration patterns across components)
// ---------------------------------------------------------------------------

const lessons = {
  /**
   * After a successful migration (PR open), spawn a tiny claude subprocess to
   * extract 2–3 reusable patterns from the agent's diff and append them to
   * `docs/migration/references/lessons-learned.md`. Subsequent migrations
   * include that file in their context pack and inherit the patterns.
   *
   * Failures here are non-fatal — a missed lesson doesn't block the PR.
   */
  async append(
    workflow: Workflow,
    item: ManifestItem,
    prUrl: string,
    iterations: number,
    worktreePath: string,
    rootDir: string
  ): Promise<void> {
    const lessonsAbs = path.join(rootDir, 'docs/migration/references/lessons-learned.md')

    if (!existsSync(lessonsAbs)) {
      log('lessons', `lessons file missing at ${lessonsAbs}; skipping append`)

      return
    }

    // Capture the agent's diff (vs worktree HEAD's pre-iteration baseline).
    const diffResult = await shell('git', ['diff', 'HEAD~1', 'HEAD'], { cwd: worktreePath })
    const diffBody = diffResult.stdout.length > 30_000
      ? diffResult.stdout.slice(0, 30_000) + '\n[truncated]'
      : diffResult.stdout

    if (!diffBody.trim()) {
      log('lessons', 'no diff to summarize; skipping')

      return
    }

    // Cheap claude call to extract patterns.
    //
    // IMPORTANT: lessons must be merge-quality, not first-pass. The PR is open
    // but not yet reviewed; reviewers may request changes that invalidate
    // patterns the agent applied. Prefer pointer-style entries ("see <doc>
    // §X for the canonical pattern") over prescriptive how-to lines that bake
    // in a soon-to-be-regretted choice. Do NOT include patterns about:
    //   - runtime `typeof`/`isValidAs` guards (canonical: api-crib §"Don't add runtime typeof guards")
    //   - call-site type casts (canonical: api-crib §"Type alignment at the boundary")
    //   - any pattern already documented in rules/* — point to the rule instead.
    const extractPrompt =
      `Below is the diff that opened a PR migrating component "${item.id}" to ${item.target_path ?? 'a new stack'}. ` +
      `The PR is OPEN and not yet reviewed — patterns may change in review. ` +
      `Extract 2–3 patterns that future migrations of OTHER components should reuse. ` +
      `Prefer merge-quality, durable patterns. Avoid prescribing patterns that ` +
      `human reviewers commonly trim (runtime type guards, sprinkled inline casts) — ` +
      `if the pattern is already in rules/base-ui-react-api-crib.md or rules/api-preservation.md, ` +
      `point to the doc section instead of restating the how-to. ` +
      `Output: exactly 2–3 markdown bullet lines, each prefixed with "- " and ≤1 sentence. ` +
      `No preamble, no closing remarks, no "Pattern A:" labels.\n\n` +
      `\`\`\`diff\n${diffBody}\n\`\`\``

    const child = spawn('claude', ['-p', '--allowedTools', 'Read'], {
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: process.env,
    })

    let bullets = ''

    child.stdin?.write(extractPrompt)
    child.stdin?.end()
    child.stdout?.on('data', (chunk) => {
      bullets += chunk
    })

    const exitCode: number = await new Promise((resolve) => {
      child.on('close', (code) => resolve(code ?? 1))
      child.on('error', () => resolve(127))
    })

    if (exitCode !== 0 || !bullets.trim()) {
      log('lessons', `extraction failed (exit ${exitCode}); skipping append`)

      return
    }

    const date = TODAY()
    const entry =
      `\n## ${item.id} — ${date}\n\n` +
      `- Tier ${item.tier} · target_path: \`${item.target_path ?? 'none'}\` · iterations: ${iterations}\n` +
      bullets.trim() + '\n' +
      `- Reference: ${prUrl}\n`

    await fs.appendFile(lessonsAbs, entry, 'utf8')
    log('lessons', `appended ${item.id} entry to ${lessonsAbs}`)
  },
}

// ---------------------------------------------------------------------------
// loop
// ---------------------------------------------------------------------------

interface RunResult {
  status: 'pr-opened' | 'merged' | 'escalated' | 'dry-run' | 'no-work'
  prUrl?: string
  reason?: string
}

async function escalate(
  workflow: Workflow,
  item: ManifestItem,
  state: RunState,
  decision: EscalationDecision,
  manifestPath: string,
  rootDir: string
): Promise<RunResult> {
  const reason = decision.reason ?? 'unspecified'

  log('escalate', `${item.id}: ${reason}`)
  manifest.update(manifestPath, item.id, {
    status: 'needs_human',
    escalation_reason: reason,
    iterations: state.iterations,
  })

  // Emit an escalation block to the run dir.
  const escPath = path.join(
    rootDir,
    'migration-runs',
    TODAY(),
    item.id,
    'escalation.md'
  )
  const block = [
    `# 🛑 Orchestrator escalation — \`${item.id}\``,
    '',
    `**Trigger:** ${reason}`,
    `**Iterations:** ${state.iterations} / 3`,
    `**PR:** ${item.pr ?? '(not opened)'}`,
    `**Worktree:** \`${item.worktree ?? '(removed)'}\``,
    `**Last gate report:** \`${state.lastGate?.reportPath ?? '(none)'}\``,
    '',
    'See `docs/migration/references/escalation.md` for the full handoff procedure.',
    '',
  ].join('\n')

  await fs.writeFile(escPath, block, 'utf8')

  if (item.pr) {
    try {
      await gh.commentPR(item.pr, block, rootDir)
    } catch (e) {
      log('escalate', `gh pr comment failed (non-fatal): ${(e as Error).message}`)
    }
  }

  return { status: 'escalated', reason }
}

// ---------------------------------------------------------------------------
// Phase 3.5 — per-item file locks
// ---------------------------------------------------------------------------
//
// Prevents concurrent modes from clobbering an item's worktree / branch.
// Lock = sentinel file at `migration-runs/.locks/<id>`. Acquired by both
// migrate-mode and review-sweep. Stale-lock detection: if the file's
// pid is no longer alive, take it over (covers crashed runs).

const lockDir = (rootDir: string): string =>
  path.join(rootDir, 'migration-runs', '.locks')

async function acquireLock(rootDir: string, id: string): Promise<boolean> {
  const dir = lockDir(rootDir)

  await fs.mkdir(dir, { recursive: true })
  const lockPath = path.join(dir, id.replace(/\//g, '__'))

  if (existsSync(lockPath)) {
    // Check pid liveness; if dead, take it over.
    const pidStr = await fs.readFile(lockPath, 'utf8').catch(() => '')
    const pid = Number(pidStr.trim())

    if (!pid) {return false}
    try {
      process.kill(pid, 0) // signal 0 = liveness probe

      return false // alive → can't take it
    } catch {
      // Dead → take it over.
      log('lock', `stale lock for ${id} (pid ${pid}); taking over`)
    }
  }
  await fs.writeFile(lockPath, String(process.pid), 'utf8')

  return true
}

async function releaseLock(rootDir: string, id: string): Promise<void> {
  const lockPath = path.join(lockDir(rootDir), id.replace(/\//g, '__'))

  await fs.unlink(lockPath).catch(() => {})
}

// ---------------------------------------------------------------------------
// runBatch — process every queued item in the selected tier sequentially
// ---------------------------------------------------------------------------

export async function runBatch(
  workflow: Workflow,
  opts: OrchestratorOptions
): Promise<RunResult> {
  let processed = 0
  let lastResult: RunResult = { status: 'no-work' }
  // Bound the batch to manifest size; the no-work + escalate paths
  // already terminate normally, but a hard cap prevents accidental
  // infinite loops if pickNext somehow keeps returning the same item.
  // Operator-supplied `--max-items=N` overrides the safety cap downward.
  const safetyCap = 100
  const userCap = opts.maxItems ?? Infinity
  const maxIterations = Math.min(safetyCap, userCap)

  for (let i = 0; i < maxIterations; i++) {
    const result = await run(workflow, opts)

    lastResult = result
    if (result.status === 'no-work') {
      log('batch', `done — processed ${processed} items in this batch`)
      break
    }
    processed += 1
    log(
      'batch',
      `[${processed}] ${result.status}${result.prUrl ? ` ${result.prUrl}` : ''}${result.reason ? ` (${result.reason})` : ''}`
    )
    // Continue to next item even on escalate (operator can review later).
    // Stop only on dry-run (which never produces no-work).
    if (result.status === 'dry-run') {break}
  }
  if (opts.maxItems !== null && processed >= opts.maxItems) {
    log(
      'batch',
      `--max-items=${opts.maxItems} cap reached after ${processed} item(s); stopping`
    )
  }

  return lastResult
}

// ---------------------------------------------------------------------------
// runReviewSweep — async review processor (Phase 3.5 redesign)
// ---------------------------------------------------------------------------

export async function runReviewSweep(
  workflow: Workflow,
  opts: OrchestratorOptions
): Promise<RunResult> {
  const rootDir = repoRoot()
  const manifestAbs = path.join(rootDir, workflow.manifestPath)

  if (!existsSync(manifestAbs)) {
    throw new Error(`Manifest not found at ${manifestAbs}`)
  }
  await gh.assertAuth()
  await loadEnvrcUpwards(rootDir)

  const m = manifest.read(manifestAbs)
  // Sweep candidates: any item that's been pushed to GitHub and could
  // have a state change. ready_to_merge items are included so the
  // operator's manual merge is detected on the next sweep tick (Tier
  // 2.4: post-merge reference populate).
  const candidates = Object.values(m.components).filter(
    (i) =>
      (i.status === 'awaiting_review' || i.status === 'ready_to_merge') &&
      i.pr &&
      i.branch &&
      i.worktree
  )

  if (candidates.length === 0) {
    log('sweep', 'no items in awaiting_review state — nothing to sweep')

    return { status: 'no-work' }
  }

  log('sweep', `${candidates.length} item(s) in awaiting_review`)
  let processed = 0

  for (const item of candidates) {
    if (!(await acquireLock(rootDir, item.id))) {
      log('sweep', `${item.id}: skip (locked by another run)`)
      continue
    }

    try {
      await sweepOne(workflow, opts, item, manifestAbs, rootDir)
      processed += 1
    } catch (err) {
      log('sweep', `${item.id}: error: ${(err as Error).message}`)
    } finally {
      await releaseLock(rootDir, item.id)
    }
  }
  log('sweep', `done — processed ${processed}/${candidates.length}`)

  return { status: 'no-work' }
}

async function sweepOne(
  workflow: Workflow,
  opts: OrchestratorOptions,
  item: ManifestItem,
  manifestAbs: string,
  rootDir: string
): Promise<void> {
  const wtPath = path.join(rootDir, item.worktree as string)
  const prUrl = item.pr as string

  // Tier 2.4 — first, check if the operator already merged the PR.
  // If yes, transition to done + run post-merge hook (reference copy)
  // and skip review processing for this sweep tick.
  const prState = (await gh.viewPR(prUrl, 'state,mergedAt', wtPath).catch(() => null)) as
    | { state?: string; mergedAt?: string | null }
    | null

  if (prState?.state === 'MERGED') {
    manifest.update(manifestAbs, item.id, {
      status: 'done',
      merged_at: prState.mergedAt ?? ISO(),
    })
    log('sweep', `${item.id}: PR merged — status=done`)
    if (workflow.onPostMerge) {
      try {
        await workflow.onPostMerge(item, rootDir)
      } catch (err) {
        log('sweep', `${item.id}: onPostMerge hook failed (non-fatal): ${(err as Error).message}`)
      }
    }

    return
  }

  if (prState?.state === 'CLOSED') {
    // PR closed without merge — operator decided not to ship. Mark
    // blocked so subsequent sweeps don't keep checking.
    manifest.update(manifestAbs, item.id, {
      status: 'blocked',
      escalation_reason: 'PR closed without merge',
    })
    log('sweep', `${item.id}: PR closed without merge — status=blocked`)

    return
  }

  // PR is still open. ready_to_merge items just keep waiting; nothing
  // for sweep to do beyond merge-detection (operator merges manually
  // per their preference).
  if (item.status === 'ready_to_merge') {
    log('sweep', `${item.id}: ready_to_merge, awaiting operator merge`)

    return
  }

  // (Tier 2 batch B Slice 4 — sweep-driven Happo-only-flake retry —
  // removed as part of v4 Step 4. Strict Happo gate at gate-time now
  // enforces zero-diff or designer-accepted via the Happo REST API
  // BEFORE the orchestrator opens a PR; flake retries are unnecessary.)

  // Worktree must still exist for review-driven iteration; if not,
  // escalate (extending sweep to re-create worktrees is out of scope
  // for the first cut — operator can manually re-create or run migrate
  // again).
  if (!existsSync(wtPath)) {
    manifest.update(manifestAbs, item.id, {
      status: 'needs_human',
      escalation_reason: `worktree missing at ${item.worktree}; sweep cannot iterate`,
    })
    log('sweep', `${item.id}: worktree missing; escalated`)

    return
  }

  // Fetch reviews. Filter to those newer than last_review_seen_at via
  // each review's `submittedAt` / `createdAt` ISO timestamp (now exposed
  // by gh.fetchReviews). On the first sweep tick (no marker), all
  // reviews are processed.
  const allReviews = await gh.fetchReviews(prUrl, wtPath)
  const since = item.last_review_seen_at
    ? Date.parse(item.last_review_seen_at)
    : 0
  const newReviews = allReviews.filter((r) => {
    if (!r.at) {return true} // missing timestamp → process (safe default)
    const t = Date.parse(r.at)

    return Number.isNaN(t) ? true : t > since
  })

  if (newReviews.length === 0) {
    log(
      'sweep',
      `${item.id}: ${allReviews.length} review(s) total, 0 newer than ${item.last_review_seen_at ?? 'never'}`
    )

    return
  }

  const classifications = newReviews.map((r) => classifyReview(r))

  classifications.forEach((c, i) =>
    log(
      'sweep',
      `${item.id}: [${i}] by ${newReviews[i].author || '?'}: ${c.class} (conf=${c.confidence.toFixed(2)}, ${c.reason})`
    )
  )

  const decision = aggregateReviewDecisions(classifications)

  log('sweep', `${item.id}: aggregated → ${decision.action}`)

  const nowIso = ISO()

  if (decision.action === 'escalate') {
    manifest.update(manifestAbs, item.id, {
      status: 'needs_human',
      escalation_reason: `review: ${decision.reason}`,
      last_review_seen_at: nowIso,
    })

    return
  }

  if (decision.action === 'merge') {
    // Operator preference: never auto-merge. Mark ready and stop.
    manifest.update(manifestAbs, item.id, {
      status: 'ready_to_merge',
      last_review_seen_at: nowIso,
    })
    log('sweep', `${item.id}: ready_to_merge (${decision.approvals} approval(s)); operator merges manually`)

    return
  }

  // decision.action === 'iterate'
  log('sweep', `${item.id}: iterating on ${decision.nits.length} nit(s)`)
  const reviewIters = (item.review_iterations ?? 0) + 1
  const nitFeedback =
    '# PR review nits — please address\n\n' +
    decision.nits
      .map((n, idx) => {
        const review = newReviews.find(
          (_, i) => classifications[i] === n
        )

        return (
          `## Nit ${idx + 1} (by ${review?.author || '?'})\n\n` +
          `Confidence: ${n.confidence.toFixed(2)} (${n.reason})\n\n` +
          `Body:\n${review?.body ?? '(unknown)'}\n`
        )
      })
      .join('\n')
  // Resume agent session if we have one stored; else fresh session.
  const sessionId = item.session_id ?? randomUUID()
  const isFirstIteration = !item.session_id
  const reviewPrompt = await agent.assembleDeltaPrompt(
    reviewIters - 1,
    nitFeedback,
    wtPath
  )
  const runDir = path.dirname(wtPath)
  const promptPath = path.join(runDir, `prompt.review-${reviewIters}.txt`)

  await fs.writeFile(promptPath, reviewPrompt, 'utf8')
  const agentLogPath = path.join(runDir, `agent.review-${reviewIters}.log`)
  const agentResult = await agent.invoke(
    {
      prompt: reviewPrompt,
      cwd: wtPath,
      agent: opts.agent,
      withMcp: opts.withMcp,
      sessionId,
      isFirstIteration,
    },
    agentLogPath
  )

  // Slice 3 — token snapshot for the sweep iteration's agent call.
  // We use a synthetic iteration number (review-iter offset by 1000)
  // so cost.json's snapshot list distinguishes inner-loop iters from
  // review-driven iters.
  await recordTokenSnapshot(
    runDir,
    item.id,
    sessionId,
    1000 + reviewIters,
    wtPath
  )

  if (agentResult.exitCode !== 0) {
    const noProgressReason = await detectNoProgressFailure(agentLogPath)

    manifest.update(manifestAbs, item.id, {
      status: 'needs_human',
      escalation_reason: noProgressReason
        ? `review-iter agent ${noProgressReason}`
        : `review-iter agent exited ${agentResult.exitCode}`,
      last_review_seen_at: nowIso,
    })

    return
  }

  // Sanity gate.
  const runDate = TODAY()
  const gateReport = await gate.run(
    workflow.gate(item.id),
    item.id,
    wtPath,
    runDate
  )

  if (!workflow.successCriteria(gateReport)) {
    log(
      'sweep',
      `${item.id}: local gate not green after nit fix; pushing anyway, CI will surface`
    )
  }

  // Commit + push.
  const reviewCommitMsg =
    workflow.commitMessage(item.id, item) +
    `\n\n[review-iter ${reviewIters}] address ${decision.nits.length} nit(s)`
  const reviewCommitMsgFile = path.join(
    os.tmpdir(),
    `commit-msg-${item.id.replace(/\//g, '__')}.review.${reviewIters}.${process.pid}`
  )

  await fs.writeFile(reviewCommitMsgFile, reviewCommitMsg, 'utf8')
  await shell('git', ['add', '-A'], { cwd: wtPath })
  const commitResult = await shell(
    'git',
    ['commit', '--no-verify', '--file', reviewCommitMsgFile],
    { cwd: wtPath }
  )

  if (commitResult.exitCode === 0) {
    const pushResult = await shell(
      'git',
      ['push', '--no-verify', 'origin', item.branch as string],
      { cwd: wtPath }
    )

    if (pushResult.exitCode !== 0) {
      manifest.update(manifestAbs, item.id, {
        status: 'needs_human',
        escalation_reason: `review-iter push failed: ${pushResult.stderr}`,
        last_review_seen_at: nowIso,
      })

      return
    }
    log('sweep', `${item.id}: pushed nit fixes; CI will re-evaluate; status remains awaiting_review`)
  } else {
    log('sweep', `${item.id}: agent made no committable changes; staying in awaiting_review`)
  }

  // Persist iteration state. Status remains awaiting_review — next sweep
  // checks for fresh reviews after CI re-runs.
  manifest.update(manifestAbs, item.id, {
    review_iterations: reviewIters,
    last_review_seen_at: nowIso,
    session_id: sessionId,
  })
}

export async function run(
  workflow: Workflow,
  opts: OrchestratorOptions
): Promise<RunResult> {
  const rootDir = repoRoot()
  const manifestAbs = path.join(rootDir, workflow.manifestPath)

  if (!existsSync(manifestAbs)) {
    throw new Error(`Manifest not found at ${manifestAbs}`)
  }

  if (!opts.dryRun) {await gh.assertAuth()}

  // Phase 3 — auto-load .envrc when running outside an interactive direnv-
  // hooked shell. Lets local Happo (HAPPO_API_KEY/SECRET) fire correctly
  // for canaries launched from CI/automation/LLM tools instead of silently
  // skipping. No-op when vars already set.
  const injected = await loadEnvrcUpwards(rootDir)

  if (injected.length > 0) {
    log(
      'env',
      `loaded from .envrc: ${injected.sort().join(', ')} (use direnv hook to skip this)`
    )
  }

  const m = manifest.read(manifestAbs)
  const item = manifest.pickNext(m, opts)

  if (!item) {
    log('loop', 'no queued items match selection criteria')

    return { status: 'no-work' }
  }

  log(
    'loop',
    `selected: ${item.id} (tier=${item.tier}, status=${item.status}, package=${item.package})`
  )

  // Phase 3.5 — per-item lock against concurrent --review-sweep / batch.
  // Skipped on dry-run since dry-run doesn't mutate state.
  if (!opts.dryRun) {
    if (!(await acquireLock(rootDir, item.id))) {
      log(
        'loop',
        `${item.id} locked by another orchestrator run; skipping`
      )

      return { status: 'no-work' }
    }
  }

  if (opts.dryRun) {
    log('loop', '--dry-run: planned 14 steps follow:')
    const planned = [
      `1. Verify deps merged for: ${item.depends_on.join(', ') || '(none)'}`,
      `2. git worktree add ${worktree.pathFor(item.id, TODAY())} -b ${opts.branch ?? workflow.branchName(item.id)}${opts.branch ? ' (--branch override)' : ''}`,
      `3. Snapshot pre-state: ${workflow.diff(item.id, 'snapshot')}`,
      `4. Update manifest: status=in_progress`,
      ...(opts.withMcp
        ? [`4b. Start Storybook in worktree; wait for http://localhost:9001 ready`]
        : []),
      `5. Assemble prompt (path=${workflow.promptFor(item)}, complexity=${workflow.complexityFor(item)}, agent=${opts.agent}${opts.withMcp ? ' +mcp' : ''})`,
      `6. Invoke ${opts.agent}; iteration cap=${opts.maxIterations}; allowedTools=Edit Write Read Glob Grep + Bash(yarn ...)${opts.withMcp ? ' + mcp__playwright__*' : ''}`,
      `7. Run gate: ${workflow.gate(item.id)}`,
      `8. On gate fail: feed report back, retry up to cap`,
      `9. On gate pass: produce diff via ${workflow.diff(item.id, 'report')}`,
      `10. git commit -m "${workflow.commitMessage(item.id, item).split('\n')[0]}"; git push`,
      `11. gh pr create --title "${workflow.prTitle(item.id, item)}" --base ${workflow.baseBranch}${workflow.assignees.length ? ` --assignee ${workflow.assignees.join(',')}` : ''}`,
      ...(opts.ciTimeoutMinutes > 0
        ? [
            `12. Poll CI on PR; timeout=${opts.ciTimeoutMinutes}min, interval=30s; on failure escalate (Phase 3.2/3.3 will iterate)`,
          ]
        : [`12. CI poll skipped (--ci-timeout-minutes=0)`]),
      ...(((): string[] => {
        const rt = opts.reviewTimeoutMinutes ?? workflow.reviewTimeoutMinutes
        const rtMsg = rt > 0
          ? `13a. CI green → poll reviews up to ${rt}min; classify each (LGTM/nit/architectural/question/unclear); aggregate → merge / iterate-on-nits / escalate`
          : `13a. CI green → review polling skipped (--review-timeout-minutes=0)`

        return [rtMsg]
      })()),
      opts.noMerge
        ? `13b. (--no-merge: stop on green or escalate on fail)`
        : `13b. On final green: gh pr merge --auto --squash --delete-branch`,
      `14. On any escalation trigger: status=needs_human, post block, stop`,
    ]

    planned.forEach((p) => log('loop', p))

    return { status: 'dry-run' }
  }

  // Real run.
  const runDate = TODAY()
  const branch = opts.branch ?? workflow.branchName(item.id)
  const wtPath = path.join(rootDir, worktree.pathFor(item.id, runDate))
  const runDir = path.dirname(wtPath)

  await fs.mkdir(runDir, { recursive: true })

  // Step 4: worktree.
  log('loop', `creating worktree at ${wtPath}`)
  await worktree.add(branch, wtPath)

  // Step 4b (Phase 2.5 fix): for source-changing migrations, overlay
  // node_modules/@toptal/<migrating> to point at the worktree's own source.
  // See worktree.overlayWorkspaceForSourceChange JSDoc for context.
  // We always run this — for cleanup-only migrations (target_path === 'none')
  // the worktree source and main source are identical, so the overlay is a
  // ~2-3s no-op behaviorally.
  try {
    const pkgJsonPath = path.join(wtPath, item.package, 'package.json')

    if (existsSync(pkgJsonPath)) {
      const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath, 'utf8')) as {
        name?: string
      }

      if (pkgJson.name?.startsWith('@toptal/')) {
        const shortName = pkgJson.name.slice('@toptal/'.length)

        log(
          'loop',
          `overlaying node_modules/@toptal/${shortName} → worktree source`
        )
        await worktree.overlayWorkspaceForSourceChange(
          wtPath,
          shortName,
          item.package
        )
      }
    }
  } catch (err) {
    log(
      'loop',
      `warn: workspace overlay skipped (${(err as Error).message}); ` +
        `consumer-stage may produce false positives`
    )
  }

  // Step 5: manifest update.
  manifest.update(manifestAbs, item.id, {
    status: 'in_progress',
    branch,
    worktree: path.relative(rootDir, wtPath),
    iterations: 0,
  })

  // Step 3 (early): snapshot pre-state.
  log('loop', `snapshotting pre-state`)
  const snapshotResult = await shellLine(workflow.diff(item.id, 'snapshot'), {
    cwd: wtPath,
    env: { ...process.env, MIGRATION_RUN_DATE: runDate },
  })

  if (snapshotResult.exitCode !== 0) {
    log('loop', `snapshot failed: ${snapshotResult.stderr}`)

    return escalate(
      workflow,
      item,
      {
        item,
        iterations: 0,
        lastGate: null,
        gateHistory: [],
        ciFailures: [],
        architecturalReviews: 0,
        startedAt: ISO(),
      },
      { shouldEscalate: true, reason: 'pre-state snapshot failed' },
      manifestAbs,
      rootDir
    )
  }

  // Optional: start Storybook in the worktree so the agent can use Playwright
  // MCP for visual verification (--with-mcp). Tier 1 cleanup migrations don't
  // need this; Tier 0 / 2 / 3 do (any component where Happo is load-bearing).
  let storybookProc: ReturnType<typeof spawn> | null = null

  if (opts.withMcp) {
    log('loop', 'starting Storybook (--with-mcp); polling http://localhost:9001')
    storybookProc = spawn('yarn', ['start:storybook'], {
      cwd: wtPath,
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
      env: process.env,
    })
    // Ensure Storybook is killed on any orchestrator exit path. Synchronous
    // handler is fine; SIGTERM is fire-and-forget.
    const killStorybook = (): void => {
      if (storybookProc && !storybookProc.killed) {storybookProc.kill('SIGTERM')}
    }

    process.once('exit', killStorybook)
    process.once('SIGINT', () => {
      killStorybook()
      process.exit(130)
    })
    process.once('SIGTERM', () => {
      killStorybook()
      process.exit(143)
    })

    const ready = await waitForUrl('http://localhost:9001', 60_000)

    if (!ready) {
      log('loop', 'Storybook did not become ready within 60s; killing and escalating')
      storybookProc.kill('SIGTERM')

      return escalate(
        workflow,
        item,
        {
          item,
          iterations: 0,
          lastGate: null,
          gateHistory: [],
          ciFailures: [],
          architecturalReviews: 0,
          startedAt: ISO(),
        },
        { shouldEscalate: true, reason: 'Storybook failed to start within 60s' },
        manifestAbs,
        rootDir
      )
    }
    log('loop', 'Storybook ready at http://localhost:9001')
  }

  // Steps 6–9: agent + gate + iterate.
  const state: RunState = {
    item,
    iterations: 0,
    lastGate: null,
    gateHistory: [],
    ciFailures: [],
    architecturalReviews: 0,
    startedAt: ISO(),
  }

  let lastFeedback: string | null = null
  // Session continuity (Tier 2.1) — one UUID per component. Iter 1 tags the
  // session via `--session-id`; iter 2+ resumes via `--resume`, so claude
  // keeps the full canonical-prompt + rules + per-item-plan context from
  // iter 1 in conversation memory and the orchestrator sends only the delta.
  const sessionId = randomUUID()

  await fs.writeFile(
    path.join(runDir, 'session.id'),
    sessionId + '\n',
    'utf8'
  )
  log('loop', `session id: ${sessionId} (iter 1 tags, iter 2+ resumes)`)

  while (state.iterations < opts.maxIterations) {
    state.iterations += 1
    log('loop', `iteration ${state.iterations}/${opts.maxIterations}`)

    // Assemble prompt.
    // Iter 1: full canonical prompt + rules + per-item-plan + tier extras.
    // Iter 2+: delta only (gate feedback + accumulated diff). Claude keeps
    //         the iter-1 context via --resume.
    const prompt = state.iterations === 1
      ? await agent.assemblePrompt(
          workflow,
          item,
          0,
          null,
          rootDir,
          wtPath
        )
      : await agent.assembleDeltaPrompt(
          state.iterations - 1,
          lastFeedback,
          wtPath
        )
    // runDir is already `<repo>/migration-runs/<date>/<itemId>/` (since
    // dirname(wtPath) strips the trailing `worktree`); don't append item.id again.
    const promptPath = path.join(runDir, `prompt.${state.iterations}.txt`)

    await fs.mkdir(path.dirname(promptPath), { recursive: true })
    await fs.writeFile(promptPath, prompt, 'utf8')

    // Invoke agent.
    const agentLogPath = path.join(runDir, `agent.${state.iterations}.log`)

    log(
      'loop',
      `invoking agent (${opts.agent}${opts.withMcp ? ' +mcp' : ''}, ${state.iterations === 1 ? 'session-start' : 'session-resume'}); log=${agentLogPath}`
    )
    const agentResult = await agent.invoke(
      {
        prompt,
        cwd: wtPath,
        agent: opts.agent,
        withMcp: opts.withMcp,
        sessionId,
        isFirstIteration: state.iterations === 1,
      },
      agentLogPath
    )

    // Tier 2 batch B / Slice 3 — token telemetry. Snapshot the session
    // log AFTER every agent.invoke (success or failure) so cost.json
    // tracks the full canary cost including failed iters.
    await recordTokenSnapshot(
      runDir,
      item.id,
      sessionId,
      state.iterations,
      wtPath
    )

    if (agentResult.exitCode !== 0) {
      log('loop', `agent exited non-zero (${agentResult.exitCode})`)

      // Resilience: detect "no progress possible" failures and escalate
      // immediately instead of burning the iteration budget on the same
      // re-failing call. Triggered by canary 25 (PR #4906 spending cap
      // hit at iter 1 → 10 retries × ~6s each → escalation, ~60s wasted).
      // Patterns are matched against the agent log (the CLI tends to emit
      // these to stdout, not stderr).
      const noProgressReason = await detectNoProgressFailure(agentLogPath)

      if (noProgressReason) {
        return escalate(
          workflow,
          item,
          state,
          {
            shouldEscalate: true,
            reason: `agent failure not retry-recoverable: ${noProgressReason}`,
          },
          manifestAbs,
          rootDir
        )
      }

      lastFeedback = `Agent invocation failed (exit ${agentResult.exitCode}). See ${agentLogPath}.`
      continue
    }

    // Run gate.
    const gateReport = await gate.run(
      workflow.gate(item.id),
      item.id,
      wtPath,
      runDate
    )

    state.lastGate = gateReport
    state.gateHistory = [...state.gateHistory, gateReport]
    manifest.update(manifestAbs, item.id, { iterations: state.iterations })

    if (workflow.successCriteria(gateReport)) {
      log('loop', `gates pass on iteration ${state.iterations}`)
      lastFeedback = null
      break
    }

    log('loop', `gate composite=${gateReport.composite}; preparing next iteration`)
    if (existsSync(gateReport.reportPath)) {
      lastFeedback = await fs.readFile(gateReport.reportPath, 'utf8')
    }

    const decision = workflow.escalationCriteria(state)

    if (decision.shouldEscalate) {
      return escalate(workflow, item, state, decision, manifestAbs, rootDir)
    }
  }

  if (!state.lastGate || state.lastGate.composite !== 'PASS') {
    return escalate(
      workflow,
      item,
      state,
      {
        shouldEscalate: true,
        reason: `gate did not pass after ${opts.maxIterations} iterations`,
      },
      manifestAbs,
      rootDir
    )
  }

  // Step 8 (post-pass): produce diff report (the PR body).
  await shellLine(workflow.diff(item.id, 'report'), {
    cwd: wtPath,
    env: { ...process.env, MIGRATION_RUN_DATE: runDate },
  })

  // Step 10: commit + push.
  // `--no-verify` skips Husky pre-commit hooks. Rationale:
  //   1. The orchestrator's gate stage already runs lint, jest, tsc, build,
  //      cypress, happo — which is a strict superset of what the pre-commit
  //      hook does (lint-staged, syncpack, check:icon-sizes). Running the
  //      hook would be redundant work.
  //   2. The hook calls `.husky/_/husky.sh` which is created by `husky install`
  //      via the `prepare` npm script. Worktrees don't trigger `prepare` on
  //      creation, so the include is missing and the hook fails before doing
  //      anything useful.
  //   3. The orchestrator commits inside an isolated worktree; the
  //      consequences of a bad commit are contained until human PR review.
  // Pre-push hooks (`pre-push`) are also skipped via `git push --no-verify`
  // for the same reasons.
  const commitMsg = workflow.commitMessage(item.id, item)
  const commitMsgFile = path.join(os.tmpdir(), `commit-msg-${item.id}.${process.pid}`)

  await fs.writeFile(commitMsgFile, commitMsg, 'utf8')

  await shell('git', ['add', '-A'], { cwd: wtPath })
  const commitResult = await shell(
    'git',
    ['commit', '--no-verify', '--file', commitMsgFile],
    { cwd: wtPath }
  )

  if (commitResult.exitCode !== 0) {
    return escalate(
      workflow,
      item,
      state,
      {
        shouldEscalate: true,
        reason: `git commit failed: ${commitResult.stderr || commitResult.stdout}`,
      },
      manifestAbs,
      rootDir
    )
  }

  const pushResult = await shell(
    'git',
    ['push', '--no-verify', '-u', 'origin', branch],
    { cwd: wtPath }
  )

  if (pushResult.exitCode !== 0) {
    return escalate(
      workflow,
      item,
      state,
      { shouldEscalate: true, reason: `git push failed: ${pushResult.stderr}` },
      manifestAbs,
      rootDir
    )
  }

  // Step 10: PR.
  // diff.sh writes its report inside the worktree (its $ROOT is the worktree
  // when invoked with cwd=wtPath). Read from the worktree-internal path so
  // the gh PR body picks up the agent's actual diff for this iteration.
  const diffPath = path.join(wtPath, 'migration-runs', runDate, item.id, 'diff.md')
  const prUrl = await gh.createPR({
    title: workflow.prTitle(item.id, item),
    base: workflow.baseBranch,
    head: branch,
    bodyFile: diffPath,
    cwd: wtPath,
    assignees: workflow.assignees,
  })

  manifest.update(manifestAbs, item.id, { pr: prUrl })

  // Tier 1.3: append lessons-learned entry. Non-fatal if it errors.
  try {
    await lessons.append(workflow, item, prUrl, state.iterations, wtPath, rootDir)
  } catch (err) {
    log('lessons', `append failed (non-fatal): ${(err as Error).message}`)
  }

  // Phase 3.1 — CI poll. Both `--no-merge` (sandbox) and merge-mode go
  // through the poll; `--no-merge` just skips the eventual merge call. The
  // poll is gated by `opts.ciTimeoutMinutes > 0` so operators can opt out
  // (e.g. when CI is known to be down for maintenance, or for ultra-fast
  // dry-canaries that don't care about CI).
  const ciTimeout = opts.ciTimeoutMinutes ?? workflow.ciTimeoutMinutes

  if (ciTimeout <= 0) {
    log('loop', `CI poll disabled (--ci-timeout-minutes=0); PR=${prUrl}`)

    return { status: 'pr-opened', prUrl }
  }

  log(
    'loop',
    `polling CI on ${prUrl} (timeout=${ciTimeout}min, interval=30s)`
  )
  let lastSummary = ''
  let pollResult = await gh.pollChecks(prUrl, wtPath, {
    timeoutMinutes: ciTimeout,
    intervalSeconds: 30,
    onTick: (snapshot) => {
      const summary = snapshot
        .map((c) => `${c.name}=${c.conclusion || c.status || '?'}`)
        .sort()
        .join(' ')

      if (summary !== lastSummary) {
        log('ci', `${snapshot.length} checks: ${summary}`)
        lastSummary = summary
      }
    },
  })

  if (pollResult.state === 'timeout') {
    log(
      'ci',
      `timed out after ${ciTimeout}min with ${pollResult.pending.length} ` +
        `pending: ${pollResult.pending.map((c) => c.name).join(', ')}`
    )

    return escalate(
      workflow,
      item,
      state,
      {
        shouldEscalate: true,
        reason: `CI timeout after ${ciTimeout}min; pending: ${pollResult.pending.map((c) => c.name).join(', ')}`,
      },
      manifestAbs,
      rootDir
    )
  }

  // Phase 3.3 — CI iteration loop. While CI is failing AND we have
  // budget, classify each failed check, react (auto-fix or feed agent),
  // push, re-poll. Escalate when classification recommends it or budget
  // is exhausted.
  //
  // (Phase 3 Happo-flake mitigation removed in v4 Step 4 — strict gate
  // replaces flake retries; auto-fix-rerun classification was retired
  // in failure-classifier.ts.)

  while (
    pollResult.state === 'failure' &&
    state.iterations < opts.maxIterations
  ) {
    state.iterations += 1
    log(
      'ci',
      `iter ${state.iterations}: ${pollResult.failed.length}/${pollResult.checks.length} checks failed: ${pollResult.failed.map((c) => `${c.name}(${c.conclusion})`).join(', ')}`
    )

    // Fetch logs + classify in parallel.
    const classifications = await Promise.all(
      pollResult.failed.map(async (failed) => {
        const log_ = await gh.fetchJobLog(failed.detailsUrl, wtPath)

        return {
          check: failed,
          log: log_,
          decision: classifyCIFailure(
            { name: failed.name, conclusion: failed.conclusion },
            log_,
            { repoRoot: rootDir }
          ),
        }
      })
    )

    classifications.forEach((c) =>
      log(
        'ci',
        `classify "${c.check.name}" → ${c.decision.class} (${c.decision.reason})`
      )
    )

    // (auto-fix-rerun budget override removed — v4 Step 4 strict gate.)

    // Escalate on the first escalate-class decision. We don't try to
    // partially fix failures in this iteration; the simpler invariant
    // is "any escalate ⇒ stop the whole run".
    const escalateDecision = classifications.find(
      (c) => c.decision.class === 'escalate'
    )

    if (escalateDecision) {
      return escalate(
        workflow,
        item,
        state,
        {
          shouldEscalate: true,
          reason: `CI failure on "${escalateDecision.check.name}" (${escalateDecision.decision.reason})`,
        },
        manifestAbs,
        rootDir
      )
    }

    // Apply auto-fix paths (snapshot regen, lint --fix). These run on the
    // worktree; afterwards we commit + push to update the PR branch.
    let didAutoFix = false

    for (const c of classifications) {
      if (
        c.decision.class === 'auto-fix-snapshot' &&
        c.decision.paths.length > 0
      ) {
        const pattern = c.decision.paths.join('|')

        log('ci', `auto-fix snapshot: jest -u --testPathPattern "${pattern}"`)
        await shell(
          'yarn',
          [
            'davinci-qa',
            'unit',
            '--config=./jest.spec.mjs',
            '--testPathPattern',
            pattern,
            '-u',
          ],
          {
            cwd: wtPath,
            env: {
              ...process.env,
              NODE_OPTIONS: '--no-experimental-require-module',
            },
          }
        )
        didAutoFix = true
      } else if (
        c.decision.class === 'auto-fix-lint' &&
        c.decision.paths.length > 0
      ) {
        log('ci', `auto-fix lint: davinci-syntax lint code ${c.decision.paths.join(' ')}`)
        await shell(
          'yarn',
          ['davinci-syntax', 'lint', 'code', ...c.decision.paths],
          { cwd: wtPath }
        )
        didAutoFix = true
      }
    }

    // (auto-fix-rerun empty-commit branch removed — v4 Step 4 strict
    // Happo gate replaces flake retries.)
    const didRerun = false

    // Feed-to-agent classifications: assemble a CI-feedback delta prompt
    // and invoke the agent (session-resume). The agent edits files; gate
    // runs locally afterwards as a sanity check.
    const feedDecisions = classifications.filter(
      (c) => c.decision.class === 'feed-to-agent'
    )

    if (feedDecisions.length > 0) {
      const ciFeedback =
        '# CI failures (post-PR-open)\n\n' +
        feedDecisions
          .map(
            (c) =>
              `## ${c.check.name}\n\n` +
              `**Reason:** ${c.decision.reason}\n\n` +
              (c.decision.paths.length
                ? `**Affected paths:** ${c.decision.paths.join(', ')}\n\n`
                : '') +
              '**Log excerpt:**\n```\n' +
              (c.decision.excerpt ?? '(no excerpt)') +
              '\n```\n'
          )
          .join('\n')
      const ciPrompt = await agent.assembleDeltaPrompt(
        state.iterations - 1,
        ciFeedback,
        wtPath
      )
      const promptPath = path.join(runDir, `prompt.${state.iterations}.txt`)

      await fs.writeFile(promptPath, ciPrompt, 'utf8')
      const agentLogPath = path.join(runDir, `agent.${state.iterations}.log`)

      log(
        'ci',
        `iter ${state.iterations}: feed-to-agent on ${feedDecisions.map((d) => d.check.name).join(', ')}`
      )
      const agentResult = await agent.invoke(
        {
          prompt: ciPrompt,
          cwd: wtPath,
          agent: opts.agent,
          withMcp: opts.withMcp,
          sessionId,
          isFirstIteration: false,
        },
        agentLogPath
      )

      // Slice 3 — token snapshot for the CI iteration's agent call.
      await recordTokenSnapshot(
        runDir,
        item.id,
        sessionId,
        state.iterations,
        wtPath
      )

      if (agentResult.exitCode !== 0) {
        return escalate(
          workflow,
          item,
          state,
          {
            shouldEscalate: true,
            reason: `agent invocation failed during CI iteration: exit ${agentResult.exitCode}`,
          },
          manifestAbs,
          rootDir
        )
      }

      // Sanity gate locally before pushing.
      const gateReport = await gate.run(
        workflow.gate(item.id),
        item.id,
        wtPath,
        runDate
      )

      state.lastGate = gateReport

      if (!workflow.successCriteria(gateReport)) {
        log(
          'ci',
          `iter ${state.iterations}: local gate still failing after agent edit; pushing anyway and letting CI re-evaluate`
        )
      }
    }

    if (!didAutoFix && !didRerun && feedDecisions.length === 0) {
      // Nothing to do — every classification was something we didn't act
      // on (shouldn't happen given the escalate-first guard, but be safe).
      return escalate(
        workflow,
        item,
        state,
        {
          shouldEscalate: true,
          reason: 'no actionable CI classifications; aborting',
        },
        manifestAbs,
        rootDir
      )
    }

    // Stage + commit any new working-tree changes (auto-fix outputs,
    // agent edits). The empty-commit rerun was already created above (if
    // applicable) so we may end up with two commits per iteration: the
    // rerun marker + the auto-fix delta. That's fine — both push together.
    const ciCommitMsg = workflow.commitMessage(item.id, item) + `\n\n[ci-iter ${state.iterations}]`
    const ciCommitMsgFile = path.join(
      os.tmpdir(),
      `commit-msg-${item.id}.ci.${state.iterations}.${process.pid}`
    )

    await fs.writeFile(ciCommitMsgFile, ciCommitMsg, 'utf8')
    await shell('git', ['add', '-A'], { cwd: wtPath })
    const commitResult = await shell(
      'git',
      ['commit', '--no-verify', '--file', ciCommitMsgFile],
      { cwd: wtPath }
    )
    const didAutoFixCommit = commitResult.exitCode === 0

    // Push if we have ANY new commit on this iteration — either the
    // rerun marker (didRerun) or the auto-fix delta (didAutoFixCommit).
    if (didRerun || didAutoFixCommit) {
      const pushResult = await shell(
        'git',
        ['push', '--no-verify', 'origin', branch],
        { cwd: wtPath }
      )

      if (pushResult.exitCode !== 0) {
        return escalate(
          workflow,
          item,
          state,
          {
            shouldEscalate: true,
            reason: `git push failed during CI iteration: ${pushResult.stderr}`,
          },
          manifestAbs,
          rootDir
        )
      }
      const what = [
        didRerun ? 'rerun marker' : '',
        didAutoFixCommit ? 'auto-fix delta' : '',
      ]
        .filter(Boolean)
        .join(' + ')

      log('ci', `iter ${state.iterations}: pushed ${what}; waiting 60s for CI to register new commit, then re-polling`)
      // Without this delay, the next pollChecks call returns stale rollup
      // state for the OLD commit (canary 29 / PR #4935: re-poll fired
      // 570ms after push and saw the prior failure → instant escalate
      // before auto-fix-rerun got a chance). 60s is long enough for
      // GitHub Actions to enqueue a new run for the pushed SHA, short
      // enough not to bloat happy-path runs.
      await sleep(60_000)
    } else {
      log(
        'ci',
        `iter ${state.iterations}: no commit produced (exit ${commitResult.exitCode}); CI will re-evaluate the existing tip`
      )
    }

    // Re-poll. CI may need a few seconds to register the new run for the
    // pushed commit; pollChecks's warmup handles that.
    pollResult = await gh.pollChecks(prUrl, wtPath, {
      timeoutMinutes: ciTimeout,
      intervalSeconds: 30,
      onTick: (snapshot) => {
        const summary = snapshot
          .map((c) => `${c.name}=${c.conclusion || c.status || '?'}`)
          .sort()
          .join(' ')

        if (summary !== lastSummary) {
          log('ci', `${snapshot.length} checks: ${summary}`)
          lastSummary = summary
        }
      },
    })
  }

  if (pollResult.state === 'failure') {
    return escalate(
      workflow,
      item,
      state,
      {
        shouldEscalate: true,
        reason: `CI still failing after ${state.iterations}/${opts.maxIterations} iterations: ${pollResult.failed.map((c) => c.name).join(', ')}`,
      },
      manifestAbs,
      rootDir
    )
  }

  log('ci', `all ${pollResult.checks.length} checks PASS`)

  // Phase 3.5 redesign — async review handling.
  //
  // Migration mode never blocks waiting for human review. After CI is
  // green, transition the item to `awaiting_review` and exit. A separate
  // command (`yarn orchestrate --review-sweep`) walks all
  // `awaiting_review` items on its own cadence (cron, manual) to fetch
  // new review activity, classify it, and react. This decouples the
  // CPU-paced migration loop from the human-paced review cadence.
  //
  // Per operator preference: orchestrator NEVER auto-merges. Approval
  // signal moves the item to `ready_to_merge` and stops; operator runs
  // `gh pr merge` manually.
  manifest.update(manifestAbs, item.id, {
    status: 'awaiting_review',
    last_ci_green_at: ISO(),
    session_id: sessionId,
  })
  log(
    'loop',
    `${item.id}: status=awaiting_review (CI green; run --review-sweep when reviews land)`
  )

  await releaseLock(rootDir, item.id)

  return { status: 'pr-opened', prUrl }
}


// ---------------------------------------------------------------------------
// CLI argument parsing helper (reused by workflow entrypoints)
// ---------------------------------------------------------------------------

export function parseOptions(argv: string[]): OrchestratorOptions {
  const args = argv.slice(2)
  const get = (name: string): string | undefined => {
    const idx = args.findIndex((a) => a === name || a.startsWith(`${name}=`))

    if (idx === -1) {return undefined}
    const eq = args[idx].indexOf('=')

    if (eq !== -1) {return args[idx].slice(eq + 1)}

    return args[idx + 1]
  }
  const has = (name: string): boolean => args.includes(name)

  const tierStr = get('--tier')
  const componentRaw = get('--component')
  const agentRaw = get('--agent')
  const iterStr = get('--max-iterations')
  const branchRaw = get('--branch')
  const ciTimeoutStr = get('--ci-timeout-minutes')
  const reviewTimeoutStr = get('--review-timeout-minutes')
  const maxItemsStr = get('--max-items')

  const agent: OrchestratorOptions['agent'] =
    agentRaw === 'cursor' || agentRaw === 'codex' ? agentRaw : 'claude'

  return {
    dryRun: has('--dry-run'),
    noMerge: has('--no-merge'),
    agent,
    tier: tierStr ? Number(tierStr) : null,
    component: componentRaw ?? null,
    maxIterations: iterStr ? Number(iterStr) : 3,
    withMcp: has('--with-mcp'),
    branch: branchRaw ?? null,
    ciTimeoutMinutes: ciTimeoutStr ? Number(ciTimeoutStr) : 15,
    reviewTimeoutMinutes: reviewTimeoutStr ? Number(reviewTimeoutStr) : null,
    batch: has('--batch'),
    reviewSweep: has('--review-sweep'),
    maxItems: maxItemsStr ? Number(maxItemsStr) : null,
  }
}
