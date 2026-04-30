# PI-4318 — Jira Tickets (Draft for Review)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Source:** [PI-4318-phases.md](./PI-4318-phases.md)
**Status:** v12 — split out **Pilot Measurement** as its own track. PF-1998 + PF-2000 move from Agent Experience to a new Pilot Measurement track because the A1 → A2 lift is jointly produced by AIC + Figma artifacts. Story IDs renumbered: P1-AIC-02 → P1-MEAS-01 (PF-1998), P1-AIC-04 → P1-MEAS-02 (PF-2000). See [PI-4318-tickets-by-track.md Epic E](./PI-4318-tickets-by-track.md#epic-e--pilot-measurement-track) for the new track. Per-ticket estimates unchanged from v11. Program start: May 4. Range: 76-117 man-days.

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

# Epic 1 — Phase 1: Hybrid Foundation (5-page baseline + agent infra)

**Type:** Epic
**Parent:** PI-4318
**Labels:** `picasso-ai-dx`, `phase-1`, `hybrid-foundation`
**Phase doc ref:** [Phase 1 — Pilot (GATED)](./PI-4318-phases.md#phase-1--pilot-gated--3-weeks)

## Goal (v10)

**Hybrid Phase 1 — no Go/No-Go gate.** Deliver a measurable A1 → A2 AI-DX lift number on 5 Staff Portal pages while modernization runs in parallel. Phase 2 starts the moment PF-1992 lands; no gate decision blocks it.

## Scope

- **5-page baseline (Agent Experience):** PF-1998 (5-page selection + Picasso component extraction + baseline H + A1) + PF-1997 (`.picasso/` v2) + PF-1999 (patterns).
- **Code Connect + BASE for the 5-page subset (Figma):** PF-2005 + PF-2006 + PF-2007 — scoped to ~12-18 components used in the 5 pages, not top-20.
- **Modernization (parallel):** PF-1992 migration plan + agent infra + 5-page measurement protocol; PF-1993 pnpm. Tier 1 autonomous run starts as soon as PF-1992 lands.
- **Maestro PoC (parallel):** PF-2011.

## Success criteria (Phase 1 wrap)

Measured against the 5 Staff Portal pages:

- **Baseline H** scored — score the 5 shipped human implementations against the rubric (M1 component, M2 prop, M3 token, M4 visual, M5 brand-fidelity).
- **Baseline A1** scored — AI agent + Figma MCP, no Code Connect, no `.picasso/`.
- (Phase 2) **Baseline A2** scored — AI agent + Code Connect (PF-2005) + Agent Experience (PF-1997 + PF-2001a). The A1 → A2 lift is the program's headline AI-DX number.
- Pilot engineer sentiment ≥ 4/5 and "would keep using"

## Deliverables

- 5-page selection (`pilot/5-pages.md`), Picasso component-set (`pilot/component-set.md`), baseline pre-pipeline report (`pilot/reports/baseline-pre-pipeline.md` with H + A1)
- Code Connect for the 5-page component subset (~12-18 components)
- BASE spec gaps closed for the 5-page subset, design token mapping verified
- Agent Experience v2: optimized LLM index, `.picasso/` rules v2, pattern inventory
- Migration plan + agent infrastructure scaffolds + 5-page measurement protocol
- Picasso on pnpm
- Figma Middleware PoC

## Exit

Phase 1 has no Go/No-Go gate in v10 — Phase 2 begins the moment PF-1992 ships (Tier 1 autonomous run starts immediately). Phase 1 "wraps" when the H + A1 numbers are published (~end of week 4).

---

## Phase 1 Stories — Foundation (hybrid, not gated)

### P1-AIC-01 — Optimize LLM index and `.picasso/` folder

**Track:** Agent Experience · **Estimate:** XS (1.5-2.5d) · **Blocked by:** Phase 0 `.picasso/` v1 adoption learnings · **Blocks:** P1-AIC-03 (patterns feed rules), measurement runs
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 1](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Decrease size and increase usability of the LLM index (`llms.txt`) and `.picasso/` folder for AI agents. Incorporates Phase 0 learnings from top-assessment-frontend adoption. Output is the Agent Experience foundation the gated pilot runs against.

**Acceptance criteria**
- [ ] `llms.txt` regenerated from updated Storybook parser; size reduced vs v1 and published to `toptal.github.io/picasso/llm-docs/llms.txt`
- [ ] `.picasso/` rules v2 published in Picasso repo with changelog vs v1
- [ ] Usability check: Cursor + Claude Code produce correct Picasso output on 3 sample prompts covering top-20 components
- [ ] Documented trade-offs between `llms.txt` and `llms-full.txt` (if applicable)

---

### P1-MEAS-01 — Select 5 Staff Portal pages + extract Picasso component set

**Track:** Pilot Measurement (NEW in v12) · **Estimate:** XS (1-1.5d) · **Blocks:** P1-FIG-01, P1-FIG-02, P1-FIG-03, P1-MEAS-02 (PF-2000), PF-2001a
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 2](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
**Rescoped in v11** to selection + extraction only. Pick 5 Staff Portal pages with shipped implementations *and* Figma design specs. Extract the Picasso component set used in those pages (typically 12-18 components). Hand off the component set to PF-2000 (measurement runs), PF-2005 (Code Connect), PF-2006 (BASE), PF-2001a (docs polish).

**Acceptance criteria**
- [ ] 5 Staff Portal pages selected covering forms, layouts, data-display, navigation, feedback patterns; rationale published as `pilot/5-pages.md`
- [ ] Each page has both a shipped implementation (file path) and a Figma spec link
- [ ] Picasso components used in those 5 pages extracted; published as `pilot/component-set.md`
- [ ] Any 5-page component without a clean BASE counterpart flagged (input to P1-FIG-01)
- [ ] Selection signed off by Vedran + designer

---

### P1-AIC-03 — Extract patterns from existing usage of Picasso

**Track:** Agent Experience · **Estimate:** XS (1.5-2.5d) · **Blocked by:** P1-MEAS-01 · **Blocks:** P2-AIC-01 (Skills reuse patterns)
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 3](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
AI-assisted mining of how Picasso is actually composed in Portal apps — forms, layouts, data tables, navigation. Patterns feed the `.picasso/` rules v2 and, later, Phase 2 Skills. Result is a pattern inventory with real-world examples.

**Acceptance criteria**
- [ ] Pattern inventory markdown committed (covers at minimum: forms, layouts, navigation, data display)
- [ ] Each pattern has ≥3 real-world usage examples cited by file path
- [ ] Patterns referenced from `.picasso/` rules v2 (P1-AIC-01)
- [ ] Gaps / antipatterns flagged for designer review

---

### P1-MEAS-02 — Measurement protocol + 3-condition runner + H + A1 + A2 + final A2 re-run

**Track:** Pilot Measurement (NEW in v12) · **Estimate:** S (3-5d) · **Blocked by:** P1-MEAS-01 (component set), PF-1997, PF-2005, PF-2001a (for A2 run); PF-2001b + PF-2027 + PF-2009 (for final A2 re-run) · **Blocks:** —
**Phase doc ref:** [Phase 1 Gated scope — Agent Experience row 4](./PI-4318-phases.md#phase-1--gated-scope) · [Measurement harness — implementation](./PI-4318-phases.md#measurement-harness--implementation)

**Description**
**Expanded in v11** to own the entire measurement chain. Build the 5-page measurement protocol (protocol authoring + 3-condition runner + scoring rubric M1-M5 + reporting templates), then execute all three baseline conditions and the final re-run.

**Acceptance criteria**
- [ ] **5-page measurement protocol committed:** `pilot/protocol.md` (selection criteria + scoring rubric M1-M5), `bin/extract-picasso-components.ts`, `bin/measurement-runner.ts` (3-condition H/A1/A2 runner), `pilot/reports/_template.md`
- [ ] **Baseline H run** — score the 5 shipped human implementations against the Figma specs (M1-M5); raw scores committed to `pilot/runs/h/`
- [ ] **Baseline A1 run** — AI agent + Figma MCP, no Code Connect, no `.picasso/`; raw outputs + scores committed to `pilot/runs/a1/`
- [ ] `pilot/reports/baseline-pre-pipeline.md` published comparing H vs A1
- [ ] **A2 baseline run** — feed the 5 Figma specs to AI agent + Code Connect (PF-2005) + Agent Experience (PF-1997 + PF-2001a). Raw outputs + scores committed to `pilot/runs/a2-mid/`.
- [ ] `pilot/reports/post-pipeline.md` published comparing H, A1, A2 numbers with % lift per metric
- [ ] **Final A2 re-run** at end of Phase 2 (after PF-2001b + PF-2027 + PF-2009 land); committed to `pilot/runs/a2-final/`.
- [ ] Pilot engineer sentiment survey run and results published
- [ ] No cherry-picking, no hidden re-runs

---

### P1-FIG-01 — Build agentic Code Connect generator + Code Connect for 5-page subset

**Track:** Figma Design-to-Code · **Estimate:** S (3-4.5d) · **Blocked by:** P1-MEAS-01 (PF-1998 component-set), P1-FIG-02, P1-FIG-03 · **Blocks:** PF-2000 A2 measurement run, PF-2009
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 1](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
**v11 expanded** — engineer authors `bin/generate-code-connect.ts` (template + Figma MCP integration + Dev Mode snippet verification + iteration loop, max 3) on the way to running it on the 5-page subset. Then `.figma.tsx` files for the 12-18 components in `pilot/component-set.md`. Generator is reused unchanged by PF-2009 for the remaining ~60.

**Acceptance criteria**
- [ ] `bin/generate-code-connect.ts` committed: template + Figma MCP integration + Dev Mode snippet verification + iteration loop (max 3)
- [ ] `.figma.tsx` files committed and published for every component in `pilot/component-set.md` (~12-18 files)
- [ ] Each component verified in Figma Dev Mode and via Figma MCP
- [ ] Figma MCP configured for named pilot engineers (3-5 engineers, Cursor + Claude Code)
- [ ] Generator script reusable unchanged by PF-2009 (no Picasso-specific tweaks)
- [ ] Available for PF-2000 A2 measurement run

---

### P1-FIG-02 — Build BASE audit script + Update BASE spec gaps for 5-page subset

**Track:** Figma Design-to-Code · **Estimate:** S (2.5-3.5d) · **Blocked by:** P1-MEAS-01 (PF-1998 component-set) · **Blocks:** P1-FIG-01, PF-2027
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 2](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
**v11 expanded** — engineer authors `bin/base-audit.ts` (TypeScript AST parser + Figma MCP integration + RAG-status output, ~1d) on the way to running the audit. Script reads Picasso source + BASE schemas, compares programmatically, outputs RAG-status spreadsheet with per-component fix recommendations. Designer reviews flagged items only and applies fixes in Figma (~2d). Audit script reused unchanged by PF-2027.

**Acceptance criteria**
- [ ] `bin/base-audit.ts` committed: TypeScript AST parser + Figma MCP integration + RAG-status output
- [ ] Audit run on the 12-18 components in `pilot/component-set.md`; spreadsheet published with per-component fix recommendations
- [ ] Designer applies flagged fixes in BASE Figma; change-log committed to DS space
- [ ] Audit script reusable unchanged by PF-2027

**Acceptance criteria**
- [ ] Gap list from P1-FIG-01 audit reviewed with designer
- [ ] BASE components updated: consistent names, prop names aligned with Picasso API where possible
- [ ] Variant coverage improved for any yellow-status component in top-20; red-status components either fixed or explicitly swapped/dropped from top-20
- [ ] Changelog committed to DS space (short summary of what changed and why)

---

### P1-FIG-03 — Verify design token mapping between BASE and Picasso

**Track:** Figma Design-to-Code · **Estimate:** S · **Blocked by:** P1-MEAS-01 · **Blocks:** P1-FIG-01
**Phase doc ref:** [Phase 1 Gated scope — Figma Design-to-Code row 3](./PI-4318-phases.md#phase-1--gated-scope)

**Description**
Confirm colors, spacing, and typography tokens used in BASE Figma are traceable 1:1 to Picasso token names. Without this, AI outputs drift visually even when Code Connect is wired correctly.

**Acceptance criteria**
- [ ] Token-mapping doc committed covering colors, spacing, typography
- [ ] Every token used in R1 reference designs has a verified Picasso counterpart
- [ ] Mismatches logged with owner (DS designer) and fixed or explicitly flagged
- [ ] Mapping referenced from `.picasso/` rules v2

---

## Phase 1 Stories — Modernization + Maestro PoC (parallel)

### P1-MOD-01 — Migration plan + autonomous-loop infrastructure

**Track:** Modernization · **Estimate:** S (3-4d)
**Phase doc ref:** [Phase 1 Secondary parallel scope — Modernization row 1](./PI-4318-phases.md#phase-1--secondary-parallel-scope)

**Description**
Define the scope and execution plan for migrating Picasso to Base UI + Tailwind, and stand up **only the autonomous-migration-loop infrastructure** that PF-1994/2024/2025 will use. Covers: migration plan content (scope, top-level plan, per-component plans, testbed, AI prompt); autonomous migration loop scaffolds (`bin/migration-orchestrator.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh`, `docs/migration/manifest.json`, `docs/migration/ORCHESTRATOR.md`, `gh` CLI auth setup).

**v11 scope changes:** the agentic Code Connect generator (`bin/generate-code-connect.ts`) **moves to PF-2005**. The BASE audit script (`bin/base-audit.ts`) **moves to PF-2006**. The 5-page measurement protocol **moves to PF-2000**. PF-1992 ships as a normal Picasso PR — full test suite + Happo + standard PR review approval.

**Acceptance criteria**
- [ ] `docs/migration-plan.md` committed in Picasso repo
- [ ] Top-level plan with complexity tiering for all 75 components (16 MUI v4 pkgs / 11 @mui/base / ~48 remaining)
- [ ] Per-component plan template + 2-3 worked examples; per-component plan files for all Tier 1 (7) committed
- [ ] Testbed setup documented (how a migrated component is validated: Happo, Jest, Cypress, React 19 smoke)
- [ ] AI migration prompt documented (reusing Phase 0 Codex prompt, revised)
- [ ] Risk register + rollback strategy
- [ ] **Autonomous-loop scaffolds committed:** `bin/migration-orchestrator.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh`, `docs/migration/manifest.json` schema, `docs/migration/ORCHESTRATOR.md`, `gh` CLI auth set up
- [ ] **Sandboxed Note migration validates the orchestrator** end-to-end (agent picks Note, applies prompt, runs gates, opens PR, polls CI)
- [ ] PR for PF-1992 itself ships through full test suite + Happo + standard reviewer approval
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

**Estimate:** XS (2-3d effort) · **Blocked by:** P1-MOD-01, P1-MOD-02 · **Blocks:** PF-2024, P2-MOD-02..04 (sibling packages depend on Tier 1)


Components: Form, FormLabel, FormLayout, Note, Typography, ModalContext, Utils (7).

These are leaf-level foundation primitives. Sibling-package migrations (charts, RTE, query-builder) and Tier 2/3 composites all depend on them. Eng A prioritizes Typography + FormLabel + Form first within this batch so RTE/QB can start in parallel.

**AI leverage.** Driven by the autonomous migration loop from PF-1992 (`bin/migration-orchestrator.ts`): agent picks Tier 1 components from `manifest.json`, applies the migration prompt, runs `yarn migrate:component <Name>` until gates pass, opens PR via `gh pr create`, polls CI, classifies review comments, merges via `gh pr merge --squash --auto` on approval. Engineer reviews PRs; agent handles orchestration. Hard cap of 3 iterations per component; escalation path documented. See [PI-4318-ai-leverage-tickets.md §PF-1994](./PI-4318-ai-leverage-tickets.md#pf-1994--2024--2025--autonomous-component-migration-with-agent-orchestration).

**Acceptance criteria**
- [ ] All 7 Tier 1 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in those packages' `src/**`
- [ ] Zero JSS (`makeStyles`/`createStyles`/`withStyles`) in those packages' `src/**`
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] React 19 smoke suite green on all 7 units
- [ ] Happo baselines regenerated

---

#### PF-2024 — Migrate `packages/base/*` Tier 2 (compound)

**Estimate:** S (3-4d effort) · **Blocked by:** PF-1994 · **Blocks:** PF-2025, P2-MOD-05


Components: Checkbox, Radio, Tooltip, FileInput, Popper, Notification, Grid (7). Compound, medium surface, 2-5 subcomponents each.

**AI leverage.** Same autonomous migration loop as PF-1994, with prompt + reference examples sharpened by Tier 1 lessons. Agent escalation rate is the leading indicator: if Tier 1 ran clean, expect Tier 2 to compress further.

**Acceptance criteria**
- [ ] All 7 Tier 2 units migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in those packages' `src/**`
- [ ] Zero JSS in those packages' `src/**`
- [ ] Zero `@material-ui/core` entries in those packages' `package.json`
- [ ] React 19 smoke suite green
- [ ] Happo baselines regenerated

---

#### PF-2025 — Migrate `packages/base/*` Tier 3 + type-leak fixes

**Estimate:** S (4-6d effort) · **Blocked by:** PF-2024 · **Blocks:** P2-MOD-05


Components: Dropdown, Accordion, Page (3 composite). Plus cleanup of type-only MUI v4 leaks in Container, OutlinedInput, Notification. Highest-surface migration units; expect manual touch-up on JSS parent-refs and theme overrides.

**AI leverage.** Autonomous loop assists, but Tier 3 has an architecture floor: agent stops at architectural decisions (`PicassoProvider.override` chains, JSS parent-ref unwinding) and escalates. Engineer drives architecture step manually, agent does per-file rewrite. Less compression than Tier 1/2.

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

**AI leverage.** Same autonomous orchestrator as PF-1994; LineChart is a clean single-component PR — expected zero-touch.

**Acceptance criteria**
- [ ] LineChart migrated: no `@material-ui/core` imports, no JSS primitives in source
- [ ] `@material-ui/core` removed from `packages/picasso-charts/package.json`
- [ ] Jest + Cypress + Happo + React 19 smoke green
- [ ] Storybook stories updated and rendering

---

### P2-MOD-03 — Migrate `@toptal/picasso-query-builder` (11 components)

**Track:** Modernization · **Estimate:** S (4-6d) · **Blocked by:** P2-MOD-01 · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-query-builder` — 11 components across 21 source files on MUI v4 + JSS: AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor. Batch into 3–4 PRs by component cluster.

**AI leverage.** Autonomous orchestrator drives 11 components in sequence; per-cluster batching keeps PR review-able. Same agent prompt as Tier 1/2.

**Acceptance criteria**
- [ ] All 11 QB components migrated
- [ ] Zero `@material-ui/core` imports and zero JSS in `packages/picasso-query-builder/src/**`
- [ ] `@material-ui/core` removed from `packages/picasso-query-builder/package.json`
- [ ] React 19 smoke green
- [ ] Happo baselines regenerated

---

### P2-MOD-04 — Migrate `@toptal/picasso-rich-text-editor` (8 components)

**Track:** Modernization · **Estimate:** S (5-7d) · **Blocked by:** P2-MOD-01 · **Blocks:** P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 2 — Modernization row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)
**Deep dive:** [PI-4318-P1-MOD-01-migration-plan.md §3 Tier 4](./PI-4318-P1-MOD-01-migration-plan.md#tier-4--sibling-packages-outside-packagesbase)

**Description**
Migrate `packages/picasso-rich-text-editor` — 8 components across 23 source files on MUI v4 + JSS: LexicalEditor, LexicalEditorView, RichText (Code/CodeBlock/Emoji/Image), RichTextEditor, RichTextEditorEmojiPicker, RichTextEditorToolbar, plugins/FocusOnLabelClickPlugin, plugins/Toolbar. `create-lexical-theme.ts` and `typographyStyles.ts` need a Tailwind-token-based rewrite. Batch into 2–3 PRs.

**AI leverage.** Autonomous orchestrator handles the 8 components; the Lexical theme rewrite is the architecture floor and stays human-led (agent will escalate via manifest).

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

**Track:** Modernization · **Estimate:** XS (1.5-2.5d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05 (progressive) · **Blocks:** P3-MOD-01
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

### P2-AIC-01 — Full-scope AI documentation for Picasso components (split into 3 sub-tickets in v10)

**Track:** Agent Experience · **Estimate:** ~5-9d total (split: 1-2 + 4-5 + 2-4) · **Blocked by:** P1-AIC-01, P1-MEAS-01, P1-AIC-03
**Phase doc ref:** [Phase 2 — Agent Experience row 1](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Split note (v10).** v9 had PF-2001 as a single 7-9d ticket. v10 splits chronologically into **PF-2001a** (5-page subset, lands in Phase 1, ~12-18 components, 1-2d) and **PF-2001b** (remaining ~60 + tokens + `llms-full.txt` + full designer review, runs Phase 2, 4-5d) with the AI multiplier tightened from 0.1d/component to 0.05d/component (justified because docs are highly templated once the 5-page batch locks the format). PF-2026 (Skills) remains a separate Phase 2 sub-ticket. Designer's dos/don'ts review remains integrated.

---

#### PF-2001a — Polish 5-page-subset auto-generated docs (Phase 1)

**Estimate:** XS (0.5-1d engineer effort + designer wall-clock) · **Blocked by:** P1-AIC-01 (`.picasso/` v2 + lean Storybook docs), P1-MEAS-01 (PF-1998 component-set), P1-AIC-03 (patterns merged into `.picasso/`) · **Blocks:** PF-2000 A2 measurement run

**Polish-only in v11.** Bulk doc generation already happens in PF-1997 (Storybook → llms.txt → lean component docs) and PF-1999 (patterns merged into `.picasso/`). PF-2001a refines the auto-generated docs for the 12-18 components used in the 5 baseline pages and gets designer's quick dos/don'ts pass. Lands before A2 baseline run.

**Acceptance criteria**
- [ ] Auto-generated docs for the 5-page subset reviewed and polished (rough edges, missing dos/don'ts, ambiguous variant guidance)
- [ ] designer's quick pass on flagged dos/don'ts complete
- [ ] Available to PF-2000 for A2 measurement run

---

#### PF-2001b — Polish remaining ~60 docs + tokens + llms-full.txt + designer review (Phase 2)

**Estimate:** S (1.5-2.5d engineer effort + designer wall-clock) · **Blocked by:** PF-2001a (canonical polish format locked) · **Blocks:** PF-2026, P2-FIG-01, PF-2027, PF-2000 final A2 re-run

**Polish-only in v11.** Refine the auto-generated docs for the remaining ~60 components; build `tokens/colors.md` + `tokens/spacing.md` + `tokens/typography.md` (full set); wire `llms-full.txt` CI integration alongside `llms.txt`; designer reviews AI-pre-filtered dos/don'ts on the remaining components.

**Acceptance criteria**
- [ ] 75/75 component `.md` files polished (5-page from PF-2001a + remaining ~60)
- [ ] designer reviewed AI-pre-filtered dos/don'ts on the remaining ~60 components
- [ ] `tokens/colors.md`, `tokens/spacing.md`, `tokens/typography.md` committed (full set)
- [ ] `llms-full.txt` built in CI and published alongside `llms.txt`
- [ ] M11 Agent Experience coverage reports 75/75

---

#### PF-2026 — Picasso Skills package (4 Skills)

**Estimate:** S (2-4d effort) · **Blocked by:** PF-2001b (Skills reference component docs) · **Blocks:** P3-AIC-02 (distribution)


Author 4 Skills: `picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`. Each is a packaged Skill validated against ≥2 AI tools (Cursor, Claude Code, Cowork, Lovable, Windsurf).

**Acceptance criteria**
- [ ] 4 Skills published (`picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`)
- [ ] Each Skill validated end-to-end with ≥2 AI tools
- [ ] Skills referenced from `.picasso/` rules

---

### P2-FIG-01 — Define Figma Make guidelines and project template

**Track:** Figma Design-to-Code · **Estimate:** S (2-3d) · **Blocked by:** PF-2001b (guidelines reuse component docs)
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

### PF-2027 — Update BASE Design System spec gaps (remaining ~60 components)

**Track:** Figma Design-to-Code · **Estimate:** S (7-10d, mostly designer time) · **Blocked by:** PF-2001b (Picasso component docs ready) · **Blocks:** P2-FIG-02
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2 (new in v6)](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)


**Description**
**Rescoped in v10** — covers the components NOT in the 5-page subset (~60 instead of 55). Symmetric with P1-FIG-02 (which closed BASE spec gaps for the 5-page subset). Audit BASE Figma Product Library against the Picasso component docs (PF-2001b output), close gaps in component naming, prop naming, prop completeness, and variant coverage. Without this work, P2-FIG-02's `.figma.tsx` files would emit incorrect snippets for some of the ~60.

Owned with designer (same shape as PF-2006). Picasso component docs from PF-2001 (which now includes designer's reviewed dos/don'ts) are the primary input.

**AI leverage.** Reuses `bin/base-audit.ts` from PF-2006 unchanged — runs against the remaining 55 components, designer reviews flagged items. Highest-leverage AI deliverable in the program: transforms designer's role from "audit + fix" to "review-flagged + fix" at scale. ~70% audit-time reduction (~3-4 designer-day savings).

**Acceptance criteria**
- [ ] BASE audit spreadsheet for the remaining 55 components: BASE component name, variant coverage, prop-mapping cleanliness (green / yellow / red); gap list reviewed with designer
- [ ] BASE components updated: consistent names, prop names aligned with Picasso API where possible
- [ ] Variant coverage improved for any yellow-status component in the 55; red-status components either fixed or explicitly flagged
- [ ] Changelog committed to DS space
- [ ] Gaps that should also reflect in Picasso component docs routed back to PF-2001 (designer)

---

### P2-FIG-02 — Code Connect for remaining ~60 Picasso components

**Track:** Figma Design-to-Code · **Estimate:** S (4-5d) · **Blocked by:** P1-FIG-01, PF-2027, P2-MOD-01, P2-MOD-02, P2-MOD-03, P2-MOD-04 (per-batch for migrated components)
**Phase doc ref:** [Phase 2 — Figma Design-to-Code row 2](./PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate)

**Description**
**Rescoped in v10** — covers the components NOT in the 5-page subset (~60 instead of 55). Author `.figma.tsx` for the remaining ~60, reaching full library coverage (75/75). Full-library verification pass for Dev Mode snippets and MCP CodeConnectSnippets.

**AI leverage.** Reuses the agentic Code Connect generator from PF-2005 unchanged. Generator playbook is stable after the 5-page subset locks the format; expected per-component cost ~0.05d. Engineer batches review across the ~60.

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

**Track:** Modernization · **Estimate:** XS (1-1.5d) · **Blocked by:** PF-2025, P2-MOD-02, P2-MOD-03, P2-MOD-04, P2-MOD-05, P2-MOD-06
**Phase doc ref:** [Phase 3 — Modernization row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 7 Portal apps to 1.** Migrate **Staff Portal only**. Other Portal apps (platform, client-portal, hire-global, client-signup, talent-portal, screening-wizard) are out of scope for this PI — their teams will run their own migrations using the AI agent + migration prompt deliverables from P2-MOD-06.

**AI leverage.** Run the autonomous migration loop on Staff Portal as one of its first external-repo applications. Engineer reviews PRs + handles edge cases; agent handles bulk.

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

**Track:** Agent Experience · **Estimate:** XS (~1d) · **Blocked by:** PF-2001b + PF-2026
**Phase doc ref:** [Phase 3 — Agent Experience row 1](./PI-4318-phases.md#phase-3--rollout--4-6-weeks)

**Description**
**Scope reduced from 23 repos to 1.** Wire `.cursorrules` / `CLAUDE.md` / reference to `node_modules/@toptal/picasso/.picasso/` into **Staff Portal only**. Other Picasso consumer repos will adopt as their teams choose, using P3-AIC-02's npm-bundled distribution.

**Acceptance criteria**
- [ ] Staff Portal has `.cursorrules` / `CLAUDE.md` / `.picasso/` reference wired
- [ ] Validation check: AI agents in Staff Portal produce correct Picasso imports on canonical prompts
- [ ] Adoption pattern documented for other-team self-service rollout

---

### P3-AIC-02 — Bundle Agent Experience into `@toptal/picasso` npm package

**Track:** Agent Experience · **Estimate:** XS (~1d) · **Blocked by:** PF-2001b, PF-2026
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
- **Phase 1 (hybrid):** 4 Agent Experience (PF-1997, PF-1998 [rescoped to 5-page baseline], PF-1999, PF-2001a [new in v10]) + 3 Figma Design-to-Code (PF-2005/2006 [rescoped to 5-page subset], PF-2007) + 2 Modernization (PF-1992 [+1d for 5-page protocol], PF-1993) + 1 Maestro Integration (PF-2011) = 10 stories.
- **Phase 2:** 8 Modernization (PF-1994 + PF-2024 + PF-2025 + PF-2020/2021/2022/2023 + PF-1995) + 3 Agent Experience (PF-2001b [new in v10], PF-2026, PF-2000 [A2 measurement]) + 3 Figma Design-to-Code (PF-2008, PF-2027, PF-2009) + 2 Maestro Integration = 16 stories.
- **Phase 3:** 1 Modernization (PF-1996 Staff Portal; P3-MOD-02 excluded) + 2 Agent Experience (PF-2002 Staff Portal + PF-2003 npm-bundled distribution; P3-AIC-03 excluded) + 0 Figma (PF-2010 excluded) + 0 Maestro Integration (P3-MAE-01 + P3-MAE-02 excluded) = 3 stories.
- **Total:** 3 epics + 29 stories after PF-2001 split into PF-2001a + PF-2001b.
- **Program total: 76-117 man-days** (v12, unchanged from v11 — same work, reorganized). Per-track v12 totals: Modernization 35-53, Agent Experience 8.5-15.5, Figma Design-to-Code 19.5-28, Maestro Integration 9-14, **Pilot Measurement 4-6.5 (NEW)**.
- **Program start: May 4, 2026.** See [PI-4318-estimates.md](./PI-4318-estimates.md) for the per-ticket breakdown and [PI-4318-timeline-v4.md](./PI-4318-timeline-v4.md) for the calendar.

**Excluded from PI-4318 scope:** PF-2004 (P3-AIC-03 feedback collection), PF-2010 (P3-FIG-01 designer onboarding), P3-MOD-02 (other-repo migrations — handled by other teams via self-service AI prompt), P3-MAE-01 (Maestro onboarding), P3-MAE-02 (Maestro defaults to Picasso).

## Review checklist

- [ ] Epic scope and gating criteria correct?
- [ ] Story titles read well as Jira summaries?
- [ ] Dependencies (`blocked by` / `blocks`) match expected sequencing?
- [ ] T-shirt estimates reasonable?
- [ ] Any stories that should be split or merged (e.g., P1-MEAS-02 and P2-AIC-01 are XL — split along natural seams)?
- [ ] Track labels correct throughout?
- [ ] Phase doc references point to the right anchors?
