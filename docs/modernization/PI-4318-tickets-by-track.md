# PI-4318 — Jira Tickets (Organized by Track)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Source:** [PI-4318-phases.md](./PI-4318-phases.md) · [PI-4318-tickets.md](./PI-4318-tickets.md) (phase-organized version)
**Status:** Draft for Vedran's review — not yet added to Jira.

## Structure

- **4 Epics** — one per track (Modernization / Agent Experience / Figma Design-to-Code / Maestro Integration). Each epic owns its track end-to-end from Phase 1 through Phase 3.
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
- One of `track-modernization`, `track-agent-experience`, `track-figma-design-to-code-design-to-code`, `track-maestro-integration-integration` (redundant with the epic but useful for cross-epic queries and reports)

Recommended Jira saved filters:

- **Phase 1 gate readiness** — `labels = "phase-1" AND labels = "gated"` — the 7 stories whose status determines Go/No-Go
- **Phase 1 parallel** — `labels = "phase-1" AND labels = "non-gating-parallel"` — the 3 stories that must not block the gate
- **Current phase board** — `labels = "phase-2"` (or 3) — what's in flight right now
- **Track board** — grouped by the epic directly

---

## Table of Contents

- [Epic A — Modernization track](#epic-a--modernization-track) — 10 stories
- [Epic B — Agent Experience track](#epic-b--agent-experience-track) — 8 stories
- [Epic C — Figma Design-to-Code track](#epic-c--figma-design-to-code-track) — 6 stories
- [Epic D — Maestro Integration track](#epic-d--maestro-integration-track) — 5 stories
- [Summary](#summary)

---

# Epic A — Modernization track

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `track-modernization`
**Phase doc ref:** [PI-4318-phases.md](./PI-4318-phases.md)

## Goal

Migrate Picasso from MUI v4 / JSS to Base UI (`@mui/base`) + Tailwind, roll that migration out to the 23 actively developed consumer repos, and retire deprecated deps. Unblocks React 19 adoption org-wide (O2) and closes out O1 (deprecated deps = 0) and O5 (23/23 repos on modern Picasso).

## Track arc

1. **Phase 1 — Prep (non-gating parallel):** Migration plan + pnpm migration, so Phase 2 can start day 1 if the gate passes.
2. **Phase 2 — Component + package migration:** All `base/*` components migrated with per-component DoD, then the three sibling packages (`picasso-charts`, `picasso-query-builder`, `picasso-rich-text-editor`), then `picasso-provider` is decommissioned and the root MUI v4 peer-dep is removed. Codemods authored alongside.
3. **Phase 3 — Consumer rollout:** 23 active repos migrated in waves; MUI v4 / JSS decommissioned from Picasso entirely.

## Exit criteria (track)

- Zero `@material-ui/core` and zero JSS imports inside Picasso
- All 23 actively developed repos on modernized Picasso (O5)
- React 19 validated on modernized Picasso (O2 unblocked)
- Deprecated-deps package audit green (O1 = 0)

---

## Stories

### P1-MOD-01 — Create migration plan for AI-assisted Picasso migration

**Phase:** 1 · **Labels:** `phase-1`, `non-gating-parallel`, `track-modernization` · **Estimate:** XS (2-3d)
**Phase doc ref:** [Phase 1 Secondary parallel scope — Modernization row 1](./PI-4318-phases.md#phase-1--secondary-parallel-scope)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md)

**Description**
Define the scope and execution plan for migrating Picasso to Base UI + Tailwind so Phase 2 can start day 1 if the gate passes. Covers: defined scope of migration, top-level plan + plan per component, testbed setup, AI migration prompt.

**Acceptance criteria**
- [ ] `docs/migration-plan.md` committed in Picasso repo
- [ ] Top-level plan with complexity tiering for all 75 components (16 MUI v4 pkgs / 11 @mui/base / ~48 remaining)
- [ ] Per-component plan template + 2-3 worked examples
- [ ] Testbed setup documented (how a migrated component is validated: Happo, Jest, Cypress, React 19 smoke)
- [ ] AI migration prompt documented (reusing Phase 0 Codex prompt, revised)
- [ ] Risk register + rollback strategy
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

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** ~14d total (split: 3.5 + 4.5 + 6) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tiers 1–3](./PI-4318-P1-MOD-01-migration-plan.md#3-component-inventory--tiering)

**Split note.** Original PF-1994 covered all 17 units in one XL ticket. Split into 3 tier-tickets to match migration plan §10 cadence and unblock parallelism with sibling-package migrations once Tier 1 lands.

**Per-component Definition of Done (applies to all three sub-tickets)**
- Happo baseline pixel-perfect (any visual diff is a bug to fix; no designer sign-off needed)
- Jest + Cypress green
- React 19 smoke-tested
- Storybook story updated
- `.figma.tsx` still valid (M12 clean)

---

#### PF-1994 — Migrate `packages/base/*` Tier 1 (foundation primitives)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (~3.5d) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** PF-2024, P2-MOD-02..04


Components: Form, FormLabel, FormLayout, Note, Typography, ModalContext, Utils (7). Foundation primitives — sibling-package migrations and Tier 2/3 composites all depend on them. Eng A prioritizes Typography + FormLabel + Form first within this batch so RTE/QB can start in parallel.

**Acceptance criteria**
- [ ] All 7 Tier 1 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in those packages' `src/**`
- [ ] Zero JSS in those packages' `src/**`
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] React 19 smoke suite green
- [ ] Happo baselines regenerated

---

#### PF-2024 — Migrate `packages/base/*` Tier 2 (compound)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (~4.5d) · **Blocked by:** PF-1994 · **Blocks:** PF-2025, P2-MOD-05


Components: Checkbox, Radio, Tooltip, FileInput, Popper, Notification, Grid (7). Compound, medium surface, 2-5 subcomponents each.

**Acceptance criteria**
- [ ] All 7 Tier 2 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports
- [ ] Zero JSS
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] React 19 smoke suite green
- [ ] Happo baselines regenerated

---

#### PF-2025 — Migrate `packages/base/*` Tier 3 + type-leak fixes

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (~6d) · **Blocked by:** PF-2024 · **Blocks:** P2-MOD-05


Components: Dropdown, Accordion, Page (3 composite). Plus cleanup of type-only MUI v4 leaks in Container, OutlinedInput, Notification. Highest-surface units; expect manual touch-up on JSS parent-refs and theme overrides.

**Acceptance criteria**
- [ ] All 3 Tier 3 units migrated; per-component DoD met
- [ ] Container, OutlinedInput, Notification type-only leaks resolved
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports anywhere in `packages/base/*/src/**`
- [ ] Zero JSS anywhere in `packages/base/*/src/**`
- [ ] Zero `@material-ui/core` entries in any `packages/base/*/package.json`
- [ ] React 19 smoke suite green on the entire base/* set
- [ ] Happo baselines regenerated

---

### P2-MOD-02 — Migrate `@toptal/picasso-charts` (LineChart)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (1-2d) · **Blocked by:** PF-1994 (Tier 1 primitives) · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-charts` — a single component (LineChart) using `makeStyles` + `createStyles` + `Theme` from `@material-ui/core`. Smallest of the sibling-package migrations; treat as a warm-up for the larger siblings. Same per-component loop as P2-MOD-01.

**Acceptance criteria**
- [ ] LineChart migrated: no `@material-ui/core` imports, no JSS primitives in source
- [ ] `@material-ui/core` removed from `packages/picasso-charts/package.json`
- [ ] Jest + Cypress + Happo + React 19 smoke green
- [ ] Storybook stories updated and rendering

---

### P2-MOD-03 — Migrate `@toptal/picasso-query-builder` (11 components)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (6-8d) · **Blocked by:** PF-1994 (Tier 1 primitives) · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-query-builder` — 11 components across 21 source files on MUI v4 + JSS: AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor. Batch into 3–4 PRs by component cluster (e.g. Selectors, Inputs, Buttons, QueryBuilder root). Runs after P2-MOD-01 so the migrated `base/*` primitives are available.

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

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** XS (7-10d) · **Blocked by:** PF-1994 (Tier 1 primitives) · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-rich-text-editor` — 8 components across 23 source files on MUI v4 + JSS: LexicalEditor, LexicalEditorView, RichText (Code/CodeBlock/Emoji/Image), RichTextEditor, RichTextEditorEmojiPicker, RichTextEditorToolbar, plugins/FocusOnLabelClickPlugin, plugins/Toolbar. Trickiest parts are `create-lexical-theme.ts` and `typographyStyles.ts` — the Lexical theme bridge depends on MUI v4 Theme shape and needs a Tailwind-token-based replacement. Batch into 2–3 PRs.

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

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-modernization` · **Estimate:** S (2-3d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05 (progressive) · **Blocks:** P3-MOD-01
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

**Phase:** 3 · **Labels:** `phase-3`, `post-gate`, `track-modernization` · **Estimate:** S (~2d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 3 — Modernization row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 7 Portal apps to 1.** Migrate **Staff Portal only**. Other Portal apps (platform, client-portal, hire-global, client-signup, talent-portal, screening-wizard) are out of PI scope — their teams will run their own migrations using the AI agent + migration prompt deliverables from P2-MOD-06.

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

Build the Agent Experience layer — `llms.txt`, `.picasso/` rules, component docs, patterns, Skills — and the measurement harness that proves it works. Extend from top-20 to all 75 components, then roll adoption to the 23 active consumer repos.

## Track arc

1. **Phase 1 — Foundation + Measurement (gated):** Optimize `llms.txt` + `.picasso/` v2, pick the top-20, extract patterns, build the harness, run baseline + gate measurements. These four stories are the Go/No-Go gating inputs.
2. **Phase 2 — Full-scope coverage:** Extend to 75/75 components + Skills package (`picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`).
3. **Phase 3 — Rollout + distribution:** Adopt rules in consumer repos, stand up a distribution channel so updates propagate without copy-paste, run continuous feedback.

## Exit criteria (track)

- 75/75 Agent Experience coverage (M11)
- 4 Skills published and validated on ≥2 AI tools each
- All 23 active repos wired with `.cursorrules` / `CLAUDE.md` / `.picasso/`
- Distribution channel live (versioned package or registry)
- Final measurement pass at PI end shows no regression vs Phase 2 exit numbers

---

## Stories

### P1-AIC-01 — Optimize LLM index and `.picasso/` folder

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-agent-experience` · **Estimate:** XS (2-3d) · **Blocked by:** Phase 0 `.picasso/` v1 adoption learnings · **Blocks:** P1-AIC-03 (patterns feed rules), measurement runs
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 1](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Decrease size and increase usability of the LLM index (`llms.txt`) and `.picasso/` folder for AI agents. Incorporates Phase 0 learnings from top-assessment-frontend adoption. Output is the Agent Experience foundation the gated pilot runs against.

**Acceptance criteria**
- [ ] `llms.txt` regenerated from updated Storybook parser; size reduced vs v1 and published to `toptal.github.io/picasso/llm-docs/llms.txt`
- [ ] `.picasso/` rules v2 published in Picasso repo with changelog vs v1
- [ ] Usability check: Cursor + Claude Code produce correct Picasso output on 3 sample prompts covering top-20 components
- [ ] Documented trade-offs between `llms.txt` and `llms-full.txt` (if applicable)

---

### P1-AIC-02 — Select top 20 Picasso components by real-world usage frequency

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-agent-experience` · **Estimate:** XS (1-2d) · **Blocks:** P1-FIG-01, P1-FIG-02, P1-FIG-03
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 2](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Identify the 20 Picasso components used as pilot scope. Mined from import counts across the 23 actively developed repos, reusing the Phase 0 Storybook parser. This list locks scope for Code Connect, BASE audit, token mapping, and all Phase 1 measurement.

**Acceptance criteria**
- [ ] Ranked list of Picasso components by import count across 23 active repos; raw data committed to the pilot harness repo
- [ ] Final top-20 list published as `pilot/top-20.md` with rationale
- [ ] Top-20 reviewed and signed off by Vedran + designer
- [ ] Any top-20 component without a clean BASE counterpart flagged (input to P1-FIG-01)

---

### P1-AIC-03 — Extract patterns from existing usage of Picasso

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-agent-experience` · **Estimate:** XS (2-3d) · **Blocked by:** P1-AIC-02 · **Blocks:** PF-2001 (patterns feed component docs)
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 3](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
AI-assisted mining of how Picasso is actually composed in Portal apps — forms, layouts, data tables, navigation. Patterns feed the `.picasso/` rules v2 and, later, Phase 2 Skills. Result is a pattern inventory with real-world examples.

**Acceptance criteria**
- [ ] Pattern inventory markdown committed (covers at minimum: forms, layouts, navigation, data display)
- [ ] Each pattern has ≥3 real-world usage examples cited by file path
- [ ] Patterns referenced from `.picasso/` rules v2 (P1-AIC-01)
- [ ] Gaps / antipatterns flagged for designer review

---

### P1-AIC-04 — Collect measurements (harness + baseline + gate runs)

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-agent-experience`, `measurement` · **Estimate:** XS (5-8d) · **Blocked by:** P1-AIC-02, R1/R2 ready · **Blocks:** ~~Phase 1 Go/No-Go gate~~ (per v6 timeline, gate is informational, not blocking modernization)
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 4](./PI-4318-phases.md#phase-1--gated-scope) · [Measurement harness — implementation](./PI-4318-phases.md#measurement-harness--implementation)

**Description**
Build the measurement harness and use it to collect component accuracy, prop accuracy, time-to-UI, and visual diff on the reference set. Covers: runner + scoring scripts + Happo visual diff + designer's rubric + timing tracker + aggregator. Executes both the Week-1 baseline (no Code Connect / no Agent Experience) and the Week-3 gate run (full pipeline).

**Acceptance criteria — harness**
- [ ] `picasso-pilot-harness` folder/repo with: reference-set loader, runner (Cursor + Claude Code CLI), `score-component.ts` (M1), `score-props.ts` (M2), `score-tokens.ts` (M3), `score-lint.ts` (M7), Happo integration (M4), designer's rubric form linked (M5), `pnpm pilot:time` CLI (M6), `pnpm pilot:report` aggregator
- [ ] Ground-truth mappings format documented and validated on 1 reference design
- [ ] R1 + R2 frozen by mid-pilot (anti-pattern: no slipping the reference set)

**Acceptance criteria — baseline (wk1)**
- [ ] Baseline runs captured for R1 for every canonical prompt, no Code Connect / no Agent Experience
- [ ] designer scored brand-fidelity rubric on all R1 designs (M5 / O3 baseline)
- [ ] `pilot/reports/baseline-wk1.md` published with M1-M8 numbers

**Acceptance criteria — gate (wk3)**
- [ ] Full pipeline runs captured for R1 + R2
- [ ] All pipeline metrics (M1-M8) computed and published in `pilot/reports/gate-wk3.md`
- [ ] designer's brand-fidelity rubric re-scored (M5 / O3 post-pipeline)
- [ ] Pilot engineer sentiment survey run and results published (M9)
- [ ] Report compares to baseline with % lift for every applicable metric
- [ ] No cherry-picking, no hidden re-runs (anti-patterns enforced)

---

### P2-AIC-01 — Full-scope AI documentation for Picasso components (split into 2 sub-tickets)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-agent-experience` · **Estimate:** ~14d total (split: 10 + 4) · **Blocked by:** P1-AIC-01, P1-AIC-02, P1-AIC-03
**Phase doc ref:** [Phase 2 — Agent Experience row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Split note.** Original PF-2001 covered AI docs + Skills + tokens + llms-full.txt + designer review in one XL ticket. Split into 2 sub-tickets to unblock parallelism (Skills can start before all 75 component docs land). **designer's dos/don'ts review pass is now integrated into PF-2001** rather than running as a separate PF-2001c ticket — designer reviews each component's dos/don'ts during the docs-generation work, and engineer absorbs feedback iteratively.

---

#### PF-2001 — Component-level AI documentation (75 components + tokens + llms-full.txt + designer review)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-agent-experience` · **Estimate:** XS (~10d engineer + designer wall-clock) · **Blocked by:** P1-AIC-01, P1-AIC-02, P1-AIC-03 · **Blocks:** PF-2026, P2-FIG-01, PF-2027


Generate 75 component `.md` files (API, extracted snippets, Storybook-derived examples) + tokens docs + `llms-full.txt` CI integration. AI-driven bulk for the docs themselves; **designer reviews dos/don'ts on each component during the work**, and engineer absorbs feedback iteratively. (Originally split out as PF-2001c, now integrated to avoid the round-trip handoff.)

**Acceptance criteria**
- [ ] 75/75 component `.md` files published (API, snippets, examples, dos/don'ts)
- [ ] designer reviewed dos/don'ts + variant guidance on each component (in-flight, not a separate review pass)
- [ ] `tokens/colors.md`, `tokens/spacing.md`, `tokens/typography.md` committed
- [ ] `llms-full.txt` built in CI and published alongside `llms.txt`
- [ ] 4-6 additional pattern docs committed (extending P1-AIC-03 inventory)
- [ ] M11 Agent Experience coverage reports 75/75

---

#### PF-2026 — Picasso Skills package (4 Skills)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-agent-experience` · **Estimate:** S (~4d) · **Blocked by:** PF-2001 · **Blocks:** P3-AIC-02 (distribution)


Author 4 Skills: `picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`. Each validated against ≥2 AI tools.

**Acceptance criteria**
- [ ] 4 Skills published, each validated end-to-end with ≥2 AI tools
- [ ] Skills referenced from `.picasso/` rules

---

### P3-AIC-01 — Adopt Picasso rules in Staff Portal

**Phase:** 3 · **Labels:** `phase-3`, `post-gate`, `track-agent-experience` · **Estimate:** XS (~1d) · **Blocked by:** PF-2001 + PF-2026
**Phase doc ref:** [Phase 3 — Agent Experience row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 23 repos to 1.** Wire `.cursorrules` / `CLAUDE.md` / reference to `node_modules/@toptal/picasso/.picasso/` into **Staff Portal only**. Other repos adopt as their teams choose, using P3-AIC-02's npm-bundled distribution.

**Acceptance criteria**
- [ ] Staff Portal has `.cursorrules` / `CLAUDE.md` / `.picasso/` reference wired
- [ ] Validation check: AI agents in Staff Portal produce correct Picasso imports on canonical prompts
- [ ] Adoption pattern documented for other-team self-service rollout

---

### P3-AIC-02 — Bundle Agent Experience into `@toptal/picasso` npm package

**Phase:** 3 · **Labels:** `phase-3`, `post-gate`, `track-agent-experience` · **Estimate:** XS (~1d) · **Blocked by:** PF-2001 + PF-2026
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

Connect Figma (BASE design system) and Picasso code tightly enough that AI agents generate brand-accurate implementations from designs. Covers Code Connect authoring, BASE spec clean-up, token mapping, Figma Make enablement, and designer onboarding.

## Track arc

1. **Phase 1 — Gated pilot coverage:** Code Connect for top 20 + BASE spec gap closure + token mapping verification. These three stories are gating inputs for the Go/No-Go gate.
2. **Phase 2 — Full coverage + Figma Make:** Code Connect for all 75 components; Figma Make guidelines + template published org-wide.
3. **Phase 3 — Designer enablement:** Onboarding sessions + quick-start doc so designers adopt BASE + Figma Make in practice.

## Exit criteria (track)

- Code Connect coverage 75/75 (M10)
- M12 drift check live and green
- Figma Make template published org-wide
- Designer onboarding delivered; ≥N designers active (target set with designer)

---

## Stories

### P1-FIG-01 — Cover BASE Design System + Picasso with Code Connect (top 20)

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-figma-design-to-code` · **Estimate:** XS (5-7d) · **Blocked by:** P1-AIC-02, P1-FIG-02, P1-FIG-03 · **Blocks:** P1-AIC-04 gate runs
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 1](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Create `.figma.tsx` files for the top-20 components, mapping Figma (BASE) properties to Picasso props at prop level, and publish via Figma Code Connect CLI. Includes audit of BASE Figma Product Library against the top-20 so mapping doesn't hit walls mid-pilot.

**Acceptance criteria**
- [ ] BASE audit spreadsheet for top-20: BASE component name, variant coverage, prop-mapping cleanliness (green / yellow / red); gap list routed to designer (input to P1-FIG-02)
- [ ] 20 `.figma.tsx` files committed and published
- [ ] Each component verified in Figma Dev Mode — correct snippet shown for a sample of variants
- [ ] Each component verified via Figma MCP — CodeConnectSnippets returned for sample queries
- [ ] M10 (Code Connect coverage) reports 20/20
- [ ] Figma MCP configured for named pilot engineers (3-5 engineers, Cursor + Claude Code)

---

### P1-FIG-02 — Update BASE Design System specification gaps (top 20)

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-figma-design-to-code` · **Estimate:** XS (5-8d, mostly designer time) · **Blocked by:** P1-AIC-02 · **Blocks:** P1-FIG-01
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 2](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Close specification gaps surfaced by the BASE audit: component/variant names, prop naming, prop completeness. Alignment is required for the Code Connect parser to generate accurate snippets. Owned with designer.

**Acceptance criteria**
- [ ] Gap list from P1-FIG-01 audit reviewed with designer
- [ ] BASE components updated: consistent names, prop names aligned with Picasso API where possible
- [ ] Variant coverage improved for any yellow-status component in top-20; red-status components either fixed or explicitly swapped/dropped from top-20
- [ ] Changelog committed to DS space (short summary of what changed and why)

---

### P1-FIG-03 — Verify design token mapping between BASE and Picasso

**Phase:** 1 · **Labels:** `phase-1`, `gated`, `track-figma-design-to-code` · **Estimate:** XS (1-2d) · **Blocked by:** P1-AIC-02 · **Blocks:** P1-FIG-01
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

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-figma-design-to-code` · **Estimate:** S (~3d) · **Blocked by:** PF-2001 (guidelines reuse component docs)
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

### PF-2027 — Update BASE Design System spec gaps (remaining 55)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-figma-design-to-code` · **Estimate:** XS (10-12d total, mostly designer time) · **Blocked by:** PF-2001 (Picasso component docs ready) · **Blocks:** P2-FIG-02
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2 (new in v6)](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)


**Description**
Symmetric with P1-FIG-02 (which closed BASE spec gaps for the top 20). For the remaining 55 components: audit BASE Figma Product Library against the Picasso component docs (PF-2001 output), close gaps in component naming, prop naming, prop completeness, and variant coverage. The Code Connect parser needs prop-name alignment between BASE and Picasso to generate accurate snippets — without this work, PF-2009's `.figma.tsx` files would emit incorrect snippets for some of the 55.

Owned with designer (same shape as PF-2006). PF-2001 already includes designer's dos/don'ts review (folded in during the docs work), so component docs handed off to PF-2027 are review-ready.

**Acceptance criteria**
- [ ] BASE audit spreadsheet for the remaining 55 components: BASE component name, variant coverage, prop-mapping cleanliness (green / yellow / red); gap list reviewed with designer
- [ ] BASE components updated: consistent names, prop names aligned with Picasso API where possible
- [ ] Variant coverage improved for any yellow-status component in the 55; red-status components either fixed or explicitly flagged
- [ ] Changelog committed to DS space (short summary of what changed and why)
- [ ] Gaps that should also reflect in Picasso component docs routed back to PF-2001 (designer)

---

### P2-FIG-02 — Code Connect for all remaining Picasso components (55)

**Phase:** 2 · **Labels:** `phase-2`, `post-gate`, `track-figma-design-to-code` · **Estimate:** XS (7-10d) · **Blocked by:** P1-FIG-01, PF-2027 (BASE spec gaps for the 55), PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04 (per-batch for migrated components)
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
Author `.figma.tsx` for the remaining 55 components, reaching full library coverage (75/75). Full-library verification pass for Dev Mode snippets and MCP CodeConnectSnippets.

**Acceptance criteria**
- [ ] 55 `.figma.tsx` files committed and published
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

Make Picasso the default library for Maestro, replacing Figma MCP on the Maestro path with a production Figma Middleware, and driving adoption against O4.

## Track arc

1. **Phase 1 — PoC (non-gating parallel):** Figma Middleware PoC via Figma REST API.
2. **Phase 2 — Productionization + baseline:** Middleware in production, Maestro audit for O4 baseline.
3. **Phase 3 — Adoption:** **Excluded from PI scope.** Maestro adoption (onboarding + defaulting new projects to Picasso) deferred to post-PI work.

## Exit criteria (track, PI scope)

- Figma Middleware running in Maestro's environment, replacing Figma MCP on Maestro path
- O4 baseline audit complete (count of Maestro projects using Picasso UI today)
- Maestro team sign-off on production middleware

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

### P3-MAE-02 — Maestro using Picasso as default for new projects

**Excluded from PI-4318 scope.** Maestro adoption (default library config, O4 target tracking) deferred to post-PI. The PI ships production-ready Figma Middleware (PF-2012) and a baseline audit (PF-2013); driving adoption is a follow-on activity.

---

# Summary

- **4 Epics** by track. Track totals after splits and exclusions:
  - **Modernization:** 11 stories (P1-MOD-01, P1-MOD-02, PF-1994 + PF-2024 + PF-2025 [3 from PF-1994 split], P2-MOD-02/03/04/05, P2-MOD-06, P3-MOD-01 Staff Portal). P3-MOD-02 excluded from PI scope.
  - **Agent Experience:** 8 stories (P1-AIC-01..04, PF-2001 + PF-2026 [2 from PF-2001 split — PF-2001c folded into PF-2001], P3-AIC-01 Staff Portal, P3-AIC-02 npm-bundled). P3-AIC-03 excluded.
  - **Figma Design-to-Code:** 6 stories (P1-FIG-01/02/03, P2-FIG-01, P2-FIG-02, **PF-2027 [new]**). P3-FIG-01 excluded.
  - **Maestro Integration:** 3 stories (P1-MAE-01, P2-MAE-01, P2-MAE-02). P3-MAE-01 + P3-MAE-02 excluded.
- **~28 Stories total** after splits (PF-1994 → 3, PF-2001 → 2), exclusions (PF-2004, PF-2010, P3-MOD-02, P3-MAE-01, P3-MAE-02), and the new PF-2027 ticket.
- **Phase is a label.** `phase-1` / `phase-2` / `phase-3` + `gated` / `non-gating-parallel` / `post-gate` for the Phase 1 gate filter. With v6 timeline optimization, the Phase 1 gate is treated as informational (parallel), not a hard go/no-go blocker on Phase 2 modernization.
- **Phase 1 gate readiness** (7 stories): `P1-AIC-01`, `P1-AIC-02`, `P1-AIC-03`, `P1-AIC-04`, `P1-FIG-01`, `P1-FIG-02`, `P1-FIG-03` — saved filter: `labels = "phase-1" AND labels = "gated"`.
- **Phase 1 parallel** (3 stories): `P1-MOD-01`, `P1-MOD-02`, `P1-MAE-01` — saved filter: `labels = "phase-1" AND labels = "non-gating-parallel"`.

## Cross-track dependency map

Dependencies that cross track/epic boundaries (these are the ones most worth watching in Jira link view since they're no longer co-located inside a single phase epic). Reflects v5 splits and v6 timeline optimization:

- **P1-FIG-01 → P1-AIC-04** — Code Connect must be live before gate measurement runs.
- **P1-AIC-02 → P1-FIG-01, P1-FIG-02, P1-FIG-03** — top-20 list locks scope for all Phase 1 Figma work.
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
- [ ] Any stories that should move to a different track (e.g., P1-AIC-04 has a `measurement` flavor — own under Agent Experience or split)?
- [ ] T-shirt estimates still reasonable?
- [ ] Happy to keep story IDs stable, or renumber to `MOD-01..06`, `AIC-01..08`, etc. to match the new grouping?
