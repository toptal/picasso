# PI-4318 PF-1992 — Design decisions and implementation plan

**Parent ticket:** [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) — Create migration plan for AI-assisted Picasso migration
**Status:** Decisions captured from May 4-5, 2026 design conversations. Used as input for updating `PI-4318-P1-MOD-01-migration-plan.md` and the orchestrator code in `bin/`.
**Audience:** Engineer implementing PF-1992 deliverables; future Claude Code session updating the migration plan.

## How to use this document

Each section captures one topic from the design conversations: the question or concern raised, the decision (or current status), the reasoning behind it, and the concrete files/code that need to change to land it. The final section is a priority-ordered action checklist suitable for handing to a Claude Code session.

This document is not the migration plan. It's a delta on top of `PI-4318-P1-MOD-01-migration-plan.md` v3 — the things that need to change about the plan and the orchestrator based on conversational decisions made after v3 was written.

---

## 1. Orchestrator execution model — pipelined state machine

### Decision

Single long-running orchestrator process per session. Runs a state machine across multiple in-flight components: one component in the agent-editing step at a time (agent is single-threaded), but many concurrently in CI-polling / review-polling / merging states. Walks the manifest, picks up whichever component is unblocked, advances it one step, moves on.

Replaces: the current sequential per-component loop in `bin/lib/orchestrator-core.ts`.

### Rationale

The current orchestrator does steps 1–13 for component A, then 1–13 for component B. While A is in 30-minute review polling, the agent is idle — wasted throughput. With ~30 components in scope, idle time compounds.

User requirement: "I want to parallelize so it migrates while waits for previous component review, so it's not idle... start it and it jumps to next component while waits for review and do it in circle jumping from one to another component/PR."

The state machine model gives this exactly: one process, one agent slot, many concurrent in-flight components. Avoids the multi-terminal alternative (which works but requires manual orchestration of N processes).

### Implementation

States: `queued → migrating → gating → ci-polling → review-polling → merging → done` (plus `escalated` exit).

Main loop:

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

Constraints:
- Agent (Claude Code subprocess) is single-threaded per orchestrator process. Only one component in the `migrating` state at a time.
- CI/review polling is essentially free. Many components can be in those states concurrently.
- Iteration cap (3 default) lives per-component, not global.
- Manifest writes already use atomic-rename (read → mutate → write tmp → mv); no additional concurrency primitive needed.

CLI surface stays the same:
- `yarn orchestrate --component=Note` — single component
- `yarn orchestrate --tier=1` — fills in-flight queue from tier filter
- `yarn orchestrate --tier=0,1` — multi-tier (new flag)

Effort: 1–2 days.

### Files to change

- `bin/lib/orchestrator-core.ts` — main refactor
- `bin/lib/workflow.ts` — possibly add state-transition hooks
- `docs/migration/ORCHESTRATOR.md` — update the diagram + quick-start
- `docs/migration/references/agent-loop.md` — rewrite step list as state-machine transitions

---

## 2. Long-lived integration branch

### Decision

Use a long-lived `picasso-modernization` branch. Orchestrator opens all per-component PRs against this branch (not master). The integration branch merges to master after each completed tier.

**Status (May 2026):** branch already created on the remote.

### Rationale

User decision overriding the original "direct to master" recommendation. Trade-off accepted:

- Cost: ~30 min/day of rebase maintenance during Phase 2; extra integration-merge review at each tier boundary; risk of a giant master-merge surprise if held too long.
- Benefit: a single revertible point (revert one merge commit to undo a tier); master stays clean of half-migrated state; can publish to `picasso@next` dist-tag from the integration branch for early Staff Portal canary testing.

### Implementation (status)

1. ~~Create the integration branch~~ — **done (May 2026, on remote)**.
2. Branch protection: required reviews (1+), required CI checks, no direct pushes. **To verify: confirm branch protection is configured on the remote.**
3. Orchestrator: change `--base master` to `--base picasso-modernization` in the `gh pr create` template. **Pending PF-1992 implementation.**
4. Establish merge cadence: `picasso-modernization → master` after each completed tier. Small dedicated PR per tier merge.
5. Daily rebase from master: small cron job or manual ritual to pull master into the integration branch.
6. Decide release strategy: hold all publishes until `picasso-modernization → master` lands, OR publish from the integration branch under the `picasso@next` dist-tag during Phase 2 (consumers opt-in via `npm install @toptal/picasso@next`).

### Files to change

- `bin/lib/orchestrator-core.ts` (or `bin/migration-orchestrator.ts`) — change PR base ref
- `docs/migration/references/pr-workflow.md` — update example `gh pr create` block
- `docs/migration/ORCHESTRATOR.md` — document the integration-branch model
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §10 — update sequence proposal to mention integration branch
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §12 — close open decision #10 (release cadence) with the integration-branch + `picasso@next` pattern

---

## 3. TypeScript upgrade target — moved to a separate ticket

### Decision

Upgrade root TS from `~4.7.0` to **5.5 or 5.6**. Not 5.4 (skips meaningful narrowing wins for no reason). Not 5.7+ (path-mapping changes risk breaking the monorepo's TypeScript project references).

**Tracking status (May 2026): moved out of PF-1992 into a separate ticket.** Runs in parallel with PF-1992 as a Phase-1 prerequisite to PF-1994. The orchestrator code itself works under TS 4.7; the prerequisite is for Tier 0 light-path migrations to compile under the agent-generated patterns (which use 5.x features).

### Rationale (target version)

Concrete failure modes 4.7 hits during migration:
- `@base-ui/react` ships modern `.d.ts` patterns (`satisfies`, `const` type params, template-literal narrowing). 4.7 won't compile them under `strict: true`.
- `@types/react@^19` requires TS 5.0+. Lifting React peer-cap forces this.
- Claude Code's generated code uses 5.x patterns by default. False-positive gate failures otherwise — debugging the wrong layer.
- JSS removal cascades through type packages.

Why 5.5/5.6 specifically:
- 5.5 added smarter narrowing for `Array.find` and inferred type predicates — reduces false positives in Picasso's heavy type-guard usage.
- 5.6 added stricter `void` return inference. Catches handler bugs without breaking existing code.
- 5.7+ has path-mapping changes (`--rewriteRelativeImportExtensions` etc.) that could surface in the monorepo's project-reference graph. Avoid mid-migration.

### Implementation (separate ticket)

Single PR to monorepo root. Bump `typescript` in root + the 10 packages that explicitly pin `~4.7.0`. Run `yarn typecheck` across the whole repo. Fix the inevitable strict-mode regressions that 5.x's better narrowing exposes. Effort: 2–3 days, debugging-bound.

The PF-1992 orchestrator session does **not** execute this work.

### Files to change (in the separate ticket)

- `package.json` (root) — `typescript: ~5.6.0` (or 5.5 — pick one)
- 10 base packages with explicit pins (find via `grep -l "typescript" packages/base/*/package.json packages/*/package.json`)

### Files updated in PF-1992 docs

- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §1.9 + §9.1 — call out the separate-ticket tracking and target version
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §12 — close decision #1 with separate-ticket note

---

## 4. Tailwind version — no upgrade during migration

### Decision

No Tailwind upgrade as part of the migration. Stay on the current `tailwindcss: ^4.2.1`. Bump to a newer 4.x minor as a separate post-PI hardening pass, if needed.

### Rationale

Repo is already on Tailwind 4. The migration plan's "Tailwind 4" reference describes existing state, not a target. A minor bump (e.g. to 4.5+) is a separate decision that costs the migration nothing.

If a Tier 0 migration ever fails because a `@base-ui/react` example uses a Tailwind 4.3+ feature, bump reactively. Don't preempt — the current `4.2.1` is sufficient for everything `@base-ui/react`'s docs use.

### Implementation

None. Document the decision so it doesn't reappear as a question.

### Files to change

- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §1.2 — clarify "already at 4.2.1, no upgrade pending; bump post-PI"

---

## 5. Popper replacement strategy

### Decision

Picasso's `Popper` component stays in the public API (external consumers depend on it). Back the implementation with **`@floating-ui/react`**, not `@base-ui/react/popover`.

### Rationale

Popper is a position-anchored primitive: `<Popper open={} anchorEl={ref}>`. Consumers pass an arbitrary anchor ref and render content positioned relative to it.

`@base-ui/react/popover` is trigger-anchored: `<Popover.Trigger>` owns the anchor. To use it, every Popper consumer would have to refactor to wrap their trigger in `<Popover.Trigger>` — that's the API break we're trying to avoid.

`@floating-ui/react`'s `useFloating` hook gives the exact same shape Popper has: pass an anchor element, get back floating styles, placement, collision-aware repositioning. Picasso's Popper becomes a ~30-line wrapper that preserves the existing API verbatim.

Cost: `@floating-ui/react` becomes a direct dep of `@toptal/picasso-popper` (currently transitive through `@base-ui/react`).

### Implementation

Inside `packages/base/Popper`, replace MUI v4's Popper with `@floating-ui/react`'s `useFloating` + `<FloatingPortal>` + (optionally) `<FloatingFocusManager>`. Preserve external props: `open`, `anchorEl`, `placement`, `modifiers`, `transition`, `children`. Add `@floating-ui/react` to `packages/base/Popper/package.json` dependencies.

### Files to change

- `packages/base/Popper/src/Popper/Popper.tsx` — implementation rewrite
- `packages/base/Popper/package.json` — add `@floating-ui/react`
- `docs/migration/components/Popper.md` — author per-component plan (currently missing)
- `docs/migration/decisions/popper-replacement.md` — write decision doc per migration plan §9.8
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §3.3 + §9.8 — lock the decision (was open)
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §12 — close open decision #3 (Popper)

---

## 6. Backdrop replacement strategy (already in v3 plan, restated for completeness)

### Decision

Picasso's standalone `Backdrop` component is replaced with a **small custom `<div>` + Tailwind + scroll-lock**. No `@base-ui/react` analog (Backdrop is only available there as `Dialog.Backdrop` inside Dialog).

### Rationale

Same shape as Popper's reasoning: external consumers expect `<Backdrop>` as a standalone, not nested inside a Dialog. A custom div with appropriate ARIA + scroll-lock + Tailwind class composition is ~50 lines. Bounded blast radius.

### Implementation

Replace `@mui/base/Modal` import (which currently provides `ModalBackdropSlotProps`) with a custom `<div>` rendering. Apply Tailwind classes for the visual treatment. Add scroll-lock helper if needed.

### Files to change

- `packages/base/Backdrop/src/Backdrop/Backdrop.tsx`
- `packages/base/Backdrop/package.json` — drop `@mui/base`
- `docs/migration/components/Backdrop.md` — author per-component plan
- `docs/migration/decisions/backdrop-replacement.md` — write decision doc
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §12 — close open decision #4 (Backdrop)

---

## 7. `classes` prop compatibility shim

### Decision

Implement a `classes` prop on every migrated component that routes per-slot strings into Tailwind class composition via `twMerge`. This preserves a major chunk of the existing API surface and dramatically reduces consumer-side migration pain.

This is a real architectural shift in the migration policy. v3 of the migration plan accepted "remove `classes` universally" as the headline breaking change; this decision walks that back.

### Rationale

Removing the `classes` prop universally was the single biggest source of consumer-side pain — every consumer app uses `classes={{ root: 'app-foo' }}` somewhere for style overrides, and the codemod that finds-and-rewrites them is high-blast-radius.

A shim works because Tailwind's class composition (via `twMerge`) accepts arbitrary string append. Per-slot routing translates the MUI v4 `classes` shape to slot-targeted className concatenation.

Limits the shim does NOT cover (these still break and need codemods or manual fixes):
- MUI's nested-state selectors (`& .Mui-disabled`, `&$expanded`). Consumers using those break regardless. Separate codemod target if widely used.
- Generated MUI class names (`.MuiButton-root`). Consumers with global stylesheets targeting these break regardless. Find-and-replace codemod.

The shim handles the "add a class to slot X" pattern, which is approximately 80% of `classes` usage in practice.

Trade-off accepted:
- Pro: dramatically smaller breaking change scope; codemod budget freed up for Layer 3 (compound-component reshaping); consumer apps upgrade with near-zero churn for the common case.
- Con: every Picasso component carries a legacy API surface forever (or until a future deprecation cycle); +2-5 LOC per slot in component implementations; slot-key types need explicit declaration.

### Implementation pattern

Centralize the routing in a small helper:

```ts
// packages/base/Utils/src/utils/with-classes.ts
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

Per component:

```tsx
const slotClasses = withClasses(
  { root: rootClasses, label: labelClasses },
  classes
)
return (
  <button className={twMerge(slotClasses.root, className)}>
    <span className={slotClasses.label}>{children}</span>
  </button>
)
```

Each component declares its own slot-key type:

```ts
export type ButtonClassKey = 'root' | 'label' | 'icon'
export interface Props {
  classes?: Partial<Record<ButtonClassKey, string>>
  // ...
}
```

### Files to change

- `packages/base/Utils/src/utils/with-classes.ts` — new helper (Tier 1 work)
- `docs/migration/PROMPT-heavy.md` — add the `classes` shim pattern as required output shape
- `docs/migration/PROMPT-light.md` — same for light path
- `docs/migration/rules/api-preservation.md` — add slot-preservation requirement (currently policy is "remove `classes`")
- `docs/migration/components/*.md` — for each component plan, list its slot keys
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §2.3 (API preservation) — update breaking-change policy
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §7 — reduce codemod budget; `classes` is no longer the headline codemod
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §12 — add as a closed decision

---

## 8. Slack webhook for orchestrator notifications

### Decision

Implement Slack webhook notifications. Wire as part of PF-1992 (not deferred to PF-1994). Events fired: escalation, tier-started, tier-completed, run-failure. Not chatty — ~5–15 messages per tier total.

### Rationale

Without it, the only way to find out about an escalation is checking the manifest or noticing a process has stopped logging. With ~30 PRs, parallel-pipelined runs, and 5-min CI polling, you can't sit on top of it. Escalations need to interrupt actively, not passively.

Specifically:
- 30-minute review-poll cadence means escalations fester before being noticed without a notification.
- Auth failures cascade silently — every component fails until you re-auth.
- Pipelined parallelism means components are running unattended in the background.

### Implementation

1. Create Slack incoming webhook (point at `#picasso-modernization` channel or DM).
2. Set env var `PICASSO_ORCH_SLACK_WEBHOOK="https://hooks.slack.com/services/..."` (or load from `.env`).
3. In `bin/lib/orchestrator-core.ts`, add a `notify(event, payload)` helper that POSTs JSON to the webhook URL if set, no-op if not.
4. Fire events at the appropriate state transitions:
   - `escalation` — component name, trigger reason, PR URL, link to escalation log
   - `tier_started` — first component of a new tier picked up
   - `tier_completed` — all components in a tier merged
   - `run_failure` — orchestrator process crashed or hit auth failure
5. Don't block the orchestrator on the webhook call. Log failures, continue.
6. Don't fire on every PR open or every gate pass — that's noise.

### Files to change

- `bin/lib/orchestrator-core.ts` — add `notify()` helper + call sites at state transitions
- `docs/migration/references/escalation.md` — update "Optionally a Slack webhook" → "Wired in PF-1992; required env var"
- `docs/migration/ORCHESTRATOR.md` — document the env var

---

## 9. Happo verification on canary

### Decision

Verify Happo wiring on the Note canary run before any real migration. Add this as a checklist item to PF-1992 acceptance criteria.

### Rationale

Currently `MIGRATION_GATE_HAPPO=skip` is the default for sandbox runs. The Note canary should override that and actually run Happo, so credentials and project setup get tested before scaling. Better to find missing API key/secret on Note (where we expect zero diffs) than to find it on Tooltip (where we'd be debugging two layers at once).

### Implementation

Run: `MIGRATION_GATE_HAPPO=run yarn orchestrate --component=Note --no-merge`

Verify:
- `HAPPO_API_KEY` and `HAPPO_API_SECRET` set in shell or `.env`
- `HAPPO_PROJECT=Picasso/Storybook` exists in Happo account, API key has write access
- `--only Note` filter actually picks up Note's stories (~5 expected — Note + Compound + Content + Subtitle + Title variants). If it picks up 0 or 200 stories, the filter isn't doing what we want.
- Happo CLI ends with a report URL that's diff-reviewable in the web UI
- Cloud rate limits don't bite (run a single canary, then 3 in parallel as a stress test)

Note has zero source diff, so Happo *should* return zero diffs. Any diff = a transitive change to investigate (Storybook config drift, font loading, etc.).

### Files to change

- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §11 acceptance criteria — add Happo verification line
- `docs/migration/ORCHESTRATOR.md` — add Happo prereq check to "Verification commands" section

---

## 10. Stricter Happo gate

### Decision

Tighten the Happo gate so it passes only when **either** zero visual diffs **or** all diffs are designer-accepted. Currently the gate just checks the Happo CLI exit code, which is 0 even with diffs (Happo treats diffs as "for review", not "build break").

Implement via Happo's REST API: after `yarn happo` runs, hit the report-summary endpoint and check `diffsTotal` plus per-diff `status`.

### Rationale

The current gate marks Happo PASS when the screenshot upload succeeded. Doesn't know whether the screenshots match the baseline. Tightening makes the gate enforce visual correctness at the agent-output level (rather than relying on PR review to catch the problem after merge).

For Tier 1 + Tier 0 components (cleanup + light path) we expect zero diffs — so the gate's strict mode catches agent mistakes immediately. For Tier 2/3 where intentional visual changes can happen, designer accepts diffs in Happo's web UI; next gate run picks up the new state and passes.

### Implementation

Two-part change:

**Part A — gate script (`bin/migration-gate.sh`):**

After `yarn happo` runs, parse the report URL from the CLI output, then hit Happo's REST API:

```bash
REPORT_SHA=$(parse from happo CLI output)
SUMMARY=$(curl -u "$HAPPO_API_KEY:$HAPPO_API_SECRET" \
  "https://happo.io/api/reports/$REPORT_SHA/summary")
DIFFS_TOTAL=$(echo "$SUMMARY" | jq '.diffsTotal')
UNRESOLVED=$(echo "$SUMMARY" | jq '[.diffs[] | select(.status != "accepted")] | length')

if [ "$DIFFS_TOTAL" -eq 0 ] || [ "$UNRESOLVED" -eq 0 ]; then
  STAGE_STATUS=PASS
else
  STAGE_STATUS=FAIL
  # Include report URL in the failure message so designer can review
fi
```

**Part B — orchestrator pre-merge check:**

Before `gh pr merge --auto`, call the same Happo summary API. If unresolved diffs exist, post a comment to the PR ("Happo diffs unresolved, see <report-url>") and loop back to review polling instead of merging.

This way:
- Gate fails fast on diff mismatch — agent rerun is targeted (the agent sees "Happo diff at slot X, see report" in the gate report).
- Merge step prevents auto-merge even if a code reviewer approves but the designer hasn't.

### Files to change

- `bin/migration-gate.sh` — add Happo API check after Happo CLI runs
- `bin/lib/orchestrator-core.ts` (or wherever the merge step lives) — add pre-merge Happo check
- `docs/migration/references/pr-workflow.md` — document the new merge precondition
- `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §6.3 (Happo policy) — update to reflect that gate enforces this, not just policy

---

## 11. Toughest components — informational, no decision

Ranking captured for planning awareness:

1. **`picasso-provider` (Tier 5, PF-2023)** — toughest overall. System rewrite, not per-component. 19 MUI v4 src files + 9 JSS files. SSR pipeline retired. Theme module augmentation goes away. Whole-repo blast radius. Different DoD (full Storybook + Happo + Portal smoke). Final commit removes root MUI v4 peer-dep. Estimated 6–9d.
2. **`Page` (Tier 3, PF-2025)** — toughest single component. Top of the dependency graph (consumes Accordion, Tooltip, Menu, Notification, etc.). Custom Tailwind shell with hamburger + responsive logic. Has `PicassoProvider.override` chains. Mixed Tailwind/JSS state. Migrates absolutely last in `base/*`.
3. **`picasso-rich-text-editor` (Tier 4, PF-2022)** — toughest sibling. 8 components + 22 MUI v4 src files. `create-lexical-theme.ts` is the architecture concern (Lexical theme bridge depends on MUI v4 Theme). Eng A pair-review specifically for the Lexical theme rewrite.
4. **`Dropdown` (Tier 3, PF-2025)** — trickiest mixed-state. Single PR has to handle both light (`@mui/base` swap) + heavy (`@material-ui/core/Grow` + `PopperPlacementType` removal). Used by Button, Menu, Page, Form — high consumer count, strict prop preservation needed.

### Action

None. Captured as planning context. Already reflected in migration plan §3.3–3.6.

---

## 12. PR review polling cadence — informational, existing behavior

- CI polling: every 5 minutes, max 60 minutes per iteration. Uses `gh pr view --json statusCheckRollup`. Exponential backoff on rate-limit (5 → 10 → 20 min).
- Review polling: every 30 minutes, max 48 hours. Uses `gh pr view --json reviews`.
- After 48h with no `APPROVED` or `CHANGES_REQUESTED` → escalates as "reviewer unavailable, flag for re-assignment".

### Action

None. Behavior documented in `docs/migration/references/pr-workflow.md`. Stays as-is. Pipelined-state-machine refactor (§1) preserves these cadences.

---

## 13. 3-iteration cap and escape hatches — informational, existing behavior

The 3-iteration cap is real but has 3 escape hatches:

1. **CLI flag override**: `--max-iterations=5` bumps the cap for one run.
2. **Update per-component plan, retry**: edit `docs/migration/components/<Name>.md`, reset `iterations: 0`, `status: queued`, re-run. The plan is part of the agent's prompt context — the pivot becomes baked in.
3. **Bump prompt or rule docs**: for systemic problems (escalation rate >30% on Tier 1), improve `PROMPT-light/heavy.md` or `rules/*.md`, version-bump (`v1 → v2`), reset all escalated entries, re-run.

What the orchestrator explicitly won't do: negotiate architecture. Any PR comment classified as "architectural concern" trips immediate escalation — by design, to fail safely.

### Action

None. Behavior documented in `docs/migration/references/escalation.md`. Stays as-is.

---

## 14. Claude Code invocation and cost — informational

### Mechanism

Orchestrator process spawns `claude` (Claude Code CLI) as a subprocess per iteration. Reads the assembled prompt (PROMPT-light/heavy + per-component plan + rules + reference + source files), calls Anthropic API (Sonnet by default), applies file edits inside the worktree, exits. Captures stdout/stderr to `agent.<iter>.log`.

Each iteration is one Claude conversation, not a session. The orchestrator's loop drives iteration externally.

### Cost ballpark (May 2026)

- Tier 1 cleanup (11 components, mostly 1 iter, small files): $1–$5 total
- Tier 0 light path (8 components, 1–2 iter, medium files): $5–$25 total
- Tier 2 heavy (5 components, 2 iter, larger files): $15–$50 total
- Tier 3 composites (3 components + OutlinedInput, 2–3 iter, big files): $25–$75 total
- Sibling packages (4 packages, multiple PRs each): $40–$150 total
- Provider canary (Tier 5, system rewrite): $30–$100 total
- **Whole program: ~$120–$400** in Anthropic API spend (order-of-magnitude estimate, could be 2x either way)

Compared to engineer cost (38–58 days × ~$100/hr × 8hrs ≈ $30K–$46K), API spend is ~1% of total program cost.

### Action

- Set up Anthropic console budget alert (operational, no code change).
- Optional: add token-cost logging per run (parse Claude Code response metadata, log to per-run cost file). Useful for actual-vs-estimated comparison after Tier 1.

---

## Action checklist (priority order)

### Before PF-1994 starts (PF-1992 deliverables)

- [x] ~~Create `picasso-modernization` long-lived integration branch~~ — **done (May 2026, on remote)**
- [ ] **Confirm branch protection** on `picasso-modernization`: required reviews (1+), required CI checks, no direct pushes — §2
- [ ] **Update orchestrator's PR base** to `picasso-modernization` — §2
- [ ] **Refactor `bin/lib/orchestrator-core.ts` into pipelined state machine** (1–2d) — §1
- [ ] **Implement Slack webhook notifications** (escalation, tier-started, tier-completed, run-failure) — §8
- [ ] **Lock Backdrop replacement decision**: write `docs/migration/decisions/backdrop-replacement.md` — §6
- [ ] **Lock Popper replacement decision**: write `docs/migration/decisions/popper-replacement.md` (Floating-UI) — §5
- [ ] **Implement `classes` prop shim**: `packages/base/Utils/src/utils/with-classes.ts` + add to `PROMPT-heavy.md` + `PROMPT-light.md` + `rules/api-preservation.md` — §7
- [ ] **Verify Happo wiring on Note canary** (`MIGRATION_GATE_HAPPO=run yarn orchestrate --component=Note --no-merge`) — §9
- [ ] **Tighten Happo gate** to require zero-diff or designer-accepted (Happo API check in `bin/migration-gate.sh` + pre-merge check in orchestrator) — §10

### Separate ticket (Phase-1 prerequisite to PF-1994, runs in parallel with PF-1992)

- [ ] **Upgrade TypeScript to 5.5 or 5.6** across monorepo (single PR, ~2–3d) — §3. **Not part of PF-1992**; tracked as its own ticket. Must land before PF-1994 starts.

### Update planning docs

- [ ] **`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`**:
  - §1.2 Tailwind clarification (already on 4.2.1)
  - §1.9 + §9.1 TypeScript: change "5.4+" to "5.5 or 5.6"
  - §2.3 API preservation: update to keep `classes` prop shim
  - §3.3 + §9.8 Popper: lock Floating-UI decision
  - §6.3 Happo policy: gate enforces, not just policy
  - §7 codemod budget: reduce; `classes` is no longer the headline codemod
  - §10 sequence proposal: mention integration-branch
  - §11 acceptance criteria: add Happo verification, integration branch creation, state-machine refactor, classes shim, Slack webhook
  - §12 open decisions: close #1 (TS), #3 (Popper), #4 (Backdrop), #10 (release cadence); add classes shim as a closed decision
- [ ] **`docs/migration/ORCHESTRATOR.md`**:
  - Update execution-model diagram (state machine)
  - Add integration-branch documentation
  - Add Slack webhook env var
  - Update verification commands (Happo check)
- [ ] **`docs/migration/references/agent-loop.md`**: rewrite step list as state-machine transitions
- [ ] **`docs/migration/references/pr-workflow.md`**:
  - Update PR base to `picasso-modernization`
  - Document pre-merge Happo check
- [ ] **`docs/migration/references/escalation.md`**: update Slack webhook from "optional" to "wired in PF-1992"
- [ ] **`docs/migration/PROMPT-light.md` + `PROMPT-heavy.md`**: add `classes` shim pattern to required output shape
- [ ] **`docs/migration/rules/api-preservation.md`**: add slot-preservation requirement (replaces "remove classes")
- [ ] **`docs/migration/components/*.md`**:
  - For each component plan, list its slot keys
  - Add `Backdrop.md` and `Popper.md` (currently missing per-component plans)

### Future / post-PF-1992

- [ ] Optional: token-cost logging in orchestrator
- [ ] Post-PI: Tailwind minor bump (separate hardening pass)
- [ ] Post-PI: TS 5.7+ if/when path-mapping behavior is stable

---

## Open questions

None currently. All conversation topics resolved with decisions. New questions surfaced during implementation should be added here for tracking.

---

## Source

This document consolidates decisions from a series of design conversations on May 4–5, 2026, covering: orchestrator execution model, branching strategy, TypeScript upgrade target, Tailwind version, Popper replacement, parallelization approach, Slack notifications, Happo verification and gate strictness, and the `classes` prop compatibility shim.

The conversations took place after migration plan v3 was finalized; this document captures the delta on top of v3.
