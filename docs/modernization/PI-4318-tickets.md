# PI-4318 — Jira Tickets (Draft for Review)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Source:** [PI-4318-phases.md](./PI-4318-phases.md)
**Status:** Draft for Vedran's review — not yet added to Jira.

## Structure

- **3 Epics** — one per Phase.
- **Stories** inside each Epic — one per PI ticket task, tagged with track (Modernization / Agent Experience / Figma Design-to-Code / Maestro Integration).
- **Story IDs** are local reference IDs used for dependency links (`P{phase}-{track}-{nn}`). They're for review; Jira will assign real keys on creation.
- **Estimate** is a T-shirt size (S ≈ <1 wk, M ≈ 1-2 wks, L ≈ 2-4 wks, XL ≈ 4+ wks).

---

## Table of Contents

- [Epic 1 — Phase 1: Picasso AI Pipeline Pilot (gated)](#epic-1--phase-1-picasso-ai-pipeline-pilot-gated)
  - Gating stories: `P1-AIC-01` .. `P1-FIG-03`
  - Non-gating parallel stories: `P1-MOD-01` .. `P1-MAE-01`
- [Epic 2 — Phase 2: Execution](#epic-2--phase-2-execution)
  - Stories: `P2-MOD-01` .. `P2-MAE-02`
- [Epic 3 — Phase 3: Rollout + Scale](#epic-3--phase-3-rollout--scale)
  - Stories: `P3-MOD-01` .. `P3-MAE-02`

---

# Epic 1 — Phase 1: Picasso AI Pipeline Pilot (gated)

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `phase-1`, `pilot`, `gated`
**Phase doc ref:** [Phase 1 — Pilot (GATED)](./PI-4318-phases.md#phase-1--pilot-gated--3-weeks)

## Goal

Prove that Picasso + sufficient Agent Experience + Code Connect + Figma MCP lets an AI agent produce great, brand-accurate Picasso frontend implementations from Figma designs.

## Scope

- **Gating:** Agent Experience (4 tasks) + Figma Design-to-Code (3 tasks). All items here count toward the Go/No-Go gate.
- **Non-gating parallel:** Modernization prep + pnpm execution + Figma Middleware PoC. Runs alongside the pilot, does not count toward the gate, must not delay it.

## Success criteria (Go/No-Go gate)

Measured only against gating stories, on the fixed reference set (R1 + R2):

- M1 Component accuracy > 85%
- M2 Prop accuracy > 75%
- M3 Token fidelity: measurable lift over baseline
- M4 Visual fidelity (Happo): measurable lift
- M5 Brand-fidelity score: measurable lift (= O3 PI-level metric)
- M6 Time-to-UI: 50%+ reduction on reference screens
- M9 Pilot engineer sentiment ≥ 4/5 and "would keep using"

## Deliverables

- Baseline report (wk1) + Gate report (wk3) with all pipeline metrics + sentiment survey
- `picasso-pilot-harness` tool (runner + scoring scripts + aggregator)
- Code Connect for top 20 components (BASE + Picasso)
- Agent Experience v2: optimized LLM index, `.picasso/` rules v2, pattern inventory
- BASE spec gaps closed for top 20, design token mapping verified
- (Non-gating): Migration plan, Picasso on pnpm, Figma Middleware PoC

## Exit

Phase 1 exits at the Go/No-Go meeting at end of wk3. Outcomes: **GO** (fund Phase 2 + 3) / **ADJUST** (extend 2-3 wks) / **NO-GO** (stop AI pipeline investment; Modernization may still proceed independently).

---

## Phase 1 Stories — Gating

### P1-AIC-01 — Optimize LLM index and `.picasso/` folder

**Track:** Agent Experience · **Estimate:** M · **Blocked by:** Phase 0 `.picasso/` v1 adoption learnings · **Blocks:** P1-AIC-03 (patterns feed rules), measurement runs
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

**Track:** Agent Experience · **Estimate:** S · **Blocks:** P1-FIG-01, P1-FIG-02, P1-FIG-03
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

**Track:** Agent Experience · **Estimate:** M · **Blocked by:** P1-AIC-02 · **Blocks:** P2-AIC-01 (Skills reuse patterns)
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

**Track:** Agent Experience / Measurement · **Estimate:** L · **Blocked by:** P1-AIC-02, R1/R2 ready · **Blocks:** Phase 1 Go/No-Go gate
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

### P1-FIG-01 — Cover BASE Design System + Picasso with Code Connect (top 20)

**Track:** Figma Design-to-Code · **Estimate:** L · **Blocked by:** P1-AIC-02, P1-FIG-02, P1-FIG-03 · **Blocks:** P1-AIC-04 gate runs
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

**Track:** Figma Design-to-Code · **Estimate:** M · **Blocked by:** P1-AIC-02 · **Blocks:** P1-FIG-01
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

**Track:** Figma Design-to-Code · **Estimate:** S · **Blocked by:** P1-AIC-02 · **Blocks:** P1-FIG-01
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 3](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Confirm colors, spacing, and typography tokens used in BASE Figma are traceable 1:1 to Picasso token names. Without this, AI outputs drift visually even when Code Connect is wired correctly.

**Acceptance criteria**
- [ ] Token-mapping doc committed covering colors, spacing, typography
- [ ] Every token used in R1 reference designs has a verified Picasso counterpart
- [ ] Mismatches logged with owner (DS designer) and fixed or explicitly flagged
- [ ] Mapping referenced from `.picasso/` rules v2

---

## Phase 1 Stories — Non-gating parallel

### P1-MOD-01 — Create migration plan for AI-assisted Picasso migration

**Track:** Modernization · **Estimate:** M
**Phase doc ref:** [Phase 1 Secondary parallel scope — Modernization row 1](./PI-4318-phases.md#phase-1--secondary-parallel-scope)

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

**Track:** Modernization · **Estimate:** M · **Dependency:** PI-4278 (Platform Core Q2) for tooling alignment
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

### P1-MAE-01 — PoC of Figma Middleware based on API

**Track:** Maestro Integration · **Estimate:** M
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

# Epic 2 — Phase 2: Execution

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `phase-2`, `execution`, `post-gate`
**Phase doc ref:** [Phase 2 — Execute](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

## Goal

Execute on everything validated in Phase 1 and scope-prepared in parallel: start Modernization for real, finish Figma / Agent Experience coverage across the whole library, land Maestro integration.

## Entry criteria

- Phase 1 Go/No-Go gate = **GO**
- Funding and team allocation confirmed for ~6-8 weeks
- Phase 1 non-gating parallel deliverables complete (migration plan, Picasso on pnpm, Figma Middleware PoC)

## Exit criteria

- All 75 Picasso components modernized (MUI v4 → Base UI + Tailwind), per-component DoD met
- Code Connect coverage 75/75 (M10)
- Agent Experience coverage 75/75 (M11) incl. 4 Skills
- Figma Make guidelines + template published org-wide
- Figma Middleware (production) running, replacing Figma MCP on Maestro path
- React 19 validated on modernized Picasso (O2 unblocked)
- O1 (deprecated deps) = 0 inside Picasso
- O4 Maestro baseline audit complete

---

## Phase 2 Stories

### P2-MOD-01 — Migrate `packages/base/*` components (split into 3 tier-tickets)

**Track:** Modernization · **Estimate:** ~14d total (split: 3.5 + 4.5 + 6) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tiers 1–3](./PI-4318-P1-MOD-01-migration-plan.md#3-component-inventory--tiering)

**Split note.** Original PF-1994 covered all 17 `packages/base/*` migration units in one XL ticket. Splitting into 3 tier-tickets matches the migration plan §10 cadence (Tier 1 → Tier 2 → Tier 3) and unblocks parallelism: once Tier 1 primitives ship, Eng C/D's sibling-package migrations can ramp up. Total estimate unchanged (~14d).

**Per-component Definition of Done (applies to all three sub-tickets)**
- Happo baseline pixel-perfect (any visual diff is a bug to fix; no designer sign-off needed)
- Jest + Cypress green
- React 19 smoke-tested
- Storybook story updated
- `.figma.tsx` still valid (M12 clean)

---

#### PF-1994 — Migrate `packages/base/*` Tier 1 (foundation primitives)

**Estimate:** S (~3.5d effort) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** PF-2024, P2-MOD-02..04 (sibling packages depend on Tier 1)


Components: Form, FormLabel, FormLayout, Note, Typography, ModalContext, Utils (7).

These are leaf-level foundation primitives. Sibling-package migrations (charts, RTE, query-builder) and Tier 2/3 composites all depend on them. Eng A prioritizes Typography + FormLabel + Form first within this batch so RTE/QB can start in parallel.

**Acceptance criteria**
- [ ] All 7 Tier 1 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in those packages' `src/**`
- [ ] Zero JSS (`makeStyles`/`createStyles`/`withStyles`) in those packages' `src/**`
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] React 19 smoke suite green on all 7 units
- [ ] Happo baselines regenerated

---

#### PF-2024 — Migrate `packages/base/*` Tier 2 (compound)

**Estimate:** S (~4.5d effort) · **Blocked by:** PF-1994 · **Blocks:** PF-2025, P2-MOD-05


Components: Checkbox, Radio, Tooltip, FileInput, Popper, Notification, Grid (7). Compound, medium surface, 2-5 subcomponents each. Per-component AI prompt + 1-2 iterations.

**Acceptance criteria**
- [ ] All 7 Tier 2 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in those packages' `src/**`
- [ ] Zero JSS in those packages' `src/**`
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] React 19 smoke suite green
- [ ] Happo baselines regenerated

---

#### PF-2025 — Migrate `packages/base/*` Tier 3 + type-leak fixes

**Estimate:** S (~6d effort) · **Blocked by:** PF-2024 · **Blocks:** P2-MOD-05


Components: Dropdown, Accordion, Page (3 composite). Plus cleanup of type-only MUI v4 leaks in Container, OutlinedInput, Notification. Highest-surface migration units; expect manual touch-up on JSS parent-refs and theme overrides.

**Acceptance criteria**
- [ ] All 3 Tier 3 units migrated; per-component DoD met
- [ ] Container, OutlinedInput, Notification type-only leaks resolved
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in any `packages/base/*/src/**`
- [ ] Zero JSS in any `packages/base/*/src/**`
- [ ] Zero `@material-ui/core` entries in any `packages/base/*/package.json`
- [ ] React 19 smoke suite green on the entire base/* set
- [ ] Happo baselines regenerated

---

### P2-MOD-02 — Migrate `@toptal/picasso-charts` (LineChart)

**Track:** Modernization · **Estimate:** S · **Blocked by:** P2-MOD-01 · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-charts` — a single component (LineChart) using `makeStyles` + `createStyles` + `Theme` from `@material-ui/core`. Smallest of the sibling-package migrations; treat as a warm-up for the larger siblings.

**Acceptance criteria**
- [ ] LineChart migrated: no `@material-ui/core` imports, no JSS primitives in source
- [ ] `@material-ui/core` removed from `packages/picasso-charts/package.json`
- [ ] Jest + Cypress + Happo + React 19 smoke green
- [ ] Storybook stories updated and rendering

---

### P2-MOD-03 — Migrate `@toptal/picasso-query-builder` (11 components)

**Track:** Modernization · **Estimate:** L · **Blocked by:** P2-MOD-01 · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-query-builder` — 11 components across 21 source files on MUI v4 + JSS: AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor. Batch into 3–4 PRs by component cluster.

**Acceptance criteria**
- [ ] All 11 QB components migrated
- [ ] Zero `@material-ui/core` imports and zero JSS in `packages/picasso-query-builder/src/**`
- [ ] `@material-ui/core` removed from `packages/picasso-query-builder/package.json`
- [ ] React 19 smoke green
- [ ] Happo baselines regenerated

---

### P2-MOD-04 — Migrate `@toptal/picasso-rich-text-editor` (8 components)

**Track:** Modernization · **Estimate:** L · **Blocked by:** P2-MOD-01 · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-rich-text-editor` — 8 components across 23 source files on MUI v4 + JSS: LexicalEditor, LexicalEditorView, RichText (Code/CodeBlock/Emoji/Image), RichTextEditor, RichTextEditorEmojiPicker, RichTextEditorToolbar, plugins/FocusOnLabelClickPlugin, plugins/Toolbar. `create-lexical-theme.ts` and `typographyStyles.ts` need a Tailwind-token-based rewrite. Batch into 2–3 PRs.

**Acceptance criteria**
- [ ] All 8 RTE components migrated
- [ ] `create-lexical-theme.ts` replaced with Tailwind-token-driven equivalent
- [ ] Zero `@material-ui/core` imports and zero JSS in `packages/picasso-rich-text-editor/src/**`
- [ ] `@material-ui/core` removed from `packages/picasso-rich-text-editor/package.json`
- [ ] React 19 smoke green
- [ ] Happo baselines regenerated

---

### P2-MOD-05 — Decommission `@toptal/picasso-provider` MUI v4 runtime + remove root peer-dep (canary)

**Track:** Modernization · **Estimate:** L · **Blocked by:** P2-MOD-01, P2-MOD-02, P2-MOD-03, P2-MOD-04 · **Blocks:** P3-MOD-01, P2-MOD-06 (final batch)
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 5](./PI-4318-P1-MOD-01-migration-plan.md#tier-5--runtime--provider-decommission-the-mui-v4-theme-layer)

**Description**
Rewrite `packages/picasso-provider` off the MUI v4 runtime and remove `@material-ui/core: 4.12.4` from `packages/picasso/package.json` — the PI's canary. System rewrite, not per-component: different DoD (whole-repo Storybook + Portal smoke), higher blast radius, gates the final peer-dep removal. Runs last in Phase 2. Scope covers `PicassoProvider`, `theme.ts` module augmentation, `styles.tsx`, `CssBaseline`, `NotificationsProvider`, `PicassoRootNode`, `PreventPageWidthChangeOnScrollbar`, responsive-styles helpers, and `get-serverside-stylesheets` SSR pipeline.

**Definition of Done (package-level)**
- Full Picasso Storybook renders without console errors
- Full Happo suite passes (or diffs explicitly approved by designer)
- At least one Portal app smoke-tests green against the new provider
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

**Track:** Modernization · **Estimate:** S (2-3d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05 (progressive) · **Blocks:** P3-MOD-01
**Phase doc ref:** [Phase 2 — Modernization row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
**Scope reduced.** Originally a full codemod suite for every breaking change across PF-1994/2020/2021/2022/2023. Revised approach: minimize breaking changes during migration (strict API preservation), and where breaks are unavoidable, drive consumer migration via an **AI agent with a migration prompt + worked examples**, not jscodeshift codemods. Hybrid AI + codemod only if a specific breaking change is high-blast-radius enough to warrant deterministic transformation.

Why the scope cut: AI migration agents (Claude Code, Codex per PR #4906) handle prop-rename / import-swap migrations cleanly with much lower authoring cost than jscodeshift fixtures. Codemods are now an escape hatch, not the default.

**Acceptance criteria**
- [ ] Strict API-preservation policy applied across PF-1994/2020/2021/2022/2023; breaking-change inventory documented (target: <5 unavoidable breaks)
- [ ] AI migration prompt + 2-3 worked examples committed in `docs/migration/`
- [ ] Codemods committed only for breaks that are wide-blast-radius or AI-unfriendly (target: 0-3 codemods, not the original ~10-15)
- [ ] Each codemod (if any) tested on 1-2 real consumer-repo usages
- [ ] Migration playbook for Staff Portal documented (used by PF-1996)

---

### P2-AIC-01 — Full-scope AI documentation for Picasso components (split into 2 sub-tickets)

**Track:** Agent Experience · **Estimate:** ~14d total (split: 10 + 4) · **Blocked by:** P1-AIC-01, P1-AIC-02, P1-AIC-03
**Phase doc ref:** [Phase 2 — Agent Experience row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Split note.** Original PF-2001 covered AI docs + Skills + tokens + llms-full.txt + designer review in one XL ticket. Split into 2 sub-tickets to unblock parallelism (Skills can start before all 75 component docs land). **designer's dos/don'ts review pass is now integrated into PF-2001** rather than running as a separate PF-2001c ticket — designer reviews each component's dos/don'ts during the docs-generation work, and engineer absorbs feedback iteratively.

---

#### PF-2001 — Component-level AI documentation (75 components + tokens + llms-full.txt + designer review)

**Estimate:** XS (~10d engineer effort + designer wall-clock) · **Blocked by:** P1-AIC-01, P1-AIC-02, P1-AIC-03 · **Blocks:** PF-2026, P2-FIG-01, PF-2027


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

**Estimate:** S (~4d effort) · **Blocked by:** PF-2001 (Skills reference component docs) · **Blocks:** P3-AIC-02 (distribution)


Author 4 Skills: `picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`. Each is a packaged Skill validated against ≥2 AI tools (Cursor, Claude Code, Cowork, Lovable, Windsurf).

**Acceptance criteria**
- [ ] 4 Skills published (`picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`)
- [ ] Each Skill validated end-to-end with ≥2 AI tools
- [ ] Skills referenced from `.picasso/` rules

---

### P2-FIG-01 — Define Figma Make guidelines and project template

**Track:** Figma Design-to-Code · **Estimate:** S (~3d) · **Blocked by:** PF-2001 (guidelines reuse component docs)
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
**Scope reduced.** Original estimate (6d) assumed setting up the private npm registry from scratch. Toptal's `@toptal` scope already publishes packages, so registry config drops out. Remaining work: Picasso install path in Figma Make (~0.5d), guidelines authoring from PF-2001 docs (~1.5d), template publish + designer-test validation (~1d).

**Acceptance criteria**
- [ ] Picasso installable in Figma Make from the existing `@toptal` npm registry
- [ ] `guidelines/` folder committed (adapted from PF-2001 component .md files)
- [ ] Template published org-wide and discoverable
- [ ] End-to-end validation: a designer generates a screen from a sample design using only the template; output uses correct Picasso imports + props

> Assumption: existing `@toptal` npm registry is reachable from Figma Make. If not, add 1-2d for registry-side configuration.

---

### PF-2027 — Update BASE Design System spec gaps (remaining 55)

**Track:** Figma Design-to-Code · **Estimate:** XS (10-12d total, mostly designer time) · **Blocked by:** PF-2001 (Picasso component docs ready) · **Blocks:** P2-FIG-02
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2 (new in v6)](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)


**Description**
Symmetric with P1-FIG-02 (which closed BASE spec gaps for the top 20). For the remaining 55 components: audit BASE Figma Product Library against the Picasso component docs (PF-2001 output), close gaps in component naming, prop naming, prop completeness, and variant coverage. The Code Connect parser needs prop-name alignment between BASE and Picasso to generate accurate snippets — without this work, P2-FIG-02's `.figma.tsx` files would emit incorrect snippets for some of the 55.

Owned with designer (same shape as PF-2006). Picasso component docs from PF-2001 (which now includes designer's reviewed dos/don'ts) are the primary input.

**Acceptance criteria**
- [ ] BASE audit spreadsheet for the remaining 55 components: BASE component name, variant coverage, prop-mapping cleanliness (green / yellow / red); gap list reviewed with designer
- [ ] BASE components updated: consistent names, prop names aligned with Picasso API where possible
- [ ] Variant coverage improved for any yellow-status component in the 55; red-status components either fixed or explicitly flagged
- [ ] Changelog committed to DS space
- [ ] Gaps that should also reflect in Picasso component docs routed back to PF-2001 (designer)

---

### P2-FIG-02 — Code Connect for all remaining Picasso components (55)

**Track:** Figma Design-to-Code · **Estimate:** L · **Blocked by:** P1-FIG-01, PF-2027 (BASE spec gaps for the 55), P2-MOD-01, P2-MOD-02, P2-MOD-03, P2-MOD-04 (per-batch for migrated components)
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

### P2-MAE-01 — Implement Figma Middleware (production) based on PoC

**Track:** Maestro Integration · **Estimate:** L · **Blocked by:** P1-MAE-01
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

**Track:** Maestro Integration · **Estimate:** S · **Blocked by:** P2-MAE-01
**Phase doc ref:** [Phase 2 — Maestro Integration row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
Inventory existing Maestro projects and record baseline count generating Picasso UI. This is the baseline for O4; Phase 3 target set jointly with the Maestro team.

**Acceptance criteria**
- [ ] Audit spreadsheet: project name, uses Picasso (y/n), notes
- [ ] Baseline number recorded in `metrics/outcome.md`
- [ ] Phase 3 O4 target set jointly with Maestro team

---

# Epic 3 — Phase 3: Rollout + Scale

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `phase-3`, `rollout`
**Phase doc ref:** [Phase 3 — Rollout](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

## Goal

Migrate the 23 actively developed consumer repos to modern Picasso, roll Agent Experience org-wide, and land Maestro integration at scale.

## Entry criteria

- Phase 2 exit criteria met (75/75 components modernized + covered, React 19 validated, Figma Middleware production-ready, Maestro baseline audited)
- Codemods tested on sample repos
- Wave schedule communicated to repo teams

## Exit criteria (PI-level)

- O5 — 23/23 actively developed repos on modern Picasso
- O1 — 0 deprecated/unmaintained deps in Picasso
- O2 — React 19 adoption unblocked org-wide
- O4 — Maestro adoption target hit
- O3 / M5 — brand-fidelity lift maintained vs Phase 1 post-pipeline baseline

---

## Phase 3 Stories

### P3-MOD-01 — Migrate Staff Portal to modernized Picasso

**Track:** Modernization · **Estimate:** S (~2d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 3 — Modernization row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 7 Portal apps to 1.** Migrate **Staff Portal only**. Other Portal apps (platform, client-portal, hire-global, client-signup, talent-portal, screening-wizard) are out of scope for this PI — their teams will run their own migrations using the AI agent + migration prompt deliverables from P2-MOD-06.

**Acceptance criteria**
- [ ] Staff Portal on modernized Picasso
- [ ] Happo visual regression clean
- [ ] Jest / Cypress clean
- [ ] Rollback procedure tested and documented
- [ ] Retro published; issues feed AI migration prompt refinement for other-team adoption

---

### P3-MOD-02 — Migrate other important projects to modernized Picasso

**Track:** Modernization · **Estimate:** XL · **Blocked by:** P3-MOD-01
**Phase doc ref:** [Phase 3 — Modernization row 2](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
Migrate testing-platform, tracker-front, topteam, top-scheduler, and remaining active apps to reach 23/23 coverage. Includes decommissioning MUI v4 / JSS from Picasso entirely.

**Acceptance criteria**
- [ ] All remaining active repos on modernized Picasso (23/23, O5)
- [ ] Happo + test gates clean per repo
- [ ] MUI v4 and JSS deps removed from Picasso monorepo; package audit green (O1 = 0)
- [ ] Announcement published to frontend-wide channel
- [ ] PI-level visual regression confirmed clean, signed off by designer

---

### P3-AIC-01 — Adopt Picasso rules in Staff Portal

**Track:** Agent Experience · **Estimate:** XS (~1d) · **Blocked by:** P2-AIC-01 (PF-2001 + PF-2026)
**Phase doc ref:** [Phase 3 — Agent Experience row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 23 repos to 1.** Wire `.cursorrules` / `CLAUDE.md` / reference to `node_modules/@toptal/picasso/.picasso/` into **Staff Portal only**. Other Picasso consumer repos will adopt as their teams choose, using P3-AIC-02's npm-bundled distribution.

**Acceptance criteria**
- [ ] Staff Portal has `.cursorrules` / `CLAUDE.md` / `.picasso/` reference wired
- [ ] Validation check: AI agents in Staff Portal produce correct Picasso imports on canonical prompts
- [ ] Adoption pattern documented for other-team self-service rollout

---

### P3-AIC-02 — Bundle Agent Experience into `@toptal/picasso` npm package

**Track:** Agent Experience · **Estimate:** XS (~1d) · **Blocked by:** PF-2001, PF-2026
**Phase doc ref:** [Phase 3 — Agent Experience row 2](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope simplified from separate distribution package to npm-bundled approach.** Ship `.picasso/` folder + Skills + `llms-full.txt` as part of the existing `@toptal/picasso` npm publish so consumers automatically get them at `node_modules/@toptal/picasso/.picasso/` whenever they update Picasso. No separate `@toptal/picasso-agent-experience` package, no parallel versioning model — Agent Experience artifacts ship at the same Picasso version as component code.

Discovery via convention: `.cursorrules` / `CLAUDE.md` in consumer repos point to `node_modules/@toptal/picasso/.picasso/llms.txt`. One-line config.

**Acceptance criteria**
- [ ] `.picasso/` folder + Skills committed to `@toptal/picasso` package and added to `package.json` `files` array
- [ ] Picasso publish workflow includes Agent Experience artifacts in the npm bundle
- [ ] Consumer reference convention documented (`.cursorrules` / `CLAUDE.md` snippet pointing to `node_modules/@toptal/picasso/.picasso/llms.txt`)
- [ ] Validated end-to-end in Staff Portal

---

### P3-AIC-03 — Collect feedback from teams and projects

**Excluded from PI-4318 scope.** Feedback collection deferred to post-PI BAU work; not driving the PI exit criteria. The Agent Experience artifacts (PF-2001 + PF-2026 + PF-2003 distribution) ship via npm and consumers self-onboard; structured feedback collection is a future iteration concern.

---

### P3-FIG-01 — Onboard designers to BASE and Figma Make

**Excluded from PI-4318 scope.** Designer enablement deferred to post-PI work. Figma Make template (PF-2008) ships and is discoverable; designer adoption flows via the Toptal design org's normal enablement channels rather than a PI-driven session.

---

### P3-MAE-01 — Onboarding to Maestro

**Excluded from PI-4318 scope.** Maestro enablement (sessions, quick-start, docs for Maestro users) deferred to post-PI work. Picked up by Maestro team or in a follow-on PI once production middleware (PF-2012) is shipped.

---

### P3-MAE-02 — Maestro using Picasso as default for new projects

**Excluded from PI-4318 scope.** Maestro adoption (default library config, O4 target tracking) deferred to post-PI. The PI ships production-ready Figma Middleware (PF-2012) and a baseline audit (PF-2013); driving adoption is a follow-on activity.

---

# Summary

- **3 Epics:** Phase 1 (gated pilot), Phase 2 (execution), Phase 3 (rollout).
- **Phase 1:** 7 gating stories (4 Agent Experience + 3 Figma Design-to-Code) + 3 non-gating parallel stories (2 Modernization + 1 Maestro Integration) = 10 stories.
- **Phase 2:** 8 Modernization (PF-1994 + PF-2024 + PF-2025 + PF-2020/2021/2022/2023 + PF-1995) + 2 Agent Experience (PF-2001 + PF-2026 — PF-2001c folded into PF-2001) + 3 Figma Design-to-Code (P2-FIG-01, **PF-2027 [new]**, P2-FIG-02) + 2 Maestro Integration = 15 stories.
- **Phase 3:** 1 Modernization (PF-1996 Staff Portal; P3-MOD-02 excluded) + 2 Agent Experience (PF-2002 Staff Portal + PF-2003 npm-bundled distribution; P3-AIC-03 excluded) + 0 Figma (PF-2010 excluded) + 0 Maestro Integration (P3-MAE-01 + P3-MAE-02 excluded) = 3 stories.
- **Total:** 3 epics + 28 stories after splits, exclusions, and the new PF-2027 ticket.

**Excluded from PI-4318 scope:** PF-2004 (P3-AIC-03 feedback collection), PF-2010 (P3-FIG-01 designer onboarding), P3-MOD-02 (other-repo migrations — handled by other teams via self-service AI prompt), P3-MAE-01 (Maestro onboarding), P3-MAE-02 (Maestro defaults to Picasso).

## Review checklist

- [ ] Epic scope and gating criteria correct?
- [ ] Story titles read well as Jira summaries?
- [ ] Dependencies (`blocked by` / `blocks`) match expected sequencing?
- [ ] T-shirt estimates reasonable?
- [ ] Any stories that should be split or merged (e.g., P1-AIC-04 and P2-AIC-01 are XL — split along natural seams)?
- [ ] Track labels correct throughout?
- [ ] Phase doc references point to the right anchors?
