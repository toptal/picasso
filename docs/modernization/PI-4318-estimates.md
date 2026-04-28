# PI-4318 — Effort Estimates (Claude Code-assisted)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Source tickets:** 28 stories (after splits, exclusions, PF-2027 add) under epics [PF-1988](https://toptal-core.atlassian.net/browse/PF-1988), [PF-1989](https://toptal-core.atlassian.net/browse/PF-1989), [PF-1990](https://toptal-core.atlassian.net/browse/PF-1990), [PF-1991](https://toptal-core.atlassian.net/browse/PF-1991)
**Cross-references:** [PI-4318-tickets-by-track.md](./PI-4318-tickets-by-track.md), [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md)
**Status:** v8 — Jira keys reconciled (PF-1994a/b/c → PF-1994/2024/2025, PF-2001a/b → PF-2001/2026, P2-FIG-03 → PF-2027). All splits and exclusions live in Jira.

---

## v2 calibration note

The v1 estimates were too conservative. Recalibrated against [picasso #4906](https://github.com/toptal/picasso/pull/4906) (Button + Switch migration to `@base-ui/react` via Codex):

- **Active engineer time per migration unit, including iteration:** ~2-3 hours, not 4 days.
- **The floor is Happo cycle time**, not coding time. Happo CI ≈ 30-45 min per run; with 3-5 runs per migration, ~1.5-3 hours of wall-clock is just waiting. Running Happo locally from a branch (per Vedran's note) compresses this further.
- **Reviewer cycle time** (designer on diffs, peer on code) is the next floor and stays roughly constant — call it +0.5-1 day calendar per PR, but minimal engineer hands-on-keyboard.
- **Per-component multipliers in this v2 are 2-3x more aggressive** than v1 for code-heavy work. System rewrites, tooling integration, and human-coordination work compress less.
- **Caveat:** PR #4906 is `@mui/base` → `@base-ui/react` (a smaller second-step migration where Tailwind was already in place). The full MUI v4 → Tailwind migration that drives Phase 2 is heavier per unit, especially for Tier 3 components with JSS parent-refs (Accordion, Page, Dropdown). Multipliers below reflect that.

---

## TL;DR

At Toptal's portfolio T-shirt scale, **every individual Jira ticket is XS** (≤20 person-days = "business as usual" per the size table). The meaningful sizing is at the **track** and **program** level.

| Level | Man-days (low – high) | Toptal size |
|---|---|---|
| Modernization track (PF-1988, 11 tickets after PF-1994 split) | 38 – 58 | **S** |
| Agent Experience track (PF-1989, 8 tickets — PF-2001 split: PF-2001 + PF-2026; PF-2004 excluded) | 24 – 35 | **S** |
| Figma Design-to-Code track (PF-1990, 6 tickets — adds PF-2027; PF-2010 excluded) | 31 – 42 | **S** |
| Maestro Integration track (PF-1991, 3 tickets — P3-MAE-01/02 excluded) | 9 – 14 | **XS** (BAU) |
| **PI-4318 program (~28 tickets after splits + exclusions + PF-2027 add)** | **102 – 149** | **M** |
| With +15% coordination overhead | 117 – 171 | M (low) → L (high) |

**P3-MOD-02, P3-MAE-01, P3-MAE-02 excluded from PI scope** — other-team migrations and Maestro adoption deferred to post-PI work.

**PF-2027 added (new ticket, ~10-12d)** — closes the BASE Design System spec gaps for the remaining 55 components. Symmetric with PF-2006 (P1-FIG-02) for the top 20. Required for clean Code Connect snippet generation by PF-2009.

**No tickets need splitting.** Per the size table, splitting candidates are XL (451+) and XXL (951+); the program is solidly inside M.

**Caveat on XS-as-BAU.** The footnote says "Opportunities of the XS size should not be viewed as projects, but rather as business as usual." Every individual ticket in PI-4318 is BAU at the portfolio scale; the **PI itself** is the project.

> **Coverage caveat.** Three Phase-3 stories are explicitly **excluded from PI scope**: P3-MOD-02 (other-repo migration — handled by other teams via self-service AI prompts), P3-MAE-01 (Maestro onboarding — deferred to post-PI), P3-MAE-02 (Maestro defaults to Picasso — deferred to post-PI). Total program effort 102-149 reflects in-scope tickets only.

### Version deltas

| Track | v1 | v2 | v5 | v8 (current) | Size |
|---|---|---|---|---|---|
| Modernization | 170 – 207 | 50 – 72 | 38 – 58 | 38 – 58 | S |
| Agent Experience | 84 – 108 | 33 – 49 | 25 – 37 | 24 – 35 | S |
| Figma | 46 – 59 | 25 – 37 | 21 – 30 | 31 – 42 | S |
| Maestro | 19 – 26 | 9 – 14 | 9 – 14 | 9 – 14 | XS |
| **Total** | **319 – 400** | **117 – 172** | **93 – 139** | **102 – 149** | **M** |

- **v1 → v2** — per-component multipliers recalibrated against PR #4906 (~2.4× compression).
- **v3** — man-days unchanged; switched to Toptal's portfolio T-shirt scale.
- **v4** — designer reviewer policy clarified (not required for migration tickets).
- **v5** — scope changes: PF-1995 reduced (AI migration replacing codemods), PF-1996 Staff Portal only, PF-2002 Staff Portal only, PF-2003 npm-bundled distribution, PF-2008 reduced (registry exists), PF-2004 + PF-2010 excluded, PF-1994 split into 3 tier-tickets, PF-2001 split into 2 sub-tickets (PF-2001c folded into PF-2001 in v7), P3-MOD-02 out of PI scope.

---

## Methodology

### T-shirt scale (Toptal portfolio standard)

T-shirt size is a relative indication of **work effort in person-days, not duration**. "8 developers working for a quarter" means 8 developers working on this only project for a quarter at full capacity.

| Size | Person-days | Example |
|---|---|---|
| XS¹ | up to 20 | 1 engineer working for a month |
| S | 21 – 50 | 2 engineers working for 5 weeks |
| M | 51 – 150 | 2 engineers working for a quarter |
| L | 151 – 450 | The entire engineering team working for a quarter |
| XL² | 451 – 950 | Two engineering teams working for a quarter, or one team for two quarters |
| XXL² | 951 + | 3+ engineering teams working for a quarter or more |

¹ XS opportunities should not be viewed as projects, but rather as business as usual.
² XL and XXL are splitting candidates — keep projects as small as possible.

**Implication for this estimate.** Every individual Jira story under PI-4318 is XS at this scale (largest single ticket is PF-2027 at 10-12 person-days, after PF-1994 was split into 3 tier-tickets). The program as a whole is M. No splitting required.

### Claude Code multiplier (v2)

Calibrated against PR #4906 actuals (~2-3 hours active engineer time per migrated component). Multipliers vs purely manual estimates:

| Work shape | Multiplier vs manual | Floor (per unit) |
|---|---|---|
| Per-component MUI v4 → Tailwind (Tier 1 — thin wrapper, minimal JSS) | **0.10 ×** | ~2-3 hours |
| Per-component (Tier 2 — JSS + variants + sub-components) | **0.15 ×** | ~4-6 hours |
| Per-component (Tier 3 — composite, JSS parent-refs, theme overrides) | **0.25 ×** | ~1-2 days |
| `@mui/base` → `@base-ui/react` second-step migration | **0.10 ×** | ~2 hours (PR #4906 baseline) |
| System rewrite (provider, theme runtime, SSR) | **0.45 ×** | ~5 days minimum (architecture is human) |
| Codemod authoring (jscodeshift) | **0.20 ×** | ~0.5 day per codemod |
| `.figma.tsx` Code Connect authoring | **0.20 ×** | ~1.5 hours per component |
| Documentation generation (component docs, patterns, llms.txt) | **0.20 ×** | reviewer-bound, not author-bound |
| Audit scripts, harness, CI tooling | **0.30 ×** | ~1 day per script |
| Tooling migration (pnpm, TS upgrade) | **0.55 ×** | debugging-bound, not coding-bound |
| Designer collaboration (BASE spec gaps, token mapping) | **0.85 ×** | wall-clock = designer availability |
| Onboarding / enablement / org-wide rollout | **0.65 ×** | wall-clock = humans convening humans |
| Production hardening (deploy, monitoring, error reporting) | **0.55 ×** | integration-bound |

### Why per-component multipliers are this aggressive

Walking through the PR #4906 timeline:

- 19:39 UTC — initial commit + yarn.lock (Codex one-shot succeeded for both Switch and Button)
- 21:16 UTC — Happo parity fixes (Switch native button reset, hidden input visual overflow) — second iteration
- Total active iteration: ~1.5 hours for **two** components

Engineer time per component is dominated by waiting (Happo CI, peer review queue), not coding. Once the prompt and the gate scripts are stable (P1-MOD-01 deliverable), each subsequent component is ~2-3 hours of hands-on plus calendar wall-clock for review.

### What stays slow

- **Architecture decisions** — `picasso-provider` rewrite, SSR strategy, choice between `@base-ui/react` vs Radix vs Floating-UI for Popper/Tooltip. AI accelerates the writing; not the deciding.
- **Designer collaboration** — BASE spec updates, Figma token mapping. Designers update Figma; engineers absorb the changes.
- **Reviewer bandwidth** — peer code review on Modernization PRs only (no design sign-off needed for the MUI v4 → Tailwind / Base UI migration; the target is pixel-perfect Happo parity, so any visual diff is a bug to fix, not a subjective design call). designer is needed only for (a) the Phase 1 brand-fidelity rubric on PF-2000 gate run and (b) per-component dos/don'ts on PF-2001. designer owns BASE clean-up on PF-2006. These set wall-clock floors that engineer-day estimates ignore.
- **First-of-its-kind work** — pnpm migration, Figma Middleware production deploy, distribution channel for Agent Experience. The first PR through any new pipeline takes longer than every subsequent one.
- **Codemod testing on real consumer repos** — every codemod runs against 2-3 consumer-repo usages; if a codemod is wrong, 23 repos see it.

### Inclusions and exclusions

**Included** in each estimate: prompting, gate runs (Jest/Cypress/Happo/React-19 smoke), self-review, PR write-up, peer review absorption.

**Not included:** non-engineering reviewer time (designer on rubric, designer on BASE) — flagged inline where it's the gating factor. PI-level coordination overhead (planning, retros). Add a flat **+15%** for a calendar-realistic envelope.

---

## Modernization track — PF-1988 (11 tickets after PF-1994 split)

All tickets XS at the Toptal scale; ranked here by man-days for sequencing.

| Jira | Story ID | Summary | Man-days |
|---|---|---|---|
| [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) | P1-MOD-01 | Create migration plan for AI-assisted Picasso migration | 2 – 3 |
| [PF-1993](https://toptal-core.atlassian.net/browse/PF-1993) | P1-MOD-02 | Migrate Picasso to pnpm | 3 – 5 |
| PF-1994* | PF-1994 | Migrate `packages/base/*` Tier 1 (foundation) | 3 – 4 |
| PF-2024* | PF-2024 | Migrate `packages/base/*` Tier 2 (compound) | 4 – 5 |
| PF-2025* | PF-2025 | Migrate `packages/base/*` Tier 3 + type-leak fixes | 5 – 7 |
| [PF-2020](https://toptal-core.atlassian.net/browse/PF-2020) | P2-MOD-02 | Migrate `@toptal/picasso-charts` (LineChart) | 1 – 2 |
| [PF-2021](https://toptal-core.atlassian.net/browse/PF-2021) | P2-MOD-03 | Migrate `@toptal/picasso-query-builder` (11 components) | 6 – 8 |
| [PF-2022](https://toptal-core.atlassian.net/browse/PF-2022) | P2-MOD-04 | Migrate `@toptal/picasso-rich-text-editor` (8 components) | 7 – 10 |
| [PF-2023](https://toptal-core.atlassian.net/browse/PF-2023) | P2-MOD-05 | Decommission `picasso-provider` + remove root peer-dep (canary) | 5 – 8 |
| [PF-1995](https://toptal-core.atlassian.net/browse/PF-1995) | P2-MOD-06 | AI-assisted consumer migration (with optional codemods) | 2 – 3 |
| [PF-1996](https://toptal-core.atlassian.net/browse/PF-1996) | P3-MOD-01 | Migrate **Staff Portal only** to modernized Picasso | 1.5 – 2.5 |
| **Track total** | | | **38 – 58 (S)** |

\* PF-1994 (Tier 1) was kept under its original key; PF-2024 (Tier 2) and PF-2025 (Tier 3) are new Jira tickets created for the split.

### Notes

**PF-1992 — P1-MOD-01 (S, 2–3 d).** The deep-dive [migration plan](./PI-4318-P1-MOD-01-migration-plan.md) is already drafted (~600 lines). Remaining work: scaffold `docs/migration/` prompt pack, wire `bin/migration-gate.sh` and `bin/migration-diff.sh`, version the Phase 0 prompt, run the tiering audit script. Tight loop with Claude Code.

**PF-1993 — P1-MOD-02 (M, 3–5 d).** Pnpm migrations are debugging-bound, not coding-bound. AI accelerates the conversion scripts; CI breakage and hoisting differences burn wall-clock. Co-dependent with PI-4278.

**PF-1994 (split into PF-1994 + PF-2024 + PF-2025, total 12–16d).** Now split into three tier-tickets to match migration plan §10 cadence and unblock parallelism with sibling-package migrations:
- **PF-1994 Tier 1 (3–4d).** 7 components × ~0.5d = 3.5d. Foundation primitives (Form, FormLabel, FormLayout, Note, Typography, ModalContext, Utils). Eng A prioritizes Typography + FormLabel + Form first so RTE/QB sibling work can ramp up.
- **PF-2024 Tier 2 (4–5d).** 7 components × ~0.65d = 4.5d. Compound (Checkbox, Radio, Tooltip, FileInput, Popper, Notification, Grid).
- **PF-2025 Tier 3 + type-leaks (5–7d).** 3 composite × ~1.5d + 3 type-leak fixes × ~0.2d = ~6d. Time concentrates on Page / Accordion / Dropdown JSS parent-refs and theme-override unwinding.

**PF-2020 — P2-MOD-02 (S, 1–2 d).** Single component (LineChart), 2 source files. Excellent first sibling-package run.

**PF-2021 — P2-MOD-03 (M, 6–8 d).** 11 components × ~0.5 d each ≈ 5.5 d. Batch into 3-4 PRs by cluster (Selectors / Inputs / Buttons / QueryBuilder root) for review-cadence reasons. ~1-2 d batching overhead.

**PF-2022 — P2-MOD-04 (M, 7–10 d).** 8 components × ~0.7 d each ≈ 5.5 d (slightly higher per-component because Lexical theme bridge is non-trivial) + 1.5-2 d to rewrite `create-lexical-theme.ts` against Tailwind tokens. The Lexical theme rewrite is the only architecture-decision item; the rest is per-component playbook.

**PF-2023 — P2-MOD-05 (M, 5–8 d).** Compressed less than per-component work because system rewrite has a hard floor on architecture decisions (Tailwind 4 SSR strategy replacing JSS pipeline, `NotificationsProvider` restyling). AI accelerates per-file rewrite of the 22 source files but humans own the design. Highest single-PR review burden of any ticket.

**PF-1995 — P2-MOD-06 (S, 2–3d).** **Scope reduced.** Replaced full codemod suite with **AI-led migration prompt + worked examples**. Strict API-preservation policy applied across PF-1994/2020/2021/2022/2023 minimizes breaking changes; remaining breaks handled via AI agent (Claude Code, Codex per PR #4906), not jscodeshift. Codemods become escape hatch (target 0–3, not 8–12). Effort: AI migration prompt + 2–3 worked examples (~1.5d), 0–3 codemods × ~0.5d (~0–1.5d), Staff Portal migration playbook (~0.5d).

**PF-1996 — P3-MOD-01 (XS, 1.5–2.5d).** **Scope reduced from 7 Portal apps to 1.** Migrate **Staff Portal only**. Other Portal apps (platform, client-portal, hire-global, client-signup, talent-portal, screening-wizard) are out of PI scope — their teams adopt via the AI migration prompt from PF-1995. Effort: AI agent run on Staff Portal + Happo/Cypress/Jest review + edge-case fixes + rollback test + retro (~2d).

---

## Agent Experience track — PF-1989 (8 tickets after PF-2001 split, PF-2004 excluded)

All tickets XS at the Toptal scale.

| Jira | Story ID | Summary | Man-days |
|---|---|---|---|
| [PF-1997](https://toptal-core.atlassian.net/browse/PF-1997) | P1-AIC-01 | Optimize LLM index and `.picasso/` folder | 2 – 3 |
| [PF-1998](https://toptal-core.atlassian.net/browse/PF-1998) | P1-AIC-02 | Select top 20 components by usage frequency | 1 – 2 |
| [PF-1999](https://toptal-core.atlassian.net/browse/PF-1999) | P1-AIC-03 | Extract patterns from existing usage | 2 – 3 |
| [PF-2000](https://toptal-core.atlassian.net/browse/PF-2000) | P1-AIC-04 | Collect measurements (harness + baseline + gate runs) | 5 – 8 |
| PF-2001* | PF-2001 | Component docs (75) + tokens + llms-full.txt + designer dos/don'ts review | 9 – 11 |
| PF-2026* | PF-2026 | Picasso Skills package (4 Skills) | 3 – 5 |
| ~~PF-2001c~~ | ~~PF-2001c~~ | ~~designer dos/don'ts review pass~~ — **folded into PF-2001** (review during work, not separate pass) | — |
| [PF-2002](https://toptal-core.atlassian.net/browse/PF-2002) | P3-AIC-01 | Adopt Picasso rules in **Staff Portal only** | 0.5 – 1.5 |
| [PF-2003](https://toptal-core.atlassian.net/browse/PF-2003) | P3-AIC-02 | Bundle Agent Experience into `@toptal/picasso` npm package | 1 – 1.5 |
| ~~PF-2004~~ | ~~P3-AIC-03~~ | ~~Collect feedback from teams~~ — **excluded from PI scope** | — |
| **Track total** | | | **24 – 35 (S)** |

\* PF-2001 (component docs) was kept under its original key; PF-2026 is the new Jira ticket created for the Skills package split.

### Notes

**PF-1997 — P1-AIC-01 (S, 2–3 d).** Regenerate `llms.txt` from existing Storybook parser; `.picasso/` rules v2 with changelog; usability check on 3 sample prompts. Mostly content engineering; AI drafts, human curates.

**PF-1998 — P1-AIC-02 (S, 1–2 d).** Mining import counts across 23 repos via existing parser. Sign-off (Vedran + designer) is calendar-time, not engineer-time.

**PF-1999 — P1-AIC-03 (S, 2–3 d).** AI mines patterns and drafts inventory; ≥3 real-usage examples per pattern. designer sign-off on antipatterns.

**PF-2000 — P1-AIC-04 (M, 5–8 d).** Harness build (~3-5 d): reference-set loader, Cursor + Claude Code CLI runner, M1-M8 scoring scripts, Happo integration, timing CLI, aggregator. Plus baseline run (~1 d engineer + designer's rubric ~2 d wall-clock) + gate run (~1-2 d engineer + designer wall-clock). designer's rubric scoring is the slow lane.

**PF-2001 (split into PF-2001 + PF-2026, total 12–16d).** Split into two sub-tickets to unblock parallelism (Skills can start before all 75 docs land). designer's dos/don'ts review pass is now **integrated into PF-2001** rather than running as a separate PF-2001c — designer reviews each component's dos/don'ts during the docs-generation work, and engineer absorbs feedback iteratively. Saves the round-trip handoff overhead.
- **PF-2001 Component docs + tokens + llms-full.txt + designer review (9–11d).** 75 component `.md` files at AI-assisted ~0.1d each = 7-8d. Token docs (3 × 0.5d) + `llms-full.txt` CI integration ≈ 2d. Plus ~1d engineer absorption of designer's iterative feedback (designer's wall-clock is parallel and not on engineer's chain).
- **PF-2026 Skills package (3–5d).** 4 Skills × ~1d each, validated against ≥2 AI tools.

**PF-2002 — P3-AIC-01 (XS, 0.5–1.5d).** **Scope reduced from 23 repos to 1 (Staff Portal).** Wire `.cursorrules` / `CLAUDE.md` referencing `node_modules/@toptal/picasso/.picasso/` into Staff Portal. Other repos self-onboard via the npm-bundled distribution from PF-2003.

**PF-2003 — P3-AIC-02 (XS, 1–1.5d).** **Scope simplified to npm-bundled approach.** Ship `.picasso/` folder + Skills + `llms-full.txt` as part of the existing `@toptal/picasso` npm publish so consumers automatically get them in `node_modules/@toptal/picasso/.picasso/`. Replaces the original "separate `@toptal/picasso-agent-experience` package + versioning model" approach. Effort: add `.picasso/` to Picasso's `package.json` `files` array (~0.5d), document consumer reference convention (~0.3d), validate end-to-end in Staff Portal (~0.3d).

**PF-2004 — excluded from PI scope.** Feedback collection deferred to post-PI BAU. Saves ~6d effort (and ~12 cal d at Eng B 50% allocation).

---

## Figma Design-to-Code track — PF-1990 (6 tickets, PF-2010 excluded)

All tickets XS at the Toptal scale.

| Jira | Story ID | Summary | Man-days |
|---|---|---|---|
| [PF-2005](https://toptal-core.atlassian.net/browse/PF-2005) | P1-FIG-01 | Code Connect for top 20 components | 5 – 7 |
| [PF-2006](https://toptal-core.atlassian.net/browse/PF-2006) | P1-FIG-02 | Update BASE Design System spec gaps (top 20) | 5 – 8 |
| [PF-2007](https://toptal-core.atlassian.net/browse/PF-2007) | P1-FIG-03 | Verify token mapping (BASE ↔ Picasso) | 1 – 2 |
| [PF-2008](https://toptal-core.atlassian.net/browse/PF-2008) | P2-FIG-01 | Define Figma Make guidelines + template | 2.5 – 3.5 |
| TBD\* | PF-2027 | Update BASE Design System spec gaps (remaining 55) | 10 – 12 |
| [PF-2009](https://toptal-core.atlassian.net/browse/PF-2009) | P2-FIG-02 | Code Connect for remaining 55 components | 7 – 10 |
| ~~PF-2010~~ | ~~P3-FIG-01~~ | ~~Onboard designers to BASE + Figma Make~~ — **excluded from PI scope** | — |
| **Track total** | | | **31 – 42 (S)** |

\* PF-2027 is a Figma-track ticket added in v6 (live in Jira as of v8). Mostly designer time + Ismael/Vitor review; small engineer absorption for changelog.

### Notes

**PF-2005 — P1-FIG-01 (M, 5–7 d).** BASE audit (RAG-status of 20 components, gap routing): ~1.5-2 d. 20 `.figma.tsx` × ~0.1 d = ~2 d (highly repeatable once first 5 stable). Dev Mode + MCP verification: ~1-2 d. Figma MCP setup for 3-5 pilot engineers: ~0.5 d.

**PF-2006 — P1-FIG-02 (M, 5–8 d, mostly designer time).** Wall-clock = designer in Figma. Engineer time is review + changelog ~2-3 d. Estimate quoted as combined stakeholder-days because Phase 1 wall-clock depends on designer availability.

**PF-2007 — P1-FIG-03 (S, 1–2 d).** Token-mapping doc drafted from BASE Figma + Picasso preset. AI handles draft; verification is manual cross-check on R1 designs.

**PF-2008 — P2-FIG-01 (S, 2.5–3.5d).** **Scope reduced.** Original 6d estimate assumed setting up the private npm registry from scratch. Toptal's `@toptal` scope already publishes packages, so registry config drops out. Remaining work: Picasso install path in Figma Make (~0.5d), guidelines authoring from PF-2001 docs (~1.5d), template publish + designer-test validation (~1d). Assumption: existing `@toptal` registry is reachable from Figma Make. If not, add 1-2d.

**PF-2027 — Update BASE spec gaps for remaining 55 (10-12d, mostly designer).** New ticket added in v6. Symmetric with PF-2006 (top-20). Designer audit + closure for 55 BASE components × ~0.15 designer-days each ≈ 8-10d, plus engineer review/changelog absorption ~1-2d. Blocks PF-2009 because Code Connect parser needs aligned BASE prop names. Designer dos/don'ts review is integrated into PF-2001 itself, so component docs handed off to PF-2027 already include reviewed dos/don'ts.

**PF-2009 — P2-FIG-02 (L, 7–10 d).** 55 `.figma.tsx` × ~0.08 d = ~5 d (faster per-component than top-20 — playbook is stable). Verification + drift CI check (M12): ~2-3 d. Now also blocked by PF-2027 (BASE spec gaps for the 55). Still L because of volume.

**PF-2010 — excluded from PI scope.** Designer enablement deferred to post-PI work. Figma Make template (PF-2008) ships and is discoverable; designer adoption flows via the Toptal design org's normal enablement channels.

---

## Maestro Integration track — PF-1991 (3 tickets)

All tickets XS at the Toptal scale.

| Jira | Story ID | Summary | Man-days |
|---|---|---|---|
| [PF-2011](https://toptal-core.atlassian.net/browse/PF-2011) | P1-MAE-01 | PoC of Figma Middleware (Figma REST API) | 2 – 3 |
| [PF-2012](https://toptal-core.atlassian.net/browse/PF-2012) | P2-MAE-01 | Implement Figma Middleware (production) | 6 – 9 |
| [PF-2013](https://toptal-core.atlassian.net/browse/PF-2013) | P2-MAE-02 | Audit Maestro for Picasso UI (O4 baseline) | 1 – 2 |
| **Track total** | | | **9 – 14 (XS)** |

### Notes

**PF-2011 — P1-MAE-01 (S, 2–3 d).** Figma REST API is well-documented; AI-friendly task. Lightweight — no production wiring, no Maestro-side integration. Output: PoC repo + comparison vs Figma MCP + productionization estimate.

**PF-2012 — P2-MAE-01 (M, 6–9 d).** Production hardening compresses less than greenfield work: deployment to Maestro env (~1-2 d), monitoring + error reporting (~1-2 d), migration guide (~1 d), integration into 1 Maestro project end-to-end (~2-3 d).

**PF-2013 — P2-MAE-02 (S, 1–2 d).** Inventory Maestro projects + record baseline. Mostly data gathering + spreadsheet.

---

## Roll-up by phase

| Phase | Tickets in Jira | Man-days | Toptal size |
|---|---|---|---|
| Phase 1 — Pilot (gated + parallel) | 10 of 10 | ~25 – 35 | S |
| Phase 2 — Execute (after splits + PF-2027 add) | 15 of 15 | ~71 – 100 | M |
| Phase 3 — Rollout (3 in scope; P3-MOD-02/MAE-01/MAE-02 excluded) | 3 of 3 | ~3 – 5 | XS |

Phase 1 fits comfortably in the published 3-week window even with one engineer per track. The harness build (PF-2000) and Code Connect top-20 (PF-2005) are still the long poles but no longer dominate.

Phase 2 remains the heavy phase. PF-1994 + sibling packages + provider rewrite + codemods ≈ 38-52 d, ~50-60% of Phase 2 effort.

Phase 3 contains only PF-1996 (Staff Portal migration), PF-2002 (adopt rules in Staff Portal), and PF-2003 (npm-bundled distribution). P3-MOD-02, P3-MAE-01, P3-MAE-02 are explicitly out of scope.

---

## Calendar realism

These are **engineer-days**, not calendar days. Real wall-clock is shaped by:

- **Parallelism across tracks.** Modernization, Agent Experience, Figma, and Maestro can run in parallel for most of the program. Cross-track dependencies are bounded — see the dependency map in [tickets-by-track.md](./PI-4318-tickets-by-track.md#cross-track-dependency-map).
- **Reviewer bottlenecks.** designer only on PF-2000 brand-fidelity rubric (Phase 1 gate) and PF-2001 dos/don'ts. designer on BASE updates (PF-2006). The Maestro team on PF-2012/2013. **Modernization migration tickets (PF-1994/2020/2021/2022/2023) need only peer code review** — pixel-perfect Happo parity is the target, no design sign-off required.
- **Codemod dependency chain.** P2-MOD-06 codemods author *progressively* as P2-MOD-01..05 land breaking changes; the L estimate stretches across most of Phase 2.
- **Phase 2 critical path.** P2-MOD-01 (PF-1994) blocks the three sibling-package migrations and the provider rewrite. Critical path: P1-MOD-01/02 → P2-MOD-01 (PF-1994/2024/2025) → P2-MOD-05 → P3-MOD-01 ≈ ~28-35 man-days serial (P3-MOD-02 excluded). That's the floor for a single engineer doing only Modernization.
- **Coordination overhead.** Add a flat **+15%** for PI-level coordination if you need a calendar-realistic envelope.
- **Local Happo runs.** Per Vedran's note, running Happo locally from a branch (rather than waiting for CI) compresses iteration loops further. If wired up early in Phase 2 (would fit nicely as a P1-MOD-01 sub-deliverable), per-component multipliers could compress another ~10-20%.

Two-engineer parallel scenario (one on Modernization, one on Agent Experience + Figma + Maestro): roughly **3 months wall-clock** for the 28 Jira tickets, gated mostly by designer's review bandwidth and the Happo cycle floor.

Single-engineer scenario: roughly **5-6 months wall-clock**.

---

## Out-of-scope tickets

All three Phase-3 stories are explicitly excluded from PI-4318 scope:

| Story ID | Summary | Reason |
|---|---|---|
| ~~P3-MOD-02~~ | ~~Migrate other consumer repos (16)~~ | Out of PI scope — other-team responsibility via self-service AI prompts |
| ~~P3-MAE-01~~ | ~~Maestro onboarding sessions + quick-start + docs~~ | Out of PI scope — deferred to post-PI |
| ~~P3-MAE-02~~ | ~~Maestro defaults to Picasso for new projects~~ | Out of PI scope — deferred to post-PI |

Program in-scope total: **102 – 149 man-days = ~20–30 person-weeks** — solidly **M** at the Toptal scale.

---

## Open assumptions to verify before locking estimates

1. **Local Happo wiring.** Vedran's note suggests running Happo from a local branch is faster than CI. If true and easily set up, fold this into PF-1992 deliverables and re-derive multipliers downward by ~10-20%.
2. **TypeScript upgrade (R1 in migration plan).** Currently TS 4.7. 5.4+ is a Phase 2 prerequisite. If scoped into PF-1992, already covered; if separate, add ~2-3 d.
3. **React 19 peer-dep cap.** Lifting it is a per-package codemod (~0.5 d), bundled into per-component migrations. Already implicit in PF-1994 estimate.
4. **`@base-ui/react` vs Radix/Floating-UI for Popper / Tooltip / Grid.** PR #4906 is on `@base-ui/react`. Migration plan §9.8 flags this as a live decision. If we switch primitives mid-program, add ~1-2 d per affected component for re-spike.
5. **AI agent of choice.** Estimates assume Claude Code (plan + yolo mode) as the per-component driver, calibrated against Codex (PR #4906). Switching agents shifts costs by ±15%.
6. **Codemod count.** Estimated 8-12 codemods for PF-1995. If PF-2023 (provider) introduces more API breaks than expected (e.g. removing `PicassoProvider.override` use sites), codemod count grows; add ~0.5 d per codemod.
7. **Reviewer availability.** Only PF-2001 (per-component dos/don'ts) and PF-2000 (Phase 1 gate-run brand-fidelity rubric) require designer. Modernization migration tickets (PF-1994/2020/2021/2022/2023) do **not** require designer — pixel-perfect Happo parity is the bar, and any visual diff that surfaces is a bug to fix, not a design call. If designer's allocation is <30% during Phase 1 gate or PF-2001 review, those calendars stretch; rest of program is unaffected.
8. **Tier 3 surprise factor.** Estimates for Page, Accordion, Dropdown assume the JSS parent-ref unwinding is mechanical. If we hit architectural surprises (e.g. `PicassoProvider.override` chains we didn't audit), per-component cost can double. Mitigation: front-load `PicassoProvider.override` audit in PF-1992 (already in migration plan §9.5).

---

## Update cadence

This doc is a snapshot. Update when:

- A ticket completes — replace estimate with actuals; track variance.
- After P2-MOD-01 (PF-1994) finishes Tier 1 (first 7 components) — re-calibrate Tier 2/3 multipliers from real data.
- When the 3 missing Phase-3 stories land in Jira — fold their estimates into the totals.
- If the AI agent stack or Happo workflow changes materially — re-derive multipliers.

---

## Changelog

- **v8 (2026-04-28)** — Reconciled doc IDs to actual Jira keys. PF-1994a/b/c (proposed Tier split) → **PF-1994** (kept for Tier 1) + **PF-2024** (Tier 2, new key) + **PF-2025** (Tier 3, new key). PF-2001a/b (proposed split) → **PF-2001** (kept for component docs + integrated review) + **PF-2026** (Skills, new key). P2-FIG-03 (proposed local ID) → **PF-2027** (BASE spec gaps remaining 55, new key). Source ticket count updated 26 → 28. No estimate or schedule changes — pure key reconciliation.
- **v7 (2026-04-27)** — **PF-2001c removed** (designer dos/don'ts review pass folded into PF-2001). designer reviews each component's dos/don'ts during docs-generation work; engineer absorbs feedback iteratively. PF-2001 estimate bumps slightly from 8-10d to 9-11d to absorb the ~1d engineer absorption overhead. Net savings: ~1d per program (the PF-2001c handoff overhead). PF-2001 split: 3 → 2 sub-tickets. AIC track: 25-37 → 24-35d. Program: 103-151 → 102-149d.
- **v6 (2026-04-27)** — Added **PF-2027 (Update BASE Design System spec gaps for remaining 55)** as a new Figma-track ticket symmetric with PF-2006 (top-20). 10-12d total (mostly designer time). Required prerequisite for PF-2009 (Code Connect 55) to generate clean snippets — without it, BASE/Picasso prop-name mismatches would cause incorrect Code Connect output for some of the 55. Figma track total: 21-30 → 31-42d. Program total: 93-139 → 103-151d.
- **v5 (2026-04-27)** — Scope changes: (1) **PF-1994 split into 3 tier-tickets** PF-1994 + PF-2024 + PF-2025 (~3.5 + 4.5 + 6d, total unchanged at ~14d). (2) **PF-2001 split into 2 sub-tickets (PF-2001c folded into PF-2001 in v7)** PF-2001 + PF-2026 (component docs + Skills + designer review). (3) **PF-1995 reduced 8-10d → 2-3d** — replaced full codemod suite with AI agent + migration prompt + worked examples; codemods become escape hatch. (4) **PF-1996 reduced 6-10d → 1.5-2.5d** — Staff Portal only; other Portals out of PI scope. (5) **PF-2002 reduced 2-3d → 0.5-1.5d** — Staff Portal only. (6) **PF-2003 reduced 4-5d → 1-1.5d** — npm-bundled into `@toptal/picasso` instead of separate distribution package. (7) **PF-2008 reduced 5-7d → 2.5-3.5d** — assumes existing `@toptal` registry. (8) **PF-2004 + PF-2010 excluded** from PI scope. (9) **P3-MOD-02 explicitly out of PI scope** — other-team self-service migration. Program total: 117-172 → 93-139 (saves ~25-35 man-days).
- **v4 (2026-04-27)** — Clarified that designer is **not** required for review of Modernization migration tickets (PF-1994/2020/2021/2022/2023). Pixel-perfect Happo parity is binary; any visual diff is a bug, not a design call. designer remains required only for PF-2000 (Phase 1 gate brand-fidelity rubric) and PF-2001 (per-component dos/don'ts). Man-days unchanged.
- **v3 (2026-04-27)** — Re-sized against Toptal's portfolio T-shirt scale (XS up to 20 person-days, S 21-50, M 51-150, L 151-450, XL 451-950, XXL 951+). All individual stories are XS (BAU); program is M (low end) to L (high end with overhead + missing stories). Man-days unchanged from v2.
- **v2 (2026-04-27)** — Recalibrated against [picasso PR #4906](https://github.com/toptal/picasso/pull/4906) actuals. Per-component multipliers reduced from 0.4-0.65× to 0.10-0.25×. Total program effort reduced from 319-400 to 117-172 man-days. Reviewer bandwidth (designer) is now the dominant calendar factor.
- **v1 (2026-04-27)** — Initial draft. Multipliers based on theoretical AI-assistance estimates rather than actuals.
