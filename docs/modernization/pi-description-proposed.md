# PI — Picasso Modernization + AI Integration (proposed description)

**Status:** Draft for review (not published to Confluence)
**Author:** Vedran Ivanac
**Last updated:** April 15, 2026

---

## Abstract

Picasso, Toptal's design system, runs on MUI v4 (deprecated since 2021, no security patches), `@mui/base` (beta), and JSS (unmaintained). It sits under 75% of Toptal's React code across 39 repos and 23 actively developed products, and it blocks React 19 adoption org-wide.

At the same time, AI tools (Cursor, Claude Code, Codex, Figma Make, Maestro) cannot generate Picasso-aware UI today. This blocks two workflows that are already becoming standard at Toptal: design-driven AI implementation from Figma (engineers using Cursor or Claude Code with Figma MCP), and Maestro prototypes, which currently default to generic frameworks instead of Picasso.

This PI delivers an intermediate, optionality-preserving solution: modernize Picasso's internals (Base UI + Tailwind) via AI-agent-driven migration, and ship an AI-context layer (Picasso llm index, `.picasso` project rules, Figma Code Connect + Figma Make template, and a Maestro integration with a Figma middleware). The PI starts with a gated 3-week pilot that consolidates existing spikes (AI migration of Button/Switch, Storybook → markdown parser, first Code Connect component, `.picasso` v1, Maestro scaffold) into a measurable pipeline before the full investment is committed.

---

## Strategic stance — intermediate solution, not final answer

The "1 design system / 1 UI kit" question is primarily organizational and will not resolve inside this PI's horizon. Three forces make commitment to any single end-state risky right now: 20 projects are still on Picasso and cannot be moved quickly; AI tooling is evolving fast (Figma MCP launched late 2024, Code Connect only recently matured, Figma Make is still new); and we do not yet know whether the right long-term home is modernized Picasso, a shadcn-based kit, or something else.

This PI therefore delivers the cheapest optionality-preserving path: modernize Picasso's internals so it is safe and React 19-ready, and add an AI layer on top of the existing API. If in 6–12 months the answer is "rewrite to shadcn" or "Figma is no longer the source of truth," most of the AI-context work (llm index, `.picasso`, skills) still applies, and the Base UI + Tailwind foundation is not wasted — it is the foundation for any future kit.

---

## Value Proposition

**For Engineering (all frontend teams across 23 products)**

Modernized foundation (Base UI + Tailwind) replaces deprecated, unmaintained libraries with actively supported alternatives and unblocks React 19 adoption org-wide. AI-agent-driven migration (validated on Button and Switch via Codex) plus the existing `picasso-codemod` infrastructure minimizes manual migration effort across 39 repos; migration cost is paid from a dedicated AI budget rather than engineer-weeks. Every consumer repo gets a `.picasso` ruleset (analogous to `.lovable`) so Cursor, Claude Code, and Codex pick the right Picasso component on the first try. AI tools (Maestro, Claude Code, Cursor, Figma Make) leverage Picasso as the default design library for prototyping and coding without manual training or per-prompt tuning.

**For Product and Design**

Figma-to-code pipeline: designers create in Figma using BASE, AI agents output production-ready Picasso code with correct component usage down to prop-level mapping. Picasso becomes the default design library for Maestro, ensuring AI-generated prototypes and internal tools use Toptal's own design system natively. Faster prototyping and iteration cycles for UI-heavy features.

**For Platform and Organization**

Security risk from unmaintained MUI v4 and JSS is eliminated. Design system maintenance burden is reduced through modern tooling and a single source of truth for component documentation (the llm index) that is consumed by humans, AI agents, Code Connect, and Figma Make simultaneously. Picasso becomes the Maestro default via a Figma middleware — because no CLI today replaces Figma MCP, we build or broker a middleware so Maestro can consume BASE → Picasso mappings without forcing every Maestro user through Figma MCP directly. This prevents fragmentation across competing frameworks for AI-assisted development.

---

## Scope

### Track 1 — Modernization (MUI v4 / JSS → Base UI + Tailwind)

Validate and scale AI-agent-driven migration (extend the Button/Switch Codex prototype). Produce the migration plan and the split between AI-migrated and human-migrated components. Define and approve the AI migration budget (token envelope, monthly cap, stop condition). Execute 75-component migration with codemod fallback for consumer repos.

### Track 2 — AI context layer

Generate a Picasso llm index from Storybook (extend Daniel's parser). Publish `llms.txt` and per-component `.md` files at `picasso.toptal.net/llms.txt`, following the Base UI pattern. Define and ship the `.picasso` project-rules convention for consumer repos. Adopt `.picasso` in Portal apps as the first wave. Close the loop: use an AI agent to extract recurring Picasso usage patterns from Portal codebases and feed them back into the rules and skills.

### Track 3 — Figma

Figma Code Connect for all 75 components (first component already shipped). Figma Make template plus `guidelines/` content, published as an org-wide template with the `@toptal/picasso` package preconfigured.

### Track 4 — Maestro

Create a Picasso project in Maestro (builds on Diogo's `maestro-prototype-builder`). Ship a Figma middleware that removes the hard dependency on Figma MCP, so non-engineers can use Maestro without installing the Figma desktop app or managing API tokens locally. The middleware is a spike in week 1 of the pilot with two options on the table: thin in-house service wrapping the Figma REST API plus our Code Connect map, or broker via Anima / Builder.io component-mapping APIs.

### Cross-cutting

3-week gated pilot with defined success criteria; AI migration budget governance; living-system ownership (Code Connect + llm index + skills upkeep, ongoing).

### Scope does NOT include

BASE design system changes (Figma-side, owned by Design Systems team). Redesigning Picasso component APIs (migration preserves existing APIs). Non-React consumers of Picasso. Commitment to a single, final answer on the "1 design system / 1 UI kit" question — this PI intentionally delivers an intermediate solution so the organization retains flexibility to later continue on a modernized Picasso, or replace parts or all of it once AI tooling stabilizes.

---

## Target Market

Primary: Frontend engineers across Toptal (39 repos, 23 actively developed products). Secondary: Design Systems team (designer), Product designers using Figma, PMs and designers using Maestro for prototyping.

---

## Market Window

MUI v4 has been deprecated since 2021 with no security patches; JSS has no active maintainer. Continued use is an accumulating security and maintenance liability. React 19 adoption is blocked org-wide until Picasso's MUI v4 dependency is resolved, and multiple teams are waiting on this.

AI-assisted UI development is becoming table stakes. Teams using shadcn get AI-generated UI out of the box; Toptal's frontend teams cannot benefit from this shift while Picasso remains unknown to AI tools. Maestro adoption is accelerating across engineering — without Picasso AI integration, Maestro-generated code defaults to generic frameworks, creating design inconsistency and technical debt from day one.

Figma Code Connect and MCP are now mature enough to support production integration, and Figma Make is stable enough to take a production dependency on. All three tools use Base UI as their default, which aligns with the modernization target of this PI.

---

## Impact

The Impact table is split into three tiers so leadership can scan it: Tier 1 gates the week-4 pilot decision, Tier 2 is judged at PI close, Tier 3 is the weekly operating dashboard during execution.

### Tier 1 — Pilot-gate metrics (week 4 Go / Adjust / No-Go)

| Metric | Baseline | Target at week 4 | How measured |
| --- | --- | --- | --- |
| AI component selection accuracy on pilot screens | Cursor / Codex without `.picasso` rules and without Code Connect, on the same 5 screens | ≥ +30 pp absolute improvement, and ≥ 85% absolute | Manual scoring on 5 production screens by 2 reviewers; Cohen's kappa for inter-rater check |
| AI prop-mapping accuracy on pilot screens | Same baseline as above | ≥ +25 pp absolute improvement, and ≥ 75% absolute | Same protocol |
| Time-to-screen with pipeline vs. without | Median engineer time on 3 screens implemented manually | ≥ 40% median reduction across 3 paired screens | Stopwatch protocol, same engineers, randomized order to control for learning |
| Visual fidelity (Happo diff) of AI output vs. Figma | Manual-implementation baseline | ≤ 1.5× the manual baseline diff score | Happo visual regression on the 5 pilot screens |
| AI-migration cost per component | Button + Switch actuals (Codex spend, human review hours) | ≤ 2× the prototype actuals per component on 3 newly migrated components | Migration log + AI spend dashboard |
| Pilot-team sentiment | N/A | ≥ 4/5 on "I want to keep using this" from all pilot engineers | Anonymous survey at week 3 |

### Tier 2 — PI outcome metrics (judged at PI close)

| Metric | Baseline (start of PI) | Target at PI close | How measured |
| --- | --- | --- | --- |
| Deprecated runtime deps in Picasso | MUI v4 (16 pkgs) + JSS (113 files) + `@mui/base` beta (11 pkgs) | 0 | `package.json` audit + grep for JSS imports |
| Open critical/high CVEs in Picasso dep tree | Measured in week 1 of pilot | 0 critical, 0 high | `yarn audit` / Snyk weekly report |
| React 19 unblocked | Blocked (Picasso peer-dep ≤ 18) | Picasso ships a React-19-compatible major AND ≥ 1 consumer repo is on React 19 | Picasso `peerDependencies`; consumer-repo upgrade PR count |
| Picasso components on Base UI + Tailwind | 0/75 | 75/75 (or scoped subset if Q2/Q3 split) | Component audit |
| Active consumer repos on modern Picasso | 0/23 | ≥ 20/23 (stretch 23/23) | Migration tracker; weekly burndown attached |
| Code Connect coverage | 1/75 | 75/75 | Figma Code Connect publish report |
| Picasso llm index coverage | 0/75 | 75/75 components + 4 patterns + 3 token files; published at `picasso.toptal.net/llms.txt` | Index manifest |
| `.picasso` rules adoption in Portal apps | 0 | All actively developed Portal apps | Repo audit (`.picasso` file present + version current) |
| Maestro prototypes defaulting to Picasso | 0 | 100% of new Maestro prototypes started after week 8 | Maestro project audit |
| Figma middleware for Maestro | Does not exist | Production endpoint or brokered vendor solution; ADR recorded | Architecture decision record + endpoint health check |

### Tier 3 — Operating metrics (weekly during execution, kept after PI close)

| Metric | Cadence | What we want to see |
| --- | --- | --- |
| Components migrated this week | Weekly | Linear or front-loaded burndown to 75 |
| Consumer files touched by codemods this week | Weekly | Front-loaded; tail off as PI closes |
| AI migration spend (rolling 4-week) | Weekly | Inside the Track 1 budget envelope |
| AI migration cost per component (rolling 5) | Weekly | Within 2× of Button/Switch baseline; trigger pause if breached |
| Post-migration bug rate per component | Per release | No statistically significant uptick vs. pre-migration baseline (last 2 quarters) |
| Happo diff regressions per migrated component | Per PR | < 5 reviewable diffs per component median |
| `.picasso` rules version skew across consumer repos | Weekly | ≥ 80% of repos on latest minor within 2 weeks of release |
| llm index freshness | Per Picasso release | Index regenerated and published in the same release as the components it documents |
| Pilot-team weekly satisfaction pulse (first 4 weeks of full investment) | Weekly | ≥ 4/5 sustained |

### Measurement principles

Every row has a baseline. "TBD" in the Current column is not accepted — if a baseline does not exist, the first deliverable of week 1 is to measure it, otherwise the row is removed. Every accuracy or percentage target is paired with a comparison protocol; absolute floors alone are not defensible.

---

## Phases

### Phase 0 — Already in flight (no approval needed)

AI migration validated on Button + Switch using Codex (Oleksandr). Storybook → markdown parser (Daniel). First Code Connect component shipped. `.picasso` v1 draft (attached in Slack). `maestro-prototype-builder` scaffold (Diogo).

### Phase 1 — Pilot (3 weeks, start date TBD based on Vedran's availability and PNPM migration progress)

1 engineer + 1 Design Systems designer (part-time). Pilot consolidates the Phase 0 spikes into a measurable end-to-end pipeline on 3–5 real production screens. It does not start from zero.

Deliverables: `.picasso` rules v1 deployed in 2–3 pilot repos; Figma MCP configured for the pilot team; Code Connect on the top 20 components; llm index covering the top 20 components; baseline measurement for every Tier 1 metric; first draft of the Figma middleware decision (build vs. broker).

Gate metrics: Tier 1 metrics in this document. Decision: Go / Adjust / No-Go at end of week 4.

### Phase 2 — Full investment (if Go, ~14 weeks parallel; scope may split across Q2 / Q3)

- Track 1 — Modernization: 1–2 engineers, 10–14 weeks. Migrate 75 components from MUI v4 / JSS to Base UI + Tailwind using AI-driven migration with codemod fallback across 23 repos. AI migration budget governs Track 1 spend.
- Track 2 — AI context: 1 engineer + 1 Design Systems designer, 10 weeks. Complete Code Connect coverage, llm index, `.picasso` rollout to all Portal apps, pattern extraction loop from Portal codebases.
- Track 3 — Figma: overlaps with Track 2. Figma Make template + guidelines + `@toptal/picasso` in the private npm scope.
- Track 4 — Maestro: 1 engineer, starts week 1, deliverable on week 6. Picasso project in Maestro plus Figma middleware.

---

## Dependencies

| Description | Team | Responsible Person |
| --- | --- | --- |
| Tailwind 4 availability via PNPM migration. Blocks: Track 1 preset work cannot merge until PNPM migration lands in consumer repos. | Platform Foundation | Vedran Ivanac |
| AI migration budget approval (token envelope, monthly cap, stop condition) | Finance + Platform Foundation Leadership | TBD |
| Figma middleware decision (build vs. broker) | Platform Foundation + Maestro team | Vedran Ivanac, Diogo Takeuchi |
| Design system consolidation decision ("1 design system, 1 UI kit") | Design Systems + Leadership | Paul, designer |

**Note on the "1 design system" dependency.** This is not a hard dependency for this PI. The PI deliberately delivers an intermediate solution and decouples from the decision. The decision informs Q3+ direction, not Q2 execution.

---

## This PI blocks

React 19 adoption across all Toptal frontend products. AI-assisted UI development for frontend teams. Maestro design-library standardization (currently blocked on Figma middleware; Maestro users cannot realistically install Figma MCP locally). AI migration budget allocation (blocked until Finance / Eng Leadership approves the AI spend envelope).

---

## Open Questions

- **Team allocation:** Who are the 2–4 engineers and DS designer for the full investment phase? Currently only Vedran confirmed as lead.
- **Q2 vs. Q3 scope boundary:** Full plan is ~17 weeks (3 pilot + 14 execution). Vedran is scoping which components and which consumer repos fit in Q2 and which carry into Q3.
- **Pilot start date:** Depends on Vedran's availability and PNPM migration progress.
- **AI migration budget:** What token and dollar envelope and what stop condition are we approving? Who owns the spend?
- **`.picasso` convention ownership:** Is this owned by the Picasso team, Platform Foundation, or co-owned with consuming Portal teams?
- **Figma middleware build vs. buy:** Is there a vendor (Anima, Builder.io, custom) or do we build a thin server inside Toptal? Decision exit criterion: whichever takes < 1 engineer-week to a working prototype and < 2 engineer-weeks to production.
- **Maestro integration depth:** Gated by the middleware decision above.
- **Living-system ownership:** Who owns Code Connect + llm index + skills upkeep ongoing (estimated 0.25–0.5 FTE per the proposal doc)?

---

## Supporting Documentation

- Executive Proposal — Picasso proposal (Confluence, Feb/Mar 2026)
- Picasso + Figma + AI Integration Strategy — Code Connect, MCP, Figma Make, 10-week roadmap
- Modernization Decision Framework — 5 options with effort estimates and scoring matrix
- Investment 1-pager — original proposal
- Technical Debt Assessment — detailed technical debt breakdown
- `.picasso` v1 draft — attached in Slack thread
- `maestro-prototype-builder` repo — Diogo
- Storybook → markdown parser output — Daniel
- Button + Switch AI migration PRs — Oleksandr
- First Code Connect component PR
- Slack: `#picasso-modernization` — project channel
- Related: PI-4278 (Platform Core Q2, includes PNPM / Tailwind 4 migration)
