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
   * Run the workflow's gate command and parse the resulting report.md.
   * Looks for a "**Composite:** PASS" / "FAIL" marker emitted by
   * `bin/migration-gate.sh`.
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

    const reportPath = path.join(
      cwd,
      'migration-runs',
      runDate,
      itemId,
      'report.md'
    )

    let stages: GateReport['stages'] = []
    let composite: GateReport['composite'] = result.exitCode === 0 ? 'PASS' : 'FAIL'

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

    const result = await shell('gh', args, { cwd: opts.cwd })

    if (result.exitCode !== 0) {
      throw new Error(`gh pr create failed: ${result.stderr || result.stdout}`)
    }

    return result.stdout.trim()
  },

  async viewPR(
    numberOrUrl: string,
    fields: string,
    cwd: string
  ): Promise<unknown> {
    const result = await shell(
      'gh',
      ['pr', 'view', numberOrUrl, '--json', fields],
      { cwd }
    )

    if (result.exitCode !== 0) {
      throw new Error(`gh pr view failed: ${result.stderr || result.stdout}`)
    }

    return JSON.parse(result.stdout)
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

    // Timeout: snapshot whatever we have at exit.
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
   * Returns empty string on any error (best-effort; the caller will handle a
   * missing log gracefully — a missing log just leads to "unclassified" →
   * escalation, which is the safe default).
   */
  async fetchJobLog(detailsUrl: string, cwd: string): Promise<string> {
    const m = detailsUrl.match(
      /github\.com\/([^/]+)\/([^/]+)\/actions\/runs\/\d+\/job\/(\d+)/
    )

    if (!m) {return ''}
    const [, owner, repo, jobId] = m
    const result = await shell(
      'gh',
      ['api', `repos/${owner}/${repo}/actions/jobs/${jobId}/logs`],
      { cwd }
    )

    return result.exitCode === 0 ? result.stdout : ''
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
          // EXCLUDED on purpose:
          //   - Bash(yarn add | install): orchestrator owns dep management.
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
      child.stdout?.on('data', (d) => {
        // Append, don't replace.
        require('node:fs').appendFileSync(logPath, d)
      })
      child.stderr?.on('data', (d) => {
        require('node:fs').appendFileSync(logPath, `[stderr] ${d}`)
      })
      child.on('close', (code) => resolve({ exitCode: code ?? 1 }))
      child.on('error', (err) => {
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
    const extractPrompt =
      `Below is the diff that successfully migrated component "${item.id}" to ${item.target_path ?? 'a new stack'}. ` +
      `Extract the 2–3 most useful patterns this migration applied — patterns that future similar migrations of OTHER components should reuse. ` +
      `Output: exactly 2–3 markdown bullet lines, each prefixed with "- " and ≤1 sentence. No preamble, no closing remarks, no "Pattern A:" labels.\n\n` +
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
      opts.noMerge
        ? `13. (--no-merge: CI green = stop; CI fail = escalate)`
        : `13. On CI green: gh pr merge --auto --squash --delete-branch (review-classifier deferred to Phase 3.4)`,
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

    if (agentResult.exitCode !== 0) {
      log('loop', `agent exited non-zero (${agentResult.exitCode})`)
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

    if (!didAutoFix && feedDecisions.length === 0) {
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

    // Stage + commit + push the iteration's changes.
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

    if (commitResult.exitCode !== 0) {
      log(
        'ci',
        `iter ${state.iterations}: nothing to commit (exit ${commitResult.exitCode}); CI will re-evaluate the existing tip`
      )
    } else {
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
      log('ci', `iter ${state.iterations}: pushed delta commit; re-polling`)
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

  if (opts.noMerge) {
    log('loop', `--no-merge: CI green; stopping before merge`)

    return { status: 'pr-opened', prUrl }
  }

  // Steps 13–14 (review classification, merge) deferred to Phase 3.4 / 3.5.
  // For now: CI green + not --no-merge means the orchestrator hands off to
  // gh's `--auto --squash` which honors branch protection (merge happens
  // when reviews are also green).
  log('loop', `CI green; gh pr merge --auto --squash --delete-branch`)
  await gh.mergePR(prUrl, wtPath)

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
  }
}
