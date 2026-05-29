# Decision — `feature/picasso-modernization` integration branch

**Status:** **LOCKED** (PF-1992 design conversations, May 2026); branch already created on origin.
**Date:** 2026-05-04 (decision); 2026-05-06 (branch renamed `picasso-modernization` → `feature/picasso-modernization` to match Picasso CI's `master` + `feature/**` trigger config).
**Risk reference:** [migration plan v4 §10](../../modernization/PI-4318-P1-MOD-01-migration-plan.md#10-sequence-proposal-phase-2), [`PI-4318-PF-1992-design-decisions.md` §2](../../modernization/PI-4318-PF-1992-design-decisions.md).
**Affected manifest entries:** all 28 component-migration units (universal).

---

## Decision

All per-component migration PRs land on a long-lived `feature/picasso-modernization` integration branch (not `master`). The integration branch merges to `master` after each completed tier as a single squash-merge.

The orchestrator's `Workflow.baseBranch` is `feature/picasso-modernization`; `gh pr create --base feature/picasso-modernization --assignee @me` is the canonical PR-create shape.

## Why

Three options were considered:

| Option | Description | Verdict |
|---|---|---|
| A | Per-component PRs land directly on `master` | ❌ Master sees ~30 modernization PRs interleaved with non-modernization work; revert blast radius is per-PR; main-branch CI noise is high |
| **B** (chosen) | Long-lived `feature/picasso-modernization` integration branch; tier-level squash-merge to master | ✅ Single revertible point per tier; master stays clean of half-migrated state; Optional `picasso@next` dist-tag from integration branch for early consumer testing |
| C | One mega-PR with all 30 component migrations | ❌ Unreviewable; locks the whole migration behind one merge gate; Happo diff fatigue at scale |

Option B mirrors how large refactors typically land in monorepos: an integration branch absorbs incremental work; main branch absorbs reviewed, batched outcomes.

## Branch name — why `feature/` prefix?

Picasso's CI workflows in `.github/workflows/` only fire on PRs targeting `master` or `feature/**`. A bare `picasso-modernization` base would silently bypass the full Static checks pipeline (Jest, lint, etc.), defeating the purpose of the integration branch. Empirically hit during canary 22 (PR #4928, May 6, 2026): only Check + Danger ran; Static checks never triggered. The branch was renamed `picasso-modernization` → `feature/picasso-modernization` the same day to restore full CI coverage.

## Operator workflow

1. **Daily rebase ritual** (operator runs once per day):
   ```bash
   git checkout feature/picasso-modernization
   git pull --rebase origin master
   git push --force-with-lease origin feature/picasso-modernization
   ```
   Keeps the integration branch close to master so per-tier merges don't conflict.
2. **Per-tier merge to master** (after a tier's components all reach `done`):
   - Final review of the cumulative diff (`gh pr create --base master --head feature/picasso-modernization`)
   - Squash-merge with descriptive message (e.g. "Tier 1 modernization: peerDeps cleanup + type-only fixes across 11 components")
   - The integration branch immediately rebases on the new master tip
3. **Optional `picasso@next` dist-tag** publishing during Phase 2 (decision still open per migration plan v4 §12):
   - From `feature/picasso-modernization`, publish `@next`-tagged versions for early Staff Portal canary testing.
   - Enables breaking-change detection BEFORE the final master merge.

## Branch protection (configured on origin)

| Rule | Setting | Why |
|---|---|---|
| Required reviews | 1+ | Cheap quality bar; orchestrator-driven PRs still benefit from human eyes on visual diffs |
| Required CI checks | Match `master` protection | Same coverage; per the `feature/**` trigger config in `.github/workflows/` |
| Direct pushes | Disabled | Force PRs even for hotfixes; preserves audit trail |

## How agents apply this

The orchestrator's `migrationWorkflow.baseBranch = 'feature/picasso-modernization'` (in `bin/migration-orchestrator.ts`). Every `--component=X` / `--batch` / `--review-sweep` invocation reads this, so individual agents don't need to know. The dry-run plan output (`yarn orchestrate --dry-run`) prints the resolved base in step 11.

For the merge-to-master step, the orchestrator does NOT auto-merge (operator preference). The `Workflow.onPostMerge` hook fires when `--review-sweep` detects a manually-merged PR; for now it just copies Tier 0 source into `docs/migration/reference/` (Tier 2.4).

## Verification

- `git ls-remote --heads origin feature/picasso-modernization` returns a non-empty SHA.
- `yarn orchestrate --component=<X> --no-merge --dry-run` prints `gh pr create --base feature/picasso-modernization --assignee @me ...` in its step-11 plan.
- A canary PR (e.g. canary 24, PR #4930) triggered the full Static checks + Integration Tests pipeline (proves the `feature/**` glob).
- Branch protection settings on origin match `master`'s settings (reviewers, required checks, no direct pushes).
