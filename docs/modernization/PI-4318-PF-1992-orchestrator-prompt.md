# PF-1992 orchestrator update — prompt for Claude Code session

**Paste this whole file as your first message in the Claude Code session that's been working on PF-1992.** It's the corrective + extension prompt for the orchestrator and supporting docs after a series of design decisions (May 5, 2026).

---

## Authoritative sources (read these first, in order)

Before changing anything, read these end-to-end. They are the source of truth — if anything you remember from prior conversation context conflicts with them, the docs win:

1. `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` — migration plan **v4**, dated May 5, 2026. Locked decisions are in §2.3, §3.3, §6.3, §7.4, §9.1, §9.8, §10, §11, §12.
2. `docs/modernization/PI-4318-PF-1992-design-decisions.md` — the consolidated decisions document. 14 sections + a priority-ordered action checklist. This is what generated the v4 plan changes.
3. `docs/migration/ORCHESTRATOR.md` — current orchestrator runbook.
4. `docs/migration/manifest.json` — current work queue (28 component-migration units).
5. `bin/migration-orchestrator.ts`, `bin/lib/orchestrator-core.ts`, `bin/lib/workflow.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh` — current implementation.

After reading, output a short (under 200 words) "I've read X, current state is Y" report so I can confirm we're aligned before any edits.

---

## Out of scope for this prompt

Two pieces of work are explicitly **not** part of this session — handled separately:

1. **TypeScript 5.5/5.6 upgrade.** Tracked in its own ticket, runs in parallel with PF-1992. The orchestrator code itself works under TS 4.7; the upgrade is a Phase-1 prerequisite to PF-1994 (Tier 0 light-path migrations need 5.x to compile agent-generated patterns). Do **not** bump TypeScript anywhere as part of this session.
2. **`picasso-modernization` integration branch creation.** Already created on the remote (May 2026). Don't try to create it. Step 1 below only updates the orchestrator's PR base and verifies branch protection.

---

## What's already in place — DO NOT redo this work

- `bin/migration-orchestrator.ts` + `bin/lib/orchestrator-core.ts` + `bin/lib/workflow.ts` — orchestrator scaffolding exists. We're refactoring the loop, not rebuilding from scratch.
- `bin/migration-gate.sh` + `bin/migration-diff.sh` — gate and diff scripts exist. We're tightening Happo handling, not rewriting.
- `docs/migration/ORCHESTRATOR.md` — runbook exists. Update sections, don't replace.
- `docs/migration/manifest.json` + `docs/migration/manifest.schema.json` — work queue exists with 28 units across 6 tiers. Validate, don't rebuild.
- `docs/migration/components/` — per-component plan files for Tier 1 (Note, Form, FormLayout, ModalContext, Typography, FormLabel, Utils) and `_README.md` exist.
- `docs/migration/rules/` — `styling.md`, `api-preservation.md`, `jss-to-tailwind-crib.md` exist. Update, don't rewrite.
- `docs/migration/references/` — `subagent-playbook.md`, `pr-workflow.md`, `agent-loop.md`, `commit-conventions.md`, `escalation.md` exist. Update specific sections per the action list below.
- `docs/migration/tokens/picasso-tailwind-tokens.md` exists.
- `docs/migration/PROMPT-light.md` and `docs/migration/PROMPT-heavy.md` — both exist (Tier 0 and Tier 2-5 prompts). Update sections, don't replace.
- `docs/migration/reference/` — currently empty (per the runbook's "References" section explaining why). Don't add files unless PR #4906 verification surfaces a usable canonical reference.
- `picasso-modernization` integration branch — already on the remote. Don't recreate.

---

## What's changing — execute these in order

This is the priority-ordered work list. Each item has a goal, the files to touch, and an acceptance criterion. Do them in order. **Pause after each item, summarise the diff in under 100 words, and wait for my "go" before the next.**

### Step 1 — Point orchestrator at `picasso-modernization`

**Goal.** Update the orchestrator to PR against the existing `picasso-modernization` integration branch, not master. Confirm branch protection is configured.

**Files.**
- `bin/migration-orchestrator.ts` (or wherever `gh pr create` is built) — change PR base from `master` to `picasso-modernization`. Make this configurable via the workflow descriptor (`workflow.baseBranch`) so it's not hardcoded to one branch.
- `docs/migration/references/pr-workflow.md` — update the example `gh pr create` block. Add a section explaining the integration-branch model and the per-tier merge cadence.
- `docs/migration/ORCHESTRATOR.md` — add an "Integration branch" section near the top (after Quick start). Document the daily-rebase ritual and the per-tier merge-to-master cadence. Note that the branch is already created.
- New decision doc: `docs/migration/decisions/integration-branch.md`. Author with the rationale from `PI-4318-PF-1992-design-decisions.md` §2.

**Verification commands (you generate, I run).**

Branch protection on the remote — generate the `gh` CLI commands to apply the protection settings (required reviews 1+, required CI checks matching the existing `master` protection, no direct pushes). Do not run them; output them and let me confirm.

**Acceptance.**
- Workflow descriptor exposes `baseBranch` (default `picasso-modernization` for the migration workflow).
- A dry-run (`yarn orchestrate --component=Note --dry-run`) prints `gh pr create --base picasso-modernization ...` in its planned-step output.
- Decision doc exists and matches the rationale in design-decisions §2.
- Branch-protection commands surfaced for me to apply.

### Step 2 — Pipelined state-machine refactor

**Goal.** Refactor `bin/lib/orchestrator-core.ts` from sequential per-component loop to a single-process state machine. One component in `migrating` (agent-editing) at a time; many concurrent in `ci-polling`, `review-polling`, `merging`. Per-component iteration cap unchanged. Per `PI-4318-PF-1992-design-decisions.md` §1.

**States.**
```
queued → migrating → gating → ci-polling → review-polling → merging → done
                                  ↓             ↓
                              escalated     escalated
```

**Main loop.**
```
forever:
  for each in-flight component (manifest entry):
    advance one step if non-blocking work is available
      (e.g. CI poll: has the status changed? If yes, transition; if no, skip)
  if agent is free and queue has unblocked items:
    pick next, start migrating
  if no in-flight components and queue is empty:
    exit
  sleep 5s
```

**Constraints.**
- Agent (Claude Code subprocess) is single-threaded per orchestrator process. Only one component in `migrating` at a time. Track via a single `agentBusy` boolean.
- Manifest writes already use atomic-rename. Don't add a mutex.
- Iteration cap (3 default) lives per-component. `--max-iterations=N` flag overrides for one run.
- Existing CLI flags (`--component`, `--tier`, `--dry-run`, `--no-merge`, `--agent`, `--max-iterations`) all still work.
- New CLI flag: `--tier=0,1` (multi-tier filter — fills in-flight queue from any tier in the comma-separated list).

**Files.**
- `bin/lib/orchestrator-core.ts` — main refactor. Extract a `StateMachine` class or set of pure functions (your choice) that walks the state graph.
- `bin/lib/workflow.ts` — add hooks if needed for state-transition customisation.
- `docs/migration/references/agent-loop.md` — rewrite the 14-step list as state-machine transitions. Each state has: entry condition, work performed, exit transitions. Preserve the existing step semantics — just present them as state machine.
- `docs/migration/ORCHESTRATOR.md` — update the diagram + Quick start examples.

**Acceptance.**
- `yarn orchestrate --tier=1 --dry-run` prints the planned in-flight rotation.
- `yarn orchestrate --component=Note --no-merge` (canary mode) still works as before.
- Unit tests for the state machine added under `bin/lib/__tests__/` (or wherever existing test infra lives — match the existing convention).
- Effort budget: 1-2 days. If it ballons past 3 days, stop and escalate — there's likely a simpler refactor.

### Step 3 — Slack webhook

**Goal.** Wire Slack incoming-webhook notifications into the orchestrator. Events: escalation, tier-started, tier-completed, run-failure. No-op if env var is unset. Per `PI-4318-PF-1992-design-decisions.md` §8.

**Files.**
- `bin/lib/orchestrator-core.ts` — add a small `notify(event: string, payload: object)` helper. POSTs JSON to `process.env.PICASSO_ORCH_SLACK_WEBHOOK` if set. Don't block the orchestrator on the call; on failure, log and continue.
- Hook the `notify` call sites at the appropriate state transitions:
  - `escalation` — when a component transitions to the `escalated` state. Payload: `{ component, trigger, prUrl, runLogPath }`.
  - `tier_started` — first component of a new tier picked up from the queue. Payload: `{ tier, componentCount }`.
  - `tier_completed` — when all components of a tier are in `done` state. Payload: `{ tier, durationHours }`.
  - `run_failure` — orchestrator process crashes or hits an auth failure. Payload: `{ reason, component? }`.
- `docs/migration/references/escalation.md` — change "Optionally a Slack webhook if configured (`PICASSO_ORCH_SLACK_WEBHOOK` env var). Out of PF-1992 scope" to "Wired in PF-1992; required env var for production runs".
- `docs/migration/ORCHESTRATOR.md` — document the env var in the Prerequisites section.

**Acceptance.**
- With `PICASSO_ORCH_SLACK_WEBHOOK` unset, orchestrator runs identically (no-op).
- With it set to a valid webhook, the four event types deliver to Slack with readable formatting (use Slack block-kit blocks if you can; fallback to `text`).
- A unit test mocks the webhook and asserts each event type fires at the expected state transition.

Don't fire on every PR open or every gate pass — that's noise. Only the four events above.

### Step 4 — Tighter Happo gate (zero-diff or designer-accepted)

**Goal.** The gate currently passes if `yarn happo` exits 0 (= upload succeeded). Change it to pass only if either there are zero diffs OR all diffs are designer-accepted in Happo's web UI. Per `PI-4318-PF-1992-design-decisions.md` §10.

**Files — Part A (gate script):**
- `bin/migration-gate.sh` — after `yarn happo` runs, parse the report URL/SHA from the Happo CLI output, then call Happo's REST API:
  ```bash
  REPORT_SHA=$(parse from happo CLI output)
  SUMMARY=$(curl -u "$HAPPO_API_KEY:$HAPPO_API_SECRET" \
    "https://happo.io/api/reports/$REPORT_SHA/summary")
  DIFFS_TOTAL=$(echo "$SUMMARY" | jq '.diffsTotal')
  UNRESOLVED=$(echo "$SUMMARY" | jq '[.diffs[] | select(.status != "accepted")] | length')

  if [ "$DIFFS_TOTAL" -eq 0 ] || [ "$UNRESOLVED" -eq 0 ]; then
    happo_status=PASS
  else
    happo_status=FAIL
    happo_failure_message="Unresolved diffs: $UNRESOLVED. See: $REPORT_URL"
  fi
  ```
- Verify the actual API response shape before committing — the snippet above is illustrative. The Happo docs are at https://docs.happo.io/. Output the full curl command + sample response in your report so I can verify the shape matches.
- Include the report URL in the failure message so the designer can review.

**Files — Part B (orchestrator pre-merge):**
- `bin/lib/orchestrator-core.ts` — before `gh pr merge --auto`, call the same Happo summary API. If unresolved diffs exist, post a comment to the PR ("Happo diffs unresolved, see <report-url>") and loop back to review polling instead of merging.
- `docs/migration/references/pr-workflow.md` — document the new merge precondition. Add to the "Merging" section.

**Acceptance.**
- Note canary run with `MIGRATION_GATE_HAPPO=run` produces an explicit Happo summary section in the gate report.
- A simulated diff (manually inject one in Happo's UI between baseline and the canary run) causes the gate to FAIL until accepted in Happo's UI; subsequent gate run passes.
- The pre-merge check correctly blocks `gh pr merge --auto` when there are unresolved diffs and posts the explanation comment.

### Step 5 — `classes` prop compatibility shim

**Goal.** Implement the helper + update the prompts and rules so every migrated component preserves a `classes` prop via Tailwind class composition. Per `PI-4318-PF-1992-design-decisions.md` §7 and migration plan §2.3.

**Files — implementation:**
- `packages/base/Utils/src/utils/with-classes.ts` (new file):
  ```ts
  import { twMerge } from '@toptal/picasso-tailwind-merge'

  export function withClasses<K extends string>(
    base: Record<K, string>,
    overrides: Partial<Record<K, string>> | undefined
  ): Record<K, string> {
    if (!overrides) return base
    const out = { ...base } as Record<K, string>
    for (const key in base) {
      if (overrides[key]) out[key] = twMerge(base[key], overrides[key])
    }
    return out
  }
  ```
- Export from `packages/base/Utils/src/utils/index.ts`.
- Add a small Jest test under `packages/base/Utils/src/utils/__tests__/with-classes.test.ts` covering: undefined overrides, partial overrides, full overrides, twMerge dedupe behavior.

**Files — prompts:**
- `docs/migration/PROMPT-heavy.md` — add a section "Required output shape: `classes` prop" with the slot-routing pattern. Component must declare its slot-key type (e.g. `ButtonClassKey = 'root' | 'label' | 'icon'`), accept `classes?: Partial<Record<ButtonClassKey, string>>`, and use `withClasses` to route per-slot strings into the appropriate Tailwind className composition.
- `docs/migration/PROMPT-light.md` — same section. Even though the light path is mostly a package swap, components must preserve their existing `classes` API (keep the prop, route through `withClasses`).

**Files — rules:**
- `docs/migration/rules/api-preservation.md` — replace any "remove `classes`" guidance with "preserve `classes` via the slot-routing shim". Document the limits the shim does NOT cover (MUI nested-state selectors `& .Mui-disabled`, generated MUI classes `.MuiButton-root` — those still break and need codemods or manual fixes).

**Files — per-component plans:**
- For each existing per-component plan in `docs/migration/components/*.md` (Note, Form, FormLayout, ModalContext, Typography, FormLabel, Utils), add a "Slot keys" section listing the component's slots. Backdrop, Popper, and the rest of Tier 0 + Tier 1 still need plan files (Step 6 below).
- Acceptance: every Tier 1 + Tier 0 plan file has a "Slot keys" section.

**Acceptance.**
- `yarn workspace @toptal/picasso-utils build:package` and tests pass.
- `withClasses` is exported from the public surface.
- Both prompts contain the slot-routing pattern with a worked example.
- `api-preservation.md` no longer says "remove `classes`".

### Step 6 — Backdrop + Popper decision docs and plan files

**Goal.** Author the locked decision docs and the missing per-component plan files. Per `PI-4318-PF-1992-design-decisions.md` §5, §6.

**Files — decision docs (new, in `docs/migration/decisions/`):**
- `docs/migration/decisions/backdrop-replacement.md`. Cover: problem (no standalone Backdrop in `@base-ui/react`), decision (custom `<div>` + Tailwind + scroll-lock), implementation sketch (~50 lines, ARIA `aria-hidden`, scroll-lock helper), rationale (external consumers expect standalone, bounded blast radius).
- `docs/migration/decisions/popper-replacement.md`. Cover: problem (no standalone Popper in `@base-ui/react`; positioning is internal to compound primitives), decision (`@floating-ui/react` direct dep), implementation sketch (`useFloating` + `<FloatingPortal>` wrapper preserving Popper's external API: `open`, `anchorEl`, `placement`, `modifiers`, `transition`, `children`), rationale (external consumers use position-anchored API; Popover is trigger-anchored; refactor would break consumer code).
- `docs/migration/decisions/classes-shim.md`. Cover: problem (Layer 1 break is universal), decision (preserve via Tailwind-routing shim), implementation reference (`packages/base/Utils/src/utils/with-classes.ts`), limits (nested-state selectors, generated class names not covered).
- `docs/migration/decisions/integration-branch.md`. Already authored in Step 1 if you got that far; if not, author here. Cover: problem (master would see ~30 modernization PRs interleaved with non-modernization work), decision (`picasso-modernization` long-lived branch + per-tier merge), trade-offs (rebase maintenance vs. revertibility). Note the branch already exists.

**Files — per-component plan files (new, in `docs/migration/components/`):**
- `docs/migration/components/Backdrop.md` — Tier 0 light path; target = custom `<div>` per the decision doc; include slot keys, dependencies (Modal + Drawer depend on Backdrop), gotchas, acceptance criteria.
- `docs/migration/components/Popper.md` — Tier 2 heavy; target = `@floating-ui/react` per the decision doc; preserve external API verbatim; gotchas (placement type union, modifiers translation).

Plus the rest of the Tier 0 + Tier 1 components missing plan files (per migration plan §3.1 and §3.2):
- Tier 0 missing: `Badge.md`, `Button.md`, `Drawer.md`, `Menu.md` (cleanup-only), `Modal.md`, `Slider.md`, `Switch.md`, `Tabs.md`.
- Tier 1 missing: `Container.md`, `Grid.md`, `Notification.md`.

Each plan file follows the template established by the existing `Note.md` / `Utils.md` plans: identity, dependencies, migration scope (specific files + line numbers), known gotchas, acceptance criteria, slot keys.

**Acceptance.**
- All 4 decision docs authored under `docs/migration/decisions/`.
- All 11 Tier 1 + 8 Tier 0 components have per-component plan files.
- Each plan file has a "Slot keys" section.
- Plan files are explicit about dependencies (e.g. Backdrop's plan says "Modal and Drawer depend on this — migrate first within Tier 0").

### Step 7 — Update `base-ui-react-api-crib.md`

**Goal.** Author or update the `@base-ui/react` API crib rule doc, sourced from migration plan §3.1-§3.4. Per migration plan §5.4.

**Files.**
- `docs/migration/rules/base-ui-react-api-crib.md` — author if missing, update if present. Table form: per-Picasso-component target path (e.g. `Tooltip → @base-ui/react/tooltip`, `Button → @base-ui/react/button`). Include "no analog — keep custom" entries for Backdrop, Badge, FileInput, Page, Container, Grid, Notification, plus the `@floating-ui/react` entry for Popper.
- Refresh note at the top: "Verify against https://base-ui.com/llms.txt at the start of each `@base-ui/react` minor release. Currently pinned: v1.4.1 (April 2026)."

**Acceptance.**
- Every component listed in migration plan §3 (Tier 0 through Tier 5) has a row in the crib table with its target path.
- The "keep custom" entries explicitly list the reason (no `@base-ui/react` analog for that primitive).

### Step 8 — Verify Happo wiring on Note canary

**Goal.** Run the Note canary with Happo enabled to verify credentials and project setup before scaling. Per `PI-4318-PF-1992-design-decisions.md` §9.

**Commands (you generate these, I run them).**
1. Confirm env: `echo "$HAPPO_API_KEY" | wc -c` (non-zero), `echo "$HAPPO_API_SECRET" | wc -c` (non-zero).
2. Confirm project: `curl -u "$HAPPO_API_KEY:$HAPPO_API_SECRET" "https://happo.io/api/projects" | jq '.[] | select(.name == "Picasso/Storybook")'`.
3. Run canary: `MIGRATION_GATE_HAPPO=run yarn orchestrate --component=Note --no-merge`.
4. After completion: verify the report URL in the Happo CLI output is reachable, the `--only Note` filter picks up ~5 stories (Note variants + Compound + Content + Subtitle + Title), and the diff count is zero (Note has no source changes).

**Acceptance.**
- Note canary completes with `happo_status=PASS` and `diffsTotal=0`.
- Report URL is captured in `migration-runs/<date>/Note/report.md`.
- Any unexpected diffs surface a punch list of what to investigate (Storybook config drift, font loading, etc.) before scaling.

### Step 9 — Update `manifest.json` if anything in the structure changed

**Goal.** Verify the manifest matches migration plan §3.9 final counts (28 component-migration units). Per the migration plan v4 latest counts.

**Files.**
- `docs/migration/manifest.json` — confirm:
  - 8 Tier 0 components: Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs.
  - 11 Tier 1 components: Form, FormLayout, ModalContext, Note, Typography, Container, FormLabel, Grid, Notification, Menu (pkg cleanup), Utils.
  - 5 Tier 2: Checkbox, Radio, Tooltip, FileInput, Popper.
  - 3 Tier 3: Accordion, Dropdown, Page. Plus OutlinedInput as a mixed-state entry.
  - 4 Tier 4 sibling packages: picasso-charts, picasso-query-builder, picasso-rich-text-editor (provider in Tier 5).
  - 1 Tier 5: picasso-provider.
- If counts don't match, surface the diff and ask before changing.

**Acceptance.**
- Validates against the schema: `npx ajv-cli validate --strict=false -s docs/migration/manifest.schema.json -d docs/migration/manifest.json`.
- Counts in §3.9 match the manifest exactly.

### Step 10 — Add token-cost logging (optional)

**Goal.** Optional: log token counts per agent invocation so we can compare actual vs estimated costs after Tier 1.

**Files.**
- `bin/lib/orchestrator-core.ts` — when capturing the Claude Code subprocess output, parse the response metadata (or read it from Anthropic's response headers if exposed) and append a per-iteration line to `migration-runs/<date>/<id>/cost.log` (or similar).

Skip this step if the data isn't readily available from Claude Code's CLI output. Don't reverse-engineer it.

---

## Working principles (don't skip)

- **Strict API preservation by default**, with the `classes` shim now part of "preservation". Removed/renamed props become codemod entries per migration plan §7.
- **Hard cap: 3 agent iterations per component** before escalating. `--max-iterations=N` overrides for one run.
- **Tailwind 4 already in place** via `@toptal/picasso-tailwind` + `@toptal/base-tailwind` + `@toptal/picasso-tailwind-merge`. Don't re-architect the styling layer.
- **TypeScript stays at 4.7 for this session.** The 5.5/5.6 upgrade is a separate ticket.
- **Dependency-aware ordering** per migration plan §3.7. Backdrop before Modal/Drawer. FormLabel before Switch + Checkbox + Radio. Tooltip before FileInput. Page absolutely last in `base/*`.
- **Don't push to remote** unless I explicitly approve. Stage commits locally; output the `git push` commands and wait for me to run them.
- **Don't open PRs** unless I explicitly approve. The orchestrator's PR-create logic should be exercised in `--dry-run` mode until explicitly told otherwise.
- **Don't merge anything to master.** The integration branch handles that flow per Step 1.

---

## Reporting

After Step 0 (the "I've read X" report), output one summary per step (under 100 words each) and pause for my "go" before the next step. If a step surfaces a non-trivial unknown (e.g. Happo API response shape doesn't match the snippet), stop and ask before proceeding.

Total estimated effort across all steps: ~2-4 days (TS upgrade is no longer in this session's scope, so the budget shrinks accordingly). If anything ballons more than 2x its budget, escalate.
