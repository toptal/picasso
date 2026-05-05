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
  stages: ReadonlyArray<{
    name: string
    status: 'PASS' | 'FAIL' | 'SKIP'
    durationSeconds: number
    logPath: string
  }>
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
}
