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
  status:
    | 'queued'
    | 'in_progress'
    /**
     * Phase 3.5 redesign — set after CI is green and the orchestrator has
     * stopped iterating on the migration. The PR is open, awaiting human
     * review. `--review-sweep` walks items in this status to fetch + react
     * to new review comments asynchronously, decoupling human-paced
     * review cadence from the (CPU-paced) migration loop.
     */
    | 'awaiting_review'
    /**
     * Phase 3.5 redesign — set when review-sweep classifies the latest
     * reviews as approval-only (no nits, no architectural concerns) and
     * CI is still green. Operator merges manually. Orchestrator never
     * auto-merges (per operator preference: "I will merge manually").
     */
    | 'ready_to_merge'
    /**
     * Phase 3.5+ (2026-05-11) — set when reviewer approval has landed but
     * the head commit's status-check rollup is still pending (not all
     * checks reported terminal). The PR isn't yet safe to merge. Sweep
     * re-checks the rollup on each tick:
     *   - rollup success → ready_to_merge
     *   - rollup failure → awaiting_review (agent re-engages on the
     *     failed checks; see CI-failure feedback in sweepOne)
     *   - still pending → stay
     * Reviewer's approval is preserved across these transitions — we don't
     * make the agent re-process review comments while just waiting on CI.
     */
    | 'awaiting_ci'
    | 'done'
    | 'needs_human'
    | 'blocked'
  readonly depends_on: readonly string[]
  pr: string | null
  branch: string | null
  worktree: string | null
  iterations: number
  merged_at: string | null
  notes?: string
  escalation_reason?: string
  /**
   * Migration target. `none` = cleanup-only (drop @material-ui peer-dep,
   * no source change). Otherwise the @base-ui/react primitive being
   * adopted (e.g. `@base-ui/react/button`).
   */
  target_path?: string
  /** Phase 3 — ISO timestamp of last successful CI completion. */
  last_ci_green_at?: string | null
  /**
   * Phase 3.5 — ISO timestamp of the latest review/comment processed by
   * the most recent --review-sweep. Reviews older than this marker are
   * skipped on subsequent sweeps; only NEW review activity triggers
   * agent iteration. Reset to null when the item is escalated or
   * progresses to ready_to_merge.
   */
  last_review_seen_at?: string | null
  /** Phase 3.5 — count of agent iterations driven by review feedback. */
  review_iterations?: number
  // sweep_happo_reruns removed (v4 Step 4 strict Happo gate).
  /**
   * Phase 3.5 — Anthropic session ID generated at first migration
   * iteration. Reused on subsequent migration iterations + review-sweep
   * iterations so the agent retains context across hours/days. Cleared
   * when the item terminates (done / escalated).
   */
  session_id?: string | null
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
  /**
   * Tier 2.2 — gate report history across inner-loop iterations. Used by
   * `escalationCriteria` to detect stuck states (same failure set 2+
   * iterations in a row) before the iteration cap fires. Lets workflows
   * cut losses early on convergent-but-stuck loops without giving up too
   * fast on convergent-and-progressing ones.
   */
  gateHistory: readonly GateReport[]
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
   * Files (relative to repo root) that feed the agent's prompt context block,
   * resolved per-item to allow tier-aware filtering. The orchestrator reads
   * these files and concatenates them into the prompt.
   *
   * Returning an item-specific subset lets workflows trim context for cheap
   * migrations (Tier 1 cleanup-only) and keep heavier docs (JSS-to-Tailwind
   * cribsheet, full token reference) only for migrations that actually need
   * them (Tier 2/3 heavy rewrites). On a 62 KB iter-1 prompt, ~30 KB was the
   * JSS cribsheet — irrelevant for Tier 0 components migrating from
   * `@mui/base` (no JSS in their source). Per-tier filtering halves the
   * iter-1 prompt for Tier 0 and cuts ~70 % for Tier 1.
   */
  readonly contextPack: (item: ManifestItem) => readonly string[]

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

  /**
   * Tier 2.4 — post-merge hook. Called by `--review-sweep` when an item
   * transitions from `ready_to_merge` (or `awaiting_review`) to merged
   * (the operator manually clicked Merge on GitHub). Use this to copy
   * source into `docs/migration/reference/`, run post-merge migrations,
   * trigger downstream notifications, etc.
   *
   * Optional. The orchestrator marks the item `done` regardless; this
   * hook adds workflow-specific side effects.
   *
   * Errors thrown from the hook are logged but don't roll back the
   * status transition (the merge is already permanent on GitHub).
   */
  onPostMerge?: (item: ManifestItem, rootDir: string) => Promise<void>
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
   * Per-PR cap on CI-failure iterations (post-PR-open). Decoupled from
   * `maxIterations` (which gates the migrate-loop) because CI fixes are
   * typically cheap (~$0.50-1 / cycle) and the orchestrator should be
   * stubborn about fixing failures before escalating. Stuck detection
   * (same failure-set twice consecutively) triggers earlier escalation.
   * Default 5. CLI: `--max-ci-iterations=N`.
   */
  readonly maxCIIterations: number
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

  // Phase 3 Happo-flake mitigation (`maxReruns`) and Tier 2 batch B Slice 4
  // (`maxSweepHappoReruns`) were removed as part of v4 Step 4 (strict
  // Happo gate). The gate script's `bin/migration-gate.sh` now enforces
  // zero-diff OR designer-accepted via Happo's REST API at gate time —
  // flake retries become unnecessary. See `decisions/classes-shim.md`'s
  // sibling decision and migration plan v4 §6.3 for the policy.

  /**
   * Phase 3.5 — wall-clock budget for polling PR reviews after CI is green.
   *
   * 0 → skip review polling entirely (current behavior — proceed to merge
   *     immediately on CI-green when `--no-merge` is not set).
   * > 0 → poll `gh pr view --json reviews` every minute up to N minutes.
   *      First non-empty review batch is classified; classifier decides
   *      merge / iterate-on-nits / escalate. Timeout with no reviews →
   *      escalate.
   *
   * For canary / sandbox runs, leave at 0. For production migrations
   * pending designer + engineer sign-off, set to e.g. 60-120.
   *
   * Default: 0. CLI: `--review-timeout-minutes=N`.
   */
  readonly reviewTimeoutMinutes: number

  /**
   * Phase 3.5 — cap on how many times the orchestrator can iterate on
   * review feedback (nits) before escalating. High-quality reviewers
   * usually need 1-2 rounds; >3 indicates either runaway nits or a
   * deeper miscommunication that humans should sort out.
   *
   * Default: 3.
   */
  readonly maxReviewIterations: number

  /**
   * Phase 3.5 — override the workflow's `reviewTimeoutMinutes`.
   * 0 disables review polling. CLI: `--review-timeout-minutes=N`.
   *
   * NOTE: this option is dormant after the Phase 3.5 redesign — review
   * polling is no longer synchronous. Kept for forward-compat in case
   * a future workflow descriptor wants synchronous wait semantics.
   */
  readonly reviewTimeoutMinutes: number | null

  /**
   * Phase 3.5 redesign — process every queued item in the selected tier
   * sequentially, instead of just the next-queued item. Each item is
   * driven to `awaiting_review` (or escalated) before the next one
   * starts. CLI: `--batch`.
   *
   * Combine with `--tier=N` to process a whole tier; combine with
   * `--no-merge` for sandbox runs.
   */
  readonly batch: boolean

  /**
   * Optional cap on items processed by `--batch`. `null` = unbounded (all
   * queued items in tier). Set via `--max-items=N` to bound canary runs
   * (e.g. Validate C wants exactly 2 items, not the whole tier). Counted
   * by successful `pickNext` returns; escalated items still count.
   */
  readonly maxItems: number | null

  /**
   * Phase 3.5 redesign — review-sweep mode. The orchestrator reads the
   * manifest, walks every `awaiting_review` item, fetches new review
   * activity since `last_review_seen_at`, classifies it, and reacts:
   *
   *   - approval-only        → status = ready_to_merge (operator merges manually)
   *   - any architectural / question / unclear → status = needs_human
   *   - nits                 → agent edits, push, status remains awaiting_review
   *
   * Designed to run on a cron (or manual) cadence independent of the
   * migrate-mode loop. CLI: `--review-sweep`.
   */
  readonly reviewSweep: boolean

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

  /**
   * Override the workflow's `baseBranch` (PR target / merge-base ref).
   *
   * Default: `null` (use `workflow.baseBranch`). CLI: `--base-branch=<ref>`.
   *
   * Use case: routing migration PRs to a different integration branch
   * for a specific run (e.g. a fork of the orchestrator branch for an
   * isolated batch) without editing the workflow descriptor.
   */
  readonly baseBranch: string | null
}
