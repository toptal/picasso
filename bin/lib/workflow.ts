/**
 * bin/lib/workflow.ts
 *
 * Workflow descriptor interface for the autonomous orchestrator. The orchestrator
 * core (`orchestrator-core.ts`) is workflow-agnostic; per-workflow logic lives in
 * a Workflow object that satisfies this interface and is passed to `core.run()`.
 *
 * PF-1992 ships the migration workflow (`bin/migration-orchestrator.ts`).
 * Future workflows (Figma → component, bug-fix, project-migration) ship their
 * own descriptors + thin entrypoints; the loop, gh integration, manifest I/O,
 * gate runner, and worktree management are reused untouched.
 *
 * See docs/migration/references/agent-loop.md for the loop spec the descriptor
 * hooks plug into.
 */

/**
 * One queue item. The `id` field is the manifest key.
 */
export interface ManifestItem {
  /** Manifest key (e.g. "Note", "query-builder/AutoComplete"). */
  readonly id: string
  readonly tier: 1 | 2 | 3 | 4 | 5
  /** Repo-relative package directory. */
  readonly package: string
  status: 'queued' | 'in_progress' | 'done' | 'needs_human' | 'blocked'
  readonly depends_on: readonly string[]
  pr: string | null
  branch: string | null
  worktree: string | null
  iterations: number
  merged_at: string | null
  notes?: string
  escalation_reason?: string
}

/**
 * Full manifest shape. Components keyed by ID.
 */
export interface Manifest {
  readonly $schema?: string
  readonly version: string
  readonly generated_at?: string
  components: Record<string, ManifestItem>
}

/**
 * Output of the gate runner. Composite pass/fail + per-stage detail.
 */
export interface GateReport {
  /** Overall outcome derived from per-stage statuses. */
  composite: 'PASS' | 'FAIL'
  stages: readonly {
    name: string
    status: 'PASS' | 'FAIL' | 'SKIP'
    durationSeconds: number
    logPath: string
  }[]
  /** Path to the markdown report file emitted by the gate script. */
  reportPath: string
}

/**
 * Cumulative state of a single component's run. Passed to `escalationCriteria`
 * so the workflow can decide when enough is enough.
 */
export interface RunState {
  item: ManifestItem
  iterations: number
  lastGate: GateReport | null
  /** Distinct CI failure modes seen across iterations. */
  ciFailures: readonly string[]
  /** Review comments that have been classified as "architectural concern". */
  architecturalReviews: number
  /** ISO timestamp when this component entered in_progress. */
  startedAt: string
}

export interface EscalationDecision {
  shouldEscalate: boolean
  /** Concise reason; written to `manifest.escalation_reason` on escalation. */
  reason?: string
}

/**
 * Workflow descriptor — the per-workflow plug-in surface.
 *
 * All hooks are pure: they compute strings or decisions from inputs. The
 * orchestrator core invokes them at the appropriate loop step.
 */
export interface Workflow {
  /** Stable ID, used in log paths and manifest schemas. */
  readonly id: string

  /** Human-readable name for log/PR text (e.g. "Migration"). */
  readonly displayName: string

  /** Path to the manifest JSON, relative to repo root. */
  readonly manifestPath: string

  /**
   * Resolves the prompt path for an item.
   *
   * The migration workflow has two prompt paths (light for Tier 0, heavy for
   * everything else), so this is a function rather than a string. Future
   * workflows that need only one prompt can return a constant.
   *
   * Path is repo-relative. The orchestrator reads the file, prepends it to the
   * assembled prompt, and gracefully skips if the file does not exist
   * (per `existsSync` guard in `orchestrator-core.ts` `agent.assemblePrompt`).
   */
  promptFor: (item: ManifestItem) => string

  /**
   * File globs (relative to repo root) that always feed the agent's prompt
   * regardless of tier. The orchestrator reads these files and concatenates
   * their contents into the prompt context block.
   */
  readonly contextPack: readonly string[]

  /** Resolves to the per-item plan file path. */
  perItemPlan: (id: string) => string

  /** Shell command to run gates against an item. Single-line; passed to spawn. */
  gate: (id: string) => string

  /** Shell command to run diff snapshot/report. Used as `diff(id) + " " + mode`. */
  diff: (id: string, mode: 'snapshot' | 'report') => string

  /** Branch name for an item (e.g. "migrate-Note"). */
  branchName: (id: string) => string

  /**
   * Base branch the orchestrator opens PRs against.
   *
   * For long-running migration efforts this is typically an integration
   * branch (e.g. `picasso-modernization`) rather than `master`, so that PR
   * lands stack against the integration branch and master only sees a single
   * squash-merge once the whole batch is green.
   *
   * The orchestrator also pushes the migration branch to this base's remote
   * (origin) and passes `--base <branch>` to `gh pr create`.
   */
  readonly baseBranch: string

  /**
   * GitHub usernames to add as assignees on every PR the orchestrator opens.
   *
   * Use `@me` to assign the operator running the orchestrator. Picasso's
   * Danger CI requires every PR to have at least one assignee before merge,
   * so production workflows should set this to a non-empty array. Empty
   * means "assign nobody" (Danger will then fail).
   */
  readonly assignees: readonly string[]

  /** PR title. */
  prTitle: (id: string, item: ManifestItem) => string

  /** Commit message. Multi-line OK; orchestrator passes via heredoc. */
  commitMessage: (id: string, item: ManifestItem) => string

  /**
   * Tier-aware context loading depth. The orchestrator uses this to decide
   * which extra files (Happo screenshots, subagent playbook, etc.) to include
   * for Tier 2 / Tier 3 components beyond the always-on `contextPack`.
   */
  complexityFor: (item: ManifestItem) => 1 | 2 | 3

  /**
   * Decide whether the gate report meets success criteria. Called after every
   * gate run. Returning false triggers another iteration; returning true
   * advances to PR creation.
   */
  successCriteria: (report: GateReport) => boolean

  /**
   * Decide whether the run should escalate. Called on every iteration boundary,
   * CI failure, and review feedback event. The orchestrator stops the loop on
   * `shouldEscalate: true`.
   */
  escalationCriteria: (state: RunState) => EscalationDecision
}

/**
 * Subset of the orchestrator's configuration that's surfaced to workflow hooks
 * for advanced uses (rare in PF-1992; reserved for later workflows that need
 * to read CLI flags).
 */
export interface OrchestratorOptions {
  readonly dryRun: boolean
  readonly noMerge: boolean
  readonly agent: 'claude' | 'cursor' | 'codex'
  readonly tier: number | null
  readonly component: string | null
  readonly maxIterations: number
  /**
   * If true, the orchestrator starts Storybook in the worktree before
   * invoking the agent and grants the agent Playwright MCP tools (visual
   * verification). Adds ~30-60s to canary startup; recommended for Tier 0
   * / 2 / 3 components where pixel-perfect Happo is load-bearing. Tier 1
   * cleanup migrations should leave this off.
   *
   * Default: false. CLI: `--with-mcp`.
   */
  readonly withMcp: boolean

  /**
   * Phase 3.1 — wall-clock budget for the post-PR CI poll loop, in minutes.
   *
   * After `gh pr create` the orchestrator polls `pr view --json
   * statusCheckRollup` until every check completes or this timeout fires.
   * Picasso's full pipeline on `feature/picasso-modernization` runs in
   * ~7-12 min; default 15 covers it with headroom for CI queue contention.
   *
   * Set to `0` to skip polling entirely (legacy behavior — exit at PR open).
   *
   * Default: 15. CLI: `--ci-timeout-minutes=N`.
   */
  readonly ciTimeoutMinutes: number

  /**
   * Override the branch name that the orchestrator creates for this run.
   *
   * Default: `null` (use `workflow.branchName(item.id)`). CLI: `--branch=<name>`.
   *
   * Use case: when the workflow's default branch name (e.g. `migrate-Button`)
   * already exists on origin from a prior run, a fresh canary needs a
   * non-colliding name (`migrate-Button-canary-18`). This flag avoids
   * mutating the workflow descriptor for one-off canary runs and keeps the
   * existing PR around as evidence of the prior attempt.
   *
   * The override applies to the worktree-attached branch and the
   * `git push -u origin <branch>` target. PR head also picks this up.
   */
  readonly branch: string | null
}
