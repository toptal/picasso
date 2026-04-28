# PI-4318 — Picasso Modernization + AI DX: Phase Proposal

**Purpose:** Working document mirroring the phase structure in [PI-4318](https://toptal-core.atlassian.net/browse/PI-4318), enriched with exit gates, metrics, and measurement implementation. Stories are defined in [PI-4318-tickets.md](./PI-4318-tickets.md).

**Four tracks:** Modernization · Agent Experience · Figma Design-to-Code · Maestro Integration
**Structure:** All 4 tracks run in parallel within each phase.
**Gate:** Phase 1 is a gated pilot. Go/No-Go at end of Phase 1 decides whether Phase 2+3 are funded.

---

## Shape at a Glance

```
PHASE 0 — EXPLORATORY     PHASE 1 — PILOT (GATED)          PHASE 2 — EXECUTE             PHASE 3 — ROLLOUT
Exploration               Prove Figma MCP + Code Connect   Modernization execution +    Consumer app migration +
                          + Agent Experience = good code   full AI/Figma coverage +     org-wide Agent Experience +
                                                           Maestro integration          Maestro at scale
~done                     ~3 weeks                         ~6-8 weeks                   ~4-6 weeks
                          (+ parallel non-gating prep)     (after GO gate)
```

---

## Phase 0 — Exploratory (DONE / in progress)

Initial exploration of ideas and directions to understand possibilities, risks and value for the PI.

| Track | Task | Outcome |
|---|---|---|
| **Modernization** | Validate can we automate migration with AI agent | Migrated Button & Switch using only Codex agent with [prompt](https://github.com/toptal/picasso/pull/4906) |
| **Agent Experience** | LLM index for Picasso | Created parser for parsing storybook into markdown for AI — [result](https://toptal.github.io/picasso/llm-docs/llms.txt) |
| | `.picasso` directory similar to Lovable | Draft version of rules and `/.picasso` for projects (similar to [.lovable](https://docs.lovable.dev/features/design-systems#lovable-folder-structure)) based on above LLM index |
| | Adopt in our project | Added to [TopAssessment project](https://github.com/toptal/top-assessment-frontend/tree/master/docs/picasso) |
| **Figma Design-to-Code** | Evaluate Figma Make | Tried Figma Make with instructions to use BASE product library |
| | Evaluate Code Connect | Connected one component between Figma Product Library and Picasso |
| **Maestro Integration** | Integrate Picasso | Created Picasso project in Maestro — [maestro-prototype-builder](https://github.com/toptal/maestro-prototype-builder) |
| | Integrate Figma | Explored idea to add Figma Middleware CLI to avoid using Figma MCP |

---

## Phase 1 — Pilot (GATED) — ~3 weeks

**Pilot goal (single sentence):** Prove that Picasso + sufficient Agent Experience + Code Connect + Figma MCP lets an AI agent produce great, brand-accurate Picasso frontend implementations from Figma designs.

**Team:** ~1 engineer + 1 DS designer (part-time) on the pilot. Non-gating items picked up by Vedran / existing owners where bandwidth exists, best-effort.

### Phase 1 — Gated scope

| Track | Task | Outcome |
|---|---|---|
| **Agent Experience** | Optimize LLM index and `.picasso` folder | Decrease size. Increase usability for AI agent. |
| | Select top 20 components by real-world usage frequency | Understand what are 20 most used components (mined from 23 active repos; reuse Phase 0 Storybook parser). |
| | Extract patterns from existing usage of Picasso | Extract patterns usage and snippets from Portal apps; feeds rules / docs. |
| | Collect measurements | Component accuracy · Prop accuracy · Time-to-UI · Visual diff (Figma vs implementation). Covers both Week-1 baseline and Week-3 gate runs. |
| **Figma Design-to-Code** | Cover BASE Design System and Picasso with Code Connect | Focus on 20 most used components. |
| | Update BASE Design System design specification gaps | Names, specification of props. Align with Code Connect parser. |
| | Verify design token mapping between BASE and Picasso | Colors, spacing, typography traceable end-to-end — without it, AI outputs drift visually even when Code Connect is wired correctly. |

### Phase 1 — Secondary parallel scope

Preparation for full scope execution in Phase 2. Runs alongside the pilot, does not count toward the gate, must not delay it.

| Track | Task | Scope |
|---|---|---|
| **Modernization** | Create migration plan for AI migration | Defined scope of migration to Base UI and Tailwind · Top-level plan + plan per component · Defined testbed setup · Defined plan and prompt for AI migration. |
| | Migrate Picasso to pnpm | Follow pnpm migration tutorial to migrate Picasso to pnpm. Prerequisite for Tailwind 4; co-dependent with PI-4278. |
| **Maestro Integration** | Implement PoC of Figma Middleware based on API | Make working PoC and use it for implementing AI-assisted frontend as Figma Middleware. |

### Phase 1 Exit Gate (Go / No-Go)

Measured only against the **gated scope** above, using the fixed reference set R1 + R2 (see Metrics section):

- AI picks correct Picasso component (M1): **>85%**
- AI sets correct props from Figma design (M2): **>75%**
- Design token fidelity (M3): measurable lift over baseline
- Visual fidelity Happo diff (M4): measurable lift over baseline
- Brand-fidelity score (M5 = O3): measurable lift on same 3 designs after Code Connect + Agent Experience
- Time-to-UI (M6): 50%+ reduction on reference screens
- Pilot engineer sentiment (M9): ≥4/5 median; "would keep using"

**Outcomes:**
- **GO** — pilot hypothesis proven → fund Phase 2 + 3.
- **ADJUST** — close but gaps → extend 2-3 weeks.
- **NO-GO** — hypothesis not proven → stop the AI pipeline investment, reassess (Option C / alternative approaches). Modernization may still proceed independently since it's justified by tech debt alone.

---

## Phase 2 — Execute — ~6-8 weeks (post-gate)

**Goal:** Execute on everything that was validated in Phase 1 and scope-prepared in parallel: start Modernization for real, finish Figma/Agent Experience coverage across the whole library, and land Maestro integration.

**Team:** scales to 2-3 engineers + 1 DS designer + Maestro collaborator.

| Track | Task | Outcome |
|---|---|---|
| **Modernization** | Migrate `packages/base/*` components | All base primitives on Base UI + Tailwind · Minimal breaking changes · Per-component DoD: Happo baseline unchanged, Jest + Cypress green, React 19 smoke-tested, Storybook updated, `.figma.tsx` still valid. |
| | Migrate sibling packages (`picasso-charts`, `picasso-query-builder`, `picasso-rich-text-editor`) | All consumer-facing sibling packages on Base UI + Tailwind — same per-component DoD. |
| | Decommission `@toptal/picasso-provider` MUI v4 runtime | Theme runtime fully Tailwind-based · `@material-ui/core` peer dep removed from root · canary Portal app green. |
| | Define product migration plans | AI-assisted migration of products to new Picasso · Codemods for breaking changes. |
| **Agent Experience** | Full scope documentation for Picasso components | API · Extracted snippets · Storybook · Optimized for AI · Skills development (`picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`). |
| **Figma Design-to-Code** | Define Figma Make guidelines and project template | Private npm registry for `@toptal` scope, guidelines folder, template published org-wide. |
| | Code Connect for all components | Remaining 55 components (after top 20 in Phase 1) → 75/75 coverage. |
| **Maestro Integration** | Implement Figma Middleware based on PoC | Production version replacing Figma MCP on the Maestro path. |
| | Audit Maestro for Picasso UI generation | Baseline inventory of Maestro projects (input for O4 Phase 3 target). |

---

## Phase 3 — Rollout — ~4-6 weeks

**Goal:** Migrate the 23 actively developed consumer repos to modern Picasso, roll Agent Experience org-wide, and land Maestro integration at scale.

**Team:** 2-3 engineers + 1 DS designer + rotating repo owners.

| Track | Task | Outcome |
|---|---|---|
| **Modernization** | Migrate Portal apps | platform, client-portal, staff-portal, hire-global, client-signup, talent-portal, screening-wizard — on modernized Picasso. |
| | Migrate other important projects | testing-platform, tracker-front, topteam, top-scheduler + remaining active apps (to reach 23/23). |
| **Agent Experience** | Adopt Picasso rules to all Picasso repos | `.cursorrules` / `CLAUDE.md` / `.picasso` wired into all 23 active repos. |
| | Implement distribution channel for Picasso Agent Experience and rules | Package or registry (e.g., `@toptal/picasso-agent-experience`) with versioning. |
| | Collect feedback from teams and projects | Feedback channel + iteration loop on docs/rules/Skills. |
| **Figma Design-to-Code** | Onboard designers to BASE and Figma Make | Designer onboarding session + quick-start doc for the org-wide Figma Make template. |
| **Maestro Integration** | Onboarding to Maestro | Enablement sessions, quick-start guide, docs updated for Maestro users. |
| | Maestro using Picasso as default for new projects | Configuration + registry entry + default template change; adoption tracked. |

### Phase 3 Exit Criteria

- 23/23 actively developed repos on modern Picasso (O5)
- 0 deprecated/unmaintained deps in Picasso (O1)
- React 19 adoption unblocked org-wide (O2)
- Maestro adoption target hit (O4 — set with Maestro team at end of Phase 2)
- Brand-fidelity lift (O3 / M5) maintained vs Phase 1 post-pipeline baseline

---

## Metrics, Measurement & Implementation

**Primary focus:** measuring how well the pipeline `Figma design spec → (Figma MCP + Code Connect + BASE + AI agent) → Picasso FE code` actually works. Every other metric (repos migrated, deps removed, React 19 unblocked) is a prerequisite; this is the one that tells us whether the investment paid off.

### What we're measuring (the pipeline under test)

```
     INPUT                      PIPELINE                              OUTPUT                  WHAT WE SCORE
     ─────                      ────────                              ──────                  ─────────────

  Figma design  ─────▶  Figma MCP reads design               ─────▶  Picasso React code ─▶  • Correct component?
  (BASE lib)            Code Connect returns snippet                 (imports + props +     • Correct props?
                        Agent Experience (llms.txt, .picasso,        layout + tokens)       • Tokens used?
                        Skills) resolves patterns                                           • Visual fidelity
                        AI agent generates code                                             • Time to result
```

The harness scores the output without the engineer writing business logic — we want to measure the translation layer (Figma → code), not the integration layer.

### Outcome metrics — PI-level (O1–O5)

These are the strategic commitments from the PI-4318 Impact table. They roll up from the pipeline metrics below: **M1–M12 are the operational signals that de-risk O1–O5**. O3 is realized by M5.

| # | Metric | Baseline | Target | How measured | Owner | Cadence |
|---|---|---|---|---|---|---|
| O1 | **Deprecated/unmaintained deps in Picasso** | MUI v4 + JSS (critical) | 0 | Package audit | Modernization lead | End of Phase 2 + Phase 3 exit |
| O2 | **React 19 adoption** | Blocked | Unblocked org-wide | Org-wide React version audit | Modernization lead | Phase 2 validation + Phase 3 exit |
| O3 | **AI-generated UI matches Toptal design language (Picasso brand fidelity)** | Pilot wk1 baseline: designer scores AI output (from a canonical prompt) on 3 reference Figma designs with **no** Code Connect / **no** Agent Experience, using fixed rubric (colors, typography, spacing, component choice, overall "does this look like Toptal") | Measurable lift on the same 3 designs after Code Connect + Agent Experience. Threshold set from baseline. | Same 3 Figma designs, same prompts, pre and post. Scored by designer using fixed rubric. **Implemented by M5.** | designer | Pilot wk1 + wk3, re-run each phase exit |
| O4 | **Maestro projects generating Picasso UI** | 0 (baseline audit) | TBD — set with Maestro team | Maestro project audit | Maestro collaborator | Phase 2 baseline + Phase 3 exit |
| O5 | **Repos migrated to modern Picasso** | 0/39 (23 actively developed) | 23/23 actively developed | Migration tracker (per-wave) | Modernization lead | Per Phase 3 wave |

### Pipeline metrics — pilot-level (M1–M12)

M1–M9 score the pipeline's output quality on each reference design. M10–M12 track the health of the pipeline itself. These are what the harness actually runs.

| # | Metric | Definition | Target (Phase 1 gate) | How measured | Owner | Cadence |
|---|---|---|---|---|---|---|
| M1 | **Component accuracy** | Of components identifiable in the Figma design, % the AI resolves to the correct Picasso component | >85% | Manual rubric over reference set; AI output compared to designer's ground-truth mapping | Pilot engineer + designer | Pilot wk1 (baseline) + wk3 (post) |
| M2 | **Prop accuracy** | % of props set correctly from the Figma design without manual correction (variant, size, color, state, disabled, etc.) | >75% | Per-component prop diff vs ground truth | Pilot engineer + designer | Pilot wk1 + wk3 |
| M3 | **Design token fidelity** | % of color / spacing / typography usages that match the design's BASE tokens (no drift to hex/px literals) | Baseline + measurable lift | Regex/AST scan of generated code + manual token audit | Pilot engineer | Pilot wk1 + wk3, then each phase |
| M4 | **Visual fidelity (Happo diff)** | Pixel diff % between AI-generated output rendered in Storybook vs Figma export | Baseline + measurable lift | Happo visual regression on the reference set screens | Pilot engineer | Pilot wk1 + wk3 |
| M5 | **Brand-fidelity score** (implements O3) | Rubric score (0-5 each on colors, typography, spacing, component choice, overall Toptal-ness) | Measurable lift over baseline | designer scores the 3 reference designs pre- and post-pipeline using fixed rubric | designer | Pilot wk1 + wk3, then each phase |
| M6 | **Time-to-UI** | Minutes from "here's the Figma link" to a working visual scaffold for a given screen | 50%+ reduction vs baseline | Stopwatch on same engineer, same screen, with vs without pipeline | Pilot engineer | Pilot wk1 + wk3 |
| M7 | **Code quality (compiles, lints, imports)** | % of AI outputs that compile + pass `eslint` + import only real Picasso exports on first try | >90% | CI check against generated output | Pilot engineer | Pilot wk3, continuous in Phase 2 |
| M8 | **Manual correction size** | LOC changed between AI output and merged PR (excluding business logic) | Baseline + measurable drop | Git diff between first AI commit and merge commit, business logic annotated and excluded | Pilot engineer | Pilot wk3, each phase |
| M9 | **Pilot engineer sentiment** | Qualitative + 1-5 "keep using it?" score | ≥4/5 median; "would keep using" from all pilot engineers | End-of-pilot survey + interview | Vedran | End of pilot wk3, end of Phase 2 |
| M10 | **Code Connect coverage** | % of top-20 (Phase 1) / all 75 (Phase 2) Picasso components with a working `.figma.tsx` verified in Dev Mode + via MCP | 20/20 (Phase 1), 75/75 (Phase 2) | Script iterates `.figma.tsx` files, validates against live Picasso API + Figma Dev Mode | Pilot engineer | Weekly |
| M11 | **Agent Experience coverage** | % of top-20 (Phase 1) / 75 (Phase 2) components with complete docs + correct `.picasso/` rules | 20/20 (Phase 1), 75/75 (Phase 2) | Automated check against component list | Pilot engineer | Weekly |
| M12 | **Code Connect drift rate** (Phase 2+) | # of `.figma.tsx` files broken by a Picasso PR | 0 merged with drift | CI check fails PR if `.figma.tsx` invalid | Design system team | Continuous |

### Reference inputs

All measurement runs use a **fixed reference set** so numbers are comparable across time and across the gate.

| Input | Description | Who supplies | When |
|---|---|---|---|
| **Reference design set (R1)** | 3 Figma designs covering: (a) simple form, (b) data-dense layout, (c) composite page with navigation + content. Each design uses only BASE components from top-20. | designer | Before pilot wk1 |
| **Extended design set (R2)** | 2 additional designs with edge cases: conditional sections, responsive, patterns not yet in top-20 | designer | Before pilot wk2 |
| **Ground-truth mapping** | For each reference design: the correct component + correct props, agreed in writing by engineer + designer | Pilot engineer + designer | Before wk1 baseline |
| **Canonical prompts** | 2-3 reference prompts (short / verbose / Figma-link-only) used by all pilot engineers on all reference designs | Pilot engineer | Before wk1 baseline |
| **AI tool scope** | Named tools the pilot measures against (e.g., Cursor + Claude Code). Fixed for the duration of the pilot. | Vedran | Before wk1 |

### Measurement harness — implementation

The harness is a small internal tool + a set of workflows. It's built in Phase 1 as part of the "Collect measurements" gating task and reused across every phase.

Components to build in Phase 1:

1. **Reference-set repo** — a small private repo holding the Figma design files (or links), ground-truth mappings (JSON), canonical prompts, and expected code outputs.
2. **Runner** — a script that, given a reference design and a prompt, invokes the AI agent (Cursor/Claude Code CLI) with and without the pipeline, captures the generated code, and stores it under `runs/<date>/<design>/<config>/`.
3. **Scoring scripts**
   - `score-component.ts` — AST parse generated code, extract Picasso imports + elements, diff against ground-truth mapping → M1.
   - `score-props.ts` — per-element prop diff → M2.
   - `score-tokens.ts` — scan for token usage vs raw values → M3.
   - `score-lint.ts` — run TypeScript + eslint on generated code → M7.
4. **Visual diff** — render generated code in Storybook, snapshot via Happo, diff against Figma export → M4.
5. **Rubric form** — Google Sheet / Notion template designer fills in per design → M5.
6. **Timing tracker** — a thin wrapper the engineer runs (`pnpm pilot:time start|stop`) that logs wall-clock time per screen → M6.
7. **Aggregator** — `pnpm pilot:report` produces a markdown report for the current date, with every metric + links to raw runs. Used at the Go/No-Go gate.

Everything above lives in a `picasso-pilot-harness` folder — can graduate to an internal package later if useful.

### Measurement cadence & checkpoints

| Phase | When | What runs | Output |
|---|---|---|---|
| Phase 1 wk1 | Day 1-2 | **Baseline measurement.** Reference set R1, no Code Connect, no Agent Experience. Full rubric applied. | Baseline report (markdown) |
| Phase 1 wk2 | Mid-pilot | Rolling runs as pipeline comes online — internal team use. Not gating. | Dashboard snapshot |
| Phase 1 wk3 | Final 2 days | **Gate measurement.** Reference set R1 + R2, full pipeline. Full rubric applied. Engineer sentiment survey. | Gate report (markdown) → Go/No-Go meeting |
| Phase 2 | End of each week | Rolling runs against R1 + R2 + expanding real-screen set as more components are covered | Weekly dashboard |
| Phase 2 exit | Last week | Re-run full rubric on R1 + R2 with all 75 components and all Skills live | Phase 2 report |
| Phase 3 | Per wave | Post-migration: re-run brand-fidelity on 1-2 migrated-app screens to confirm no regression from Phase 1 numbers | Per-wave report |
| Phase 3 exit | Final week | Final rubric pass + PI-level impact-table update | PI final report |

### Ownership

| Role | Responsibility |
|---|---|
| **Pilot engineer** | Builds and runs the harness, produces weekly reports, owns M1-M4, M6, M7, M8, M10, M11 |
| **designer (DS designer)** | Supplies R1/R2, owns ground-truth mappings, owns M5 (→ O3), reviews M1-M2 scoring |
| **Vedran (project lead)** | Owns M9 (sentiment), chairs Go/No-Go gate, signs off on reports |
| **Modernization lead** | Owns O1 (deprecated deps), O2 (React 19), O5 (repos migrated) — reports at each phase exit |
| **Maestro collaborator** | Owns O4 (Maestro projects generating Picasso UI) — Phase 2 baseline + Phase 3 exit |
| **DS team (post-Phase 2)** | Takes over M12 (drift) and ongoing M10 maintenance |

### Anti-patterns to avoid (explicit)

- **Don't score with the same engineer writing the ground truth.** Separate the person who authored the reference prompt from the person who scores the output.
- **Don't score cherry-picked runs.** All runs go into `runs/`; the report reads from there, not from hand-picked successes.
- **Don't re-run until green.** Each reference design gets one scored run per configuration per measurement point. Re-running is its own signal and is logged separately.
- **Don't slip the reference set during Phase 1.** R1 and R2 are frozen at wk2 so baseline and gate measurement are comparable.

---

## Dependencies & Open Questions

| Item | Owner | Note |
|---|---|---|
| Design system consolidation decision ("1 design system, 1 UI kit") [TBC: timing] | Design Systems / Leadership (Paul, designer) | Timing TBC |
| Tailwind 4 availability (via PNPM migration) | Platform Foundation (Vedran) | Scoped + executed in Phase 1 non-gating prep; co-dependent with PI-4278 |
| BASE Design System specification gaps | Design Systems (designer) | Surfaced in Phase 1 Figma gating; updates must land before broad Code Connect coverage in Phase 2 |
| "Default design library" definition in Maestro | Maestro team | Clarifies Phase 2 Maestro scope |
| Team allocation beyond Vedran + designer | TBD | Needed before Phase 2 gate |

**This PI blocks:**
- React 19 adoption across all Toptal frontend products
- AI-assisted UI development for frontend teams
- Maestro design library standardization (Picasso as default for AI-generated code)

---

## Open decisions for this working session

1. **Phase 1 Figma scope note** — PI ticket's "Update BASE Design System design specification gaps" implies we're actually updating BASE (not just auditing). Confirm designer/designer will own the BASE updates with Phase 1 timing.
2. **Canonical prompt + AI tool scope** — not explicitly called out in PI ticket tasks but needed by "Collect measurements" to be reproducible. Kept in the metrics section.
3. **Phase 2 duration** — 6-8 weeks realistic given migration + full docs + Figma Make template + Maestro middleware happen in parallel?
4. **Phase 3 wave grouping** — PI ticket just has "Migrate Portal apps" + "Migrate other important projects". Do we still want to sequence them as waves for risk management, or one big batch per task?
5. **Secondary parallel scope** — PI ticket dropped AI-budget estimate and Maestro-alternatives research. Confirm we don't need them (or absorb into existing tasks).
