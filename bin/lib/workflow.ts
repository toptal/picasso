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
/**
 * An explicit operator (or trusted reviewer) decision to EXCEPT a documented
 * rule on a specific PR — recorded so it survives across review-sweep ticks.
 *
 * Why this exists: the review-sweep runs two autonomous audit paths (the
 * conversational standards-audit and the blind Layer B `judgeAudit`
 * subprocess). Both re-evaluate the PR diff against the canonical standards
 * docs from scratch on every tick. When a reviewer/operator explicitly
 * directs an exception to a RULE-strength doc (e.g. "do the exception here,
 * use HTMLSpanElement" on PR #4965), the audit — which only knows the
 * *documented* carve-outs — keeps re-flagging the sanctioned shape as a
 * HIGH violation and reverting it, so the agent oscillates against the
 * operator's own instruction.
 *
 * An `OperatorOverride` is the highest-authority carve-out: it is injected
 * into BOTH audit prompts as a hard skip-rule, and the post-iter
 * re-classification logic is forbidden from reverting anything it sanctions.
 * The operator can always choose to make an exception, so an explicit
 * override outranks any RULE-strength doc.
 *
 * Recorded by the orchestrator from `<!-- override-lock ... -->` markers the
 * review-response agent embeds in its PR reply when it acts on an
 * operator-sanctioned exception; removed by `<!-- override-unlock rule=... -->`.
 * Visible (raw) + reversible in the PR thread, so a wrong lock is
 * operator-correctable.
 */
export interface OperatorOverride {
  /** The documented rule being excepted, cited by doc + section (e.g. `code-standards.md §"TS variance"`). Dedup key. */
  rule: string
  /** What the operator sanctioned instead — the shape the audit must NOT revert. One line. */
  sanctioned: string
  /** URL or comment-id of the operator directive / 👍-confirmed proposal in the PR thread (audit trail). */
  evidence: string
  /** GitHub login of the trusted reviewer/operator who directed or confirmed the exception. */
  confirmed_by: string
  /** ISO timestamp the override was recorded. */
  at: string
}

/**
 * A reviewer-confirmed request to promote a per-PR decision into a global
 * rule (graduate it into `practices.md`). Bridges the per-PR
 * {@link OperatorOverride} layer to the cross-component rule layer.
 *
 * Recorded when the review-response agent posts a graduation proposal (with a
 * plain-language GIST of the proposed rule) and a trusted reviewer 👍-confirms
 * it. The agent emits a `<!-- graduation-request ... -->` marker; the
 * orchestrator persists it here with status `queued`. The next
 * `pnpm orchestrate --graduate` pass picks queued requests up as
 * pre-qualified, reviewer-cited candidates (graduate.ts criterion (b)) and the
 * operator reviews the actual `practices.md` diff before committing — so the
 * reviewer confirms INTENT and the operator confirms WORDING (two-stage).
 *
 * Triggers (see PROMPT-review-response.md §"Rule graduation"):
 *  - `override-promotion`: an operator override was just applied + pushed, and
 *    the agent asks whether to promote the exception into a rule.
 *  - `reviewer-request`: a reviewer explicitly asked to change/introduce a rule.
 *  - `recurring-override`: the same rule has been overridden on ≥2 PRs, so the
 *    agent proactively proposes fixing the rule itself.
 */
export interface GraduationRequest {
  /** The rule being changed (citation), or a short working title for a NEW rule. Dedup key. */
  rule: string
  /** Plain-language summary of the proposed rule text/change — what the reviewer approved. */
  gist: string
  /** Target doc for graduation. Default `practices.md` (graduate.ts's scope). */
  target: string
  /** Why this graduation was proposed. */
  trigger: 'override-promotion' | 'reviewer-request' | 'recurring-override'
  /** URL / comment-id of the 👍-confirmed graduation proposal in the PR thread. */
  evidence: string
  /** GitHub login of the trusted reviewer who confirmed graduating. */
  confirmed_by: string
  /** ISO timestamp the request was recorded. */
  at: string
  /** Lifecycle: `queued` until a --graduate pass consumes it, then `graduated`. */
  status: 'queued' | 'graduated'
}

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
     * Phase 3.5+ (2026-05-11) — originally: set when reviewer approval
     * has landed but the head commit's status-check rollup is still
     * pending. Extended (Part 4, 2026-05-13) to ALSO cover the "agent's
     * CI poll timed out without verdict" case — same resumable semantics.
     * Both cases mean: PR is open, CI is pending or has timed out without
     * a terminal verdict, sweep mode (and pickNext) resumes by re-polling.
     *
     * Sweep re-checks the rollup on each tick:
     *   - rollup success → awaiting_review or ready_to_merge (depending
     *     on reviewer approval state)
     *   - rollup failure → feed agent the failed checks (CI iteration
     *     loop, see sweepOne)
     *   - still pending → stay
     *
     * Max age: 24h since `awaiting_ci_since` — after that, sweep
     * transitions to `needs_human` (operator forgot about the PR).
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
   * Part 4 (2026-05-13) — ISO timestamp when item entered `awaiting_ci`
   * status. On each sweep tick the orchestrator re-checks CI and lets its
   * current state decide (checks running → keep waiting; none running →
   * awaiting_review for a normal review pass); this timestamp is surfaced in
   * the "waiting since …" log. Cleared when item transitions out of
   * `awaiting_ci`. (Formerly drove a 24h max-age cap → needs_human; removed
   * 2026-05-29 because it stranded approved PRs whose CI had recovered.)
   */
  awaiting_ci_since?: string | null
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
  /**
   * Explicit operator/reviewer exceptions to documented rules on this PR,
   * recorded so review-sweep audit passes never revert an operator-sanctioned
   * change. Highest-authority carve-out — see {@link OperatorOverride}.
   * Per-PR, so it lives per-variant; flat field mirrors the v1 variant.
   */
  operator_overrides?: readonly OperatorOverride[]
  /**
   * Reviewer-confirmed requests to promote a decision on this PR into a global
   * rule. Consumed by `pnpm orchestrate --graduate`. See
   * {@link GraduationRequest}. Per-PR origin; flat field mirrors v1.
   */
  graduation_requests?: readonly GraduationRequest[]
  // sweep_happo_reruns removed (v4 Step 4 strict Happo gate).
  /**
   * Phase 3.5 — Anthropic session ID generated at first migration
   * iteration. Reused on subsequent migration iterations + review-sweep
   * iterations so the agent retains context across hours/days. Cleared
   * when the item terminates (done / escalated).
   */
  session_id?: string | null
  /**
   * Part 4 (2026-05-14) — multi-variant support. Each variant key (e.g.
   * `v1`, `v2`) tracks an independent migration run on its own branch +
   * worktree. The component-level fields (tier, package, depends_on,
   * target_path, versionBump, notes) stay flat and are shared across
   * variants. Per-run state (status, pr, branch, worktree, iterations,
   * etc.) lives per-variant.
   *
   * Backward compatibility: when `variants` is absent or empty, the flat
   * fields above (status, pr, branch, worktree, iterations, ...) are
   * read as the implicit "v1" variant. When `variants` is present, it
   * is the authoritative source; flat fields mirror the most-recently-
   * touched variant for legacy read paths.
   *
   * Sweep walks every entry in `variants` (or the flat v1 fallback)
   * independently, so multiple parallel PRs for the same component all
   * get their CI re-polled, reviews fetched, agent re-engaged as needed.
   */
  variants?: Record<string, VariantState>
}

/**
 * Part 4 (2026-05-14) — per-variant slice of a ManifestItem. Captures
 * fields that differ per parallel migration run on the same component.
 */
export interface VariantState {
  status:
    | 'queued'
    | 'in_progress'
    | 'awaiting_ci'
    | 'awaiting_review'
    | 'ready_to_merge'
    | 'done'
    | 'needs_human'
    | 'blocked'
  pr: string | null
  branch: string | null
  worktree: string | null
  iterations: number
  merged_at: string | null
  escalation_reason?: string | null
  last_ci_green_at?: string | null
  last_review_seen_at?: string | null
  review_iterations?: number
  /**
   * Count of consecutive review-sweep agent invocations that exited
   * non-zero WITHOUT a no-progress signal (i.e. process-level / transient
   * failures: Anthropic 529, network blip, OOM, prompt-assembly bug).
   * Reset to 0 on any successful review-sweep iteration. Used by
   * `sweepOne` to keep status at `awaiting_review` for the first few
   * transient failures (resumable) instead of immediately escalating to
   * `needs_human` (terminal). Caps at REVIEW_ITER_FAILURE_BUDGET → then
   * escalates with the usual reason.
   */
  review_iter_failures?: number
  session_id?: string | null
  awaiting_ci_since?: string | null
  /**
   * Per-variant operator/reviewer rule-exceptions on this variant's PR.
   * See {@link OperatorOverride}. Authoritative; flat ManifestItem field
   * mirrors the v1 slot.
   */
  operator_overrides?: readonly OperatorOverride[]
  /** Per-variant reviewer-confirmed graduation requests. See {@link GraduationRequest}. */
  graduation_requests?: readonly GraduationRequest[]
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
 * Reasoning-effort level for the spawned agent. Maps directly to Claude
 * Code's `CLAUDE_EFFORT` env var. Higher = more compute spent per turn.
 */
export type Effort = 'low' | 'medium' | 'high' | 'max'

/**
 * Model + reasoning configuration for a spawned `claude -p` subagent.
 * Applied by `agent.invoke` (orchestrator-core) to `--model` + spawn env
 * (`CLAUDE_EFFORT`, `MAX_THINKING_TOKENS`). Default value lives in
 * `orchestrator-core.ts` as `DEFAULT_MODEL_CONFIG`; CLI flags
 * (`--model`, `--effort`, `--no-thinking`, `--thinking-tokens`) merge over
 * the default in `parseOptions`.
 */
export interface ModelConfig {
  /** Full model ID or CLI alias (e.g. `claude-opus-4-7`, `opus`, `sonnet`). */
  model: string
  /** Sets `CLAUDE_EFFORT` env. */
  effort: Effort
  /** Sets `MAX_THINKING_TOKENS` env. 0 disables extended thinking entirely. */
  thinkingTokens: number
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
   * Sweep-mode extension (2026-05-22) — only meaningful alongside
   * `--review-sweep`. When set, the agent ALSO audits the entire PR
   * diff against the loaded canonical standards docs
   * (`PICASSO_COMPONENT_DESIGN_PATTERNS.md`,
   * `docs/migration/references/design-patterns-addendum.md`,
   * `docs/migration/references/code-standards.md`,
   * `docs/migration/references/practices.md`) regardless of whether
   * new reviewer activity landed.
   *
   * Findings flow through the same HIGH/MEDIUM confidence matrix as
   * the conversational review-response protocol:
   *   - HIGH (clear documented-rule violation, no carve-out applies)
   *       → fix in code + reply IN-THREAD on the offending line
   *   - MEDIUM (preferred / lint-style, multiple plausible fixes)
   *       → post inline comment on the offending line with proposal
   *         + 👍 ask; do NOT edit
   *   - existing-violations carve-out (design-patterns-addendum.md §1)
   *       → skip silently
   *
   * Use case: after a graduation pass updates `practices.md`, run
   * `pnpm orchestrate --review-sweep --with-standards` to back-port
   * the newly graduated patterns to every in-flight PR.
   *
   * Bypasses the quiet-tick early-exit and the LGTM-only short-circuit
   * so the agent runs the audit even on otherwise idle PRs (an
   * approved-but-stale PR with a fresh rule violation must surface
   * the finding before it auto-advances to `ready_to_merge`).
   *
   * CLI: `--with-standards`.
   */
  readonly withStandards: boolean

  /**
   * Graduate patterns from the lessons-learned audit log into the curated
   * practices.md. Mutually exclusive with all other modes. Reads
   * `docs/migration/references/lessons-learned.md` (append-only log of
   * post-success extractions) and `docs/migration/references/practices.md`
   * (canonical doc loaded into every migration prompt). Identifies new
   * lessons entries since `practices.md`'s "Last graduation" date, clusters
   * them by theme, and updates `practices.md` with patterns that meet the
   * graduation criteria (≥ 3 occurrences OR cited by reviewer).
   *
   * Process is implemented as a single focused `claude -p` invocation
   * with Read/Edit/Write/Bash/Grep tools allowed. No worktree or
   * agent-loop machinery — graduation is a doc-curation task.
   *
   * CLI: `--graduate`.
   */
  readonly graduate: boolean

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

  /**
   * Variant suffix appended to branch name + worktree path. Default: `'v1'`.
   *
   * Use case: produce multiple parallel PRs for the same component to
   * compare orchestrator/prompt iterations side-by-side without losing
   * the previous attempt. Example:
   *
   *     pnpm orchestrate --component=Badge --variant=v2
   *     # → branch: migrate-Badge-v2
   *     # → worktree: migration-runs/<date>/Badge-v2/worktree
   *     # → PR opens fresh on migrate-Badge-v2
   *
   * The default `v1` is applied even when `--variant` is not passed —
   * every migration's branch+worktree gets a versioned suffix for clarity.
   *
   * Status-filter bypass: when `--variant` is EXPLICITLY passed (regardless
   * of value), `pickNext` skips the "is item queued/in_progress/awaiting_ci"
   * check. So `--variant=v2` works even when the manifest's status is
   * `awaiting_review` / `needs_human` / `done` — the variant is an
   * independent fresh run, not a continuation of prior state.
   *
   * CLI: `--variant=<suffix>` (default `v1`).
   */
  readonly variant: string

  /**
   * Was `--variant` explicitly passed (truthy) vs defaulted to `'v1'`?
   * Used by `pickNext` to decide whether to bypass the status filter:
   * explicit variant → bypass (operator explicitly chose a parallel run);
   * default `v1` → respect the filter (treat as normal first run).
   */
  readonly variantExplicit: boolean

  /**
   * Model + reasoning config for the spawned `claude -p` subagent.
   * Defaults to `DEFAULT_MODEL_CONFIG` (Opus 4.8 + effort=max + 64k thinking).
   * CLI overrides: `--model`, `--effort`, `--no-thinking`, `--thinking-tokens`.
   * See plan `~/.claude/plans/question-what-model-and-reflective-pie.md`.
   */
  readonly modelConfig: ModelConfig
}
