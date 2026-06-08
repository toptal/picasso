# PI-4318 — Effort Estimates (June re-baseline)

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Last updated:** 2026-06-05
**Audience:** Project manager, sponsors, track leads. Source of truth for the re-baselined due date after the first 5 weeks of execution.
**Supersedes:** [PI-4318-estimates_final.md](./PI-4318-estimates_final.md) (2026-04-30 baseline). The April estimates are preserved as-is; this doc shows progress vs that baseline and a revised end date.
**Companion doc:** [PI-4318-timeline_jun.md](./PI-4318-timeline_jun.md) for the calendar.

---

## At a glance — June re-baseline

| | |
|---|---|
| **Original end date** (April baseline) | ~Jul 14, 2026 (~10 weeks from May 4 start) |
| **Revised end date** (June re-baseline) | **~Aug 14, 2026** (range Aug 7 – Aug 21) |
| **Slip from original** | **~4-5 weeks** |
| **Reason for slip** | PF-1992 design iterations + serial Phase-1 execution (parallel-track ramp delayed; Eng B chain not started; Eng C delivered Phase-1 prereqs PF-1993 + PF-2031 instead of Maestro PoC) |
| **Total program effort (in-scope, remaining)** | **~68 – 105 man-days** (down from 80-123d original — see [Progress against original estimate](#progress-against-original-estimate)) |
| Story count | 28 Jira stories across 5 epics; 2 done, 2 active, 1 nearly-active, 23 still backlog |

**Calendar:** revised window **Jun 5 → ~Aug 14, 2026** (~10 calendar weeks of execution remaining). See [PI-4318-timeline_jun.md](./PI-4318-timeline_jun.md) for the calendar.

---

## Progress against original estimate

Done since May 4 (~5 weeks):

| Story | Epic | Status | Effort spent | Original estimate |
|---|---|---|---|---|
| [PF-1993](https://toptal-core.atlassian.net/browse/PF-1993) Migrate Picasso to pnpm | Modernization | **Done** | ~3-5d (estimate matched) | 3-5d |
| [PF-2031](https://toptal-core.atlassian.net/browse/PF-2031) Upgrade TypeScript to 5.5 | (separate ticket, Phase-1 prereq) | **Done** | ~2-3d (estimate matched) | 2-3d |
| [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) Migration plan + orchestrator | Modernization | **In Progress** (~85% done) | ~12-15d so far (3-4x original 4-5d estimate) | 4-5d |
| [PF-1994](https://toptal-core.atlassian.net/browse/PF-1994) Tier 1 cleanup + Tier 0 light-path batch | Modernization | **In Review** | ~3-5d (estimate matched) | 3-5d |
| [PF-1998](https://toptal-core.atlassian.net/browse/PF-1998) Select 5 Staff Portal pages | Pilot Measurement | **To Do** (slight progress past Backlog) | ~0d | 1-1.5d |

**Effort burned (May 4 - Jun 5):** ~20-28 man-days. Original plan expected ~30-40 man-days complete by Jun 5 across Eng A + Eng B + Eng C.

**The PF-1992 overrun (4-5d → 12-15d) accounts for ~70% of the slip.** Design conversations produced 4 plan revisions (v1 → v4), a consolidated decisions document, and architectural lock-in for Backdrop / Popper / `classes` shim / integration branch / pipelined orchestrator state machine. The orchestrator code refactor + Slack webhook + Happy gate tightening are still pending (~3-5 days remaining).

**Other tracks haven't started:**
- Agent Experience (PF-1989, 6 stories, 8.5-15.5d): all Backlog. Eng B not engaged on this track yet.
- Figma Design-to-Code (PF-1990, 6 stories, 19.5-28d): all Backlog. Designer not engaged.
- Maestro Integration (PF-1991, 3 stories, 9-14d): all Backlog. PF-2011 PoC not started.
- Pilot Measurement (PF-2030, 2 stories, 5-7.5d): PF-1998 To Do, PF-2000 Backlog.

---

## Scope by track — June re-baseline

| Epic | Track | Stories | Original man-days | Done | Remaining | Status |
|---|---|---|---|---|---|---|
| [PF-1988](https://toptal-core.atlassian.net/browse/PF-1988) | Modernization | 11 | 38 – 58 | PF-1993 (3-5d), PF-1992 ~85% (~3-5d remaining), PF-1994 in review (~0-1d) | **~30 – 47** | In Progress |
| [PF-1989](https://toptal-core.atlassian.net/browse/PF-1989) | Agent Experience | 6 | 8.5 – 15.5 | none | **8.5 – 15.5** | To Do |
| [PF-1990](https://toptal-core.atlassian.net/browse/PF-1990) | Figma Design-to-Code | 6 | 19.5 – 28 | none | **19.5 – 28** | To Do |
| [PF-1991](https://toptal-core.atlassian.net/browse/PF-1991) | Maestro Integration | 3 | 9 – 14 | none | **9 – 14** | To Do |
| [PF-2030](https://toptal-core.atlassian.net/browse/PF-2030) | Picasso/BASE AI Benchmark | 2 | 5 – 7.5 | none | **5 – 7.5** | To Do |
| | **Total** | **28** | **80 – 123** | ~12 – 16 | **~72 – 112** | **In Progress** |

> Effort estimates per story are **unchanged from the April baseline** — see [PI-4318-estimates_final.md](./PI-4318-estimates_final.md) §Modernization track, §Agent Experience track, etc. for the per-ticket tables. The re-baseline only changes status (what's done) and the calendar (when remaining work lands). One exception: PF-1992 actuals consumed 12-15d vs the 4-5d estimate, so the +8-10d overrun is recorded against the Modernization track total.

**Adjusted Modernization track total:** ~46 – 68d (originally 38 – 58d, plus the PF-1992 overrun). The overrun is sunk cost; the remaining 30 – 47d is what's left to execute.

**Program-level effort remaining:** ~72 – 112 man-days from Jun 5 onwards.

---

## Modernization track — PF-1988 (per-story status)

| Jira | Summary | Status | Effort remaining |
|---|---|---|---|
| [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) | Migration plan + autonomous-loop infrastructure | **In Progress** (~85%, design locked, code refactor pending) | 3 – 5d |
| [PF-1993](https://toptal-core.atlassian.net/browse/PF-1993) | Migrate Picasso to pnpm | **Done** | 0 |
| [PF-1994](https://toptal-core.atlassian.net/browse/PF-1994) | Tier 1 cleanup + Tier 0 light-path batch | **In Review** (PRs landed, merging pending) | 0 – 1d (review-bound) |
| [PF-2024](https://toptal-core.atlassian.net/browse/PF-2024) | Tier 2 heavy migration (5 components) | Backlog | 4 – 7d |
| [PF-2025](https://toptal-core.atlassian.net/browse/PF-2025) | Tier 3 composite + OutlinedInput | Backlog | 5 – 7d |
| [PF-2020](https://toptal-core.atlassian.net/browse/PF-2020) | picasso-charts (LineChart) | Backlog | 1 – 2d |
| [PF-2021](https://toptal-core.atlassian.net/browse/PF-2021) | picasso-query-builder (11 components) | Backlog | 4 – 6d |
| [PF-2022](https://toptal-core.atlassian.net/browse/PF-2022) | picasso-rich-text-editor (8 components) | Backlog | 5 – 7d |
| [PF-2023](https://toptal-core.atlassian.net/browse/PF-2023) | picasso-provider canary (root peer-dep removal) | Backlog | 6 – 9d |
| [PF-1995](https://toptal-core.atlassian.net/browse/PF-1995) | AI-assisted consumer migration prompt | Backlog | 1.5 – 2.5d |
| [PF-1996](https://toptal-core.atlassian.net/browse/PF-1996) | Migrate Staff Portal to modernized Picasso | Backlog | 2 – 3d |
| **Track remaining** | | | **~30 – 47d** |

Plus separate-ticket prerequisite: [PF-2031](https://toptal-core.atlassian.net/browse/PF-2031) TypeScript 5.5 upgrade — **Done**. Follow-up [FF-125](https://toptal-core.atlassian.net/browse/FF-125) (polymorphic component type) deferred to backlog, not blocking PI scope.

---

## Agent Experience track — PF-1989 (per-story status)

| Jira | Summary | Status | Effort remaining |
|---|---|---|---|
| [PF-1997](https://toptal-core.atlassian.net/browse/PF-1997) | Optimize LLM index + `.picasso/` v2 | Backlog | 1.5 – 2.5d |
| [PF-1999](https://toptal-core.atlassian.net/browse/PF-1999) | Extract patterns from existing Picasso usage | Backlog | 1.5 – 2.5d |
| [PF-2001](https://toptal-core.atlassian.net/browse/PF-2001) | Polish + review component-level AI documentation | Backlog | 2 – 3.5d |
| [PF-2026](https://toptal-core.atlassian.net/browse/PF-2026) | Picasso Skills package (4 Skills) | Backlog | 2 – 4d |
| [PF-2002](https://toptal-core.atlassian.net/browse/PF-2002) | Adopt Picasso rules in Staff Portal | Backlog | 0.5 – 1.5d |
| [PF-2003](https://toptal-core.atlassian.net/browse/PF-2003) | Bundle Agent Experience into `@toptal/picasso` npm | Backlog | 1 – 1.5d |
| **Track remaining** | | | **8.5 – 15.5d** |

---

## Figma Design-to-Code track — PF-1990 (per-story status)

| Jira | Summary | Status | Effort remaining |
|---|---|---|---|
| [PF-2005](https://toptal-core.atlassian.net/browse/PF-2005) | Code Connect generator + 5-page subset | Backlog | 3 – 4.5d |
| [PF-2006](https://toptal-core.atlassian.net/browse/PF-2006) | BASE audit script + BASE spec fixes (5-page) | Backlog | 2.5 – 3.5d |
| [PF-2007](https://toptal-core.atlassian.net/browse/PF-2007) | Verify BASE ↔ Picasso token mapping | Backlog | 1 – 2d |
| [PF-2008](https://toptal-core.atlassian.net/browse/PF-2008) | Figma Make guidelines + project template | Backlog | 2 – 3d |
| [PF-2027](https://toptal-core.atlassian.net/browse/PF-2027) | BASE spec gaps for remaining ~55 components | Backlog | 7 – 10d |
| [PF-2009](https://toptal-core.atlassian.net/browse/PF-2009) | Code Connect for remaining ~55 components | Backlog | 4 – 5d |
| **Track remaining** | | | **19.5 – 28d** |

---

## Maestro Integration track — PF-1991 (per-story status)

| Jira | Summary | Status | Effort remaining |
|---|---|---|---|
| [PF-2011](https://toptal-core.atlassian.net/browse/PF-2011) | PoC of Figma Middleware (REST API) | Backlog | 2 – 3d |
| [PF-2012](https://toptal-core.atlassian.net/browse/PF-2012) | Implement Figma Middleware (production) — split A+B+C after PoC | Backlog | 6 – 9d |
| [PF-2013](https://toptal-core.atlassian.net/browse/PF-2013) | Audit Maestro for Picasso UI generation (O4 baseline) | Backlog | 1 – 2d |
| **Track remaining** | | | **9 – 14d** |

---

## Picasso/BASE AI Benchmark track — PF-2030 (per-story status)

| Jira | Summary | Status | Effort remaining |
|---|---|---|---|
| [PF-1998](https://toptal-core.atlassian.net/browse/PF-1998) | Select 5 Staff Portal pages + extract Picasso components | **To Do** | 1 – 1.5d |
| [PF-2000](https://toptal-core.atlassian.net/browse/PF-2000) | Measurement protocol + 3-condition runner + H + A1 + A2 + final A2 | Backlog | 4 – 6d |
| **Track remaining** | | | **5 – 7.5d** |

---

## Effort by remaining phase

Re-baselined from June 5 onwards.

| Window | Calendar | Work | Effort (man-days) |
|---|---|---|---|
| Wrap PF-1992 + PF-1994 merge | Jun 5 – Jun 12 (1 week) | Orchestrator refactor finishes, decisions docs land, PF-1994 PRs merge | ~3 – 6 |
| Modernization Tier 2/3 + provider | Jun 15 – Jul 17 (~4-5 weeks, Eng A) | PF-2024, PF-2025, PF-2023, PF-1995, PF-1996 | ~18 – 28 |
| Sibling packages | Jun 15 – Jul 24 (~6 weeks, Eng C at 50%) | PF-2020 → PF-2022 → PF-2021 | ~10 – 15 |
| Agent Experience + Figma | Jun 8 – Aug 7 (~9 weeks, Eng B 50% + Designer) | Full Agent Experience + Figma stacks, BASE 55-component audit | ~28 – 43 |
| Pilot Measurement | Jun 8 – Jul 24 (~7 weeks, Eng B 50%) | H, A1, A2, final A2 measurement runs | ~5 – 7.5 |
| Maestro production tail | Jul 13 – Aug 14 (~5 weeks, 3-engineer collab) | PF-2011 PoC → PF-2012a/b/c → PF-2013 audit | ~9 – 14 |
| **Remaining total** | **Jun 5 – Aug 14** (~10 weeks) | | **~72 – 112** |

---

## Calendar realism — what's different from the April plan

These are the same engineer-day estimates; the **calendar slips** because work hasn't run in parallel as originally planned.

- **PF-1992 took 3-4× longer than planned** (~12-15d actual vs 4-5d estimate). Design iterations + decisions consolidation + architectural lock-in for Backdrop / Popper / `classes` shim / integration branch / pipelined orchestrator. The remaining ~3-5d of orchestrator code refactor + Slack webhook + Happo gate tightening is the residual.
- **Eng B chain (Agent Experience + Pilot Measurement + Figma Code Connect generator) did not start in May.** This was meant to run in parallel with Eng A's Modernization work from May 4. Recovering this in June requires Eng B's full 50% allocation now and the full ~28-43 man-days of Eng B work has to be re-fit into a tighter calendar window (or, if Eng B can't ramp to 50%, the program-end slip widens).
- **Eng C did Phase-1 prerequisites (PF-1993 + PF-2031) instead of starting PF-2011 Maestro PoC.** That work was originally Eng A's responsibility (pnpm) or expected to happen behind a separate ticket. Net: Eng C's chain start moves from May 4 → Jun 9 ish (after the orchestrator wraps).
- **Phase 1 gate disappears in practice.** The April plan had a gated/non-gating-parallel split. June reality is that Phase 1 gating decision is moot — the modernization chain is mid-flight, and the Phase-1 measurement (PF-2000 H+A1) hasn't happened. The June re-baseline runs everything as Phase 2.

**Wall-clock summary:** ~10 weeks of remaining execution from Jun 5. Program end revises from **~Jul 14** to **~Aug 14** (range Aug 7 – Aug 21). The original 3-engineer Maestro tail collaboration model still applies, just shifted into August.

---

## Risks that grew vs the April baseline

| Risk | April assessment | June assessment |
|---|---|---|
| PF-1992 overrun | Estimated 4-5d | **Realised 12-15d.** Risk now: residual ~3-5d on orchestrator refactor + Slack/Happo wiring lands as planned; no further slip. |
| Eng B chain underflow | Assumed 50% allocation start May 4 | **Not started.** If Eng B can't ramp now, the Agent Experience + Pilot Measurement + Figma Code Connect chain slips further. Critical risk to lock this week. |
| Eng C Maestro PoC delay | Assumed start May 13 | **Not started.** Eng C used May for PF-1993 + PF-2031. PF-2011 starts Jun 8-10. Maestro production work pushes back ~4 weeks. |
| PF-1994 review back-and-forth | Assumed quick merge | In Review — depends on reviewer cadence. If review iterates >1-2 rounds, PF-2024 start slips. |
| Tier 2/3 calibration | Multipliers calibrated from PR #4906 (Button + Switch, simple primitives) | Tier 0 batch in PF-1994 is the actual calibration. Once PF-1994 merges, recalibrate PF-2024/2025 estimates. |

---

## What this means for the due date

**Realistic new due date: Aug 14, 2026.** Range Aug 7 (best case, no further slips and Eng B ramps full 50% from this week) – Aug 21 (one more 1-week slip somewhere).

If Eng B cannot ramp to 50% in June, the program-end determining chain becomes Eng B's Agent Experience + Figma + Pilot Measurement work (~28-43 man-days at 50% = ~11-17 calendar weeks). That pushes the end to **late August or early September**. **Locking Eng B's allocation is the single biggest decision to make this week.**

The Modernization track's critical chain (Eng A's PF-2024 → PF-2025 → PF-2023 → PF-1995 → PF-1996) at 100% allocation completes by ~Jul 17. After that Eng A is available for Figma swarm (PF-2009), Maestro support (PF-2012c), and PF-2013 audit pair. That window is preserved from the April plan; it just starts ~5 weeks later.

---

## Sources

- [PI-4318-tickets-by-track_final.md](./PI-4318-tickets-by-track_final.md) — full ticket descriptions, acceptance criteria, dependencies (April baseline, still authoritative for per-story scope)
- [PI-4318-timeline_jun.md](./PI-4318-timeline_jun.md) — revised calendar, Gantt, critical path
- [PI-4318-estimates_final.md](./PI-4318-estimates_final.md) — April baseline estimates (preserved as-is for diff/audit)
- [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md) — deep dive on the Modernization migration plan, v4
- [PI-4318-PF-1992-design-decisions.md](./PI-4318-PF-1992-design-decisions.md) — decisions consolidated from May 4-5 design conversations
