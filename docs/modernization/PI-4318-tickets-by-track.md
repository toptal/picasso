# PI-4318 — Jira Tickets (Organized by Track)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Source:** [PI-4318-phases.md](./PI-4318-phases.md) · [PI-4318-tickets.md](./PI-4318-tickets.md) (phase-organized version)
**Status:** v14 — Modernization-track refinement after [migration plan v3 re-audit (May 4, 2026)](./PI-4318-P1-MOD-01-migration-plan.md). v13 had moved FormLabel + Utils to Tier 2 heavy, but the May 2026 file-level audit found those (plus Container, Grid, Notification) only have **type-only or trivial re-export** imports — they're cleanup-fixes, not rewrites. v14 reorganises: Tier 1 grows from 5 to 11 components (cleanup-only); Tier 2 narrows from 9 to 5 truly-heavy (Checkbox, Radio, Tooltip, FileInput, Popper); Page moves from Tier 2 to Tier 3 (high-surface composite); Tier 3 stays at 3 composites + OutlinedInput mixed-state. **Per-component target paths verified against `@base-ui/react` v1.4.1** (stable, Apr 2026). Per-ticket effort ranges unchanged (PF-1994 3-5d, PF-2024 4-7d, PF-2025 5-7d). Track total unchanged (38-58d); program total unchanged (80-123d). Internal redistribution only. Earlier v12 changes still in force: Pilot Measurement is its own track (Epic E); PF-1998 + PF-2000 sit there.

## Structure

- **5 Epics** — one per track (Modernization / Agent Experience / Figma Design-to-Code / Maestro Integration / **Pilot Measurement**). Each epic owns its track end-to-end from Phase 1 through Phase 3.
- **Stories** inside each Epic — one per PI ticket task. Story IDs are unchanged from [PI-4318-tickets.md](./PI-4318-tickets.md) so existing dependency references and cross-doc links still resolve.
- **Phase is a label, not an epic.** Each story carries `phase-1` / `phase-2` / `phase-3` and a gate status (`gated` / `non-gating-parallel` / `post-gate`) so boards can filter by phase and the Go/No-Go gate view is a one-click filter.
- **Estimate** is a T-shirt size (S ≈ <1 wk, M ≈ 1-2 wks, L ≈ 2-4 wks, XL ≈ 4+ wks).

## Why track-based

Each track has a natural owner and a coherent technical arc: Modernization is an engineering migration program, Agent Experience is a documentation + tooling program, Figma is a design-system + Code Connect program, and Maestro is an integration program. Organizing epics by track keeps all a track's dependencies, risks, and metrics in one place. The phase dimension — including the Phase 1 gate — stays visible via labels / fixVersions rather than epic grouping.

## Label scheme

Every story gets:

- `picasso-ai-dx` — PI-level label
- One of `phase-1`, `phase-2`, `phase-3`
- One of `gated`, `non-gating-parallel`, `post-gate` (Phase 1 only has `gated` vs `non-gating-parallel`; Phase 2 + 3 all get `post-gate`)
- One of `track-modernization`, `track-agent-experience`, `track-figma-design-to-code`, `track-maestro-integration`, `track-measurement` (redundant with the epic but useful for cross-epic queries and reports)

Recommended Jira saved filters:

- **Phase 1 gate readiness** — `labels = "phase-1" AND labels = "gated"` — the 7 stories whose status determines Go/No-Go
- **Phase 1 parallel** — `labels = "phase-1" AND labels = "non-gating-parallel"` — the 3 stories that must not block the gate
- **Current phase board** — `labels = "phase-2"` (or 3) — what's in flight right now
- **Track board** — grouped by the epic directly

---

## Table of Contents

- [Epic A — Modernization track](#epic-a--modernization-track) — 10 stories
- [Epic B — Agent Experience track](#epic-b--agent-experience-track) — 6 stories (PF-1998 + PF-2000 moved to Epic E)
- [Epic C — Figma Design-to-Code track](#epic-c--figma-design-to-code-track) — 6 stories
- [Epic D — Maestro Integration track](#epic-d--maestro-integration-track) — 5 stories
- [Epic E — Pilot Measurement track](#epic-e--pilot-measurement-track) — 2 stories (NEW in v12)
- [Summary](#summary)

---

# Epic A — Modernization track

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `track-modernization`
**Phase doc ref:** [PI-4318-phases.md](./PI-4318-phases.md)

## Goal

Migrate Picasso from MUI v4 (`@material-ui/core`) + `@mui/base` + JSS to **`@base-ui/react` + Tailwind 4**, with **AI doing the bulk of the per-component rewrites via the autonomous orchestrator** built in PF-1992. Note: `@mui/base` is the *predecessor* of `@base-ui/react` and is also a migration source — components on `@mui/base` take a lighter "second-step" migration path (per PR #4906 baseline). Roll the migration into Staff Portal as the canary; other consumer repos adopt via self-service AI prompt. Unblocks React 19 adoption org-wide (O2) and closes out O1 (deprecated deps = 0) inside Picasso.

## Track arc (v11)

1. **Phase 1 — Plan + autonomous-loop infrastructure (parallel, no gate).** PF-1992 ships the migration plan and stands up the orchestrator (`bin/migration-orchestrator.ts` + gate/diff scripts + manifest + ORCHESTRATOR.md + `gh` CLI auth). PF-1993 lands pnpm. Tier 1 autonomous run starts the moment PF-1992 ships — no Go/No-Go decision blocks Phase 2.
2. **Phase 2 — Autonomous component + package migration.** Agent runs Tier 1 → Tier 2 → Tier 3 in `packages/base/*` under Eng A oversight; sibling packages (`picasso-charts`, `picasso-query-builder`, `picasso-rich-text-editor`) run autonomously under Eng C oversight; `picasso-provider` decommissioned via Eng A + Eng C pair (PF-2023 canary), removing the root MUI v4 peer-dep.
3. **Phase 3 — Staff Portal rollout.** PF-1995 ships the AI migration prompt + worked examples; PF-1996 runs the autonomous loop on Staff Portal as the first external-repo application. Other consumer-app migrations are out of PI scope (P3-MOD-02 excluded) — those teams self-serve via the same agent + prompt.

## Exit criteria (track)

- Zero `@material-ui/core` and zero JSS imports inside Picasso
- Root `@material-ui/core` peer-dep removed from `packages/picasso/package.json` (PF-2023 canary commit)
- React 19 validated on modernized Picasso (O2 unblocked)
- Deprecated-deps package audit green (O1 = 0)
- Staff Portal migrated as canary (PF-1996); migration prompt + worked examples published for other-team self-service
- O5 (23/23 repos on modern Picasso) is **no longer a PI-scoped exit criterion** — other-team responsibility

---

## Stories

### P1-MOD-01 — Migration plan + autonomous-loop infrastructure

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-modernization` · **Estimate:** S (3-4d)
**Phase doc ref:** [Phase 1 Secondary parallel scope — Modernization row 1](./PI-4318-phases.md#phase-1--secondary-parallel-scope)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md) · [PI-4318-ai-leverage-tickets.md](./PI-4318-ai-leverage-tickets.md)

**Description**
Define the scope and execution plan for migrating Picasso to `@base-ui/react` + Tailwind, and stand up **only the autonomous-migration-loop infrastructure** that PF-1994/2024/2025 will use. Covers: migration plan content (scope, top-level plan, per-component plans, testbed, AI prompt); autonomous migration loop scaffolds (`bin/migration-orchestrator.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh`, `docs/migration/manifest.json`, `docs/migration/ORCHESTRATOR.md`, `gh` CLI auth setup).

**v11 scope changes:** the agentic Code Connect generator (`bin/generate-code-connect.ts`) **moves to PF-2005** (the first user). The BASE audit script (`bin/base-audit.ts`) **moves to PF-2006**. The 5-page baseline measurement protocol **moves to PF-2000**. PF-1992 ships as a normal Picasso PR — full test suite + Happo + standard PR review approval.

**Acceptance criteria**
- [ ] `docs/migration-plan.md` committed in Picasso repo
- [ ] Top-level plan with complexity tiering for all 75 components (16 MUI v4 pkgs / 11 @mui/base / ~48 remaining)
- [ ] Per-component plan template + 2-3 worked examples; per-component plan files for all Tier 1 cleanup-only (5) + Tier 0 light path (9) committed
- [ ] Two AI migration prompts committed: `PROMPT-light.md` (`@mui/base` → `@base-ui/react`) and `PROMPT-heavy.md` (MUI v4 + JSS → `@base-ui/react` + Tailwind)
- [ ] Four rule docs committed: `styling.md`, `api-preservation.md`, `jss-to-tailwind-crib.md`, `base-ui-react-api-crib.md`
- [ ] PR #4906 status verified; reference implementations confirmed on `@base-ui/react`
- [ ] Testbed setup documented (how a migrated component is validated: Happo, Jest, Cypress, React 19 smoke)
- [ ] AI migration prompt documented (reusing Phase 0 Codex prompt, revised)
- [ ] Risk register + rollback strategy
- [ ] **Autonomous-loop scaffolds committed:** `bin/migration-orchestrator.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh`, `docs/migration/manifest.json` schema, `docs/migration/ORCHESTRATOR.md`, `gh` CLI auth set up
- [ ] **Sandboxed Note migration validates the orchestrator** end-to-end (agent picks Note, applies prompt, runs gates, opens PR, polls CI)
- [ ] PR for PF-1992 itself ships through full test suite + Happo + standard reviewer approval
- [ ] Reviewed by at least one engineer outside the pilot team

---

### P1-MOD-02 — Migrate Picasso to pnpm

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-modernization` · **Estimate:** XS (3-5d) · **Dependency:** PI-4278 (Platform Core Q2) for tooling alignment
**Phase doc ref:** [Phase 1 Secondary parallel scope — Modernization row 2](./PI-4318-phases.md#phase-1--secondary-parallel-scope)

**Description**
Execute the pnpm migration for the Picasso monorepo following the existing pnpm migration tutorial. Prerequisite for Tailwind 4 and the broader modernization. Co-dependent with PI-4278.

**Acceptance criteria**
- [ ] All packages build with pnpm
- [ ] CI updated to run on pnpm
- [ ] No regressions on existing Jest / Cypress / Happo suites
- [ ] Tailwind 4 availability confirmed / ready to install
- [ ] Short migration write-up appended to `docs/migration-plan.md`

---

### P2-MOD-01 — Migrate `packages/base/*` components (split into 3 tier-tickets)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** ~12-19d total (split: 3-5 + 4-7 + 5-7) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier inventory (v3, May 2026)](./PI-4318-P1-MOD-01-migration-plan.md#3-tier-inventory-v3--may-2026-re-audit)

**Split note.** Original PF-1994 covered all units in one XL ticket. Split into 3 tier-tickets to match migration plan §10 cadence and unblock parallelism with sibling-package migrations once the first batch lands. **v14 retiering** (after migration plan v3 file-level re-audit): PF-1994 covers Tier 1 cleanup (11 components — 5 already-clean + 5 type-only fixes + Menu pkg + Utils) + Tier 0 light path (8 `@mui/base` components, calibrated against PR #4906); PF-2024 covers Tier 2 heavy (5 components — Checkbox, Radio, Tooltip, FileInput, Popper); PF-2025 covers Tier 3 composites (3 — Accordion, Dropdown, Page) + OutlinedInput mixed-state PR. v13's misclassification of FormLabel + Utils + Container + Grid + Notification as Tier 2 corrected — they have only type-only or trivial re-export imports.

**Per-component Definition of Done (applies to all three sub-tickets)**
- Happo baseline pixel-perfect (any visual diff is a bug to fix; no designer sign-off needed)
- Jest + Cypress green
- React 19 smoke-tested
- Storybook story updated
- `.figma.tsx` still valid (M12 clean)

---

#### PF-1994 — Migrate `packages/base/*` Tier 1 cleanup + Tier 0 light-path batch

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (3-5d) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** PF-2024, P2-MOD-02..04


Two passes via the autonomous orchestrator from PF-1992:

**Tier 1 cleanup (11 components, ~1.1d total):** 5 already-clean (Form, FormLayout, ModalContext, Note, Typography) + 5 type-only/trivial fixes (Container, FormLabel, Grid, Notification, Menu pkg cleanup) + Utils (replace 2 small re-exports — `capitalize` 1-line + `ClickAwayListener` ~15-line custom hook — and 1 Tailwind transition for `Rotate180`). Per migration plan §3.2. Just `package.json` cleanup (remove `@material-ui/core` peer-dep), React 19 peer-dep cap lift, and minimal type-import replacements. **Note runs first** as the orchestrator sandbox.

**Tier 0 light path (8 components, ~2.5-4d total):** Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs. All currently on `@mui/base`; Tailwind already in place via `cx`/`twMerge`. Migration is package swap + API alignment per `PROMPT-light.md`. Calibrated against PR #4906 (Button + Switch). Order: Backdrop first (Modal + Drawer depend on it). **Backdrop note**: `@base-ui/react` has no standalone Backdrop primitive — recommended replacement is small custom `<div>` + Tailwind (R14, decision in PF-1992 spike). Mixed-state Dropdown + OutlinedInput Tier 0 portion handled in PF-2025.

Eng A prioritizes Note (orchestrator sandbox) → other Tier 1 cleanups → Tier 0 batch in dependency order.

**AI leverage.** Driven by the autonomous migration loop from PF-1992 (`bin/migration-orchestrator.ts`): agent picks components from `manifest.json`, applies the path-specific prompt (`PROMPT-light.md` for Tier 0), runs `yarn migrate:component <Name>` until gates pass, opens PR via `gh pr create`, polls CI, classifies review comments, merges via `gh pr merge --squash --auto` on approval. Engineer reviews PRs; agent handles orchestration. Hard cap of 3 iterations per component; escalation path documented. See [PI-4318-ai-leverage-tickets.md §PF-1994](./PI-4318-ai-leverage-tickets.md#pf-1994--2024--2025--autonomous-component-migration-with-agent-orchestration).

**Acceptance criteria**
- [ ] All 11 Tier 1 cleanup units complete (peer-dep removed, React 19 cap lifted, type-only imports replaced with native React types or Picasso-own types)
- [ ] All 8 Tier 0 light-path units migrated; per-component DoD met
- [ ] Zero `@mui/base` imports in those packages' `src/**`
- [ ] Zero `@material-ui/core` peer-deps in those packages' `package.json`
- [ ] `@base-ui/react` added as dependency in Tier 0 packages
- [ ] Backdrop replacement strategy implemented per PF-1992 spike outcome (R14)
- [ ] React 19 smoke suite green
- [ ] Happo baselines regenerated
- [ ] Tier 0 multipliers recalibrated post-batch (feeds PF-2024/2025 estimates per migration plan R12)

---

#### PF-2024 — Migrate `packages/base/*` Tier 2 (heavy)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (4-7d) · **Blocked by:** PF-1994 · **Blocks:** PF-2025, P2-MOD-05


Components (5 truly heavy): **Checkbox, Radio, Tooltip, FileInput, Popper**. All use MUI v4 + JSS at runtime; full rewrite per `PROMPT-heavy.md`. Per-component target mapping per [migration plan §3.3](./PI-4318-P1-MOD-01-migration-plan.md#33-tier-2--heavy-migrations-5-components):

- **Checkbox + CheckboxGroup** → `@base-ui/react/checkbox` + `@base-ui/react/checkbox-group`
- **Radio + RadioGroup** → `@base-ui/react/radio` + own group wrapper using `@base-ui/react/field`
- **Tooltip** → `@base-ui/react/tooltip` (direct match)
- **FileInput** → keep custom (no `@base-ui/react` analog)
- **Popper** → `@floating-ui/react` (preferred) OR consumers refactor to `@base-ui/react/popover` (locked in PF-1992 spike per §9.8, R15)

> **v14 reclassification:** FormLabel, Utils, Container, Grid, Notification (previously listed in Tier 2) moved to Tier 1 cleanup — they have only type-only or trivial re-export imports. Page moved to Tier 3 (it depends on most of base/* and should land last).

Heavy path: full rewrite per `PROMPT-heavy.md` — replace `@material-ui/core` primitives with `@base-ui/react`, replace JSS with Tailwind utility classes, preserve public prop surface. Order: **Tooltip first** (FileInput depends on it). Checkbox + Radio in parallel (both depend only on FormLabel which already shipped in PF-1994 Tier 1).

Risk concentrates on (a) Tooltip — `@base-ui/react/tooltip` viability check, (b) Popper — architectural decision (R15), (c) FileInput — fully custom rewrite without primitive backing.

**AI leverage.** Same autonomous migration loop as PF-1994, with prompt + reference examples sharpened by Tier 0/1 lessons. Agent escalation rate is the leading indicator: if Tier 0 ran clean, expect Tier 2 to compress; if Tier 0 hit `@base-ui/react` API gaps, expect Tier 2 to inherit them.

**Acceptance criteria**
- [ ] All 5 Tier 2 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports
- [ ] Zero JSS
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] `@base-ui/react` added as dependency for Checkbox, Radio, Tooltip
- [ ] Popper architectural decision implemented per PF-1992 spike outcome
- [ ] React 19 smoke suite green
- [ ] Happo baselines regenerated

---

#### PF-2025 — Migrate `packages/base/*` Tier 3 composites + OutlinedInput mixed-state

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (5-7d) · **Blocked by:** PF-2024 · **Blocks:** P2-MOD-05


Components (3 composites + 1 mixed-state PR), per [migration plan §3.4](./PI-4318-P1-MOD-01-migration-plan.md#34-tier-3--heavy-composites-3-components):

- **Accordion** → `@base-ui/react/accordion` (direct match; JSS `&$expanded` parent-refs unwind to `data-[state=open]` Tailwind selectors; `PicassoProvider.override` removed once migrated)
- **Dropdown** → `@base-ui/react/menu` + `@base-ui/react/popover` (mixed-state — single PR covers both `@mui/base` portion AND `@material-ui/core/Grow` transition replacement)
- **Page** → keep custom (pure Tailwind rewrite; depends on most of Tier 0 + Tier 2 — migrated absolutely last in `base/*`; no `@base-ui/react` analog)
- **OutlinedInput** (mixed-state, ~0.5d single PR) → `@base-ui/react/input` + `@base-ui/react/field`; type-leak fix bundled in

> **v14 simplification:** type-leak fixes for Container, FormLabel, Grid, Notification — previously listed in PF-2025 — moved to PF-1994 Tier 1 cleanup. Only OutlinedInput mixed-state remains here (it bundles cleanly with Tier 3 work).

Highest-surface units; expect manual touch-up on JSS parent-refs and theme overrides.

**AI leverage.** Autonomous loop assists, but Tier 3 has an architecture floor: agent stops at architectural decisions (e.g. `PicassoProvider.override` chains, JSS parent-ref unwinding) and escalates. Engineer drives architecture step manually, agent does per-file rewrite. Less compression than Tier 0-2.

**Acceptance criteria**
- [ ] All 3 Tier 3 units migrated; per-component DoD met
- [ ] Mixed-state Dropdown + OutlinedInput fully migrated (both light + heavy passes complete in single PR per component)
- [ ] Page rewritten in pure Tailwind; consumes migrated primitives
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports anywhere in `packages/base/*/src/**`
- [ ] Zero `@mui/base` imports anywhere in `packages/base/*/src/**`
- [ ] Zero JSS anywhere in `packages/base/*/src/**`
- [ ] Zero `@material-ui/core` and zero `@mui/base` entries in any `packages/base/*/package.json`
- [ ] React 19 smoke suite green on the entire base/* set
- [ ] Happo baselines regenerated
- [ ] `PicassoProvider.override` calls removed for migrated components

---

### P2-MOD-02 — Migrate `@toptal/picasso-charts` (LineChart)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (1-2d) · **Blocked by:** PF-1994 (Tier 1 primitives) · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-charts` — a single component (LineChart) using `makeStyles` + `createStyles` + `Theme` from `@material-ui/core`. Smallest of the sibling-package migrations; treat as a warm-up for the larger siblings. Same per-component loop as P2-MOD-01.

**AI leverage.** Same autonomous orchestrator as PF-1994; LineChart is a clean single-component PR — expected zero-touch.

**Acceptance criteria**
- [ ] LineChart migrated: no `@material-ui/core` imports, no JSS primitives in source
- [ ] `@material-ui/core` removed from `packages/picasso-charts/package.json`
- [ ] Jest + Cypress + Happo + React 19 smoke green
- [ ] Storybook stories updated and rendering

---

### P2-MOD-03 — Migrate `@toptal/picasso-query-builder` (11 components)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (4-6d) · **Blocked by:** PF-1994 (Tier 1 primitives) · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-query-builder` — 11 components across 21 source files on MUI v4 + JSS: AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor. Batch into 3–4 PRs by component cluster (e.g. Selectors, Inputs, Buttons, QueryBuilder root). Runs after P2-MOD-01 so the migrated `base/*` primitives are available.

**AI leverage.** Autonomous orchestrator drives 11 components in sequence; per-cluster batching keeps PR review-able. Agent prompt is the same one that ran on Tier 1/2.

**Per-component Definition of Done**
- Happo baseline unchanged (or approved)
- Jest + Cypress green
- Storybook updated
- React 19 smoke green

**Acceptance criteria**
- [ ] All 11 QB components migrated
- [ ] Zero `@material-ui/core` imports and zero JSS in `packages/picasso-query-builder/src/**`
- [ ] `@material-ui/core` removed from `packages/picasso-query-builder/package.json`
- [ ] React 19 smoke green
- [ ] Happo baselines regenerated

---

### P2-MOD-04 — Migrate `@toptal/picasso-rich-text-editor` (8 components)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (5-7d) · **Blocked by:** PF-1994 (Tier 1 primitives) · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-rich-text-editor` — 8 components across 23 source files on MUI v4 + JSS: LexicalEditor, LexicalEditorView, RichText (Code/CodeBlock/Emoji/Image), RichTextEditor, RichTextEditorEmojiPicker, RichTextEditorToolbar, plugins/FocusOnLabelClickPlugin, plugins/Toolbar. Trickiest parts are `create-lexical-theme.ts` and `typographyStyles.ts` — the Lexical theme bridge depends on MUI v4 Theme shape and needs a Tailwind-token-based replacement. Batch into 2–3 PRs.

**AI leverage.** Autonomous orchestrator handles the 8 components; the Lexical theme rewrite is the architecture floor and stays human-led (agent will escalate via manifest).

**Per-component Definition of Done**
- Happo baseline unchanged (or approved)
- Jest + Cypress green
- Storybook updated
- React 19 smoke green

**Acceptance criteria**
- [ ] All 8 RTE components migrated
- [ ] `create-lexical-theme.ts` replaced with Tailwind-token-driven equivalent
- [ ] Zero `@material-ui/core` imports and zero JSS in `packages/picasso-rich-text-editor/src/**`
- [ ] `@material-ui/core` removed from `packages/picasso-rich-text-editor/package.json`
- [ ] React 19 smoke green
- [ ] Happo baselines regenerated

---

### P2-MOD-05 — Decommission `@toptal/picasso-provider` MUI v4 runtime + remove root peer-dep (canary)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (5-8d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04 · **Blocks:** P3-MOD-01, P2-MOD-06 (final batch)
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 5](./PI-4318-P1-MOD-01-migration-plan.md#tier-5--runtime--provider-decommission-the-mui-v4-theme-layer)

**Description**
Rewrite `packages/picasso-provider` off the MUI v4 runtime and remove `@material-ui/core: 4.12.4` from `packages/picasso/package.json` — the PI's canary. This is a system rewrite, not a per-component migration: different DoD (whole-repo Storybook + Portal smoke must stay green), higher blast radius, gates the final peer-dep removal. Runs last in Phase 2 so every component that consumes the provider has already been migrated.

Scope:
- `PicassoProvider` — remove `createTheme`, `Overrides`, `ThemeProvider`; replace with a Tailwind-aware provider.
- `theme.ts` — drop `declare module '@material-ui/core/styles'` module augmentation; surface Picasso tokens via a Tailwind-native context.
- `styles.tsx` — remove `createStyles` + `Theme`.
- `CssBaseline` — Tailwind `@layer base` + preflight replacement.
- `NotificationsProvider` — restyle in Tailwind (notistack integration stays).
- `PicassoRootNode`, `PreventPageWidthChangeOnScrollbar` — restyle in Tailwind.
- Responsive-styles helpers (`create-media-queries.ts`, `create-jss-variable-class-names.ts`, `media-queries-classes.ts`, `make-responsive-spacing-props.ts`) — replaced with Tailwind arbitrary-value selectors or Picasso breakpoint utilities.
- `get-serverside-stylesheets.ts` — SSR pipeline retired (Tailwind 4 extracts CSS at build time).
- `packages/picasso/package.json` — remove `@material-ui/core` peer-dep. **Final commit of Phase 2.**

**Definition of Done (package-level, not per-component)**
- Full Picasso Storybook renders without console errors
- Full Happo suite passes (or diffs explicitly approved by designer)
- At least one Portal app smoke-tests green against the new provider (tag-release test)
- React 19 validation green across Picasso library

**Acceptance criteria**
- [ ] Zero `@material-ui/core` and zero JSS in `packages/picasso-provider/src/**`
- [ ] `@material-ui/core` + `@material-ui/utils` removed from `packages/picasso-provider/package.json`
- [ ] `@material-ui/core` peer-dep removed from `packages/picasso/package.json` (**canary**)
- [ ] Full-repo Happo baseline locked for Phase 3
- [ ] React 19 validated on the modernized library (O2 unblocked)
- [ ] Deprecated-deps package audit green (O1 = 0)

---

### P2-MOD-06 — AI-assisted consumer migration (with optional codemods)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (1.5-2.5d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05 (progressive) · **Blocks:** P3-MOD-01
**Phase doc ref:** [Phase 2 — Modernization row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
**Scope reduced.** Originally a full codemod suite; revised approach is **AI agent + migration prompt + worked examples** for consumer migrations, with codemods only as an escape hatch for high-blast-radius API breaks. AI migration agents (Claude Code, Codex per PR #4906) handle prop-rename / import-swap migrations cleanly with much lower authoring cost than jscodeshift.

**Acceptance criteria**
- [ ] Strict API-preservation policy applied across PF-1994/2020/2021/2022/2023; breaking-change inventory documented (target: <5 unavoidable breaks)
- [ ] AI migration prompt + 2-3 worked examples committed in `docs/migration/`
- [ ] Codemods committed only for breaks that are wide-blast-radius or AI-unfriendly (target: 0-3 codemods)
- [ ] Each codemod (if any) tested on 1-2 real consumer-repo usages
- [ ] Migration playbook for Staff Portal documented (used by PF-1996)

---

### P3-MOD-01 — Migrate Staff Portal to modernized Picasso

**Phase:** 3 · **Labels:** `phase-3`, `post-gate`, `track-modernization` · **Estimate:** XS (1-1.5d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 3 — Modernization row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 7 Portal apps to 1.** Migrate **Staff Portal only**. Other Portal apps (platform, client-portal, hire-global, client-signup, talent-portal, screening-wizard) are out of PI scope — their teams will run their own migrations using the AI agent + migration prompt deliverables from P2-MOD-06.

**AI leverage.** Run the autonomous migration loop on Staff Portal as one of its first external-repo applications. Engineer reviews PRs + handles edge cases; agent handles bulk.

**Acceptance criteria**
- [ ] Staff Portal on modernized Picasso
- [ ] Happo visual regression clean
- [ ] Jest / Cypress clean
- [ ] Rollback procedure tested and documented
- [ ] Retro published; issues feed AI migration prompt refinement for other-team adoption

---

### P3-MOD-02 — Migrate other important projects to modernized Picasso

**Excluded from PI-4318 scope.** Other-team responsibility. PI scope reduced to Staff Portal only (PF-1996). Other consumer-app migrations (testing-platform, tracker-front, topteam, top-scheduler, remaining apps) flow through self-service adoption using the P2-MOD-06 AI migration prompt. O5 (23/23 repos on modernized Picasso) is no longer a PI exit criterion.

---

# Epic B — Agent Experience track

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `track-agent-experience`
**Phase doc ref:** [PI-4318-phases.md](./PI-4318-phases.md)

## Goal

Build the Agent Experience layer — optimized `llms.txt`, `.picasso/` rules v2, polished component docs, patterns, Skills — and distribute via npm-bundled artifacts so consumers adopt automatically with each Picasso publish. **The headline measurement that quantifies the value of this track (the A1 → A2 lift) lives in [Epic E — Pilot Measurement](#epic-e--pilot-measurement-track), because the lift is jointly produced by AIC + Figma artifacts and isn't attributable to either track alone.**

## Track arc (v12)

1. **Phase 1 — Foundation (parallel, no gate).** PF-1997 optimizes `llms.txt` + `.picasso/` v2 (Storybook → llms.txt now produces lean component docs directly). PF-1999 mines patterns and merges them into `.picasso/` rules. PF-2001a (Phase 2) will polish the auto-generated docs for the 5-page component subset (which Epic E selects).
2. **Phase 2 — Full-scope coverage.** PF-2001b polishes the remaining ~60 component docs + builds tokens docs + wires `llms-full.txt` CI integration. PF-2026 publishes the 4 Skills (`picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`).
3. **Phase 3 — Staff Portal adoption + npm distribution.** PF-2002 wires Staff Portal `.cursorrules` / `CLAUDE.md` to `node_modules/@toptal/picasso/.picasso/`. PF-2003 ships the npm-bundled distribution so other consumers self-onboard.

## Exit criteria (track)

- 75/75 component docs published (5-page subset polished in Phase 1, remainder polished in Phase 2)
- 4 Skills published and validated on ≥2 AI tools each
- `tokens/colors.md`, `tokens/spacing.md`, `tokens/typography.md` + `llms-full.txt` CI integration live
- Staff Portal wired with `.cursorrules` / `CLAUDE.md` referencing npm-bundled `.picasso/`
- npm distribution live: `.picasso/` + Skills + `llms-full.txt` ship inside `@toptal/picasso`
- 23/23 repo adoption is **no longer a PI-scoped exit criterion** — other-team self-onboarding via npm distribution

*The headline H/A1/A2 measurement numbers — the program's user-visible AI-DX deliverable — are owned by [Epic E](#epic-e--pilot-measurement-track), with PF-2001a + PF-1997 + PF-1999 from this epic as required inputs to A2.*

---

## Stories

### P1-AIC-01 — Optimize LLM index and `.picasso/` folder

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-agent-experience` · **Estimate:** XS (1.5-2.5d) · **Blocked by:** Phase 0 `.picasso/` v1 adoption learnings · **Blocks:** P1-AIC-03 (patterns feed rules), measurement runs
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 1](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Decrease size and increase usability of the LLM index (`llms.txt`) and `.picasso/` folder for AI agents. Incorporates Phase 0 learnings from top-assessment-frontend adoption. Output is the Agent Experience foundation the gated pilot runs against.

**Acceptance criteria**
- [ ] `llms.txt` regenerated from updated Storybook parser; size reduced vs v1 and published to `toptal.github.io/picasso/llm-docs/llms.txt`
- [ ] `.picasso/` rules v2 published in Picasso repo with changelog vs v1
- [ ] Usability check: Cursor + Claude Code produce correct Picasso output on 3 sample prompts covering top-20 components
- [ ] Documented trade-offs between `llms.txt` and `llms-full.txt` (if applicable)

### P1-AIC-03 — Extract patterns from existing usage of Picasso

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-agent-experience` · **Estimate:** XS (1.5-2.5d) · **Blocked by:** P1-MEAS-01 · **Blocks:** PF-2001 (patterns feed component docs)
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 3](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
AI-assisted mining of how Picasso is actually composed in Portal apps — forms, layouts, data tables, navigation. Patterns feed the `.picasso/` rules v2 and, later, Phase 2 Skills. Result is a pattern inventory with real-world examples.

**Acceptance criteria**
- [ ] Pattern inventory markdown committed (covers at minimum: forms, layouts, navigation, data display)
- [ ] Each pattern has ≥3 real-world usage examples cited by file path
- [ ] Patterns referenced from `.picasso/` rules v2 (P1-AIC-01)
- [ ] Gaps / antipatterns flagged for designer review

### P2-AIC-01 — Full-scope AI documentation for Picasso components (split into 3 sub-tickets in v10)

**Phase:** 1+2 · **Labels:** `phase-1`/`phase-2`, `track-agent-experience` · **Estimate:** ~5-9d total (split: 1-2 + 4-5 + 2-4) · **Blocked by:** P1-AIC-01, P1-MEAS-01, P1-AIC-03
**Phase doc ref:** [Phase 2 — Agent Experience row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Split note (v11).** PF-2001 is now **polish-only**, not from-scratch authoring. The bulk doc generation already happens in PF-1997 (Storybook → llms.txt → lean component docs) and PF-1999 (patterns merged directly into `.picasso/`). PF-2001a (0.5-1d) refines the 5-page-subset auto-generated docs in time for the A2 baseline run; PF-2001b (1.5-2.5d) refines the remaining ~60 + builds `tokens/colors.md` + `tokens/spacing.md` + `tokens/typography.md` + wires `llms-full.txt` CI integration + designer's full pre-filtered dos/don'ts review. Total effort 2-3.5d (was 5-7d in v10).

---

#### PF-2001a — Polish 5-page-subset auto-generated docs (Phase 1)

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-agent-experience` · **Estimate:** XS (0.5-1d engineer + designer wall-clock) · **Blocked by:** P1-AIC-01 (`.picasso/` v2 + lean Storybook docs), P1-MEAS-01 (PF-1998 component-set), P1-AIC-03 (patterns merged into `.picasso/`) · **Blocks:** PF-2000 A2 measurement run

**Polish-only in v11** — bulk doc generation already happened in PF-1997 (Storybook → llms.txt) and PF-1999 (patterns merged into `.picasso/`). PF-2001a refines the auto-generated docs for the ~12-18 components used in the 5 baseline pages and gets designer's quick dos/don'ts pass. Lands before A2 baseline run.

**Acceptance criteria**
- [ ] Auto-generated docs for the 5-page subset reviewed and polished (rough edges, missing dos/don'ts, ambiguous variant guidance)
- [ ] designer's quick pass on flagged dos/don'ts complete
- [ ] Available to PF-2000 for A2 measurement run

---

#### PF-2001b — Polish remaining ~60 docs + tokens + llms-full.txt + designer review (Phase 2)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-agent-experience` · **Estimate:** S (1.5-2.5d engineer + designer wall-clock) · **Blocked by:** PF-2001a (canonical polish format locked) · **Blocks:** PF-2026, P2-FIG-01, PF-2027, PF-2000 final A2 re-run

**Polish-only in v11** — refine the auto-generated docs for the remaining ~60 components; build `tokens/colors.md` + `tokens/spacing.md` + `tokens/typography.md` (full set); wire `llms-full.txt` CI integration alongside `llms.txt`; designer reviews AI-pre-filtered dos/don'ts on the remaining components.

**Acceptance criteria**
- [ ] 75/75 component `.md` files polished (5-page from PF-2001a + remaining ~60)
- [ ] designer reviewed AI-pre-filtered dos/don'ts on the remaining ~60 components
- [ ] `tokens/colors.md`, `tokens/spacing.md`, `tokens/typography.md` committed (full set)
- [ ] `llms-full.txt` built in CI and published alongside `llms.txt`
- [ ] M11 Agent Experience coverage reports 75/75

---

#### PF-2026 — Picasso Skills package (4 Skills)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-agent-experience` · **Estimate:** S (2-4d) · **Blocked by:** PF-2001b · **Blocks:** P3-AIC-02 (distribution)


Author 4 Skills: `picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`. Each validated against ≥2 AI tools.

**Acceptance criteria**
- [ ] 4 Skills published, each validated end-to-end with ≥2 AI tools
- [ ] Skills referenced from `.picasso/` rules

---

### P3-AIC-01 — Adopt Picasso rules in Staff Portal

**Phase:** 3 · **Labels:** `phase-3`, `post-gate`, `track-agent-experience` · **Estimate:** XS (~1d) · **Blocked by:** PF-2001b + PF-2026
**Phase doc ref:** [Phase 3 — Agent Experience row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 23 repos to 1.** Wire `.cursorrules` / `CLAUDE.md` / reference to `node_modules/@toptal/picasso/.picasso/` into **Staff Portal only**. Other repos adopt as their teams choose, using P3-AIC-02's npm-bundled distribution.

**Acceptance criteria**
- [ ] Staff Portal has `.cursorrules` / `CLAUDE.md` / `.picasso/` reference wired
- [ ] Validation check: AI agents in Staff Portal produce correct Picasso imports on canonical prompts
- [ ] Adoption pattern documented for other-team self-service rollout

---

### P3-AIC-02 — Bundle Agent Experience into `@toptal/picasso` npm package

**Phase:** 3 · **Labels:** `phase-3`, `post-gate`, `track-agent-experience` · **Estimate:** XS (~1d) · **Blocked by:** PF-2001b + PF-2026
**Phase doc ref:** [Phase 3 — Agent Experience row 2](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope simplified from separate distribution package to npm-bundled approach.** Ship `.picasso/` folder + Skills + `llms-full.txt` as part of the existing `@toptal/picasso` npm publish so consumers automatically get them at `node_modules/@toptal/picasso/.picasso/` whenever they update Picasso. No separate package, no parallel versioning. Discovery via convention: consumer `.cursorrules` / `CLAUDE.md` point to `node_modules/@toptal/picasso/.picasso/llms.txt`.

**Acceptance criteria**
- [ ] `.picasso/` folder + Skills committed to `@toptal/picasso` package and added to `package.json` `files` array
- [ ] Picasso publish workflow includes Agent Experience artifacts in the npm bundle
- [ ] Consumer reference convention documented
- [ ] Validated end-to-end in Staff Portal

---

### P3-AIC-03 — Collect feedback from teams and projects

**Excluded from PI-4318 scope.** Feedback collection deferred to post-PI BAU. The Agent Experience artifacts ship via npm and consumers self-onboard; structured feedback is a future iteration concern.

---

# Epic C — Figma Design-to-Code track

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `track-figma-design-to-code`
**Phase doc ref:** [PI-4318-phases.md](./PI-4318-phases.md)

## Goal

Connect Figma (BASE design system) and Picasso code tightly enough that AI agents generate brand-accurate implementations from designs — and **reuse the same agentic generator + audit script across the program** (top of the iceberg in Phase 1 on the 5-page subset, full library in Phase 2). Build the tooling that does the heavy lifting (`bin/generate-code-connect.ts`, `bin/base-audit.ts`) inside the Phase-1 tickets that first need them; reuse unchanged in Phase 2.

*Code Connect for the 5-page subset (PF-2005) is also a required input to the A2 baseline measurement owned by [Epic E — Pilot Measurement](#epic-e--pilot-measurement-track) — that's where the lift attributable to Code Connect + Agent Experience together is captured.*

## Track arc (v11)

1. **Phase 1 — 5-page coverage + tooling build (parallel, no gate).** PF-2005 builds `bin/generate-code-connect.ts` (template + Figma MCP integration + Dev Mode snippet verification + iteration loop) on the way to authoring `.figma.tsx` for the 12-18 components in `pilot/component-set.md` (the 5-page subset). PF-2006 builds `bin/base-audit.ts` (TypeScript AST parser + Figma MCP + RAG-status output) on the way to running the audit on the same 5-page subset; designer applies flagged BASE fixes. PF-2007 verifies the BASE↔Picasso token mapping. All three feed PF-2000's A2 baseline run.
2. **Phase 2 — Full library coverage + Figma Make.** PF-2027 reuses `bin/base-audit.ts` unchanged on the remaining ~60 components (designer applies fixes). PF-2009 reuses `bin/generate-code-connect.ts` unchanged to author `.figma.tsx` for the remaining ~60 (Eng A + Eng C swarm) — reaching 75/75 coverage. PF-2008 publishes Figma Make guidelines + project template adapted from PF-2001b component docs.
3. **Phase 3 — Designer enablement.** **Excluded from PI-4318 scope.** Figma Make template ships and is discoverable; designer adoption flows via the design org's normal enablement channels rather than a PI-driven session.

## Exit criteria (track)

- 75/75 Code Connect coverage (M10) — 5-page subset from PF-2005, remainder from PF-2009
- M12 drift CI check live and green
- BASE spec aligned with Picasso component docs across all 75 components (PF-2006 5-page + PF-2027 remainder)
- Figma Make template published org-wide and discoverable
- `bin/generate-code-connect.ts` + `bin/base-audit.ts` committed and reusable for ongoing maintenance
- Token mapping doc committed; M12 drift CI catches any future BASE↔Picasso prop drift
- Designer onboarding **excluded from PI scope** (post-PI / design-org channels)

---

## Stories

### P1-FIG-01 — Build agentic Code Connect generator + Code Connect for 5-page subset

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-figma-design-to-code` · **Estimate:** S (3-4.5d) · **Blocked by:** P1-MEAS-01 (PF-1998 component-set), P1-FIG-02, P1-FIG-03 · **Blocks:** PF-2000 A2 measurement run, PF-2009
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 1](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
**v11 expanded** — engineer authors `bin/generate-code-connect.ts` (template + Figma MCP integration + Dev Mode snippet verification + iteration loop, max 3) on the way to running it on the 5-page subset. Then create `.figma.tsx` files for the 12-18 components in `pilot/component-set.md`, mapping Figma (BASE) properties to Picasso props, published via Figma Code Connect CLI. Generator script is reused unchanged by PF-2009 for the remaining ~60.

**AI leverage.** Engineer manually reviews the first 3-5 components to lock canonical style; agent handles remainder. See [PI-4318-ai-leverage-tickets.md §PF-2005](./PI-4318-ai-leverage-tickets.md#pf-2005--agentic-code-connect-generator-top-20).

**Acceptance criteria**
- [ ] `bin/generate-code-connect.ts` committed: template + Figma MCP integration + Dev Mode snippet verification + iteration loop (max 3)
- [ ] `.figma.tsx` files committed and published for every component in `pilot/component-set.md` (~12-18 files)
- [ ] Each component verified in Figma Dev Mode and via Figma MCP
- [ ] Figma MCP configured for named pilot engineers (3-5 engineers, Cursor + Claude Code)
- [ ] Generator script reusable unchanged by PF-2009 (no Picasso-specific tweaks)
- [ ] Available for PF-2000 A2 measurement run

---

### P1-FIG-02 — Build BASE audit script + Update BASE spec gaps for 5-page subset

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-figma-design-to-code` · **Estimate:** S (2.5-3.5d) · **Blocked by:** P1-MEAS-01 (PF-1998 component-set) · **Blocks:** P1-FIG-01, PF-2027
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 2](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
**v11 expanded** — engineer authors `bin/base-audit.ts` (TypeScript AST parser + Figma MCP integration + RAG-status output, ~1d) on the way to running the audit. Script reads Picasso source + BASE schemas, compares prop names / types / variants programmatically, outputs RAG-status spreadsheet with per-component fix recommendations. Designer reviews flagged items only and applies fixes in Figma (~2d). Audit script is reused unchanged by PF-2027 for the remaining ~60. See [PI-4318-ai-leverage-tickets.md §PF-2006](./PI-4318-ai-leverage-tickets.md#pf-2006--pf-2027--ai-driven-base-audit--designer-led-fixes).

**Acceptance criteria**
- [ ] `bin/base-audit.ts` committed: TypeScript AST parser + Figma MCP integration + RAG-status output
- [ ] Audit run on the 12-18 components in `pilot/component-set.md`; spreadsheet published with per-component fix recommendations
- [ ] Designer applies flagged fixes in BASE Figma; change-log committed to DS space
- [ ] Audit script reusable unchanged by PF-2027 (no Picasso-specific tweaks)

---

### P1-FIG-03 — Verify design token mapping between BASE and Picasso

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-figma-design-to-code` · **Estimate:** XS (1-2d) · **Blocked by:** P1-MEAS-01 · **Blocks:** P1-FIG-01
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 3](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Confirm colors, spacing, and typography tokens used in BASE Figma are traceable 1:1 to Picasso token names. Without this, AI outputs drift visually even when Code Connect is wired correctly.

**Acceptance criteria**
- [ ] Token-mapping doc committed covering colors, spacing, typography
- [ ] Every token used in R1 reference designs has a verified Picasso counterpart
- [ ] Mismatches logged with owner (DS designer) and fixed or explicitly flagged
- [ ] Mapping referenced from `.picasso/` rules v2

---

### P2-FIG-01 — Define Figma Make guidelines and project template

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-figma-design-to-code` · **Estimate:** S (2-3d) · **Blocked by:** PF-2001b (guidelines reuse component docs)
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
**Scope reduced.** Original 6d estimate assumed setting up the private npm registry from scratch. Toptal's `@toptal` scope already publishes packages, so registry config drops out. Remaining work: Picasso install path in Figma Make (~0.5d), guidelines authoring from PF-2001 docs (~1.5d), template publish + designer-test validation (~1d).

**Acceptance criteria**
- [ ] Picasso installable in Figma Make from the existing `@toptal` npm registry
- [ ] `guidelines/` folder committed (adapted from PF-2001 component .md files)
- [ ] Template published org-wide and discoverable
- [ ] End-to-end validation: a designer generates a screen from a sample design using only the template; output uses correct Picasso imports + props

> Assumption: existing `@toptal` npm registry is reachable from Figma Make. If not, add 1-2d for registry-side configuration.

---

### PF-2027 — Update BASE Design System spec gaps (remaining ~60 components)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-figma-design-to-code` · **Estimate:** S (7-10d, mostly designer time) · **Blocked by:** PF-2001b (Picasso component docs ready) · **Blocks:** P2-FIG-02
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2 (new in v6)](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)


**Description**
**Rescoped in v10** — covers the components NOT in the 5-page subset (~60 instead of 55). Symmetric with P1-FIG-02 (which closed BASE spec gaps for the 5-page subset). Audit BASE Figma Product Library against the Picasso component docs (PF-2001b output), close gaps in component naming, prop naming, prop completeness, and variant coverage. The Code Connect parser needs prop-name alignment between BASE and Picasso to generate accurate snippets — without this work, PF-2009's `.figma.tsx` files would emit incorrect snippets for some of the ~60.

Owned with designer (same shape as PF-2006). PF-2001 already includes designer's dos/don'ts review (folded in during the docs work), so component docs handed off to PF-2027 are review-ready.

**AI leverage.** Reuses `bin/base-audit.ts` from PF-2006 unchanged — runs against the remaining 55 components, designer reviews flagged items. Highest-leverage AI deliverable in the program: transforms designer's role from "audit + fix" to "review-flagged + fix" at scale. ~70% audit-time reduction (~3-4 designer-day savings).

**Acceptance criteria**
- [ ] BASE audit spreadsheet for the remaining 55 components: BASE component name, variant coverage, prop-mapping cleanliness (green / yellow / red); gap list reviewed with designer
- [ ] BASE components updated: consistent names, prop names aligned with Picasso API where possible
- [ ] Variant coverage improved for any yellow-status component in the 55; red-status components either fixed or explicitly flagged
- [ ] Changelog committed to DS space (short summary of what changed and why)
- [ ] Gaps that should also reflect in Picasso component docs routed back to PF-2001 (designer)

---

### P2-FIG-02 — Code Connect for remaining ~60 Picasso components

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-figma-design-to-code` · **Estimate:** S (4-5d) · **Blocked by:** P1-FIG-01, PF-2027, PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04 (per-batch for migrated components)
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
**Rescoped in v10** — covers the components NOT in the 5-page subset (~60 instead of 55). Author `.figma.tsx` for the remaining ~60 components, reaching full library coverage (75/75). Full-library verification pass for Dev Mode snippets and MCP CodeConnectSnippets.

**AI leverage.** Reuses the agentic Code Connect generator from PF-2005 unchanged. Generator playbook is stable after the 5-page subset locks the format; expected per-component cost ~0.05d. Engineer batches review across the ~60.

**Acceptance criteria**
- [ ] ~60 `.figma.tsx` files committed and published (full library = 75/75 with the 5-page subset from PF-2005)
- [ ] Dev Mode snippet verified for every component (sample variant)
- [ ] MCP CodeConnectSnippets verified for each component via scripted check
- [ ] Any mismatch fixed or explicitly documented
- [ ] M10 reports 75/75
- [ ] M12 (drift) CI check live; PRs breaking `.figma.tsx` fail fast

---

### P3-FIG-01 — Onboard designers to BASE and Figma Make

**Excluded from PI-4318 scope.** Designer enablement deferred to post-PI work. Figma Make template (PF-2008) ships and is discoverable; designer adoption flows via the Toptal design org's normal enablement channels rather than a PI-driven session.

---

# Epic D — Maestro Integration track

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `track-maestro-integration`
**Phase doc ref:** [PI-4318-phases.md](./PI-4318-phases.md)

## Goal

Replace Figma MCP on the Maestro path with a production-ready Figma Middleware (Figma REST API based), and capture the O4 adoption baseline. PI exits at production-middleware-ready + baseline-audited; **driving adoption is post-PI work.** PoC at the start of the program; productionization at the tail (per timeline-v4 v2 directive: Maestro work bookends the program rather than running through the middle).

## Track arc (v11)

1. **Phase 1 — PoC (parallel, no gate).** PF-2011 builds a Figma Middleware CLI PoC via the Figma REST API and writes up the comparison vs Figma MCP. Lightweight — no production wiring, no Maestro-side integration. Output is a runnable example + a productionization estimate that feeds PF-2012 scoping.
2. **Phase 2/3 tail — Productionization + baseline.** PF-2012 productionizes the middleware in Maestro's environment (deployment, monitoring, error reporting, migration guide, end-to-end integration in at least one Maestro project) — runs at the program tail (~Jul 9 onward in v4 v2). PF-2013 inventories existing Maestro projects and records the O4 baseline. Eng C is the program-end-determining engineer; bumping to 100% during this window compresses program end from ~Aug 4 to ~Jul 22.
3. **Phase 3 — Adoption.** **Excluded from PI scope.** P3-MAE-01 (onboarding) and P3-MAE-02 (Maestro defaults to Picasso) deferred to post-PI work or a follow-on PI.

## Exit criteria (track, PI scope)

- Figma Middleware running in Maestro's environment, replacing Figma MCP on the Maestro path
- Middleware deployed with monitoring + error reporting; integrated into at least one Maestro project end-to-end
- Migration guide written for Maestro consumers
- O4 baseline audit complete (count of Maestro projects using Picasso UI today, recorded in `metrics/outcome.md`)
- Maestro team sign-off on production middleware
- Phase 3 O4 target set jointly with Maestro team (executed post-PI)

> Note: original track exit included "new Maestro projects default to Picasso" and "O4 adoption target hit". Both moved out of PI scope with P3-MAE-01/02 exclusion. PI exits the Maestro track at production-middleware-ready, not at adoption-rolled-out.

---

## Stories

### P1-MAE-01 — PoC of Figma Middleware based on API

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-maestro-integration` · **Estimate:** XS (~3d)
**Phase doc ref:** [Phase 1 Secondary parallel scope — Maestro Integration row 1](./PI-4318-phases.md#phase-1--secondary-parallel-scope)

**Description**
Build a working PoC of the Figma Middleware CLI / service based on the Figma REST API, and use it for an AI-assisted frontend implementation flow (alternative to Figma MCP on the Maestro path). Lightweight — no production wiring, no Maestro-side integration.

**Acceptance criteria**
- [ ] PoC repo (public or internal) with README and runnable example
- [ ] Demonstrates end-to-end read of a sample Figma design via REST API
- [ ] Returns structured output usable by an AI agent to generate Picasso snippets
- [ ] Comparison write-up: Figma Middleware vs Figma MCP (capability, cost, trade-offs)
- [ ] Effort estimate for Phase 2 productionization

---

### P2-MAE-01 — Implement Figma Middleware (production) based on PoC

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-maestro-integration` · **Estimate:** XS (~8d) · **Blocked by:** P1-MAE-01
**Phase doc ref:** [Phase 2 — Maestro Integration row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
Productionize the Figma Middleware CLI / service from the Phase 1 PoC, replacing Figma MCP on the Maestro path. Used by Maestro to consume Figma designs when generating Picasso UI.

**Acceptance criteria**
- [ ] Middleware deployed / runnable in Maestro's environment
- [ ] Covers the Figma read features Maestro needs (components, variants, tokens)
- [ ] Monitoring + error reporting configured
- [ ] Migration guide written for Maestro consumers
- [ ] Integrated into at least one Maestro project end-to-end

---

### P2-MAE-02 — Audit Maestro for Picasso UI generation (O4 baseline)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-maestro-integration` · **Estimate:** XS (~2d) · **Blocked by:** P2-MAE-01
**Phase doc ref:** [Phase 2 — Maestro Integration row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
Inventory existing Maestro projects and record baseline count generating Picasso UI. This is the baseline for O4; Phase 3 target set jointly with the Maestro team.

**Acceptance criteria**
- [ ] Audit spreadsheet: project name, uses Picasso (y/n), notes
- [ ] Baseline number recorded in `metrics/outcome.md`
- [ ] Phase 3 O4 target set jointly with Maestro team

---

### P3-MAE-01 — Onboarding to Maestro

**Excluded from PI-4318 scope.** Maestro enablement (sessions, quick-start, docs for Maestro users) deferred to post-PI work. Picked up by Maestro team or in a follow-on PI once production middleware (PF-2012) is shipped.

---

# Epic E — Pilot Measurement track

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `track-measurement`
**Phase doc ref:** [Measurement harness — implementation](./PI-4318-phases.md#measurement-harness--implementation)

## Goal

Quantify the program's AI-DX value with a head-to-head H / A1 / A2 measurement on 5 Staff Portal pages. The **A1 → A2 lift** is the program's most user-visible deliverable — a number that captures how much an AI agent's output improves once Code Connect (Figma track) + Agent Experience (AIC track) are wired up vs. baseline AI agent + Figma MCP alone.

This is its own track, not a sub-section of AIC or Figma, because the lift is **jointly produced by both tracks**: A1 has neither pipeline turned on; A2 has both. You can't attribute the lift to AIC alone or Figma alone without running additional ablation conditions, which the program scope doesn't include. Filing the measurement under either parent track would mis-credit the contribution.

## Track arc (v12)

1. **Phase 1 — Selection + protocol + H + A1.** PF-1998 selects 5 Staff Portal pages with shipped implementations + Figma specs and extracts the Picasso component set used. PF-2000 authors the measurement protocol (3-condition runner, M1-M5 scoring scripts, reporting templates), then runs Baseline H (the shipped human implementations) and Baseline A1 (AI without Code Connect, without `.picasso/`). Both deliver `pilot/reports/baseline-pre-pipeline.md` by ~Jun 5.
2. **Phase 2 — A2 + post-pipeline report.** Once the AIC + Figma artifacts for the 5-page subset are live (PF-1997 + PF-2001a + PF-2005), PF-2000 runs A2 and publishes `pilot/reports/post-pipeline.md` — H / A1 / A2 with % lift per metric. Headline number ~Jun 19.
3. **Phase 3 — Final A2 re-run + sentiment survey.** After the full-scope work lands (PF-2001b + PF-2027 + PF-2009), PF-2000 re-runs A2 on the same 5 specs to validate the lift held under full-scope rollout (i.e. Phase 2 expansion didn't regress the 5-page subset). Pilot engineer sentiment survey runs end of Phase 2.

## Exit criteria (track)

- 5 pages selected with shipped implementations + Figma specs (`pilot/5-pages.md`)
- Picasso component set extracted (`pilot/component-set.md`) and adopted as the working scope for PF-1997, PF-1999, PF-2001a, PF-2005, PF-2006
- Measurement protocol committed: scoring scripts (M1-M4) + designer rubric (M5) + 3-condition runner + reporting templates
- **Headline measurement published:** `pilot/reports/baseline-pre-pipeline.md` (H + A1) at end of Phase 1; `pilot/reports/post-pipeline.md` (H + A1 + A2 with % lift per metric) mid-Phase-2; final A2 re-run at end of Phase 2 confirms the lift held
- Pilot engineer sentiment ≥ 4/5 with "would keep using" qualitative response
- All raw run output committed under `pilot/runs/{h,a1,a2-mid,a2-final}/` (no cherry-picking, no hidden re-runs)

## Ownership

Eng B owns delivery (executes the runs, authors the protocol). Designer scores M5 (brand-fidelity rubric) on each of the 15 runs (5 pages × 3 conditions). Vedran signs off on page selection.

## Cross-track inputs

The A2 run consumes artifacts produced by the Agent Experience and Figma tracks; that's why this is its own track rather than living under either:

- **From Epic B (AIC):** PF-1997 (`.picasso/` v2 + lean Storybook docs), PF-1999 (patterns merged into `.picasso/`), PF-2001a (polished docs for the 5-page subset)
- **From Epic C (Figma):** PF-2005 (Code Connect for the 5-page subset; via `bin/generate-code-connect.ts`)
- **For final A2 re-run:** PF-2001b (remaining ~60 docs polish), PF-2027 (BASE remaining), PF-2009 (CC remaining ~60)

---

## Stories

### P1-MEAS-01 — Select 5 Staff Portal pages + extract Picasso component set

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-measurement` · **Estimate:** XS (1-1.5d) · **Blocks:** P1-FIG-01, P1-FIG-02, P1-FIG-03, P1-MEAS-02 (PF-2000), PF-2001a
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 2](./PI-4318-phases.md#phase-1--gated-scope) (legacy reference; v12 splits this story into the new Pilot Measurement track)

**Description**
**Rescoped in v11** to selection + extraction only. Pick 5 Staff Portal pages with shipped implementations *and* Figma design specs. Extract the Picasso component set used in those pages (typically 12-18 components). Hand off the component set to PF-2000 for measurement runs and to PF-2005/PF-2006/PF-2001a for Code Connect / BASE / docs work.

**Acceptance criteria**
- [ ] 5 Staff Portal pages selected covering forms, layouts, data-display, navigation, feedback patterns; rationale published as `pilot/5-pages.md`
- [ ] Each page has both a shipped implementation (file path) and a Figma spec link
- [ ] Picasso components used in those 5 pages extracted; published as `pilot/component-set.md` (the working set for PF-2000, PF-2005, PF-2006, PF-2001a)
- [ ] Any 5-page component without a clean BASE counterpart flagged (input to P1-FIG-01)
- [ ] Selection signed off by Vedran + designer

---

---

### P1-MEAS-02 — Measurement protocol + 3-condition runner + H + A1 + A2 + final A2 re-run

**Phase:** 1+2 · **Labels:** `phase-1`/`phase-2`, `track-measurement` · **Estimate:** S (3-5d) · **Blocked by:** P1-MEAS-01 (PF-1998 component set), PF-1997, PF-2005, PF-2001a (for A2 run); PF-2001b + PF-2027 + PF-2009 (for final A2 re-run) · **Blocks:** —
**Phase doc ref:** [Measurement harness — implementation](./PI-4318-phases.md#measurement-harness--implementation)

**Description**
**Expanded in v11** to own the entire measurement chain. Build the 5-page measurement protocol (protocol authoring + 3-condition runner + scoring rubric M1-M5 + reporting templates), then execute all three baseline conditions (H / A1 / A2) and the final re-run.

**Scoring rubric (M1-M5).** Each of the 5 Staff Portal pages is scored against its Figma spec on five metrics. The protocol scripts implement these — see [PI-4318-phases.md §Measurement harness](./PI-4318-phases.md#measurement-harness--implementation) for the canonical definitions and [PI-4318-technical-ideation.md](./PI-4318-technical-ideation.md) for implementation notes (ts-morph + AST scans + token allowlist).

| Metric | What it measures | How it's scored | Phase 1 target |
|---|---|---|---|
| **M1 — Component accuracy** | Of the components identifiable in the Figma spec, % the implementation resolves to the *correct* Picasso component (e.g. Figma's `Button` maps to `<Button>` not `<a className="...">`). | `bin/score-component.ts` walks JSX imports + element names with ts-morph, diffs against the ground-truth `{component, count}` mapping for each page (committed in `pilot/component-set.md`). | >85% |
| **M2 — Prop accuracy** | % of props set correctly without manual correction (variant, size, color, state, disabled, etc.). Catches "right component, wrong props". | `bin/score-props.ts` does per-JSX-element prop diff vs ground truth. Synonym-prop tolerance table maintained per component (e.g. `variant="primary"` ≡ `primary`). | >75% |
| **M3 — Token fidelity** | % of color / spacing / typography usages that match Picasso's design tokens — i.e. no drift to hex / px / rgba literals. Catches "right component, off-brand colors". | `bin/score-tokens.ts` regex + AST scan for hex / px / rgba literals, cross-reference against `@toptal/picasso-tokens` allowlist. Anything outside the allowlist counts as drift. | Baseline + measurable lift |
| **M4 — Visual fidelity** | Pixel diff % between the implementation rendered in Storybook vs the Figma export of the same page. Catches anything M1-M3 miss. | Happo visual regression on each of the 5 pages (existing Picasso Happo pipeline). Score = inverse of pixel-diff %. | Baseline + measurable lift |
| **M5 — Brand-fidelity score** *(implements O3)* | Subjective rubric: designer scores each page 0-5 on (a) colors, (b) typography, (c) spacing, (d) component choice, (e) overall Toptal-ness. Captures things rubric-based scoring misses (visual rhythm, hierarchy, polish). | designer scores each page using the fixed rubric; same designer scores all three conditions (H / A1 / A2) so scoring is consistent. | Measurable lift over baseline |

**Three conditions (H / A1 / A2).** Each page goes through all three conditions, scored on M1-M5:

| Condition | What it represents | Setup | Owner |
|---|---|---|---|
| **H — Human baseline** | Score of the *already-shipped* human implementation against the Figma spec. The ceiling we're trying to approach with AI. | Read `pilot/component-set.md`'s `impl_path` for each page; score the file as-is. No AI involved. | Pilot engineer + designer (M5) |
| **A1 — AI without pipeline** | AI agent + Figma MCP, **no** Code Connect, **no** `.picasso/`. Establishes "what the agent can do today, cold." | Run AI agent (Cursor or Claude Code) on the Figma spec with only Figma MCP + the bare Picasso npm package. No `.cursorrules`, no `.picasso/` reference, no Code Connect. | Pilot engineer + designer (M5) |
| **A2 — AI with pipeline** | AI agent + Figma MCP **+** Code Connect (PF-2005) **+** Agent Experience (PF-1997 + PF-2001a). The headline value-delivery measurement. | Same agent + same prompts as A1, but with `.cursorrules` referencing `node_modules/@toptal/picasso/.picasso/llms.txt` and Code Connect snippets live for the 5-page component subset. | Pilot engineer + designer (M5) |

The **A1 → A2 lift** per metric is the program's headline AI-DX number. A2 → H gap is the residual ceiling (how much further the pipeline could go beyond what shipped Phase 1 delivers).

**AI leverage.** AI authors the M1-M4 scoring scripts (ts-morph for M1, prop-diff for M2, regex/AST + token allowlist for M3, Happo wrapper for M4) from the rubric specs in [PI-4318-phases.md](./PI-4318-phases.md#measurement-harness--implementation); engineer reviews + tunes thresholds. M5 stays manual — designer scores each of 15 runs (5 pages × 3 conditions) using the rubric. 3-condition runner is templated.

**Acceptance criteria**

*Protocol:*
- [ ] `pilot/protocol.md` committed — selection criteria + scoring rubric M1-M5 (definitions, targets, ground-truth source per metric, designer M5 rubric form)
- [ ] `bin/extract-picasso-components.ts` committed — produces `pilot/component-set.md` ground-truth from each page's `impl_path`
- [ ] `bin/score-component.ts` committed — M1 scorer (ts-morph JSX walk + ground-truth diff)
- [ ] `bin/score-props.ts` committed — M2 scorer (per-element prop diff + synonym tolerance table)
- [ ] `bin/score-tokens.ts` committed — M3 scorer (hex/px/rgba scan + `@toptal/picasso-tokens` allowlist cross-reference)
- [ ] `bin/score-visual.ts` committed — M4 scorer (Happo wrapper that runs the page in Storybook against Figma export)
- [ ] `pilot/m5-rubric.md` committed — designer's brand-fidelity rubric (5 sub-scores 0-5 on colors / typography / spacing / component choice / overall Toptal-ness)
- [ ] `bin/measurement-runner.ts` committed — 3-condition H/A1/A2 runner, invokes scorers and aggregates into reports
- [ ] `pilot/reports/_template.md` committed — output format for `baseline-pre-pipeline.md` + `post-pipeline.md`

*Baseline H run (Phase 1):*
- [ ] Score the 5 shipped human implementations against their Figma specs on M1-M4 (automated) + M5 (designer manual); raw scores committed to `pilot/runs/h/`

*Baseline A1 run (Phase 1):*
- [ ] AI agent + Figma MCP, no Code Connect, no `.picasso/`; raw outputs + M1-M4 scores + M5 designer scores committed to `pilot/runs/a1/`
- [ ] `pilot/reports/baseline-pre-pipeline.md` published comparing H vs A1 across M1-M5

*A2 baseline run (Phase 2):*
- [ ] AI agent + Code Connect (PF-2005) + Agent Experience (PF-1997 + PF-2001a) on the same 5 Figma specs; raw outputs + M1-M5 scores committed to `pilot/runs/a2-mid/`
- [ ] `pilot/reports/post-pipeline.md` published comparing H / A1 / A2 with % lift per metric (M1, M2, M3, M4, M5)

*Final A2 re-run (Phase 2 wrap):*
- [ ] After PF-2001b + PF-2027 + PF-2009 land, re-run A2 on the same 5 specs; raw outputs + scores committed to `pilot/runs/a2-final/`
- [ ] Validates A2 numbers held after full-scope rollout (no regression on M1-M5 vs mid-Phase-2 numbers)

*Survey + integrity:*
- [ ] Pilot engineer sentiment survey run and results published (M9 — qualitative + 1-5 "would keep using")
- [ ] No cherry-picking, no hidden re-runs (raw output committed under `pilot/runs/` for every condition)

---

---

### P3-MAE-02 — Maestro using Picasso as default for new projects

**Excluded from PI-4318 scope.** Maestro adoption (default library config, O4 target tracking) deferred to post-PI. The PI ships production-ready Figma Middleware (PF-2012) and a baseline audit (PF-2013); driving adoption is a follow-on activity.

---

# Summary

- **5 Epics** by track. Track totals after v13 Modernization retiering:
  - **Modernization:** 11 stories — **38-58 man-days** (unchanged from v13; v14 internal redistribution after migration plan v3 re-audit — Tier 1 cleanup grew from 5 to 11; Tier 2 narrowed from 9 to 5; Page moved to Tier 3).
  - **Agent Experience:** 6 stories — **8.5-15.5 man-days** (PF-1998 + PF-2000 moved to Epic E in v12, removing 4-6.5d from this track).
  - **Figma Design-to-Code:** 6 stories — **19.5-28 man-days** (unchanged).
  - **Maestro Integration:** 3 stories — **9-14 man-days** (unchanged).
  - **Pilot Measurement:** 2 stories — **4-6.5 man-days** (PF-1998 + PF-2000 since v12).
- **Program total: 80-123 man-days** (v13).
- **Program start: May 4, 2026.** See [PI-4318-timeline-v4.md](./PI-4318-timeline-v4.md) for the calendar.
- **29 Stories total**. Exclusions unchanged.
- **Phase is a label.** `phase-1` / `phase-2` / `phase-3` + `gated` / `non-gating-parallel` / `post-gate` for the Phase 1 gate filter. With v6 timeline optimization, the Phase 1 gate is treated as informational (parallel), not a hard go/no-go blocker on Phase 2 modernization.
- **Phase 1 foundation readiness** (no gate in v11+): `P1-AIC-01`, `P1-AIC-03`, `P1-FIG-01`, `P1-FIG-02`, `P1-FIG-03`, `P1-MEAS-01`, `P1-MEAS-02` — saved filter: `labels = "phase-1" AND labels = "non-gating-parallel"`.
- **Phase 1 parallel** (3 stories): `P1-MOD-01`, `P1-MOD-02`, `P1-MAE-01` — saved filter: `labels = "phase-1" AND labels = "non-gating-parallel"`.

## Cross-track dependency map

Dependencies that cross track/epic boundaries (these are the ones most worth watching in Jira link view since they're no longer co-located inside a single phase epic). Reflects v5 splits and v6 timeline optimization:

- **P1-MEAS-01 (PF-1998) → P1-FIG-01, P1-FIG-02, P1-FIG-03** — 5-page component-set locks scope for all Phase 1 Figma work.
- **P1-MEAS-01 (PF-1998) → P1-AIC-03 (PF-1999), PF-2001a, P1-MEAS-02 (PF-2000)** — component set is the working scope for Phase-1 docs polish, pattern extraction, and measurement runs.
- **P1-FIG-01 (PF-2005) → P1-MEAS-02 (PF-2000)** — Code Connect for the 5-page subset must land before A2 baseline run.
- **P1-AIC-01 (PF-1997) + PF-2001a → P1-MEAS-02 (PF-2000)** — `.picasso/` v2 + polished 5-page docs are required inputs to A2 baseline run.
- **P1-AIC-03 → PF-2001 (P2-AIC-01a)** — pattern inventory feeds component docs.
- **P1-MOD-01, P1-MOD-02 → PF-1994 (P2-MOD-01a)** — migration plan + pnpm are prereqs for Tier 1 base/* migration.
- **PF-1994 → P2-MOD-02, P2-MOD-03, P2-MOD-04** — Tier 1 primitives (Typography, FormLabel, Form, etc.) must be stable before sibling packages (charts, query-builder, RTE) can consume them cleanly. Per migration plan §10, siblings can start as soon as Tier 1 ships, not waiting for full PF-1994 completion.
- **PF-2025, P2-MOD-02..04 → P2-MOD-05** — `picasso-provider` rewrite + root peer-dep removal (canary) runs LAST after every consumer of the provider is migrated.
- **P2-MOD-05 → P2-MOD-06** — AI migration prompt + worked examples authored after provider rewrite ships.
- **PF-2001 → P2-FIG-01** — Figma Make guidelines reuse component docs (only PF-2001 content is needed, not full PF-2001 split).
- **PF-2001 → PF-2027** — Picasso component docs (with designer's reviewed dos/don'ts integrated) are the input for the BASE audit on the remaining 55.
- **PF-2027 → P2-FIG-02** — BASE spec gaps for the 55 must be closed before Code Connect 55 can generate clean snippets. Symmetric with how P1-FIG-02 blocks P1-FIG-01.
- **PF-2025, P2-MOD-02..04 → P2-FIG-02** — migrated components (base + siblings) need fresh `.figma.tsx`.
- **P1-MAE-01 → P2-MAE-01** — PoC to production.
- **P2-MOD-06, P2-MAE-01 → P3-MOD-01** — Staff Portal migration uses the AI migration prompt + production middleware.
- **PF-2001, PF-2026 → P3-AIC-02** — npm-bundled distribution ships `.picasso/` + Skills.

## Review checklist

- [ ] Epic-per-track grouping correct for your team structure (one owner per epic)?
- [ ] Phase labels + gate filters enough to replace the phase-epic visibility you'd lose?
- [ ] Cross-track dependencies complete and sequenced correctly?
- [ ] Track-level exit criteria sharp enough for epic-close sign-off?
- [ ] Any stories that should move to a different track (e.g., P1-MEAS-02 has a `measurement` flavor — own under Agent Experience or split)?
- [ ] T-shirt estimates still reasonable?
- [ ] Happy to keep story IDs stable, or renumber to `MOD-01..06`, `AIC-01..08`, etc. to match the new grouping?
