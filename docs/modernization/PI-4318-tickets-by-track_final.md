# PI-4318 — Tickets by Track (Final)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Last updated:** 2026-04-30
**Audience:** Project manager, sponsors, engineers
**Companion docs:** [PI-4318-estimates_final.md](./PI-4318-estimates_final.md) (effort) · [PI-4318-timeline_final.md](./PI-4318-timeline_final.md) (calendar)

> **Source of truth:** [PI-4318 in Jira](https://toptal-core.atlassian.net/browse/PI-4318) — 28 stories across 5 epics. This doc is the narrative companion: ticket descriptions, acceptance criteria, cross-track dependencies, ownership, and the engineering rationale that doesn't fit cleanly into Jira ticket bodies. Each ticket below maps 1:1 to a Jira issue.

---

## Epic structure

| Epic | Track | Stories | Effort |
|---|---|---|---|
| [PF-1988](https://toptal-core.atlassian.net/browse/PF-1988) | Picasso Modernization | 11 | 38-58d |
| [PF-1989](https://toptal-core.atlassian.net/browse/PF-1989) | Picasso Agent Experience | 6 | 8.5-15.5d |
| [PF-1990](https://toptal-core.atlassian.net/browse/PF-1990) | Figma Design-to-Code | 6 | 19.5-28d |
| [PF-1991](https://toptal-core.atlassian.net/browse/PF-1991) | Maestro Integration | 3 | 9-14d |
| [PF-2030](https://toptal-core.atlassian.net/browse/PF-2030) | Picasso/BASE AI Benchmark | 2 | 5-7.5d |
| **Total** | | **28** | **80-123d** |

**Excluded from PI scope:** P3-MOD-02 (other-repo migrations — handled by consumer teams via the AI prompt from PF-1995), P3-MAE-01 (Maestro onboarding — post-PI), P3-MAE-02 (Maestro defaults to Picasso — post-PI). PF-2004 (feedback collection) and PF-2010 (designer onboarding) also excluded.

---

# Epic A — Picasso Modernization (PF-1988)

**Goal.** Migrate Picasso from **MUI v4 (`@material-ui/core` 4.12.4) + `@mui/base` + JSS** to **`@base-ui/react` v1.4.1 ([base-ui.com](https://base-ui.com/react/overview/quick-start), stable as of Apr 2026) + Tailwind 4**. The May 2026 source-stack re-audit (v3) identified three source stacks and two migration paths (full detail in [migration plan §1](./PI-4318-P1-MOD-01-migration-plan.md#1-current-state-may-2026-audit-full-re-run) and per-component target mapping in [§3](./PI-4318-P1-MOD-01-migration-plan.md#3-tier-inventory-v3--may-2026-re-audit)):

- **Heavy path** (full rewrite — MUI v4 + JSS → `@base-ui/react` + Tailwind): 8 base/* components (5 Tier 2 + 3 Tier 3) + 4 sibling packages (Tier 4) + provider runtime (Tier 5).
- **Light path** (package swap + API alignment — `@mui/base` → `@base-ui/react`): 8 base/* components (Tier 0 — Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs) + 1 mixed-state Tier 3 PR (OutlinedInput, bundled with PF-2025), Tailwind already in place. Calibrated against PR #4906.
- **Cleanup-only**: 11 components (Tier 1 — 5 already-clean + 5 type-only fixes + Menu pkg cleanup; Utils included). Just `package.json` peer-dep cleanup + React 19 cap lift + small re-export replacements.

The autonomous orchestrator (built in PF-1992) handles per-component rewrites on both paths via path-specific prompts (`PROMPT-light.md`, `PROMPT-heavy.md`); engineers review PRs. Provider canary (PF-2023) is the final commit that removes the root MUI v4 peer-dep. Staff Portal migration (PF-1996) is the consumer canary.

**Track exit criteria.** Zero `@material-ui/core`, zero `@mui/base`, and zero JSS imports inside Picasso. All components on `@base-ui/react` + Tailwind. Root `@material-ui/core` peer-dep removed from `packages/picasso/package.json`. React 19 validated. Staff Portal migrated as canary.

---

### [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) — Create migration plan for AI-assisted Picasso migration

**Effort:** 4-5d · **Phase:** 1 · **Owner:** Eng A · **Status:** To Do
**Blocks:** PF-1994, PF-2024, PF-2025, PF-1995

Defines the migration plan for Picasso → `@base-ui/react` + Tailwind, **and** stands up the autonomous-loop infrastructure that PF-1994/2024/2025/2020/2021/2022 use. Deliverables include: top-level plan with the v13 retiering (Tier 0 light path / Tier 1 cleanup / Tier 2-3 heavy / Tier 4 siblings / Tier 5 provider), per-component plan templates, **two AI migration prompts** (`PROMPT-light.md` for `@mui/base` → `@base-ui/react`, `PROMPT-heavy.md` for MUI v4 + JSS → `@base-ui/react` + Tailwind), four rule docs (`styling.md`, `api-preservation.md`, `jss-to-tailwind-crib.md`, **NEW** `base-ui-react-api-crib.md`), testbed setup, risk register. Plus the orchestrator scaffolds: `bin/migration-orchestrator.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh`, `docs/migration/manifest.json`, `docs/migration/ORCHESTRATOR.md`, `gh` CLI auth setup. Validates end-to-end on Note (smallest Tier 1 cleanup-only component, sandboxed) before scaling. **Verify PR #4906 status as a prerequisite**: confirm whether merged and on which target stack (`@base-ui/react` vs `@mui/base`).

**Acceptance criteria:**
- [ ] [`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](./PI-4318-P1-MOD-01-migration-plan.md) committed (this is the deep dive that ships as `docs/migration/` content)
- [ ] Per-component plan template + 2-3 worked examples; per-component plan files for all 11 Tier 1 cleanup components + 8 Tier 0 light-path components (required for PF-1994 to start)
- [ ] Two AI migration prompts committed: `PROMPT-light.md` and `PROMPT-heavy.md`
- [ ] Four rule docs committed: `styling.md`, `api-preservation.md`, `jss-to-tailwind-crib.md`, `base-ui-react-api-crib.md`
- [ ] Orchestrator scaffolds committed: `bin/migration-orchestrator.ts`, gate + diff scripts, manifest schema, `ORCHESTRATOR.md`
- [ ] `gh` CLI auth set up
- [ ] PR #4906 status verified; reference implementations (Button + Switch) confirmed on `@base-ui/react` (or fresh light-path migration of Note used as canonical reference)
- [ ] Sandboxed Note migration validates orchestrator end-to-end (agent picks Note, applies prompt, runs gates, opens PR, polls CI)
- [ ] PR for PF-1992 itself ships through full test suite + Happo + reviewer approval

---

### [PF-1993](https://toptal-core.atlassian.net/browse/PF-1993) — Migrate Picasso to pnpm

**Effort:** 3-5d · **Phase:** 1 · **Owner:** Eng C · **Status:** In Progress
**Dependency:** PI-4278 (Platform Core Q2) for tooling alignment

Execute pnpm migration for the Picasso monorepo. Prerequisite for Tailwind 4 and the broader modernization. Co-dependent with PI-4278.

**Acceptance criteria:**
- [ ] All packages build with pnpm
- [ ] CI updated to run on pnpm
- [ ] No regressions on existing Jest / Cypress / Happo suites
- [ ] Tailwind 4 availability confirmed
- [ ] Short migration write-up appended to `docs/migration-plan.md`

---

### [PF-1994](https://toptal-core.atlassian.net/browse/PF-1994) — Migrate packages/base/* Tier 1 cleanup + Tier 0 light-path batch

**Effort:** 3-5d · **Phase:** 1 → 2 · **Owner:** Eng A oversight (autonomous)
**Blocked by:** PF-1992, PF-1993 · **Blocks:** PF-2024, PF-2020, PF-2021, PF-2022

Two passes; both run via the autonomous orchestrator from PF-1992. First batch validates the loop end-to-end on the lowest-risk components, then scales to the calibration-anchor light path.

**Tier 1 cleanup (11 components, ~1d total):** 5 already-clean (Form, FormLayout, ModalContext, Note, Typography) + 5 type-only/trivial fixes (Container, FormLabel, Grid, Notification, Menu pkg cleanup) + Utils (replace 2 small re-exports + 1 Tailwind transition). Per migration plan §3.2. Just `package.json` cleanup (remove `@material-ui/core` peer-dep), React 19 peer-dep cap lift, and minimal type-import replacements. **Note runs first** as the orchestrator sandbox (smallest surface, validates the agent loop end-to-end before scaling).

**Tier 0 light path (8 components, ~2.5-4d total):** Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs. All currently on `@mui/base`; Tailwind already in place via `cx`/`twMerge`. Migration is a package swap + API alignment per `PROMPT-light.md`. Calibrated against PR #4906 (Button + Switch). Order: Backdrop first (Modal + Drawer depend on it). Mixed-state `@mui/base`/MUI v4 components (Dropdown, OutlinedInput) handled in PF-2025.

Eng A reviews PRs. Sibling-package migrations (charts, query-builder, RTE) and Tier 2/3 composites depend on these primitives.

**Per-component DoD (applies to all base/* tier tickets):**
- Happo baseline pixel-perfect
- Jest + Cypress green
- React 19 smoke-tested
- Storybook story updated
- `.figma.tsx` still valid

**Acceptance criteria:**
- [ ] All 11 Tier 1 cleanup units complete (peer-dep removed, React 19 cap lifted, type-only imports replaced with native React types or Picasso-own types)
- [ ] All 8 Tier 0 light-path units migrated; per-component DoD met
- [ ] Zero `@mui/base` imports in those packages' `src/**`
- [ ] Zero `@material-ui/core` peer-deps in those packages' `package.json`
- [ ] `@base-ui/react` added as dependency in Tier 0 packages
- [ ] React 19 smoke suite green
- [ ] Tier 0 multipliers recalibrated post-batch (feeds PF-2024/2025 estimates per [migration plan R12](./PI-4318-P1-MOD-01-migration-plan.md#8-risk-register))

---

### [PF-2024](https://toptal-core.atlassian.net/browse/PF-2024) — Migrate packages/base/* Tier 2 heavy components

**Effort:** 4-7d · **Phase:** 2 · **Owner:** Eng A oversight (autonomous)
**Blocked by:** PF-1994 · **Blocks:** PF-2025, PF-2023

Tier 2 = 5 heavy-path components: **Checkbox, Radio, Tooltip, FileInput, Popper**. All use MUI v4 + JSS at runtime; full rewrite per `PROMPT-heavy.md`. Per-component target mapping per [migration plan §3.3](./PI-4318-P1-MOD-01-migration-plan.md#33-tier-2--heavy-migrations-5-components):

- **Checkbox + CheckboxGroup** → `@base-ui/react/checkbox` + `@base-ui/react/checkbox-group`
- **Radio + RadioGroup** → `@base-ui/react/radio` + own group wrapper using `@base-ui/react/field`
- **Tooltip** → `@base-ui/react/tooltip` (direct match; `Tooltip.Provider` + `Tooltip.Root` + parts)
- **FileInput** → keep custom (`<input type="file">` + Tailwind; no `@base-ui/react` analog)
- **Popper** → `@floating-ui/react` (preferred) OR consumers refactor to `@base-ui/react/popover` (locked in PF-1992 spike per §9.8)

> **v3 reclassification:** FormLabel, Container, Grid, Notification, Utils were previously listed in Tier 2 (v13) but have only type-only or trivial imports. They're now Tier 1 cleanup (handled in PF-1994). Page moved from Tier 2 to Tier 3 (it's a high-surface composite that depends on most of base/*).

Risk concentrates on (a) Tooltip — `@base-ui/react/tooltip` viability, (b) Popper — primitive-choice decision per [migration plan §9.8](./PI-4318-P1-MOD-01-migration-plan.md#98-open-decision-popper--backdrop--standalone-positioning-replacement), (c) FileInput — fully custom rewrite without primitive backing.

**Acceptance criteria (per-component DoD plus track-level):**
- [ ] All 5 Tier 2 components migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / `@material-ui/styles` imports in those packages' `src/**`
- [ ] Zero JSS in those packages' `src/**`
- [ ] `@material-ui/core` removed from those packages' `package.json`
- [ ] `@base-ui/react` added as dependency for Checkbox, Radio, Tooltip
- [ ] Popper architectural decision implemented per PF-1992 spike outcome
- [ ] React 19 smoke suite green

---

### [PF-2025](https://toptal-core.atlassian.net/browse/PF-2025) — Migrate packages/base/* Tier 3 composite components + OutlinedInput mixed-state

**Effort:** 5-7d · **Phase:** 2 · **Owner:** Eng A
**Blocked by:** PF-2024 · **Blocks:** PF-2023

Tier 3 = 3 composite components on heavy path + 1 mixed-state PR (per [migration plan §3.4](./PI-4318-P1-MOD-01-migration-plan.md#34-tier-3--heavy-composites-3-components)):

- **Accordion** → `@base-ui/react/accordion` (direct match; `&$expanded` parent-refs unwind to `data-[state=open]` Tailwind selectors; `PicassoProvider.override` removed)
- **Dropdown** → `@base-ui/react/menu` + `@base-ui/react/popover` (mixed-state — single PR covers both `@mui/base` portion AND `@material-ui/core/Grow` transition replacement)
- **Page** → keep custom (pure Tailwind rewrite; no `@base-ui/react` analog; depends on most of Tier 0 + Tier 2 — migrated absolutely last in `base/*`)
- **OutlinedInput** (mixed-state, ~0.5d single PR) → `@base-ui/react/input` + `@base-ui/react/field`; type-leak fix bundled in

> **v3 simplification:** type-leak fixes for Container, FormLabel, Grid, Notification — previously listed in PF-2025 — moved to PF-1994 Tier 1 cleanup. Only OutlinedInput mixed-state remains here because it bundles cleanly with the Tier 3 work.

Highest-surface units; expect manual touch-up on JSS parent-refs and theme overrides. Eng A leads architecture decisions per [migration plan R3 + R4](./PI-4318-P1-MOD-01-migration-plan.md#8-risk-register); agent assists per-file via `PROMPT-heavy.md`.

**Acceptance criteria:**
- [ ] All 3 Tier 3 units migrated; per-component DoD met
- [ ] Mixed-state Dropdown + OutlinedInput fully migrated (both light + heavy passes complete in single PR per component)
- [ ] Page rewritten in pure Tailwind; consumes migrated primitives
- [ ] Zero `@material-ui/core`, zero `@mui/base`, zero JSS imports anywhere in `packages/base/*/src/**` (final base/* exit gate before Tier 4 sibling work)
- [ ] React 19 smoke suite green on entire base/* set
- [ ] Happo baselines regenerated
- [ ] `PicassoProvider.override` calls removed for migrated components

---

### [PF-2020](https://toptal-core.atlassian.net/browse/PF-2020) — Migrate @toptal/picasso-charts

**Effort:** 1-2d · **Phase:** 2 · **Owner:** Eng C oversight (autonomous)
**Blocked by:** PF-1994 (Tier 1 primitives)

Single component (LineChart). Smallest of the sibling-package migrations; treated as warm-up for the larger siblings. Same orchestrator pattern.

**Acceptance criteria:**
- [ ] LineChart migrated; no `@material-ui/core` imports, no JSS
- [ ] `@material-ui/core` removed from `packages/picasso-charts/package.json`
- [ ] Jest + Cypress + Happo + React 19 smoke green

---

### [PF-2021](https://toptal-core.atlassian.net/browse/PF-2021) — Migrate @toptal/picasso-query-builder

**Effort:** 4-6d · **Phase:** 2 · **Owner:** Eng C oversight (autonomous)
**Blocked by:** PF-1994 · **Blocks:** PF-2023

11 components across 21 source files: AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor. Batch into 3-4 PRs by component cluster.

**Acceptance criteria:**
- [ ] All 11 QB components migrated; per-component DoD met
- [ ] Zero `@material-ui/core` / JSS in `packages/picasso-query-builder/src/**`
- [ ] React 19 smoke green; Happo baselines regenerated

---

### [PF-2022](https://toptal-core.atlassian.net/browse/PF-2022) — Migrate @toptal/picasso-rich-text-editor

**Effort:** 5-7d · **Phase:** 2 · **Owner:** Eng C oversight + Eng A pair-review
**Blocked by:** PF-1994 · **Blocks:** PF-2023

8 components across 23 source files. Trickiest piece is `create-lexical-theme.ts` — the Lexical theme bridge depends on MUI v4 Theme shape and needs a Tailwind-token-based replacement. Eng A pair-reviews the Lexical theme rewrite specifically.

**Acceptance criteria:**
- [ ] All 8 RTE components migrated
- [ ] `create-lexical-theme.ts` replaced with Tailwind-token-driven equivalent
- [ ] Zero `@material-ui/core` / JSS in `packages/picasso-rich-text-editor/src/**`
- [ ] React 19 smoke green

---

### [PF-2023](https://toptal-core.atlassian.net/browse/PF-2023) — Decommission @toptal/picasso-provider MUI v4 runtime + remove root peer-dep

**Effort:** 6-9d · **Phase:** 2 · **Owner:** Eng A + Eng C pair
**Blocked by:** PF-2025, PF-2020, PF-2021, PF-2022 · **Blocks:** PF-1996

System rewrite, **canary commit of the PI**. Removes `@material-ui/core: 4.12.4` from `packages/picasso/package.json`. Scope: PicassoProvider rewrite (drop createTheme/Overrides/ThemeProvider), `theme.ts` module augmentation, `styles.tsx` createStyles → Tailwind, CssBaseline → Tailwind preflight, NotificationsProvider restyle, PicassoRootNode + scrollbar, responsive-styles helpers (4 files), `get-serverside-stylesheets.ts` SSR pipeline retired.

Eng A primary author; Eng C pairs on architecture decisions (Tailwind 4 SSR strategy, JSS pipeline retirement, NotificationsProvider restyling). Highest review burden of any ticket.

**Acceptance criteria (package-level, not per-component):**
- [ ] Full Picasso Storybook renders without console errors
- [ ] Full Happo suite passes (or diffs explicitly approved by designer)
- [ ] At least one Portal app smoke-tests green against the new provider
- [ ] React 19 validation green across Picasso library
- [ ] Zero `@material-ui/core` and zero JSS in `packages/picasso-provider/src/**`
- [ ] `@material-ui/core` peer-dep removed from `packages/picasso/package.json` (**canary commit**)
- [ ] Deprecated-deps audit green (O1 = 0)

---

### [PF-1995](https://toptal-core.atlassian.net/browse/PF-1995) — AI-assisted consumer migration (with optional codemods)

**Effort:** 1.5-2.5d · **Phase:** 3 · **Owner:** Eng A
**Blocked by:** PF-2025, PF-2020, PF-2021, PF-2022, PF-2023 (progressive) · **Blocks:** PF-1996

AI migration prompt + worked examples for consumer migrations. Strict API-preservation policy minimizes breaking changes. Codemods become an escape hatch for high-blast-radius API breaks (target 0-3 codemods, not the original 8-12).

**Acceptance criteria:**
- [ ] API-preservation policy applied across PF-1994/2020/2021/2022/2023
- [ ] AI migration prompt + 2-3 worked examples committed in `docs/migration/`
- [ ] 0-3 escape-hatch codemods (only for unavoidable API breaks)
- [ ] Migration playbook for Staff Portal documented (used by PF-1996)

---

### [PF-1996](https://toptal-core.atlassian.net/browse/PF-1996) — Migrate Staff Portal to modernized Picasso

**Effort:** 2-3d · **Phase:** 3 · **Owner:** Eng A (autonomous loop)
**Blocked by:** PF-1995, PF-2025, PF-2023

Migrate Staff Portal as the consumer canary. Other Portal apps (platform, client-portal, hire-global, client-signup, talent-portal, screening-wizard) are out of PI scope — their teams self-serve via the AI prompt from PF-1995.

**Acceptance criteria:**
- [ ] Staff Portal on modernized Picasso
- [ ] Happo visual regression clean
- [ ] Jest / Cypress clean
- [ ] Rollback procedure tested + documented
- [ ] Retro published; issues feed AI prompt refinement for other-team adoption

---

# Epic B — Picasso Agent Experience (PF-1989)

**Goal.** Optimized `llms.txt`, `.picasso/` rules v2, polished component docs, Skills package, npm-bundled distribution. The headline measurement that quantifies this track's value (the A1 → A2 lift) lives in **Epic E (PF-2030)** because the lift is jointly produced by AIC + Figma artifacts.

**Track exit criteria.** 75/75 component docs polished. 4 Skills published. Tokens docs + `llms-full.txt` CI live. Staff Portal wired with `.cursorrules` / `CLAUDE.md`. npm distribution live.

---

### [PF-1997](https://toptal-core.atlassian.net/browse/PF-1997) — Optimize LLM index and .picasso/ folder

**Effort:** 1.5-2.5d · **Phase:** 1 · **Owner:** Eng B
**Blocked by:** PF-2000 H + A1 baseline (informs design) · **Blocks:** PF-1999, PF-2001

Decrease size and increase usability of `llms.txt` and `.picasso/` for AI agents. Storybook → llms.txt produces lean component docs as a byproduct (these get polished in PF-2001). Designed with the H + A1 baseline numbers from PF-2000 already in hand, so optimization targets known weak spots.

**Acceptance criteria:**
- [ ] `llms.txt` regenerated; size reduced vs v1; published to `toptal.github.io/picasso/llm-docs/llms.txt`
- [ ] `.picasso/` rules v2 published with changelog
- [ ] Usability check: Cursor + Claude Code produce correct Picasso output on 3 sample prompts
- [ ] Trade-offs between `llms.txt` and `llms-full.txt` documented

---

### [PF-1999](https://toptal-core.atlassian.net/browse/PF-1999) — Extract patterns from existing usage of Picasso

**Effort:** 1.5-2.5d · **Phase:** 1 · **Owner:** Eng B
**Blocked by:** PF-1997 · **Blocks:** PF-2001

AI-assisted pattern mining from Portal apps — forms, layouts, data tables, navigation. Patterns merge directly into `.picasso/` rules. Result is real-world-grounded guidance that AI agents can reuse.

**Acceptance criteria:**
- [ ] Pattern inventory committed (covers forms, layouts, navigation, data display)
- [ ] Each pattern has ≥3 real-world usage examples cited by file path
- [ ] Patterns merged into `.picasso/` rules v2
- [ ] Gaps / antipatterns flagged for designer review

---

### [PF-2001](https://toptal-core.atlassian.net/browse/PF-2001) — Polish and Review component-level AI documentation

**Effort:** 2-3.5d · **Phase:** 1 + 2 (two polish passes) · **Owner:** Eng B
**Blocked by:** PF-1997, PF-1999 · **Blocks:** PF-2026, PF-2008, PF-2027, PF-2000 A2 baseline

**Two polish passes** (single Jira ticket, two acceptance phases):
1. **5-page subset polish** (Phase 1, 0.5-1d). Refines auto-generated docs for the 12-18 components used in the 5 Staff Portal pages so they're available for the A2 baseline run in PF-2000.
2. **Remaining ~60 polish + tokens + llms-full.txt + designer review** (Phase 2, 1.5-2.5d). Refines docs for the remaining components, builds `tokens/colors.md` + `tokens/spacing.md` + `tokens/typography.md`, wires `llms-full.txt` CI integration, designer reviews AI-pre-filtered dos/don'ts.

The bulk doc generation already happens in PF-1997 (Storybook → llms.txt) and PF-1999 (patterns merged into `.picasso/`). PF-2001 is polish + tokens + CI + designer review, not from-scratch authoring.

**Acceptance criteria:**
- [ ] 5-page-subset docs polished (Phase 1 — gates PF-2000 A2 run)
- [ ] 75/75 component docs polished (Phase 2)
- [ ] designer reviewed AI-pre-filtered dos/don'ts on the remaining ~60 components
- [ ] `tokens/colors.md`, `tokens/spacing.md`, `tokens/typography.md` committed
- [ ] `llms-full.txt` built in CI alongside `llms.txt`
- [ ] M11 Agent Experience coverage reports 75/75

---

### [PF-2026](https://toptal-core.atlassian.net/browse/PF-2026) — Picasso Skills package

**Effort:** 2-4d · **Phase:** 2 · **Owner:** Eng B
**Blocked by:** PF-2001 · **Blocks:** PF-2003

4 Skills: `picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`. Each validated end-to-end against ≥2 AI tools.

**Acceptance criteria:**
- [ ] 4 Skills published
- [ ] Each Skill validated end-to-end with ≥2 AI tools (Cursor + Claude Code recommended)
- [ ] Skills referenced from `.picasso/` rules

---

### [PF-2002](https://toptal-core.atlassian.net/browse/PF-2002) — Adopt Picasso rules in Staff Portal

**Effort:** 0.5-1.5d · **Phase:** 3 · **Owner:** Eng A
**Blocked by:** PF-2001, PF-2026

Wire `.cursorrules` / `CLAUDE.md` / reference to `node_modules/@toptal/picasso/.picasso/` into Staff Portal. Other repos adopt as their teams choose, using PF-2003's npm-bundled distribution.

**Acceptance criteria:**
- [ ] Staff Portal has `.cursorrules` / `CLAUDE.md` / `.picasso/` reference wired
- [ ] Validation: AI agents in Staff Portal produce correct Picasso imports on canonical prompts
- [ ] Adoption pattern documented for other-team self-service rollout

---

### [PF-2003](https://toptal-core.atlassian.net/browse/PF-2003) — Bundle Agent Experience into @toptal/picasso npm package

**Effort:** 1-1.5d · **Phase:** 3 · **Owner:** Eng A
**Blocked by:** PF-2001, PF-2026

Ship `.picasso/` folder + Skills + `llms-full.txt` as part of the existing `@toptal/picasso` npm publish. Consumers automatically get the artifacts at `node_modules/@toptal/picasso/.picasso/` whenever they update Picasso. No separate package, no parallel versioning.

**Acceptance criteria:**
- [ ] `.picasso/` folder + Skills committed to `@toptal/picasso` package's `files` array
- [ ] Picasso publish workflow includes Agent Experience artifacts
- [ ] Consumer reference convention documented
- [ ] Validated end-to-end in Staff Portal

---

# Epic C — Figma Design-to-Code (PF-1990)

**Goal.** 75/75 Code Connect coverage. BASE Design System aligned with Picasso component API. Figma Make template published. Tooling (`bin/generate-code-connect.ts` + `bin/base-audit.ts`) is built once on the 5-page subset (PF-2005, PF-2006) and reused at scale on the remaining ~60 components (PF-2009, PF-2027).

**Track exit criteria.** 75/75 Code Connect coverage. M12 drift CI check live. BASE spec aligned across all 75 components. Figma Make template published org-wide.

---

### [PF-2005](https://toptal-core.atlassian.net/browse/PF-2005) — Code Connect for the 5-page component subset (~12-18 components)

**Effort:** 3-4.5d · **Phase:** 1 · **Owner:** Eng B
**Blocked by:** PF-1998 (component-set), PF-2006, PF-2007 · **Blocks:** PF-2000 A2 baseline, PF-2009

Engineer authors `bin/generate-code-connect.ts` (template + Figma MCP integration + Dev Mode snippet verification + iteration loop, max 3) on the way to running it on the 5-page subset. Generator script is reused unchanged by PF-2009 for the remaining ~60.

**Acceptance criteria:**
- [ ] `bin/generate-code-connect.ts` committed: template + Figma MCP + Dev Mode snippet verification + iteration loop
- [ ] `.figma.tsx` files committed and published for every component in `pilot/component-set.md` (~12-18 files)
- [ ] Each component verified in Figma Dev Mode and via Figma MCP
- [ ] Figma MCP configured for 3-5 pilot engineers (Cursor + Claude Code)
- [ ] Generator script reusable unchanged by PF-2009
- [ ] Available for PF-2000 A2 measurement run

---

### [PF-2006](https://toptal-core.atlassian.net/browse/PF-2006) — Update BASE Design System specification gaps (based on 5 pages)

**Effort:** 2.5-3.5d · **Phase:** 1 · **Owner:** Designer (Eng B builds script)
**Blocked by:** PF-1998 (component-set) · **Blocks:** PF-2005, PF-2027

Engineer authors `bin/base-audit.ts` (TypeScript AST parser + Figma MCP + RAG-status output) on the way to running the audit. Designer reviews flagged items only and applies fixes in BASE Figma. Audit script reused unchanged by PF-2027 for the remaining ~60.

**Acceptance criteria:**
- [ ] `bin/base-audit.ts` committed
- [ ] Audit run on the 12-18 components in `pilot/component-set.md`; spreadsheet published with per-component fix recommendations
- [ ] Designer applies flagged fixes in BASE Figma; change-log committed to DS space
- [ ] Audit script reusable unchanged by PF-2027

---

### [PF-2007](https://toptal-core.atlassian.net/browse/PF-2007) — Verify design token mapping between BASE and Picasso

**Effort:** 1-2d · **Phase:** 1 · **Owner:** Designer
**Blocked by:** PF-1998 · **Blocks:** PF-2006

Confirm colors, spacing, and typography tokens used in BASE Figma are traceable 1:1 to Picasso token names. Without this, AI outputs drift visually even when Code Connect is wired correctly.

**Acceptance criteria:**
- [ ] Token-mapping doc committed covering colors, spacing, typography
- [ ] Every token used in the 5-page reference designs has a verified Picasso counterpart
- [ ] Mismatches logged with owner and fixed (or explicitly flagged)
- [ ] Mapping referenced from `.picasso/` rules v2

---

### [PF-2008](https://toptal-core.atlassian.net/browse/PF-2008) — Define Figma Make guidelines and project template

**Effort:** 2-3d · **Phase:** 3 · **Owner:** Eng A
**Blocked by:** PF-2001 (component docs)

Picasso install path in Figma Make + guidelines authored from PF-2001 component docs + template published org-wide. Existing `@toptal` npm registry reachable from Figma Make (assumption to verify).

**Acceptance criteria:**
- [ ] Picasso installable in Figma Make from `@toptal` npm registry
- [ ] `guidelines/` folder committed (adapted from PF-2001 component .md files)
- [ ] Template published org-wide and discoverable
- [ ] End-to-end validation: designer generates a screen from a sample design using only the template

---

### [PF-2027](https://toptal-core.atlassian.net/browse/PF-2027) — Update BASE Design System specification gaps (remaining ~60)

**Effort:** 7-10d · **Phase:** 2 · **Owner:** Designer (mostly designer time; Eng B reviews)
**Blocked by:** PF-2001 (Picasso component docs ready), PF-2006 (audit script) · **Blocks:** PF-2009

Symmetric with PF-2006 — runs against the remaining ~60 components (those not in the 5-page subset). Reuses `bin/base-audit.ts` unchanged.

**Acceptance criteria:**
- [ ] `bin/base-audit.ts` run against remaining ~60 components; spreadsheet published
- [ ] Designer applies flagged fixes; change-log committed
- [ ] Variant coverage improved for yellow-status components; red-status fixed or flagged
- [ ] Gaps that should reflect in Picasso component docs routed back to PF-2001

---

### [PF-2009](https://toptal-core.atlassian.net/browse/PF-2009) — Code Connect for all remaining Picasso components

**Effort:** 4-5d · **Phase:** 3 · **Owner:** Eng A + Eng C swarm
**Blocked by:** PF-2005 (generator), PF-2027 (BASE alignment), PF-2025, PF-2020, PF-2021, PF-2022

`.figma.tsx` for the remaining ~60 components, reaching 75/75 coverage. Reuses `bin/generate-code-connect.ts` from PF-2005 unchanged. Generator playbook is stable after the 5-page subset locks the format.

**Acceptance criteria:**
- [ ] ~60 `.figma.tsx` files committed (full library = 75/75 with PF-2005's set)
- [ ] Dev Mode snippet verified for every component
- [ ] MCP CodeConnectSnippets verified for each component via scripted check
- [ ] M10 reports 75/75
- [ ] M12 (drift) CI check live; PRs breaking `.figma.tsx` fail fast

---

# Epic D — Maestro Integration (PF-1991)

**Goal.** Replace Figma MCP on the Maestro path with a production Figma Middleware. Capture O4 adoption baseline. Adoption itself (defaulting Maestro projects to Picasso) is post-PI — PI exits at production-middleware-ready.

**Track exit criteria.** Production middleware deployed in Maestro environment with monitoring + error reporting. Migration guide published. At least one Maestro project integrated end-to-end. O4 baseline recorded.

---

### [PF-2011](https://toptal-core.atlassian.net/browse/PF-2011) — PoC of Figma Middleware based on API

**Effort:** 2-3d · **Phase:** 1 · **Owner:** Eng C

Working PoC of the Figma Middleware CLI/service via Figma REST API, with an AI-assisted frontend implementation flow. Lightweight — no production wiring, no Maestro-side integration. Output is a runnable example + comparison vs Figma MCP + productionization estimate that informs PF-2012 scope.

**Acceptance criteria:**
- [ ] PoC repo with README and runnable example
- [ ] End-to-end read of a sample Figma design via REST API
- [ ] Structured output usable by an AI agent to generate Picasso snippets
- [ ] Comparison write-up: Figma Middleware vs Figma MCP (capability, cost, trade-offs)
- [ ] Effort estimate for Phase 2 productionization

---

### [PF-2012](https://toptal-core.atlassian.net/browse/PF-2012) — Implement Figma Middleware (production) based on PoC

**Effort:** 6-9d · **Phase:** 3 · **Owner:** Eng A + Eng B + Eng C (3-engineer parallel)
**Blocked by:** PF-2011

**Split into 3 sub-tickets after PF-2011 PoC ships (~May 19; lock split by ~May 26).** All three engineers contribute in parallel during the program-tail window because Eng A wraps Modernization Jul 6 and Eng B wraps AIC Jun 30:

- **PF-2012a — Eng C lead, ~3d.** Maestro deployment, architecture, Figma API integration patterns. Jul 2-9.
- **PF-2012b — Eng B, ~5d (extended).** Monitoring + error reporting + migration guide + Maestro integration testing + PF-2013 audit data prep. Jul 1-14.
- **PF-2012c — Eng A, ~10d (split window).** Architecture spike Jun 19-29 (absorbs Eng A's idle window between PF-2008 and PF-2009 swarm) + Maestro integration + production hardening Jul 7-9.

**Acceptance criteria:**
- [ ] Middleware deployed / runnable in Maestro's environment
- [ ] Covers Figma read features Maestro needs (components, variants, tokens)
- [ ] Monitoring + error reporting configured
- [ ] Migration guide written for Maestro consumers
- [ ] Integrated into at least one Maestro project end-to-end

---

### [PF-2013](https://toptal-core.atlassian.net/browse/PF-2013) — Audit Maestro for Picasso UI generation

**Effort:** 1-2d · **Phase:** 3 · **Owner:** Eng C lead + Eng A pair + Eng B audit-data prep
**Blocked by:** PF-2012

Inventory existing Maestro projects and record baseline count generating Picasso UI (O4 baseline). Pair execution: Eng C drives the audit, Eng A contributes integration validation + cross-checks + report write-up, Eng B preps audit datasets in PF-2012b.

**Acceptance criteria:**
- [ ] Audit spreadsheet: project name, uses Picasso (y/n), notes
- [ ] Baseline number recorded in `metrics/outcome.md`
- [ ] Phase 3 O4 target set jointly with Maestro team

---

# Epic E — Picasso/BASE AI Benchmark (PF-2030)

**Goal.** Quantify the program's AI-DX value via a head-to-head H/A1/A2 measurement on 5 Staff Portal pages. The **A1 → A2 lift** is the program's most user-visible deliverable. Filed as its own epic (not under AIC or Figma) because the lift is jointly produced by Agent Experience artifacts (Epic B) + Figma artifacts (Epic C); attributing it to either parent track alone would mis-credit the contribution.

**Track exit criteria.** 5 pages selected and component-set extracted. Measurement protocol committed. H/A1/A2 numbers published with % lift per metric. Final A2 re-run at end of Phase 2 confirms lift held. Pilot engineer sentiment survey published.

---

### [PF-1998](https://toptal-core.atlassian.net/browse/PF-1998) — Select 5 Staff Portal pages + extract Picasso components

**Effort:** 1-1.5d · **Phase:** 1 · **Owner:** Eng B
**Blocks:** PF-2005, PF-2006, PF-2007, PF-2001, PF-2000

Pick 5 Staff Portal pages with shipped implementations *and* Figma design specs. Extract the Picasso component set used (typically 12-18 components, mostly Tier 1/2 primitives). Hand off the component set to PF-2000 (measurement runs), PF-2005 (Code Connect), PF-2006 (BASE), PF-2001 (docs polish).

**Acceptance criteria:**
- [ ] 5 Staff Portal pages selected covering forms, layouts, data-display, navigation, feedback patterns; rationale published as `pilot/5-pages.md`
- [ ] Each page has both a shipped implementation (file path) and a Figma spec link
- [ ] Picasso components used in those 5 pages extracted; published as `pilot/component-set.md`
- [ ] Any 5-page component without a clean BASE counterpart flagged
- [ ] Selection signed off by Vedran + designer

---

### [PF-2000](https://toptal-core.atlassian.net/browse/PF-2000) — Collect measurements (harness + baseline)

**Effort:** 3-5d · **Phase:** 1 + 2 + 3 (multiple measurement runs) · **Owner:** Eng B (designer scores M5)
**Blocked by:** PF-1998 (component-set), PF-2005 + PF-1997 + PF-2001 (for A2 run); PF-2027 + PF-2009 (for final A2 re-run)

Owns the entire measurement chain: protocol authoring + 3-condition runner + scoring rubric M1-M5 + reporting templates, then executes baseline H + A1 + A2 + final A2 re-run + pilot engineer sentiment survey.

**Three conditions:**
- **H** — score the existing human implementation against the Figma spec (the ceiling)
- **A1** — AI agent + Figma MCP, **without** Code Connect, **without** Picasso Agent Experience
- **A2** — AI agent + Code Connect (PF-2005) + Agent Experience (PF-1997 + PF-2001)

**M1-M5 metrics:**
- M1 Component accuracy — `bin/score-component.ts` (ts-morph)
- M2 Prop accuracy — `bin/score-props.ts` (per-element diff + synonym tolerance)
- M3 Token fidelity — `bin/score-tokens.ts` (token allowlist scan)
- M4 Visual fidelity — `bin/score-visual.ts` (Happo wrapper)
- M5 Brand fidelity — designer rubric (0-5 across colors / typography / spacing / component choice / overall Toptal-ness)

**Acceptance criteria:**
- [ ] Protocol committed: `pilot/protocol.md`, scoring scripts, runner, reporting templates
- [ ] Baseline H run + scores → `pilot/runs/h/`
- [ ] Baseline A1 run + scores → `pilot/runs/a1/`
- [ ] `pilot/reports/baseline-pre-pipeline.md` published comparing H vs A1
- [ ] A2 baseline run + scores → `pilot/runs/a2-mid/`
- [ ] `pilot/reports/post-pipeline.md` published comparing H / A1 / A2 with % lift per metric
- [ ] Final A2 re-run after PF-2001 + PF-2027 + PF-2009 land → `pilot/runs/a2-final/`; validates lift held
- [ ] Pilot engineer sentiment survey run; results published
- [ ] No cherry-picking; raw output committed under `pilot/runs/` for every condition

---

# Cross-track dependency map

The dependencies that cross epic boundaries — most worth watching in Jira link views:

- **PF-1998** → PF-2005, PF-2006, PF-2007, PF-2001, PF-2000 — 5-page component-set is the working scope for Phase 1 Figma + AIC + Benchmark work
- **PF-1992** + **PF-1993** → PF-1994 — migration plan + pnpm are prereqs for Tier 1
- **PF-1994** → PF-2020, PF-2021, PF-2022 — sibling-package migrations need Tier 1 primitives
- **PF-2025** + **PF-2020** + **PF-2021** + **PF-2022** → PF-2023 — picasso-provider canary runs LAST
- **PF-2005** → PF-2006 — Code Connect generator + Figma MCP setup is prereq for Designer's BASE audit
- **PF-1997** + **PF-2005** + **PF-2001 (5-page polish)** → PF-2000 A2 — A2 baseline needs the full pipeline live
- **PF-2001** → PF-2008 — Figma Make guidelines reuse component docs
- **PF-2001** → PF-2027 — Picasso component docs are the input for BASE audit on remaining ~60
- **PF-2027** → PF-2009 — BASE alignment for remaining ~60 must close before Code Connect swarm
- **PF-2011** → PF-2012a/b/c (sub-tickets) — Maestro PoC informs production split
- **PF-1995** + **PF-2023** → PF-1996 — Staff Portal migration uses the AI prompt + canary'd provider
- **PF-2001** + **PF-2026** → PF-2003 — npm distribution ships polished docs + Skills

---

## Status as of 2026-04-30

- **PF-1988 (Modernization)** — In Progress (PF-1993 pnpm migration in flight)
- **PF-1989 (Picasso Agent Experience)** — To Do
- **PF-1990 (Figma Design-to-Code)** — To Do
- **PF-1991 (Maestro Integration)** — To Do
- **PF-2030 (Picasso/BASE AI Benchmark)** — To Do
- All 28 stories sit at Backlog or To Do, except PF-1993 (In Progress)

---

## Reference

- [PI-4318 in Jira](https://toptal-core.atlassian.net/browse/PI-4318) — source of truth for ticket structure
- [PI-4318-estimates_final.md](./PI-4318-estimates_final.md) — per-track effort breakdown + assumptions
- [PI-4318-timeline_final.md](./PI-4318-timeline_final.md) — calendar, engineer schedules, Mermaid Gantt, critical path
- [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md) — PF-1992 deep dive (~600 lines)
- [PI-4318-phases.md](./PI-4318-phases.md) — measurement harness specification (M1-M5 metrics)
- [PI-4318-ai-leverage-tickets.md](./PI-4318-ai-leverage-tickets.md) — autonomous orchestrator + agentic generator + AI audit script specs
