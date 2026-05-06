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
yarn orchestrate --component=Note --dry-run

# Sandbox: open a PR, do not merge (PF-1992 canary)
yarn orchestrate --component=Note --no-merge

# Real run, single component
yarn orchestrate --component=Note

# Real run, all queued items in a tier
yarn orchestrate --tier=1
```

CLI flags: `--component=<id>`, `--tier=<N>`, `--dry-run`, `--no-merge`, `--agent=claude|cursor|codex`, `--max-iterations=<N>` (default 3).

## Prerequisites

- `gh` authenticated with `repo` + `read:org` scopes. Verify: `gh auth status`.
- `yarn install` clean.
- Working tree clean. Worktree base defaults to `HEAD` (current branch tip) — see [bin/lib/orchestrator-core.ts `worktree.add`](../../bin/lib/orchestrator-core.ts) for the rationale.
- For full gate including Happo: `HAPPO_API_KEY` + `HAPPO_API_SECRET` set in env (see §Happo setup below).
- For sandbox / smoke runs: set `MIGRATION_GATE_HAPPO=skip` to bypass Happo.

## Happo setup

The gate runs Happo on two paths when applicable:

1. **Storybook visual regression** — `yarn happo --only <Component>`. Runs against the `Picasso/Storybook` project. Required env: `HAPPO_API_KEY`, `HAPPO_API_SECRET`. Per-component filtering via `--only` matches example names (case-sensitive substring on the story descriptor).
2. **Cypress visual regression** — `yarn happo-e2e -- -- yarn test:setup cypress run --component --spec <SPEC>`. Runs against the `Picasso/Cypress` project. Only fires when the component has a Cypress spec at `cypress/component/<Component>.spec.tsx` AND Happo creds are present. The gate auto-sets `HAPPO_PROJECT=Picasso/Cypress` for this stage.

If Happo creds are unset, the gate's Happo stage skips with a clear log line; the Cypress stage degrades to plain Cypress (no visual diff). The gate's other stages (build/tsc/lint/jest/react19) are unaffected.

**Setting creds — three options:**

```bash
# 1. Inline (one-shot):
HAPPO_API_KEY=... HAPPO_API_SECRET=... yarn orchestrate --component=Note

# 2. Source from a project-level .envrc (direnv users — direnv hook may not
#    propagate to non-interactive subprocesses; source explicitly per run):
source /Users/<you>/Projects/.envrc && yarn orchestrate --component=Note

# 3. Wrap with direnv exec (loads .envrc automatically):
direnv exec . yarn orchestrate --component=Note
```

For the `HAPPO_PREVIOUS_SHA` / `HAPPO_CURRENT_SHA` env vars (Cypress-Happo CI mode per [README §Run Happo locally for Cypress](../../README.md#run-happo-locally-for-cypress)): the gate does **not** set these — they're optional and only matter for cross-commit comparison reports. The orchestrator's per-component runs produce a single Happo report per iteration, not a comparison.

## Output paths

```
migration-runs/<YYYY-MM-DD>/<id>/
├── worktree/                 # git worktree (removed on success, kept on escalation)
├── pre/                      # snapshot before migration (.d.ts, imports, package.json)
├── post/                     # snapshot after migration
├── prompt.<iter>.txt         # the assembled prompt for iteration N
├── agent.<iter>.log          # agent stdout/stderr
├── <stage>.log               # build, tsc, lint, jest, cypress, happo, react19
├── report.md                 # gate report (PASS/FAIL summary)
├── diff.md                   # diff report (PR body)
└── escalation.md             # written only on escalation
```

## Kill switch

`Ctrl-C` the orchestrator. In-flight PRs stay open for human takeover. Worktree stays on disk; manifest entry stays at `status=in_progress` until you reset it. To resume after a kill:

1. Inspect `migration-runs/<date>/<id>/` for the last gate report.
2. Either:
   - Reset to `queued` (delete the worktree, delete the branch, set `iterations: 0`) and re-run.
   - Or hand-finish, set `status=done`, `merged_at=<ts>`.

## Sandbox mode (`--no-merge`)

Designed for the PF-1992 Note canary. Stops after `gh pr create`. No CI polling, no merge. Use to validate orchestrator wiring without auto-merging anything.

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

After the canary 12 (Button) escalation surfaced the inner-loop gap (the agent edited blind without `yarn typecheck`/`yarn lint` access), the allowlist was widened to match what Codex's PR #4906 implicitly relied on. `agent.invoke` now spawns:

```ts
'-p', '--allowedTools',
'Edit Write Read Glob Grep ' +
'Bash(yarn typecheck) Bash(yarn typecheck:*) Bash(yarn lint:*) ' +
'Bash(yarn workspace:*) Bash(yarn davinci-qa:*) Bash(yarn build:package) Bash(yarn happo:*) ' +
'Bash(git diff:*) Bash(git status:*) Bash(git log:*)'
```

Verification-only Bash. Excluded on purpose: `Bash(yarn add | install)`, `Bash(git commit | push)`, `Bash(gh:*)`, bare `Bash(*)`. Worktree provides physical isolation for state mutations; this allowlist provides the verification surface the agent needs without unbounded shell. See `bin/lib/orchestrator-core.ts` `agent.invoke` for the full rationale block + the PR #4906 comparison documented in `docs/migration/components/Button.md`.

For future Docker-isolated runners (post-PF-1994), the orchestrator can switch to `--dangerously-skip-permissions` matching `.thunderbot/`'s pattern, since the Docker boundary replaces the need for fine-grained tool restrictions.

### 3. Manifest `id`-field leak — FIXED

`manifest.read` previously mutated parsed entries with an enumerable `id` field for in-memory convenience; `manifest.write` then persisted those `id` fields to disk on every update. **Fix:** `Object.defineProperty(item, 'id', { enumerable: false })` so JSON.stringify skips it. Verified via JSON round-trip simulation + a real escalation cycle.

### 4. Cypress + Happo wiring — FIXED

`bin/migration-gate.sh` step 5 (Cypress) now wraps with `yarn happo-e2e -- --` when `HAPPO_API_KEY` + `HAPPO_API_SECRET` are present in env, producing Cypress visual diffs alongside the standard Cypress component run. The gate auto-sets `HAPPO_PROJECT=Picasso/Cypress` for this stage. Without Happo creds, Cypress runs plain (no visual diff). Step 6 (Happo Storybook) gates on the same creds; logs a clear skip message when unset rather than failing inscrutably.

### 5. Gate / diff scripts run inside the worktree (long-term refactor opportunity)

The current design has `gate.sh` and `diff.sh` in the worktree's filesystem (because the orchestrator spawns them with `cwd = worktree`). This works as long as the worktree's base ref carries the scripts (now true post-Fix #1). Long-term, the cleaner architecture is to invoke the scripts from the main repo cwd with an explicit worktree-path arg, decoupling tooling location from migration content. Defer to PF-1994 day 1 if it surfaces friction.

### 6. CI polling + review classification + merge — INTENTIONALLY DEFERRED

`bin/lib/orchestrator-core.ts` → loop steps 11–13 are documented as intentionally not implemented in PF-1992 (see the `// Steps 11–13 (CI poll, review, merge) are intentionally **not implemented**` comment). The orchestrator currently stops at PR creation regardless of `--no-merge`. **Wires in PF-1994's first migration.**

### 7. Visual feedback during iteration — FIXED (opt-in via `--with-mcp`)

After comparing canary 12 (Button) against PR #4906, the second gap was visual feedback. Codex's agent inspected live Storybook via Playwright MCP during iteration and caught Base UI's `nativeButton` runtime warning by reading console output. Our agent had no equivalent.

Now, when the operator passes `--with-mcp`:

1. The orchestrator spawns `yarn start:storybook` in the worktree (post-snapshot, pre-iteration).
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
yarn orchestrate --component=Note --dry-run

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
