# PI-4318 — AI Leverage Evaluation

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Cross-references:** [PI-4318-tickets-by-track.md](./PI-4318-tickets-by-track.md), [PI-4318-estimates.md](./PI-4318-estimates.md), [PI-4318-timeline-v3.md](./PI-4318-timeline-v3.md), [picasso PR #4906](https://github.com/toptal/picasso/pull/4906)
**Status:** Initial evaluation — identifies tickets where additional AI tactics could compress beyond current estimates.

---

## TL;DR

The current estimates already assume Claude Code-assisted work (per-component multipliers 0.10-0.25× vs manual, calibrated against PR #4906). This doc looks for **additional** AI leverage that's NOT yet captured.

**Top 5 opportunities** (estimated additional savings on top of current 102-149 man-days):

| Rank | Tactic | Tickets affected | Savings |
|---|---|---|---|
| 1 | **Agentic Code Connect generator** (Figma MCP + AI auto-maps BASE↔Picasso props, runs Dev Mode verify, iterates on failures) | PF-2005, PF-2009 | ~5-7 days |
| 2 | **AI-generated BASE audit spreadsheet** (compares Picasso docs vs BASE Figma programmatically; designer reviews flagged items only) | PF-2006, PF-2027 | ~5-8 days (mostly designer time) |
| 3 | **Autonomous per-component migration loop** (self-healing gate scripts; AI iterates until all gates green without human nudging) | PF-1994, PF-2024, PF-2025, PF-2020, PF-2021, PF-2022 | ~3-4 days |
| 4 | **AI-pre-filtered docs review** (AI generates initial dos/don'ts; designer reviews only flagged uncertainty) | PF-2001 | ~2-3 days designer |
| 5 | **AI-driven measurement harness** (M1-M8 scoring scripts authored end-to-end via Claude Code) | PF-2000 | ~2-3 days |

**Combined potential:** ~17-25 additional man-days saved on top of current estimates. Pushes program total from 102-149 down to **~80-130 man-days** if all tactics are pursued.

**What stays slow regardless of AI:** architecture decisions (PF-2023 provider rewrite, PF-1993 pnpm hoisting debugging), production hardening (PF-2012 Maestro middleware), and human-coordination work (PF-2008 designer template adoption). These have hard floors.

---

## Methodology

For each ticket I'm asking three questions:

1. **What's the work?** Is it generative (write code/docs/configs), analytical (analyze + classify), procedural (run scripts), or coordinative (humans aligning with humans)?
2. **What's already in the estimate?** The current Claude Code multiplier table (in [PI-4318-estimates.md](./PI-4318-estimates.md)) gives 0.10-0.85× depending on work shape.
3. **What additional tactic moves the needle?** Specifically: agentic loops, MCP integrations, batch processing, AI-pre-filtered review.

The current estimates assume:
- Claude Code (plan + yolo mode) as the per-component driver
- ~2-3 hours active engineer time per simple component migration (PR #4906 baseline)
- AI does first draft, human reviews + iterates

This doc looks for opportunities to push further into:
- Agentic workflows that iterate autonomously (no human nudging between gate runs)
- MCP-orchestrated work (Figma MCP, filesystem MCP, Storybook parser MCP)
- Pre-filtering work for human review (so humans only see exceptions)
- Pipeline automation (overnight batch runs)

---

## Per-track evaluation

### Modernization track

| Ticket | Current estimate | Multiplier in use | AI leverage opportunity | Compressed estimate | Floor reason |
|---|---|---|---|---|---|
| **PF-1992** Migration plan | 2-3d | already drafted | Use AI to scaffold the prompt pack + tiering audit script in one go | **1.5-2.5d** | Tight; mostly already done |
| **PF-1993** pnpm migration | 3-5d | 0.55× (debugging-bound) | AI debugging assistant: feed CI errors → suggested fixes. Modest gain. | **2.5-4d** | Hoisting differences need human judgment |
| **PF-1994** Tier 1 cleanup (11) + Tier 0 light path (8) | 4-6d | 0.05-0.10× (cleanup-only + `@mui/base`→`@base-ui/react` swap) | **Autonomous gate loop** — AI runs `yarn migrate:component <Name>`, reads gate failures, fixes, retries until green. Light path calibrated against PR #4906 (Button + Switch). v14: 11 cleanup includes 5 already-clean + 5 type-only fixes + Menu pkg + Utils. | **3-5d** | Cleanup-only is trivial; light-path multipliers may not generalise to Drawer/Modal/Slider; Backdrop has no standalone @base-ui/react primitive |
| **PF-2024** Tier 2 heavy (5 — Checkbox, Radio, Tooltip, FileInput, Popper) | 5-8d | 0.15× | Same autonomous loop with `PROMPT-heavy.md`. Heavy path: full MUI v4 + JSS rewrite to `@base-ui/react` + Tailwind. v14: narrowed from 9 to 5 truly-heavy (FormLabel/Utils/Container/Grid/Notification moved to Tier 1; Page moved to Tier 3). | **4-7d** | JSS parent-ref edge cases; Tooltip viability + Popper primitive choice (`@floating-ui/react` vs `@base-ui/react/popover`) need PF-1992 spike; FileInput keeps custom |
| **PF-2025** Tier 3 composite (3 — Accordion, Dropdown, Page) + OutlinedInput mixed | 5-7d | 0.25× | Autonomous loop helps less here — Accordion/Dropdown/Page have architecture decisions (theme overrides, JSS parent-refs). Mixed-state Dropdown + OutlinedInput PRs cover both light + heavy passes. Page rewritten in pure Tailwind (no `@base-ui/react` analog). | **5-7d** | Architecture decisions stay human |
| **PF-2020** picasso-charts | 1-2d | 0.10× | Already minimal. | **1-1.5d** | One component (LineChart); already tight |
| **PF-2021** picasso-query-builder (11 cmp) | 6-8d | 0.15× | Autonomous loop scales well across 11 components. | **4-6d** | First-cluster ramp; PR review |
| **PF-2022** picasso-rich-text-editor | 7-10d | 0.15× | Per-component loop helps; **theme bridge rewrite (`create-lexical-theme.ts`) is architecture and stays human**. | **5-7d** | Lexical theme architecture decision |
| **PF-2023** picasso-provider canary | 5-8d | 0.45× (system rewrite) | AI accelerates per-file rewrite (22 files); **architecture decisions on Tailwind 4 SSR strategy stay human**. Pair work captures the architecture cost. | **5-7d** | Architecture decisions; full-repo Happo + Portal smoke validation |
| **PF-1995** AI migration prompt + worked examples | 2-3d | meta-AI work | AI can generate the prompt iteratively from breaking-change patterns. | **1.5-2.5d** | Already AI-driven by definition |
| **PF-1996** Staff Portal migration | 1.5-2.5d | codemod-driven | **Autonomous loop** — AI runs codemod + Happo + Cypress + edge-case fixes until clean. | **1-1.5d** | First-of-a-kind app run; rollback test |

**Modernization track total** (current 38-58d → compressed **~30-46d**, saves ~8-12d).

The biggest gains are from the autonomous per-component loop on Tier 0 (light path) + Tier 1 (cleanup) + Tier 2 batches. Tier 3 and provider rewrite have architectural floors that AI can't compress further.

---

### Agent Experience track

| Ticket | Current estimate | Multiplier in use | AI leverage opportunity | Compressed estimate | Floor reason |
|---|---|---|---|---|---|
| **PF-1997** LLM index v2 | 2-3d | content engineering | AI generates `llms.txt` end-to-end from Storybook parser output. Already mostly there. | **1.5-2.5d** | Curation requires human judgment |
| **PF-1998** Top 20 selection | 1-2d | mostly automated | Already tight; sign-off is calendar time. | **1-1.5d** | Vedran + designer sign-off wall-clock |
| **PF-1999** Patterns inventory | 2-3d | AI-driven mining | AI mines patterns from real Picasso usage; humans validate. Already core. | **1.5-2.5d** | Pattern validation needs designer review |
| **PF-2000** Measurement (harness + baseline + gate runs) | 5-8d | 0.30× (audit scripts) | **Claude Code authors all M1-M8 scoring scripts** + Happo integration + aggregator end-to-end. Designer's brand-fidelity rubric is wall-clock and stays. | **3-5d engineer + designer wall-clock** | Designer rubric scoring is parallel but not engineer time |
| **PF-2001** Component docs + designer review | 9-11d | 0.20× docs + 0.85× designer collab | **AI pre-filters designer review:** AI generates initial dos/don'ts from component patterns; designer reviews only "AI uncertain" components (~30% of 75). Reduces designer wall-clock from per-component to per-cluster. | **7-9d engineer + reduced designer wall-clock** | 75 components is a lot; some review is irreducible |
| **PF-2026** Skills package (4 Skills) | 3-5d | content authoring | Better Skill prompt templates + AI-driven validation across ≥2 AI tools. | **2-4d** | Tool-specific validation needs human judgment |
| **PF-2002** Adopt rules in Staff Portal | 0.5-1.5d | codemod-style | Already minimal. | **0.5-1d** | One repo; tight |
| **PF-2003** npm-bundled distribution | 1-1.5d | infra | Already minimal. | **0.5-1d** | Toptal infra config |

**Agent Experience track total** (current 24-35d → compressed **~17-27d**, saves ~7-8d).

The biggest gain is on PF-2001: AI pre-filtering for designer review can save substantial designer wall-clock without compromising quality.

---

### Figma Design-to-Code track

| Ticket | Current estimate | Multiplier in use | AI leverage opportunity | Compressed estimate | Floor reason |
|---|---|---|---|---|---|
| **PF-2005** Code Connect for top 20 | 5-7d | 0.20× `.figma.tsx` authoring | **Agentic Code Connect generator** — script that uses Figma MCP to read BASE component schema + filesystem MCP to read Picasso source → auto-generates `.figma.tsx` prop mapping → runs Dev Mode verification → iterates on mismatch. Gets ~70% of components done autonomously; engineer reviews + fixes 30%. | **3-5d** | First 5 components stabilize the playbook (manual); BASE audit + Figma MCP setup are wall-clock |
| **PF-2006** BASE spec gaps top 20 | 5-8d (mostly designer) | 0.85× designer collab | **AI-generated BASE audit spreadsheet** — Claude Code reads Picasso component docs (PF-2001 output) + BASE Figma component schema (Figma MCP) → outputs RAG-status spreadsheet with prop mismatches highlighted. Designer reviews flagged items only. | **3-5d (mostly designer time still)** | Figma updates are designer-led; AI just speeds the audit step |
| **PF-2007** Token mapping | 1-2d | already AI-friendly draft | Already minimal. | **0.5-1.5d** | Verification is manual cross-check |
| **PF-2008** Figma Make guidelines + template | 2.5-3.5d | content authoring | AI authors guidelines from PF-2001 docs. Already in scope. | **2-3d** | Template publish + designer-test validation |
| **PF-2009** Code Connect for remaining 55 | 7-10d | 0.20× | **Agentic Code Connect generator at scale** — same approach as PF-2005 but for 55 components. Highly batchable; AI runs overnight, engineer reviews + fixes in the morning. Could compress from 9 days to ~3-4 with full automation. | **3-5d** | Edge cases + drift CI check |
| **PF-2027** BASE spec gaps remaining 55 | 10-12d (mostly designer) | 0.85× designer collab | Same AI-generated audit approach as PF-2006, scaled to 55 components. Designer reviews flagged items in batches. | **6-9d (mostly designer time)** | Designer-led wall-clock for actual Figma updates |

**Figma track total** (current 31-42d → compressed **~18-29d**, saves ~12-13d).

**This track has the largest absolute AI savings** because Code Connect authoring is highly automatable (Figma MCP + AI) and the BASE audit work has a substantial AI pre-processing opportunity that's not captured in current estimates.

---

### Maestro Integration track

| Ticket | Current estimate | Multiplier in use | AI leverage opportunity | Compressed estimate | Floor reason |
|---|---|---|---|---|---|
| **PF-2011** Middleware PoC | 2-3d | AI-friendly | Already tight. Figma REST API is well-documented; AI does most of the writing. | **1.5-2.5d** | Comparison write-up needs human framing |
| **PF-2012** Middleware production | 6-9d | 0.55× production hardening | AI accelerates infra-as-code; **integration testing in Maestro env stays human**. | **5-7d** | Maestro-side integration is human-gated |
| **PF-2013** Maestro audit | 1-2d | data gathering | AI could auto-generate the audit spreadsheet from Maestro project metadata. | **0.5-1d** | Manual confirmation per project |

**Maestro track total** (current 9-14d → compressed **~7-10.5d**, saves ~2-4d).

Smallest absolute savings because the Maestro track is small to begin with, and production hardening has a hard human floor (integration testing, deployment validation).

---

## Top 5 opportunities — detailed

### 1. Agentic Code Connect generator (PF-2005 + PF-2009 = ~5-7d savings)

**Current state:** Engineer authors each `.figma.tsx` file manually, ~1.5h per component (calibrated from PR #4906 patterns). Verification via Dev Mode + MCP.

**Tactic:** Build a single-purpose agent (Claude Code with Figma MCP + filesystem MCP) that:
1. Reads BASE component schema from Figma MCP
2. Reads Picasso component source from filesystem
3. Generates the `.figma.tsx` file with prop mappings
4. Runs Dev Mode CodeConnectSnippets check
5. On mismatch, reads error → suggests fix → iterates
6. Commits and PRs when verification passes

**Engineer role:** Sets up the agent, reviews PRs, fixes the ~30% of components where the agent gets stuck (complex variants, ambiguous prop mappings).

**Risk:** First-time setup of the Figma MCP integration may add 1-2 days of upfront work that gets repaid in batch processing. Agent quality depends on prompt engineering.

**Implementation effort:** ~1-2d to build the agent, then it scales across 75 components for free.

**Net savings:** PF-2005 from 5-7d → 3-5d. PF-2009 from 7-10d → 3-5d. Combined ~5-7d.

---

### 2. AI-generated BASE audit spreadsheet (PF-2006 + PF-2027 = ~5-8d, mostly designer time)

**Current state:** Designer manually audits BASE Figma components against Picasso for prop name / variant coverage / naming conventions. ~6.5d designer time per 20 components, scales linearly.

**Tactic:** Claude Code script that:
1. Reads PF-2001 component docs (Picasso side: prop names, types, variants)
2. Reads BASE Figma component schema (Figma MCP)
3. Compares programmatically — flags name mismatches, missing variants, type incompatibilities
4. Outputs a RAG-status spreadsheet (green / yellow / red per component) with **specific gaps highlighted**

**Designer role:** Reviews only flagged items. Fixes Figma. Skips already-aligned components entirely.

**Risk:** Audit script may miss subtle issues (e.g., semantic differences in prop names that mean the same thing). Designer should still spot-check 5-10% of green-flagged components.

**Implementation effort:** ~1d to build the audit script (reusable for top-20 and the 55).

**Net savings:** PF-2006 from 5-8d → 3-5d. PF-2027 from 10-12d → 6-9d. Combined ~5-8d (mostly designer wall-clock recovery).

> **This is the single biggest hidden opportunity in the program** — most of the BASE-side designer time is currently the *audit step*, not the actual Figma updates. AI can do the audit step in seconds.

---

### 3. Autonomous per-component migration loop (PF-1994/2024/2025 + siblings = ~3-4d)

**Current state:** Engineer runs `yarn migrate:component <Name>` (per migration plan), reviews gate output (Jest/Cypress/Happo/React-19/typecheck), feeds errors back to Claude Code, repeats. Each iteration involves human judgment "did the agent actually fix the problem".

**Tactic:** Extend the gate script to run autonomously:
1. AI starts migration
2. Gate script runs all tests
3. On failure, gate output is automatically fed back to AI as next prompt
4. AI iterates without human nudging
5. Hard cap at 3 iterations (per migration plan §4.6) before escalating

**Engineer role:** Reviews the final PR (not each intermediate iteration).

**Risk:** AI might iterate in circles on hard problems. The 3-iteration cap is the safety net. Some failures (Happo diff approval, theme override edge cases) genuinely need human input.

**Implementation effort:** ~0.5d to wire up the autonomous loop into existing `bin/migration-gate.sh`.

**Net savings:** Per-component time drops from ~2-3 hours to ~1-1.5 hours on average across 17 base/* + ~20 sibling components. Cumulative: ~3-4 days.

---

### 4. AI-pre-filtered docs review for PF-2001 (~2-3d designer time)

**Current state:** Designer reviews dos/don'ts on each of 75 component .md files iteratively during PF-2001 work. Designer wall-clock dominates.

**Tactic:** Two-pass review:
1. AI generates initial dos/don'ts from component code patterns + usage examples (already done in current estimate)
2. **AI second pass: classifies each doc as "high confidence" (likely correct) vs "uncertain" (needs designer eye)**
3. Designer reviews only "uncertain" docs (~30% of 75 = ~22 components)

**Designer role:** Reviews ~22 components instead of 75. ~70% reduction in designer review wall-clock for PF-2001.

**Risk:** AI's confidence classification may miss issues. Designer should spot-check 10% of "high confidence" docs as a sanity gate.

**Implementation effort:** ~0.5d to add the classification step to the docs-generation prompt.

**Net savings:** Designer wall-clock for PF-2001 drops from ~10-15 days (parallel to engineer work) to ~3-5 days. Doesn't compress engineer time directly, but pulls in PF-2027 start (which depends on PF-2001).

---

### 5. AI-driven measurement harness for PF-2000 (~2-3d)

**Current state:** Engineer writes M1-M8 scoring scripts manually with AI assistance. ~5-7d of engineer time.

**Tactic:** Single Claude Code session with full access to the migration plan + measurement spec:
1. AI generates all scoring scripts (`score-component.ts`, `score-props.ts`, `score-tokens.ts`, `score-lint.ts`) end-to-end
2. AI generates Happo integration + timing CLI + aggregator
3. Engineer reviews + tests integration

**Engineer role:** Sets up the prompt with full context, reviews generated scripts, runs integration tests.

**Risk:** Generated scripts may be over-engineered or under-tested. Need human validation pass.

**Implementation effort:** Subset of the existing PF-2000 scope — just push more of the script-authoring to AI.

**Net savings:** PF-2000 engineer time from 5-8d → 3-5d. Designer rubric wall-clock unchanged (parallel and human).

---

## What stays slow regardless of AI

These tickets have hard floors that AI cannot compress meaningfully:

| Ticket | Why it stays slow |
|---|---|
| **PF-1993** pnpm migration | Hoisting differences, peer-dep resolution edges, CI breakage need human debugging judgment. AI can suggest fixes but the loop is human-driven. |
| **PF-2023** picasso-provider canary | System rewrite. Architecture decisions (Tailwind 4 SSR strategy, JSS pipeline retirement, NotificationsProvider restyling) are inherently human. AI accelerates per-file rewrite but not the design. |
| **PF-2012** Middleware production | Maestro-side integration testing, monitoring + error reporting setup, deployment validation are human-gated. AI helps with infra-as-code but not the integration handshake. |
| **PF-2008** Figma Make template adoption | Template-publish and designer-test validation are wall-clock; designers need to actually use the template to validate it. |
| **PF-1996** Staff Portal final rollback test | Rollback procedure needs to be physically exercised; AI can't simulate this. |

These ~25-30 days of effort across the program are the floor. Everything else has some AI compression potential.

---

## Combined potential

Stacking all 5 opportunities (with realistic, not best-case, gains):

| Track | Current | After AI tactics | Saves |
|---|---|---|---|
| Modernization | 38-58d | ~30-46d | ~8-12d |
| Agent Experience | 24-35d | ~17-27d | ~7-8d |
| Figma | 31-42d | ~18-29d | ~12-13d |
| Maestro | 9-14d | ~7-10.5d | ~2-4d |
| **Total** | **102-149d** | **~72-112d** | **~17-37d** |

**Conservative estimate:** ~17 days saved (low end of each tactic).
**Aggressive estimate:** ~37 days saved (high end, assumes all tactics work first try).

**Realistic midpoint:** ~25 days saved → program total ~80-130 man-days.

For the v3 timeline (collaboration scenario, current end Jul 17), this could pull the program end to **~Jul 8-10** — saving another 5-9 working days on top of v3's compression.

---

## Implementation priorities

If we pursue this, the recommended order is:

1. **First (Phase 1, ~Apr 27 - May 5):** Build the **agentic Code Connect generator** as part of PF-1992 / Phase 1 prep. Test on 2-3 components manually, then automate. ROI hits in PF-2005 (Phase 1 gate input) and compounds across PF-2009.

2. **Second (Phase 1):** Build the **AI-generated BASE audit script**. ROI hits in PF-2006 (Phase 1) and PF-2027 (Phase 2). This is the single highest-leverage tactic.

3. **Third (Phase 2 day 1):** Wire the **autonomous migration gate loop** into `bin/migration-gate.sh`. ROI starts immediately on PF-1994 Tier 1 and compounds across all 17+11+8 base/sibling component migrations.

4. **Fourth (PF-2001 kickoff):** Add the **AI-pre-filtered review classification step** to the component-docs generation prompt.

5. **Fifth (PF-2000 kickoff):** Push the harness scripts into a single Claude Code session.

The first two are upfront investments (~1-2d each in PF-1992 / early Phase 1) that pay back many times across Phase 2.

---

## Risks of pushing AI further

1. **Over-automation backfires.** If autonomous loops produce broken code that takes longer to debug than the time saved, net loss. Mitigation: hard cap on iterations (3 max), human review of final PRs.

2. **Quality drift.** Faster doesn't mean better. AI-generated dos/don'ts might be subtly wrong; AI-generated `.figma.tsx` might mis-map props in ways Dev Mode doesn't catch. Mitigation: spot-check 10% of "high confidence" outputs.

3. **First-of-its-kind agent setup.** Building the Code Connect generator and BASE audit script costs ~2-3d upfront. If they don't work, that time is sunk. Mitigation: prototype on 2-3 components before committing.

4. **Designer trust in AI pre-filtering.** Designer may reject the "review only flagged items" model out of caution. Mitigation: validate AI's classification on the first 10 components before scaling.

5. **MCP integration fragility.** Figma MCP may be flaky; Storybook parser MCP doesn't exist yet. Mitigation: fallback to manual audit if MCP integration fails on a given component.

6. **Hidden architectural decisions surface as "AI can't do this".** Provider rewrite, Lexical theme bridge, pnpm hoisting — already flagged. AI shouldn't promise compression where the floor is human judgment.

---

## What this evaluation does NOT do

- **Re-estimate the program.** This is an opportunity scan, not a new estimate baseline. The current estimates (102-149d) are still the source of truth for planning.
- **Build the agent / scripts.** That's actual implementation work, scoped under PF-1992 (migration plan) or as a separate setup ticket.
- **Replace human review.** Every AI-leverage tactic above keeps a human in the validation loop. The compression is in the *generation* step, not the *judgment* step.

---

## Recommended next step

If pursuing AI-leverage tactics:

1. Add an **explicit PF-1992 sub-deliverable**: "Build agentic Code Connect generator + BASE audit script — Phase 1 setup task, ~2-3d engineer time".
2. Add a **PF-1995 sub-deliverable**: "Wire autonomous gate loop into `bin/migration-gate.sh` — ~0.5d".
3. **Track AI-leverage savings vs estimates** — after PF-1994 Tier 1 wraps, compare actual hours to budgeted hours. If autonomous loop is delivering, push the same approach into Tier 2/3 and siblings.

If not pursuing: the current 102-149d estimate stands.
