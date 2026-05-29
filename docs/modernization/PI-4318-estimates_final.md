# PI-4318 — Effort Estimates (Final)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Last updated:** 2026-04-30
**Audience:** Project manager, sponsors, track leads. Source of truth for Jira validation and weekly progress check-ins.
**Companion doc:** [PI-4318-timeline_final.md](./PI-4318-timeline_final.md) for the calendar.

---

## At a glance

| | |
|---|---|
| **Total program effort** | **80 – 123 man-days** (Toptal portfolio size: **M**) |
| With +15% coordination overhead | 92 – 141 man-days |
| Story count | 28 Jira tickets across 5 epics |
| Out-of-scope tickets | 3 (P3-MOD-02, P3-MAE-01, P3-MAE-02) |
| Largest single ticket | PF-2027 (BASE remaining ~60), 7-10d, mostly designer time |

**Three Phase-3 stories are explicitly excluded from PI scope** — see [Out-of-scope tickets](#out-of-scope-tickets) below.

**Calendar:** Program runs **May 4 → ~Jul 16, 2026** (~10.5 weeks) with 3-engineer collaboration on the Maestro production tail. See [PI-4318-timeline_final.md](./PI-4318-timeline_final.md) for the calendar. Excluded work is delegated to consumer teams (other-repo migrations) or deferred to post-PI (Maestro adoption).

---

## Scope by track

| Epic | Track | Stories | Man-days | Toptal size |
|---|---|---|---|---|
| [PF-1988](https://toptal-core.atlassian.net/browse/PF-1988) | Modernization | 11 | 38 – 58 | S |
| [PF-1989](https://toptal-core.atlassian.net/browse/PF-1989) | Agent Experience | 6 | 8.5 – 15.5 | S |
| [PF-1990](https://toptal-core.atlassian.net/browse/PF-1990) | Figma Design-to-Code | 6 | 19.5 – 28 | S |
| [PF-1991](https://toptal-core.atlassian.net/browse/PF-1991) | Maestro Integration | 3 | 9 – 14 | XS (BAU) — split across A+B+C |
| [PF-2030](https://toptal-core.atlassian.net/browse/PF-2030) | Picasso/BASE AI Benchmark | 2 | 5 – 7.5 | XS (BAU) |
| | **Total** | **28** | **80 – 123** | **M** |

---

## Modernization track — PF-1988 (11 stories)

Migrate Picasso from **MUI v4 (`@material-ui/core` 4.12.4) + `@mui/base` + JSS** to **`@base-ui/react` v1.4.1 ([base-ui.com](https://base-ui.com/react/overview/quick-start), stable since Dec 2025) + Tailwind 4**. Tier inventory grounded in May 2026 source-stack re-audit (full breakdown in [migration plan §3](./PI-4318-P1-MOD-01-migration-plan.md#3-tier-inventory-v3--may-2026-re-audit)):

- **Heavy path** (full rewrite — MUI v4 + JSS → `@base-ui/react` + Tailwind): 8 base/* components (5 Tier 2 + 3 Tier 3) + 4 sibling packages + provider runtime. Per-component cost ~0.5-2d depending on tier.
- **Light path** (package swap + API alignment — `@mui/base` → `@base-ui/react`): 8 base/* components (Tier 0) + OutlinedInput mixed-state PR (bundled with Tier 3). Tailwind already in place. Per-component cost ~0.25-0.5d (calibrated against PR #4906).
- **Cleanup-only** (peer-dep + React 19 cap + type-only import replacement): 11 components (Tier 1 — 5 already-clean + 5 with type-only/trivial fixes + Menu pkg cleanup; Utils included). ~0.1d each.

The autonomous orchestrator (built in PF-1992) does the bulk of per-component rewrites on both paths; engineers review PRs.

| Jira | Summary | Man-days |
|---|---|---|
| [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) | Migration plan + autonomous-loop infrastructure | 4 – 5 |
| [PF-1993](https://toptal-core.atlassian.net/browse/PF-1993) | Migrate Picasso to pnpm | 3 – 5 |
| [PF-1994](https://toptal-core.atlassian.net/browse/PF-1994) | base/* Tier 1 cleanup (11 components) + Tier 0 light-path batch (8 components) — autonomous | 3 – 5 |
| [PF-2024](https://toptal-core.atlassian.net/browse/PF-2024) | base/* Tier 2 heavy migration (5 components — Checkbox, Radio, Tooltip, FileInput, Popper) — autonomous | 4 – 7 |
| [PF-2025](https://toptal-core.atlassian.net/browse/PF-2025) | base/* Tier 3 composite migration (3 — Accordion, Dropdown, Page) + OutlinedInput mixed-state | 5 – 7 |
| [PF-2020](https://toptal-core.atlassian.net/browse/PF-2020) | picasso-charts (LineChart) — autonomous | 1 – 2 |
| [PF-2021](https://toptal-core.atlassian.net/browse/PF-2021) | picasso-query-builder (11 components) — autonomous | 4 – 6 |
| [PF-2022](https://toptal-core.atlassian.net/browse/PF-2022) | picasso-rich-text-editor (8 components) — autonomous + Lexical theme rewrite | 5 – 7 |
| [PF-2023](https://toptal-core.atlassian.net/browse/PF-2023) | picasso-provider canary — system rewrite, removes root MUI v4 peer-dep + sweeps ~50 transitive consumers | 6 – 9 |
| [PF-1995](https://toptal-core.atlassian.net/browse/PF-1995) | AI-assisted consumer migration prompt + worked examples | 1.5 – 2.5 |
| [PF-1996](https://toptal-core.atlassian.net/browse/PF-1996) | Migrate Staff Portal to modernized Picasso (canary) | 2 – 3 |
| **Track total** | | **38 – 58 (S)** |

**Tier inventory** (per [migration plan §3](./PI-4318-P1-MOD-01-migration-plan.md#3-tier-inventory-v3--may-2026-re-audit)):

- **Tier 0** (light path, 8): Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs. Direct `@base-ui/react` matches except Backdrop (no standalone primitive — see §9.8) and Badge (keep custom).
- **Tier 1** (cleanup-only, 11): 5 already-clean (Form, FormLayout, ModalContext, Note, Typography) + 5 type-only/trivial fixes (Container, FormLabel, Grid, Notification, Menu pkg) + Utils (replace 2 small re-exports + 1 Tailwind transition).
- **Tier 2** (heavy, 5): Checkbox, Radio, Tooltip, FileInput, Popper. Real MUI v4 + JSS rewrites. Targets: `@base-ui/react/checkbox` + `/checkbox-group`, `/radio`, `/tooltip`. FileInput stays custom. **Popper architectural decision** (Floating-UI vs `@base-ui/react/popover`) per migration plan §9.8.
- **Tier 3** (heavy composites, 3 + OutlinedInput): Accordion (`@base-ui/react/accordion`), Dropdown (mixed-state — `@base-ui/react/menu` + `@base-ui/react/popover`), Page (keep custom — pure Tailwind), OutlinedInput mixed-state PR.
- **Tier 4** (sibling packages, 4): picasso-charts, picasso-query-builder, picasso-rich-text-editor (+ provider in Tier 5).
- **Tier 5** (provider canary): picasso-provider system rewrite, final commit removes root MUI v4 peer-dep + sweeps ~50 transitive-consumer base/* packages (peer-dep cleanup only).

**v3 reclassification (May 2026 re-audit):** FormLabel, Container, Grid, Notification, Utils were previously listed as Tier 2 heavy migrations but only have type-only or trivial re-export imports of MUI v4. Reclassified to Tier 1 cleanup. Page reclassified from Tier 2 to Tier 3 (high-surface composite consuming most of base/*). Net effect: PF-2024 narrows from 9 to 5 truly-heavy components but range preserved (4-7d) for Popper architectural decision and Tooltip viability headroom.

**Track exit criteria.** Zero `@material-ui/core`, zero `@mui/base`, and zero JSS imports inside Picasso. All components on `@base-ui/react` + Tailwind. Root `@material-ui/core` peer-dep removed from `packages/picasso/package.json`. React 19 validated. Staff Portal migrated as the canary.

---

## Agent Experience track — PF-1989 (6 stories)

Optimized `llms.txt`, `.picasso/` rules v2, polished component docs, Skills, npm-bundled distribution.

| Jira | Summary | Man-days |
|---|---|---|
| [PF-1997](https://toptal-core.atlassian.net/browse/PF-1997) | Optimize LLM index + `.picasso/` v2; produces lean Storybook-derived component docs | 1.5 – 2.5 |
| [PF-1999](https://toptal-core.atlassian.net/browse/PF-1999) | Extract usage patterns; merge into `.picasso/` rules | 1.5 – 2.5 |
| [PF-2001](https://toptal-core.atlassian.net/browse/PF-2001) | Polish and Review component-level AI documentation (two phases: 5-page subset Phase 1 + remaining ~60 + tokens + `llms-full.txt` + designer review Phase 2) | 2 – 3.5 |
| [PF-2026](https://toptal-core.atlassian.net/browse/PF-2026) | Picasso Skills package (4 Skills) | 2 – 4 |
| [PF-2002](https://toptal-core.atlassian.net/browse/PF-2002) | Adopt Picasso rules in Staff Portal | 0.5 – 1.5 |
| [PF-2003](https://toptal-core.atlassian.net/browse/PF-2003) | Bundle Agent Experience artifacts into `@toptal/picasso` npm package | 1 – 1.5 |
| **Track total** | | **8.5 – 15.5 (S)** |

**Track exit criteria.** 75/75 component docs polished. 4 Skills published. Tokens docs + `llms-full.txt` CI integration live. Staff Portal wired with `.cursorrules` / `CLAUDE.md`. npm distribution live.

---

## Figma Design-to-Code track — PF-1990 (6 stories)

Code Connect coverage 75/75, BASE Design System aligned with Picasso component API, Figma Make template published.

| Jira | Summary | Man-days |
|---|---|---|
| [PF-2005](https://toptal-core.atlassian.net/browse/PF-2005) | Build agentic Code Connect generator + Code Connect for 5-page subset (~12-18 components) | 3 – 4.5 |
| [PF-2006](https://toptal-core.atlassian.net/browse/PF-2006) | Build BASE audit script + BASE spec fixes for 5-page subset | 2.5 – 3.5 |
| [PF-2007](https://toptal-core.atlassian.net/browse/PF-2007) | Verify BASE ↔ Picasso token mapping | 1 – 2 |
| [PF-2008](https://toptal-core.atlassian.net/browse/PF-2008) | Define Figma Make guidelines + project template | 2 – 3 |
| [PF-2027](https://toptal-core.atlassian.net/browse/PF-2027) | BASE spec gaps for remaining ~60 components — reuses audit script | 7 – 10 |
| [PF-2009](https://toptal-core.atlassian.net/browse/PF-2009) | Code Connect for remaining ~60 components — reuses generator | 4 – 5 |
| **Track total** | | **19.5 – 28 (S)** |

**Track exit criteria.** 75/75 Code Connect coverage. M12 drift CI check live. BASE spec aligned across all 75 components. Figma Make template published org-wide.

---

## Maestro Integration track — PF-1991 (3 stories)

Replace Figma MCP on the Maestro path with a production Figma Middleware. Capture O4 adoption baseline. Adoption itself is post-PI.

| Jira | Summary | Man-days |
|---|---|---|
| [PF-2011](https://toptal-core.atlassian.net/browse/PF-2011) | PoC of Figma Middleware (Figma REST API) | 2 – 3 |
| [PF-2012](https://toptal-core.atlassian.net/browse/PF-2012) | Implement Figma Middleware (production) — **split into ~3 sub-tickets after PF-2011 PoC; A+B+C parallel execution** | 6 – 9 |
| [PF-2013](https://toptal-core.atlassian.net/browse/PF-2013) | Audit Maestro for Picasso UI generation (O4 baseline) | 1 – 2 |
| **Track total** | | **9 – 14 (XS)** |

**Track exit criteria.** Production middleware deployed in Maestro's environment with monitoring + error reporting. Migration guide published. At least one Maestro project integrated end-to-end. O4 baseline recorded.

**PF-2012 collaboration model.** After PF-2011 PoC ships (~May 19), the productionization scope gets split into ~3 sub-tickets aligned with engineer skills. Eng A + Eng B + Eng C all contribute in the program-tail window because Eng A wraps the Modernization chain ~Jul 9 and Eng B wraps the AIC chain ~Jul 3. Provisional split:
- **PF-2012a — Eng C lead, ~3-4d effort.** Deployment to Maestro environment, architecture, Figma API integration patterns.
- **PF-2012b — Eng B, ~1-2d effort.** Monitoring + error reporting + migration guide for Maestro consumers.
- **PF-2012c — Eng A, ~2-3d effort.** Maestro project integration end-to-end + production hardening (rate limits, retries).

This collapses Eng C's solo Maestro tail (16 cal d at 50%) into a 2-week 3-engineer collaboration window — program ends ~Jul 16 instead of ~Jul 28.

---

## Picasso/BASE AI Benchmark track — PF-2030 (2 stories)

Quantify the AI-DX value the program delivers. Head-to-head measurement on 5 Staff Portal pages with shipped implementations + Figma specs.

**Three measurement conditions per page:**
- **H** — score the existing human implementation against the Figma spec (the ceiling).
- **A1** — AI agent + Figma MCP, **without** Code Connect, **without** Picasso Agent Experience (baseline AI capability).
- **A2** — AI agent + Code Connect + Agent Experience (post-pipeline).

The **A1 → A2 lift** is the program's headline AI-DX number. The split into its own track reflects that the lift is jointly produced by the Agent Experience (Epic B) and Figma (Epic C) tracks — neither can claim it alone.

| Jira | Summary | Man-days |
|---|---|---|
| [PF-1998](https://toptal-core.atlassian.net/browse/PF-1998) | Select 5 Staff Portal pages + extract Picasso component set | 1 – 1.5 |
| [PF-2000](https://toptal-core.atlassian.net/browse/PF-2000) | Measurement protocol + 3-condition runner + H + A1 + A2 + final A2 re-run + sentiment survey | 4 – 6 |
| **Track total** | | **5 – 7.5 (XS)** |

**Track exit criteria.** Headline measurement published: H / A1 / A2 numbers on 5 Staff Portal pages with % lift per metric (component / prop / token / visual / brand fidelity). Final A2 re-run at end of Phase 2 confirms the lift held after full-scope rollout.

---

## Effort by phase

| Phase | Stories | Man-days |
|---|---|---|
| Phase 1 — Hybrid foundation (5-page baseline + agent infra + initial Code Connect/BASE) | 10 | ~22 – 33 |
| Phase 2 — Modernization scale-up + full-scope coverage + A2 measurement | 16 | ~55 – 84 |
| Phase 3 — Rollout + Maestro production tail (3-engineer collaboration) | 3 | ~3 – 6 |

Phase 2 carries ~70% of total program effort (modernization migrations + full-scope BASE/CC + Skills package + Maestro production).

---

## Calendar realism

These are **engineer-days, not calendar days.** Wall-clock is shaped by:

- **Parallelism across tracks.** Modernization, Agent Experience, Figma, Maestro, and Benchmark run in parallel for most of the program. Cross-track dependencies are bounded — see [timeline_final.md](./PI-4318-timeline_final.md) for the dependency map.
- **Reviewer bottlenecks.** Designer required on the M5 brand-fidelity rubric for PF-2000 (15 runs total: 5 pages × 3 conditions), PF-2001a/b dos/don'ts review, PF-2006 5-page BASE fixes, and PF-2027 remaining ~60 BASE fixes. Modernization migration tickets need only peer code review — pixel-perfect Happo parity is the bar.
- **Modernization serial floor (Eng A's chain).** PF-1992 → PF-1994 → PF-2024 → PF-2025 → PF-2023 → PF-1995 → PF-1996 → PF-2002 → PF-2003 → PF-2008 → PF-2009 → PF-2012c ≈ 30-44 man-days serial on the 100% Eng A track. With autonomous loop running Tier 1/2 in the background, Modernization-chain wraps ~Jul 6 and Eng A then contributes to Maestro production (PF-2012c) Jul 7-9. Eng A wraps fully ~Jul 9.
- **Program-determining chain (Eng C's chain).** Maestro production at the program tail. PF-1993 → PF-2011 → siblings → PF-2009 swarm → PF-2012a (deploy lead) → PF-2013 audit. With PF-2012 split + A+B contributing in parallel on PF-2012b/c, Eng C's chain compresses from ~12 weeks (solo) to ~10.5 weeks. **Program ends ~Jul 16.** The Eng C 100% bump is no longer required to hit a sub-Aug end-date.
- **Coordination overhead.** +15% for PI-level coordination if you need a calendar-realistic envelope.
- **Local Happo runs.** Running Happo locally from a branch (rather than waiting for CI) can compress per-component cycle time another 10-20%; folded into PF-1992 deliverables.

**Wall-clock summary:** ~10.5 weeks (program end ~Jul 16) with the 3-engineer Maestro tail collaboration model. The original Eng C 50% vs 100% lever becomes much less material because Eng A + Eng B contribute on PF-2012 sub-tickets after their primary chains wrap.

---

## Out-of-scope tickets

| Story ID | Summary | Reason |
|---|---|---|
| ~~P3-MOD-02~~ | Migrate other consumer repos to modernized Picasso | Other-team responsibility — they self-serve via the AI migration prompt from PF-1995 |
| ~~P3-MAE-01~~ | Maestro onboarding sessions + quick-start | Deferred to post-PI / Maestro team |
| ~~P3-MAE-02~~ | Maestro defaults to Picasso for new projects | Deferred to post-PI; PI exits at production-middleware-ready, not at adoption-rolled-out |
| ~~PF-2004~~ (P3-AIC-03) | Collect feedback from teams | Deferred to post-PI BAU |
| ~~PF-2010~~ (P3-FIG-01) | Onboard designers to BASE + Figma Make | Deferred to post-PI / design-org channels |

---

## Key assumptions to verify before locking estimates

1. **Local Happo wiring.** Running Happo from a local branch is faster than CI. If easily set up, fold into PF-1992 and re-derive multipliers downward by ~10-20%.
2. **TypeScript upgrade.** Currently TS 4.7. 5.4+ is a Phase 2 prerequisite. Scoped into PF-1992; if needs to split out, add ~2-3d.
3. **`@base-ui/react` vs alternative primitives.** PR #4906 calibrated on `@base-ui/react`. If we switch primitives mid-program for Popper / Tooltip / Grid, add ~1-2d per affected component.
4. **AI agent of choice.** Estimates assume Claude Code. Switching to Codex or other agents shifts costs by ±15%.
5. **Codemod count.** Target 0-3 codemods for PF-1995 (AI prompt replaces the original 8-12 codemod suite). If PF-2023 introduces unexpectedly many API breaks, add ~0.5d per additional codemod.
6. **Designer availability.** If designer's allocation drops below 30% during the M5 scoring window or PF-2001b / PF-2027 review windows, those calendar dates stretch; rest of program is unaffected.
7. **Tier 3 architectural surprises.** Estimates for Page, Accordion, Dropdown assume mechanical JSS parent-ref unwinding. If we hit `PicassoProvider.override` chains we didn't audit, per-component cost can double. Mitigation: front-load `PicassoProvider.override` audit in PF-1992.
8. **PF-2012 sub-ticket split after PF-2011 PoC ships (~May 19).** Confirm scope split for PF-2012a (Eng C deploy lead, ~3-4d), PF-2012b (Eng B monitoring + guide, ~1-2d), PF-2012c (Eng A integration + hardening, ~2-3d). Confirm by ~May 26 so all three engineers can prepare.
9. **Tier 0/1 calibration (post-PF-1994 wrap, ~May 13).** Per-component multipliers for the **light path** are calibrated against PR #4906 (`@mui/base` → `@base-ui/react`, Button + Switch). Multipliers for the **heavy path** (MUI v4 + JSS → `@base-ui/react` + Tailwind) are extrapolated and have higher variance. After Tier 0 + Tier 1 wrap, recalibrate Tier 2 heavy estimates from real data before locking PF-2024/2025 commitments. R12 (Tier 0 multiplier generalisation), R13 (mixed-state Dropdown/OutlinedInput), R14 (Backdrop has no standalone `@base-ui/react` equivalent), and R15 (Popper has no standalone `@base-ui/react` equivalent) are the specific risks to watch. R5 + R8 (`@base-ui/react` API churn) downgraded after migration plan v3 audit confirmed `@base-ui/react` is at stable v1.4.1 (Apr 2026).

---

## Sources

- [PI-4318-tickets-by-track.md](./PI-4318-tickets-by-track.md) — full ticket descriptions, acceptance criteria, dependencies
- [PI-4318-timeline_final.md](./PI-4318-timeline_final.md) — calendar dates, engineer schedules, critical path, Mermaid Gantt
- [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md) — deep dive on the Modernization migration plan and tier inventory
- [PI-4318-phases.md](./PI-4318-phases.md) — measurement harness specification (M1-M5 metrics) used by PF-2000
