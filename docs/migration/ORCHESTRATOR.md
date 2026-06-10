# Orchestrator runbook

Compact runbook for `bin/migration-orchestrator.ts`. Detailed knowledge lives in `references/` and is loaded by the orchestrator on demand.

```
                            ┌─────────────────────────────┐
                            │  bin/migration-orchestrator │
                            │           .ts               │
                            └───────────┬─────────────────┘
                                        │ ↓ supplies migration descriptor
                            ┌───────────▼─────────────────┐
                            │   bin/lib/                  │
                            │     orchestrator-core.ts    │  ← workflow-agnostic
                            │     workflow.ts             │
                            └───────────┬─────────────────┘
                                        │ ↓ on demand
   ┌──────────────────┬──────────────┼─────────────────┬────────────────┐
   ↓                  ↓              ↓                 ↓                ↓
 PROMPT-{light,    rules/*.md   references/*.md   reference/*.tsx   tokens/*.md
 heavy}.md          (always)   (per phase/tier)  (post-canary —    (always)
 (per item tier)                                  see §References
                                                   below)
```

## Quick start

```bash
# Dry run (no writes, no PRs)
pnpm orchestrate --component=Note --dry-run

# Sandbox: open a PR, do not merge (PF-1992 canary)
pnpm orchestrate --component=Note --no-merge

# Real run, single component
pnpm orchestrate --component=Note

# Real run, all queued items in a tier
pnpm orchestrate --tier=1

# Strip review-aid comments from an open PR before merging it manually
pnpm orchestrate --cleanup --component=Slider --variant=vedrani --dry-run   # preview
pnpm orchestrate --cleanup --component=Slider --variant=vedrani             # apply + push
```

CLI flags: `--component=<id>`, `--tier=<N>`, `--dry-run`, `--no-merge`, `--review-sweep`, `--cleanup`, `--agent=claude|cursor|codex`, `--max-iterations=<N>` (default 3), `--base-branch=<ref>` (override the workflow's PR target for this run).

## Cleanup before merge (`--cleanup`)

A standalone, operator-invoked pass that strips **review-aid comments** (multi-paragraph migration
narration, `see …md §X` doc pointers, `@mui/base`-vs-`@base-ui/react` history, restatement-of-code)
from an open PR's diff right before you merge it manually. It preserves load-bearing comments
(eslint-disable rationale, `@ts-expect-error` reasons, `@deprecated`/Props JSDoc, `TODO(tokens):`,
ownerState-passthrough and mirrored-legacy-flag notes). Protocol: `PROMPT-cleanup-comments.md`.

Decoupled from `--review-sweep`: it does **not** read approvals, does **not** change `status`, and
**never merges**. One focused agent pass over the PR's `+`-added lines, then a package-scoped verify
(`build:package` + `davinci-syntax lint` — comment removal can only break the build via a malformed
block comment), then commit `[cleanup] strip review-aid comments` + push.

```bash
pnpm orchestrate --cleanup --component=<Name> [--variant=<id>] [--dry-run]
```

- **`--dry-run`** prints the proposed strip and restores the worktree — no commit, no push, no state
  change. Run it first to eyeball what would go.
- Idempotent via `cleanup_done_at` on the variant (a record, not a gate). Re-running is a no-op once
  nothing strippable remains.
- **Re-approval caveat:** the pushed commit changes HEAD, which dismisses the existing approval on
  branch-protected repos. That's why this is an explicit pre-merge step — re-approve (or admin-merge)
  after it lands, then merge manually.
- Log: `<runDir>/agent.cleanup.log` (alongside the variant's worktree).
- **Retry:** clear `cleanup_done_at` from the manifest entry to re-run a fresh pass from scratch.
- Requires an existing worktree on the variant's branch and a **clean** working tree (it refuses on
  uncommitted changes so it never folds local edits into the cleanup commit).

## Prerequisites

- `gh` authenticated with `repo` + `read:org` scopes. Verify: `gh auth status`.
- `ssh-add -l` shows your GitHub SSH key loaded (the orchestrator's `git push` step uses SSH per Picasso's `origin` remote). On macOS after reboot, run `ssh-add --apple-use-keychain ~/.ssh/id_ed25519` (or whichever key) to load from Keychain.
- `pnpm install` clean.
- **`NPM_TOKEN` set in env** — without it, pnpm silently drops the `.npmrc` parse on the `${NPM_TOKEN}` substitution failure and falls back to `nodeLinker: isolated` mode, which doesn't hoist `@types/*` to top-level `node_modules` (tsc then can't resolve react types). Picasso operators typically have it via `direnv` on `~/Projects/.envrc` (the orchestrator's `loadEnvrcUpwards` finds it automatically). Without direnv, set `NPM_TOKEN=dummy` is sufficient — pnpm only uses the token to authenticate fetches, not for layout decisions.
- Node v22.20.0 (per `.nvmrc` + `engines`). `nvm use 22.20.0`. The webpack patch this branch ships (`patches/webpack@5.98.0.patch`) fixes the symlink-dedup `RangeError` in `FileSystemInfo.js` that crashes Storybook startup on Node 22; the patch lands automatically via `pnpm.patchedDependencies`.
- Working tree clean. Worktree base defaults to `HEAD` (current branch tip) — see [bin/lib/orchestrator-core.ts `worktree.add`](../../bin/lib/orchestrator-core.ts) for the rationale.
- For full gate including Happo: `HAPPO_API_KEY` + `HAPPO_API_SECRET` set in env (see §Happo setup below).
- For sandbox / smoke runs: set `MIGRATION_GATE_HAPPO=skip` to bypass Happo.

### Lockfile-form policy (revised 2026-05-13)

`pnpm-workspace.yaml` has `linkWorkspacePackages: true`. The committed `pnpm-lock.yaml` (master + integration branches as of 2026-05-13 baseline reset) uses the **compact `link:packages/X` form** for workspace deps — e.g. `'@toptal/picasso-shared': version: link:packages/shared` — NOT the expanded peer-suffix form `15.0.0(@material-ui/core@4.12.4(...))(@toptal/picasso-provider@5.0.2(...))...` that earlier prompt versions assumed.

Both forms are valid pnpm output. The compact form is preferred because:
- ~7,500 fewer lines of lockfile (~36k vs ~43k)
- Migration PR diffs become tiny (<300 lines) — workspace deps are stable references that don't change per migration
- No transitive changeset-bot false positives from peer-suffix cascade dedupe

**Earlier policy** (REVOKED 2026-05-13): the agent was instructed to run `pnpm install --config.link-workspace-packages=false`. That flag forces the expanded form. Reasoning at the time was concern about `BreadcrumbsItem.tsx` TS2322 / happo gate breakage from "cascade rewrites" — turned out to be a different problem (peer-suffix re-emission, not link:packages/X itself). The flag mandate was the root cause of the Backdrop PR #4954 6,875-line lockfile diff.

**Current policy**:
- Agent runs **plain `pnpm install`** (no workspace-link override flag).
- The committed lockfile baseline (master + post-reset feature branches) is already in compact `link:packages/X` form. pnpm preserves that form for unchanged workspace entries during incremental installs.
- Expected migration lockfile diff: < 300 lines. If > 1000 lines OR `link:packages/X` lines are being replaced with expanded peer-suffix form, the agent (or someone) passed the override flag — reset with `git checkout origin/<base-branch> -- pnpm-lock.yaml && pnpm install` (plain).

If a Tier 0 migration genuinely needs a different transitive resolution (e.g. `@base-ui/react^1.4.1` added, `@mui/base` removed), expect those lines specifically to change in the diff — the rest of the workspace stays stable.

### Mandatory Playwright runtime check (when `--with-mcp` is active)

[PROMPT-light.md](PROMPT-light.md) / [PROMPT-heavy.md](PROMPT-heavy.md) now require the agent to use Playwright MCP for runtime verification before exiting. Specifically:

- Navigate to `http://localhost:9001/` and discover the component's story URLs (Picasso's story IDs don't follow a fixed `--default` pattern — e.g. Backdrop is `--backdrop` + `--invisible`).
- **Trigger the component**, not just the story's wrapper button. Many stories show only an "Open X" button; the migrated thing is hidden until clicked. The agent must click to mount and then verify.
- `browser_console_messages` after initial render AND after each interaction; zero `[error]` entries (React 18's `ReactDOM.render` deprecation excepted).
- Use judgment on which interactions to exercise — the bar is "would a reasonable reviewer think the migration was verified".

This complements (not replaces) Happo. Happo catches pixel regressions vs. baselines; the Playwright check catches runtime errors that never reach a Happo baseline (silent throws, hydration mismatches, console.error during interaction).

## Happo setup

The gate runs Happo on two paths when applicable:

1. **Storybook visual regression** — `pnpm happo --only <Component>`. Runs against the `Picasso/Storybook` project. Required env: `HAPPO_API_KEY`, `HAPPO_API_SECRET`. Per-component filtering via `--only` matches example names (case-sensitive substring on the story descriptor).
2. **Cypress visual regression + verify** — `pnpm happo-e2e -- pnpm test:setup cypress run --component --spec <SPEC>` uploads to the `Picasso/Cypress` project (keyed to HEAD); the gate then **verifies** that comparison via `happo-verify.ts` and writes `happo-verify-cypress.json` (**advisory by default**). Only fires when the component has a Cypress spec at `cypress/component/<Component>.spec.tsx` AND Happo creds are present. The gate auto-sets `HAPPO_PROJECT=Picasso/Cypress` for this stage. See §"Cypress visual verification" below.

If Happo creds are unset, the gate's Happo stage skips with a clear log line; the Cypress stage degrades to plain Cypress (no visual diff). The gate's other stages (build/tsc/lint/jest/react19) are unaffected.

**Setting creds — three options:**

```bash
# 1. Inline (one-shot):
HAPPO_API_KEY=... HAPPO_API_SECRET=... pnpm orchestrate --component=Note

# 2. Source from a project-level .envrc (direnv users — direnv hook may not
#    propagate to non-interactive subprocesses; source explicitly per run):
source /Users/<you>/Projects/.envrc && pnpm orchestrate --component=Note

# 3. Wrap with direnv exec (loads .envrc automatically):
direnv exec . pnpm orchestrate --component=Note
```

### Cypress visual verification (2026-06-10)

The gate now **verifies** the Cypress-Happo comparison, not just uploads it. After the Cypress stage uploads a `Picasso/Cypress` report for HEAD — the gate sets `HAPPO_CURRENT_SHA=$HEAD_SHA` so `happo-e2e`'s auto-finalize keys the report to HEAD, **superseding the earlier "single report, not a comparison" behavior** — step 6 runs `happo-verify.ts --project-id=$HAPPO_CYPRESS_PROJECT_ID --project-label=Picasso/Cypress` and writes `happo-verify-cypress.json`. The orchestrator re-fetches the Cypress diff PNGs into `happo-diffs/<loop>-iter-N-cypress/` so the agent can see + fix them, folds both suites into stuck-detection, and considers both in the small-residual auto-PR classifier.

- **Advisory by default** — a Cypress diff is surfaced to the agent but does **not** block the gate. Promote to a hard gate per-run with `MIGRATION_GATE_HAPPO_CYPRESS_STRICT=1`; disable entirely with `MIGRATION_GATE_HAPPO_CYPRESS=skip`. (Cypress visual tests can be flakier than Storybook — animation/timing/render-order — hence advisory until proven.)
- **Project IDs** are wired in `buildHappoGateEnv` (`bin/lib/orchestrator-core.ts`): account `675`, Storybook `HAPPO_STORYBOOK_PROJECT_ID=1189`, Cypress `HAPPO_CYPRESS_PROJECT_ID=848`.
- **Baseline = master.** The integration branch has no Cypress baseline, so the verifier's base cascade (`merge-base → base-HEAD → master`) lands on master. Because the gate runs only the migrated component's own spec, the local Cypress comparison is a clean, component-scoped diff set — but **cross-component Cypress regressions** (e.g. a Checkbox change breaking `Table/selectable`) are a **CI-only signal**: a single-spec local run can't reproduce them.
- **Operator-approved deltas** work for Cypress snapshot IDs too (`<Component>/<variant>/<target>` under `## Approved visual deltas` in `docs/migration/components/<Component>.md`).
- `HAPPO_PREVIOUS_SHA` is not set by the gate; the verifier derives the base via its own cascade.

## Output paths

```
migration-runs/<YYYY-MM-DD>/<id>/
├── worktree/                 # git worktree (removed on success, kept on escalation)
├── pre/                      # snapshot before migration (.d.ts, imports, package.json)
├── post/                     # snapshot after migration
├── prompt.<iter>.txt         # the assembled prompt for iteration N
├── agent.<iter>.log          # agent stdout/stderr
├── <stage>.log               # changeset, lockfile-drift, syncpack, build, tsc, lint, jest, consumers, cypress, happo, react19
├── report.md                 # gate report (PASS/FAIL summary)
├── diff.md                   # diff report (PR body)
└── escalation.md             # written only on escalation
```

## Changesets

Every migration PR must include a `.changeset/<component-kebab>-migration.md` file. The agent authors it during the migration loop (see [PROMPT-light.md](./PROMPT-light.md) / [PROMPT-heavy.md](./PROMPT-heavy.md) §7); the gate's `changeset` stage (first stage, fail-fast) blocks PR creation if it's missing.

Why per-PR: `.changeset/*.md` files accumulate on `feature/picasso-modernization` as migrations merge through `feature/picasso-modernization-temp`. At release time, `pnpm changeset version` aggregates every per-PR file into one consolidated CHANGELOG entry per workspace package — no manual changelog editing needed. Per-PR files avoid the merge-conflict cost of a single growing file.

**Version bump source of truth.** Each component's `versionBump` is locked in [`manifest.json`](./manifest.json) (`patch` | `minor` | `major`) and enforced by [`manifest.schema.json`](./manifest.schema.json). The decision matrix was set per the [classes-audit decisions](./decisions/) cross-referenced with [`docs/contribution/changeset-guidelines.md`](../contribution/changeset-guidelines.md) — Tier 0 components dropping public `classes` are `major`; Tier 1 no-op cleanup (peer-dep + React 19 cap) is `patch`; Tier 3.b components keeping locally narrowed `classes` (Dropdown, OutlinedInput) are `patch`. Agents must read the manifest value and not deviate; if the value looks wrong for a specific migration, escalate rather than override.

**Precedence (migration PRs ↔ taxonomy)**: `manifest.json#versionBump` is authoritative for the agent. The version-bump taxonomy in [`references/code-standards.md` §"Changeset conventions"](./references/code-standards.md) describes the rules that drove the manifest matrix and is the authoring guidance for reviewer judgment on non-migration PRs — it does NOT override the manifest value for in-flight migration PRs.

**Opt-out:** `MIGRATION_GATE_CHANGESET=skip` bypasses the gate stage. Used by orchestrator self-tests + `--dry-run` sandbox runs that exercise the gate without authoring real changesets. Not for production migrations.

## Kill switch

`Ctrl-C` the orchestrator. In-flight PRs stay open for human takeover. Worktree stays on disk; manifest entry stays at `status=in_progress` until you reset it. To resume after a kill:

1. Inspect `migration-runs/<date>/<id>/` for the last gate report.
2. Either:
   - Reset to `queued` (delete the worktree, delete the branch, set `iterations: 0`) and re-run.
   - Or hand-finish, set `status=done`, `merged_at=<ts>`.

## Sandbox mode (`--no-merge`)

Designed for the PF-1992 Note canary. Stops after `gh pr create`. No CI polling, no merge. Use to validate orchestrator wiring without auto-merging anything.

## Iter convergence — restructure, don't patch

If iter N (N ≥ 2) still shows *structural_difference* Happo classifications (not just pixel-level), prefer **restructuring the DOM** over patching the previous iter's CSS. Iterative CSS patching of a structurally-wrong DOM produces `!important`-laden code that defends the wrong structure — it may pass the gate but violates `rules/styling.md` §"@base-ui/react v1 prescriptions" and `references/base-ui-styling.md` §7.1 rung -1.

Canonical case study — Slider:
- **PR #4975 (v2, auto)**: iter 1 had structural Happo diff (Track in normal flow). Agent patched with `'!absolute'`. Iter 2 had opacity-cascade diff. Agent patched with class change. Iter 3 had sub-pixel positioning diff. Agent patched further. Iter 4 finally restructured to a sibling rail span — but kept the `!important` overrides from earlier iters. 4 iterations of accumulated patches; doctrine-dirty result.
- **PR #4959 (manual, human)**: structured DOM correctly on iter 1 (Track natively with `bg-color/alpha` so opacity doesn't cascade into Indicator). Zero `!important` from the start. Single iter to Happo green.
- **PR #4976 (manual fork)**: went one step further — removed the legacy `-mt -ml` margins that the rung-5 inline `style` overrides were defending. Happo had 7 sub-pixel diffs, classified as approved-delta (touch-target accessibility bump 15px → 19px). Doctrine-clean.

Operational habit: when reviewing iter N (N ≥ 2) gate output, if Happo shows *structural_difference* (not just pixel-level), STOP iter N+1 from patching the iter N CSS. Instead invoke the agent with explicit guidance to RESTRUCTURE the DOM per `references/base-ui-styling.md` §7.1 rung -1 + §7.2. Reviewer-led restart is cheaper than 3 more iters of accumulated patches.

## Trust boundaries

The orchestrator NEVER:
- Force-pushes a feature branch.
- Closes a PR without an explicit (not-yet-implemented) `--force-close` flag.
- Deletes the worktree when escalating.
- Modifies `manifest.json` outside the active loop.
- Merges without `gh pr merge --auto` (which requires APPROVED + CI green).
- Auto-resolves architectural review feedback.
- Retries past `--max-iterations`.

See [`references/escalation.md`](./references/escalation.md) for triggers + handoff procedure.

## References

`docs/migration/reference/` is **currently empty**. The previous Tailwind reference files (`Button.tsx`, `Button-styles.ts`, `Button-package.json`, `Switch.tsx`) were copied from `master` pre-#4906 and pointed at `@mui/base` — the wrong target stack under the v3 plan. They were dropped in PF-1992 Step 5 along with the prompt rewrite.

**Status of [PR #4906](https://github.com/toptal/picasso/pull/4906) (Button + Switch → `@base-ui/react`):**
- **OPEN** as of May 2026. Not merged.
- Branch carries `@base-ui/react: 1.2.0` replacing `@mui/base: 5.0.0-beta.58` in Switch's `package.json`.
- Verify before scaling Tier 0: `gh pr view 4906 --repo toptal/picasso --json state,mergedAt`.

**Reference re-introduction policy.** Pull canonical reference files into `reference/` when **either** of these gates fires (whichever is first):

1. **PR #4906 merges.** Copy the merged `packages/base/{Button,Switch}/src/...` files into `reference/Button.tsx`, `reference/Button-styles.ts`, `reference/Button-package.json`, `reference/Switch.tsx`. They become the canonical light-path references. Update `bin/migration-orchestrator.ts` → `migrationWorkflow.contextPack` to include them.
2. **Note canary completes the orchestrator's first end-to-end run.** The Note migration is dependency-cleanup-only (no source diff), so it's the first canonical orchestrator output. After Note's PR merges, link the merged commit from this section as the canonical loop reference. Light-path code references still wait on PR #4906 (or a fresh light-path migration of any Tier 0 component — likely Backdrop or Button — once the orchestrator scales).

Until then, the migration prompts (`PROMPT-light.md`, `PROMPT-heavy.md`) point to `reference/Button.tsx` etc. as planned-future paths. The orchestrator's `agent.assemblePrompt` gracefully skips files that don't exist on disk (per `bin/lib/orchestrator-core.ts` `existsSync` guard), so prompts run cleanly without the reference files. The agent compensates with `rules/base-ui-react-api-crib.md`, the per-component plan, and the source it's editing.

**Heavy-path reference (`reference/HEAVY-EXAMPLE.tsx`).** Mentioned in `PROMPT-heavy.md` per migration plan §5.3. Will be added when **the first Tier 2 heavy migration completes** (likely Tooltip — first within Tier 2 per dependency ordering). Until then, the agent works from `rules/jss-to-tailwind-crib.md` + `rules/base-ui-react-api-crib.md` alone.

## Known integration gaps

Originally surfaced by the PF-1992 Note canary attempt (2026-05-04, logs: `migration-runs/2026-05-04/Note/`). Status as of PF-1992 ship:

### 1. Worktree base default — FIXED

`bin/lib/orchestrator-core.ts` → `worktree.add` now defaults `base = 'HEAD'` (was `'master'`). During PF-1992 self-validation the worktree is forked from the current branch tip, which carries the orchestrator infrastructure. Post-PF-1992-merge, operators typically run from `master` (or a feature branch off master) — both resolve correctly via `HEAD`. Workflows that need to override pin can pass `base` explicitly to the function (CLI `--base=<ref>` follow-up if/when needed).

Trade-off: in-PF-1992 sandbox PRs forked from PF-1992's branch will show PF-1992 commits in their diff against master. Acceptable for sandbox validation; the canary PR is reviewed and closed/ignored, not merged.

### 2. Claude permission flags — FIXED (twice; expanded after PR #4906 lessons)

After the canary 12 (Button) escalation surfaced the inner-loop gap (the agent edited blind without `pnpm typecheck`/`pnpm lint` access), the allowlist was widened to match what Codex's PR #4906 implicitly relied on. `agent.invoke` now spawns:

```ts
'-p', '--allowedTools',
'Edit Write Read Glob Grep ' +
'Bash(pnpm typecheck) Bash(pnpm typecheck:*) Bash(pnpm lint:*) ' +
'Bash(pnpm --filter:*) Bash(pnpm davinci-qa:*) Bash(pnpm build:package) Bash(pnpm happo:*) ' +
'Bash(git diff:*) Bash(git status:*) Bash(git log:*)'
```

Verification-only Bash. Excluded on purpose: `Bash(pnpm add)`, `Bash(git commit | push)`, `Bash(gh:*)`, bare `Bash(*)`. `Bash(pnpm install)` is allowed (since 2026-05-07) so the agent can refresh `pnpm-lock.yaml` after editing package.json deps. Worktree provides physical isolation for state mutations; this allowlist provides the verification surface the agent needs without unbounded shell. See `bin/lib/orchestrator-core.ts` `agent.invoke` for the full rationale block + the PR #4906 comparison documented in `docs/migration/components/Button.md`.

For future Docker-isolated runners (post-PF-1994), the orchestrator can switch to `--dangerously-skip-permissions` matching `.thunderbot/`'s pattern, since the Docker boundary replaces the need for fine-grained tool restrictions.

### 3. Manifest `id`-field leak — FIXED

`manifest.read` previously mutated parsed entries with an enumerable `id` field for in-memory convenience; `manifest.write` then persisted those `id` fields to disk on every update. **Fix:** `Object.defineProperty(item, 'id', { enumerable: false })` so JSON.stringify skips it. Verified via JSON round-trip simulation + a real escalation cycle.

### 4. Cypress + Happo wiring — FIXED

`bin/migration-gate.sh` step 5 (Cypress) now wraps with `pnpm happo-e2e --` when `HAPPO_API_KEY` + `HAPPO_API_SECRET` are present in env, producing Cypress visual diffs alongside the standard Cypress component run. The gate auto-sets `HAPPO_PROJECT=Picasso/Cypress` for this stage. Without Happo creds, Cypress runs plain (no visual diff). Step 6 (Happo Storybook) gates on the same creds; logs a clear skip message when unset rather than failing inscrutably.

### 5. Gate / diff scripts run inside the worktree (long-term refactor opportunity)

The current design has `gate.sh` and `diff.sh` in the worktree's filesystem (because the orchestrator spawns them with `cwd = worktree`). This works as long as the worktree's base ref carries the scripts (now true post-Fix #1). Long-term, the cleaner architecture is to invoke the scripts from the main repo cwd with an explicit worktree-path arg, decoupling tooling location from migration content. Defer to PF-1994 day 1 if it surfaces friction.

### 6. CI polling + review classification + merge — INTENTIONALLY DEFERRED

`bin/lib/orchestrator-core.ts` → loop steps 11–13 are documented as intentionally not implemented in PF-1992 (see the `// Steps 11–13 (CI poll, review, merge) are intentionally **not implemented**` comment). The orchestrator currently stops at PR creation regardless of `--no-merge`. **Wires in PF-1994's first migration.**

### 7. Visual feedback during iteration — FIXED (opt-in via `--with-mcp`)

After comparing canary 12 (Button) against PR #4906, the second gap was visual feedback. Codex's agent inspected live Storybook via Playwright MCP during iteration and caught Base UI's `nativeButton` runtime warning by reading console output. Our agent had no equivalent.

Now, when the operator passes `--with-mcp`:

1. The orchestrator spawns `pnpm start:storybook` in the worktree (post-snapshot, pre-iteration).
2. Polls `http://localhost:9001` until ready (60s timeout; escalates on failure).
3. Passes `--mcp-config bin/lib/agent-mcp-config.json` to `claude -p` and grants `mcp__playwright__browser_*` tools.
4. Registers signal handlers (`exit`, `SIGINT`, `SIGTERM`) to kill the Storybook subprocess on any orchestrator exit path.

The MCP config (`bin/lib/agent-mcp-config.json`) points at `@playwright/mcp@latest` via `npx -y`. The agent can navigate to story URLs, screenshot, observe console logs, and exercise interaction states (hover/focus/click).

**Default: off.** Tier 1 cleanup migrations (peer-dep + type-only) don't need visual feedback. Tier 0 / 2 / 3 / 4 should opt in for any pixel-perfect-critical run. Adds ~30–60s startup per canary.

### 8. Working vs full acceptance criteria — FIXED (prompt-only)

`PROMPT-light.md` and `PROMPT-heavy.md` now split acceptance into "working" (build + unit + visual) for iteration feedback and "full" (working + typecheck + lint + cypress + happo) for declaring done. Mirrors the Codex prompt structure from PR #4906. Tells the agent that lint/typecheck warnings during iteration are normal — clean them up at the end rather than panic-editing public types into `any`. Direct response to canary 12's `any` regression.

### Validation summary (post-fix)

What this PF-1992 PR validates end-to-end (tabletop + canary):

- Schema validation (32 manifest entries, ajv green). ✓
- Manifest pickNext + dependency-aware filter. ✓
- Tier-aware prompt path resolution (Tier 0 → `PROMPT-light.md`, Tier 1+ → `PROMPT-heavy.md`). ✓
- Workflow descriptor type-safety + `promptFor(item)` indirection. ✓
- `gh` CLI auth + scopes. ✓
- Worktree creation (forked from `HEAD`). ✓
- Manifest `id` non-leak. ✓
- Architectural-purity check on `orchestrator-core.ts` (no migration-specific branching). ✓
- Agent invocation with permission flags (Note canary). ✓ (after Fix #2)
- Gate stages green inside the worktree (Note canary). ✓ (after Fix #1; pending second canary run with creds)
- Diff report markdown shape with real before/after `.d.ts` snapshots. ✓ (after Fix #1)
- gh PR creation with the diff report as PR body. ✓ (after Fix #1)
- Cypress + Happo wrapping when creds + spec present. ✓ (after Fix #4)

What requires PF-1994 day 1 to validate:

- CI poll + auto-merge on approval (#6 above).
- Gate / diff refactor (#5 above) — only if it surfaces friction.
- Tier 0 light-path migrations (PR #4906 calibration).

## How to add a new workflow

1. Create `bin/<workflow>-orchestrator.ts`. Copy `bin/migration-orchestrator.ts` as a template.
2. Build a Workflow descriptor (see `bin/lib/workflow.ts`). Provide `manifestPath`, `promptPath`, `gate`, `diff`, `branchName`, `prTitle`, `commitMessage`, `complexityFor`, `successCriteria`, `escalationCriteria`.
3. Author content under `docs/<workflow>/` mirroring the layout of `docs/migration/`. Reuse `docs/migration/references/{pr-workflow, commit-conventions, agent-loop, subagent-playbook, escalation}.md` if your workflow's needs match — otherwise override per file.
4. Add a script to `package.json`: `"<workflow>:run": "tsx bin/<workflow>-orchestrator.ts"`.
5. **Do not modify `bin/lib/orchestrator-core.ts`** for workflow-specific logic. If you need a new core capability, extend the `Workflow` interface and add the hook to the loop.

When workflow #2 lands, also follow up with a refactor ticket to promote shared `references/*.md` files into `docs/agent-workflows/references/`. See plan §Open decisions #4.

## Documentation index

- [migration-plan.md](./migration-plan.md) — full migration design (tiers, sequencing, risk register).
- [PROMPT.md](./PROMPT.md) — canonical migration prompt v1.
- [manifest.json](./manifest.json) + [manifest.schema.json](./manifest.schema.json) — work queue.
- [components/](./components/) — per-component plans (Tier 1 in PF-1992).
- [references/](./references/) — on-demand context (agent loop, PR workflow, commit conventions, subagent playbook, escalation).
- `reference/` — canonical migrated code. **Currently empty.** See §References below for the policy and the gating events that re-introduce content.
- [rules/](./rules/) — non-negotiable rules (styling, API preservation, JSS-to-Tailwind crib, **`@base-ui/react` API crib**).
- [tokens/](./tokens/) — Picasso Tailwind token reference.
- [decisions/](./decisions/) — locked architectural decisions (Backdrop replacement, Popper replacement). _Authored in PF-1992 Step 8._
- [archive/](./archive/) — deprecated content (e.g. v1 PROMPT.md preserved for diffability).

## Verification commands (PF-1992 sandbox checklist)

```bash
# 1. Schema validation
npx ajv-cli validate --strict=false \
  -s docs/migration/manifest.schema.json \
  -d docs/migration/manifest.json

# 2. Dry-run prints planned 14 steps
pnpm orchestrate --component=Note --dry-run

# 3. gh auth confirmed
gh auth status

# 4. Gate script syntax (bash 3.2 compatible — macOS default)
bash -n bin/migration-gate.sh

# 5. Diff script syntax
bash -n bin/migration-diff.sh

# 6. orchestrator-core.ts has no migration-specific logic
grep -E '\b(migrate|component|tier|happo|jest)\b' bin/lib/orchestrator-core.ts \
  | grep -v '//' | grep -v 'log\(' | head
# (expect: empty or only matches inside string literals / log strings)
```
