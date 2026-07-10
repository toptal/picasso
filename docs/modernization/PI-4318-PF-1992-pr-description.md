# PF-1992 — Migration orchestrator + supporting docs

Closes the PF-1992 ticket: ships the autonomous-migration orchestrator, gate scripts, diff helpers, locked decision docs, per-component plan files, prompt pack, manifest, and reference materials for the upcoming PF-1994 / PF-2024 / PF-2025 / PF-2020-2023 batches.

---

## TL;DR

A workflow-agnostic orchestrator that drives Claude Code subprocess invocations through a 14-step per-component loop: agent migrates source → gate (build/tsc/lint/jest/cypress/happo) → push → poll CI → classify failures → auto-fix or feed-to-agent → on green flip to `awaiting_review` → separate `--review-sweep` mode handles human reviews on its own cadence. Validated by 12+ canaries on Note + Form + Container + Button across the Tier 0/1 surface; per-canary cost ~$0.30-1.00 in Anthropic API.

The orchestrator is **single-workflow** today (migration); the `Workflow` interface is built for extension to future workflows (Figma → component, bug-fix, etc.) without touching the core loop.

This PR is **infrastructure-only**. Per-component migrations land as separate PRs against `feature/picasso-modernization` (already created), driven by `yarn orchestrate`.

---

## Scope

| Surface | Files | LOC |
|---|---|---|
| Orchestrator core (loop, state machine, retries, sweep, locks) | `bin/lib/orchestrator-core.ts` | ~3,000 |
| Workflow descriptor interface | `bin/lib/workflow.ts` | ~400 |
| Failure classifier (CI failure → action) | `bin/lib/failure-classifier.ts` | ~300 |
| Review classifier (PR comments → action) | `bin/lib/review-classifier.ts` | ~300 |
| Token telemetry (`cost.json` per canary) | `bin/lib/token-telemetry.ts` | ~250 |
| Migration workflow descriptor + entrypoint | `bin/migration-orchestrator.ts` | ~270 |
| Gate script (build/tsc/lint/jest/cypress/happo strict gate) | `bin/migration-gate.sh` | ~470 |
| Diff helper (prop-surface + import + happo summary) | `bin/migration-diff.sh` | ~260 |
| `classes` prop compatibility shim | `packages/base/Utils/src/utils/with-classes.ts` + tests | ~130 |
| Manifest (28 component-migration units) | `docs/migration/manifest.json` + schema | ~400 |
| Per-component plans (Tier 0 + Tier 1) | `docs/migration/components/*.md` | ~700 |
| Locked decision docs | `docs/migration/decisions/*.md` | ~700 |
| Agent prompts (light + heavy paths) | `docs/migration/PROMPT-*.md` | ~350 |
| Rules (api-preservation, styling, JSS crib, base-ui-react crib) | `docs/migration/rules/*.md` | ~600 |
| Token reference | `docs/migration/tokens/picasso-tailwind-tokens.md` | ~150 |
| References (agent-loop, escalation, PR workflow, lessons) | `docs/migration/references/*.md` | ~500 |
| Runbook | `docs/migration/ORCHESTRATOR.md` | ~300 |

**Total: ~5,400 LOC** (code) + ~3,500 LOC (markdown docs). Most documentation files are templated content, not contentious code.

---

## Reviewer guide — what to read in what order

This PR is large but has a clear priority hierarchy. Pick a slice based on your role; you don't need to read everything.

### Highest value (please review thoroughly)

**Engineering reviewer** — focus here:
- `bin/lib/orchestrator-core.ts` — the 14-step `run()` loop, `runBatch`, `runReviewSweep` + `sweepOne`, Phase 3.3 CI iteration, workspace-overlay fix, per-item locks.
- `bin/migration-gate.sh` — gate stage flow + the new strict Happo REST API gate (per migration plan v4 §6.3).
- `bin/lib/failure-classifier.ts` — pure-function CI-failure classifier; 10-step heuristic decision tree.
- `bin/lib/review-classifier.ts` — pure-function review classifier with confidence scoring.
- `packages/base/Utils/src/utils/with-classes.ts` — `classes` prop compatibility shim (consumer-API impact across 23 downstream repos).

**Domain / Picasso reviewer** — focus here:
- `docs/migration/decisions/` (4 docs):
  - `backdrop-replacement.md` — custom `<div>` + scroll-lock (no `@base-ui/react` analog)
  - `popper-replacement.md` — `@floating-ui/react` direct dependency (preserves position-anchored API)
  - `classes-shim.md` — Tailwind-routing shim policy (walks back v3-era "remove `classes`" plan)
  - `integration-branch.md` — `feature/picasso-modernization` long-lived branch
- `docs/migration/components/*.md` — 19 per-component plan files. Slot-keys section is canonical for the upcoming agent runs; corrections welcome.
- `docs/migration/PROMPT-light.md` + `PROMPT-heavy.md` — agent system prompts. Tier 0 (light) = `@mui/base` → `@base-ui/react` package swap; Tier 1+ (heavy) = full rewrite.
- `docs/migration/manifest.json` — 28 component-migration units across 6 tiers per migration plan v4 §3.9.

**Designer** — review one Tier 0 canary PR's Happo diffs once those land (intentional pixel changes from MUI v4 → `@base-ui/react` DOM cleanup are expected).

### Medium value (skim)

- `bin/lib/workflow.ts` — `Workflow` descriptor interface. **Note**: critique flagged this as premature abstraction (only 1 consumer today). Documented decision: leave as-is until 2nd workflow lands; inline post-migration if no 2nd workflow surfaces.
- `bin/lib/orchestrator-core.ts` — retry logic for `gh.viewPR` / `gh.createPR` / `gh.fetchJobLog` (3 similar 4-attempt exp-backoff blocks), Phase 3.3 iteration loop, token telemetry hooks, `.envrc` auto-load.
- `bin/lib/token-telemetry.ts` — reads Claude Code session jsonl (`~/.claude/projects/<encoded-cwd>/<session-id>.jsonl`), aggregates token usage, computes USD estimates at Sonnet 4.5 list pricing, writes `migration-runs/<date>/<id>/cost.json`.
- `docs/migration/rules/api-preservation.md` — preserved `classes` prop policy (per migration plan v4 §2.3).

### Lowest value (template / reference)

- `bin/migration-diff.sh` — diff snapshot/report shell helper.
- `docs/migration/tokens/picasso-tailwind-tokens.md` — token reference (auto-generated content).
- `docs/migration/rules/jss-to-tailwind-crib.md` + `styling.md` — JSS → Tailwind transformation table.
- `docs/migration/references/lessons-learned.md` — auto-accumulated by the orchestrator post-each-successful-PR; will grow during PF-1994.

---

## Architecture decisions (locked, May 2026)

Per `docs/modernization/PI-4318-PF-1992-design-decisions.md` + migration plan v4. Each has a decision doc:

| Decision | Doc | Rationale |
|---|---|---|
| Long-lived `feature/picasso-modernization` integration branch (renamed from `picasso-modernization` to fit Picasso CI's `master` + `feature/**` trigger config) | `decisions/integration-branch.md` | Single revertible point per tier; master stays clean of half-migrated state |
| Backdrop replacement = custom `<div>` + Tailwind + scroll-lock | `decisions/backdrop-replacement.md` | No standalone Backdrop in `@base-ui/react`; preserves external consumer API |
| Popper replacement = `@floating-ui/react` direct dep | `decisions/popper-replacement.md` | `@base-ui/react/popover` is trigger-anchored; would force every consumer to refactor |
| `classes` prop preserved via Tailwind-routing shim | `decisions/classes-shim.md` | Walks back v3-era "remove `classes`" plan; preserves ~80% of consumer usage in 23-repo portfolio |
| Strict Happo gate (zero-diff OR designer-accepted via REST API) | (lives inline in `bin/migration-gate.sh`; design captured in migration plan v4 §6.3) | Catches real visual regressions vs. flake retries |
| Async review sweep (decoupled from migrate-mode) | (in-code design comment in `bin/lib/orchestrator-core.ts`) | Operator review cadence is hours-to-days; sync wait blocks orchestrator |
| Per-item file locks at `migration-runs/.locks/<id>` (stale-PID detection) | (in-code) | Prevents concurrent migrate vs. sweep collisions |
| Token telemetry per canary | (in-code) | Operator visibility into per-component / aggregate spend |

---

## Validation evidence

The orchestrator is validated end-to-end by **12+ canary runs** on Note (sandbox), Form, Container, and Button against `feature/picasso-modernization`:

| Path | Validated by | Evidence |
|---|---|---|
| Inner gate loop (build → tsc → lint → jest → cypress → happo → react19) | All canaries 18-29 | `migration-runs/<date>/<id>/report.json` |
| `--batch` multi-component sequential | Validate C | `[batch] [1] ... [batch] [2] ... [batch] --max-items=2 cap reached` |
| Phase 3.3 CI iteration (auto-fix-snapshot + feed-to-agent) | Canary 19 / 20 / 28 | Auto-regenerated Pagination snapshots when Tier 0 ripple hit consumer packages |
| Workspace overlay (Phase 2.5b) | Canary 22+ | Consumer-package tests now resolve to worktree's source, not main repo's |
| Async sweep + per-item locks | Smoke-tested via dry-run + `--review-sweep` no-work | `[sweep] no items in awaiting_review state — nothing to sweep` |
| Token telemetry | Canary 29 + Validate C | Form: $0.54; Container: $0.41; Form (re-run): $0.24 |
| Resilience (5xx retries, spending-cap detect, 60s post-push sleep) | Canaries 25-29 | Each surfaced + fixed a distinct latent bug |
| Strict Happo gate | Smoke-tested at gate-stage level (not yet end-to-end on a real diff — needs Day 2 Tier 1 to fully exercise) | (Schema TBD — relies on Happo REST API shape; fall-through to PASS on shape mismatch) |

---

## Out of scope (separate tickets)

- **TypeScript 5.5/5.6 upgrade** (migration plan v4 §9.1) — separate parallel ticket; PF-1994 cannot start until both PF-1992 + the TS ticket land.
- **Pipelined state-machine refactor** (v4 Step 2) — current sequential `--batch` is adequate for one operator + Anthropic singleton; revisit post-migration if parallelism is needed.
- **Slack webhook** (v4 Step 3) — ergonomic polish, not load-bearing; deferrable.
- **Codemod authoring** for breaking-change props (`@toptal/picasso-codemod` v53+) — feeds PF-1995.
- **Tier 4 sibling packages** (charts, query-builder, RTE) — PF-2020/2021/2022.
- **Tier 5 provider runtime** (Picasso Provider rewrite + root peer-dep removal) — PF-2023.
- **`picasso@next` dist-tag publishing** during Phase 2 — design decision §9.9 still open.

---

## Known critique acknowledgments (deferred refactors)

A fresh-eyes architectural review surfaced four legitimate over-engineering hotspots. Each is left as-is for this PR because none ship migration value and all are low-risk to defer:

1. `Workflow` interface (`bin/lib/workflow.ts`) — premature abstraction with one consumer (migration). Inline as `MigrationWorkflow` post-migration if no 2nd workflow lands.
2. Three duplicate `gh.*` retry loops (`createPR`, `viewPR`, `fetchJobLog`) — collapse to a `withRetry<T>` helper. Cosmetic refactor; ~40 LOC saved.
3. `--with-mcp` flag (Playwright integration) never validated by any canary. Documented as experimental; enable for first Tier 2/3 component.
4. Token-telemetry's cache-tier breakdown (5m vs 1h) is informational; could slim to `{ iteration, costUsd }` per snapshot.

---

## Verification — how to test this PR locally

### Prerequisites
- Node 20+, Yarn 1.22.x, gh CLI authenticated, Claude Code logged in (`claude` subprocess auth lives in `~/.claude/`).
- `direnv` with `~/Projects/.envrc` exporting `HAPPO_API_KEY` + `HAPPO_API_SECRET` (or equivalent shell env). Orchestrator auto-loads from `.envrc` if direnv hook isn't active.

### Smoke tests (no API spend)
```bash
# Dry-run plan output for any Tier 1 component
yarn orchestrate --component=Form --no-merge --dry-run

# Sweep with no awaiting_review items → no-op
yarn orchestrate --review-sweep

# `--max-items=N` flag
yarn orchestrate --tier=1 --batch --no-merge --max-items=2 --dry-run

# `withClasses` shim unit tests
yarn jest packages/base/Utils/src/utils/__tests__/with-classes
```

### Real canary (~$0.30-0.50, ~12 min wall-clock)
```bash
# Pick a Tier 1 already-clean component and run end-to-end
yarn orchestrate --component=Note --no-merge --max-iterations=5 --ci-timeout-minutes=25
```

Watch the log for:
- `[loop] selected: Note (tier=1, status=queued, ...)`
- `[loop] gates pass on iteration 1`
- `[cost] iter 1: total $0.NN (in=N, out=N, cache_read=N)`
- `[loop] polling CI on https://github.com/toptal/picasso/pull/<N>`
- All checks green except possibly Happo (Picasso/Cypress) — known flake on Tier 1; designer-accept in Happo UI to clear

After completion, check:
- `migration-runs/<date>/Note/cost.json` — per-iter token + USD breakdown
- `migration-runs/<date>/Note/report.json` — structured gate report
- `docs/migration/manifest.json` — `Note.status` should be `awaiting_review`

### Verification of decision docs
Each decision doc is internally consistent and matches the in-code implementation:
- `decisions/backdrop-replacement.md` ⟷ Backdrop's `target_path: 'none'` in manifest
- `decisions/popper-replacement.md` ⟷ Popper's plan file in `components/Popper.md`
- `decisions/classes-shim.md` ⟷ `packages/base/Utils/src/utils/with-classes.ts` implementation
- `decisions/integration-branch.md` ⟷ `migrationWorkflow.baseBranch` in `bin/migration-orchestrator.ts`

---

## Test plan

- [ ] `yarn workspace @toptal/picasso-utils build:package` (compiles `withClasses` + tests)
- [ ] `yarn jest packages/base/Utils/src/utils/__tests__/with-classes.test.ts` (8/8 passing)
- [ ] `yarn typecheck` (full repo)
- [ ] `yarn eslint --ext=.ts bin/` (0 errors; warnings are pre-existing or acceptable)
- [ ] `yarn orchestrate --component=Note --dry-run` (planned 14 steps print correctly)
- [ ] `yarn orchestrate --review-sweep` (no-op when no `awaiting_review` items)
- [ ] At least 1 reviewer reads `decisions/*.md` and confirms each decision matches the in-code implementation
- [ ] At least 1 reviewer skims a Tier 1 plan file (e.g. `Note.md`) + a Tier 0 plan file (e.g. `Button.md`) to verify Slot keys + acceptance criteria are sensible
- [ ] At least 1 reviewer skims `bin/lib/orchestrator-core.ts:run()` flow

---

## Follow-ups (separate PRs after this lands)

1. **Day 2 Tier 1 batch** (PF-1994) — process all 11 Tier 1 cleanup-only / type-only-fix components via `yarn orchestrate --tier=1 --batch --no-merge`.
2. **Day 3 Tier 0 batch** (PF-1994) — 8 components in dependency order: Backdrop → Badge → Button → Slider → Switch → Tabs → Modal → Drawer.
3. **Day 4+ Tier 2 / Tier 3** (PF-2024 / PF-2025) — heavy migrations one at a time with operator review.
4. **Sweep cron** — `*/30 * * * * yarn orchestrate --review-sweep` (or operator-driven cadence).
5. **Critique simplifications** (post-migration) — collapse `gh.*` retries, inline `Workflow`, slim telemetry.

---

## Acknowledgments

- Migration plan v4 + design decisions per `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` + `PI-4318-PF-1992-design-decisions.md`.
- PR #4906 (Button + Switch on `@base-ui/react`) — the calibration baseline for Tier 0 light path.
- Canaries 18-31 series — each surfaced a distinct latent bug; full per-canary log in `migration-runs/`.

Refs: PF-1992
