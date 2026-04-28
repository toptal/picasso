# PI Ticket Review — Picasso Modernization + AI Integration

**Reviewer:** Vedran Ivanac
**Sources used:** current PI draft, Slack scope proposal (Mar 2026), Picasso proposal (Confluence 5715951617), Picasso & Figma (5715656705), Modernization Decision Framework (5647925252).

The current ticket is in good shape: it frames the *why* (deprecated MUI v4/JSS + AI productivity gap), commits to a gated 3-week pilot, and names the two parallel tracks. Below is a set of concrete additions and edits to bring it in line with the latest scope proposal (AI-driven migration, llm index, `.picasso` rules, Maestro, Figma middleware) and to close the ambiguity around "1 design system & 1 UI kit" that came up in the meeting.

---

## 1. High-level gaps between the ticket and current reality

The ticket predates the last iteration of the plan. Before the additions below, these are the deltas worth flagging:

- **Migration execution model has changed.** The ticket says "codemod-driven migration across 23 repos." The current proposal is **AI-agent-driven migration** (Oleksandr already migrated Button & Switch end-to-end using Codex with a prompt). Codemods are still useful, but they're no longer the primary mechanism — the primary mechanism is "AI agent + prompt + AI budget."
- **AI-context layer is now concrete work, not an abstract deliverable.** Daniel's Storybook → Markdown parser already exists. `llms.txt`, per-component `.md` files, and a `.picasso` project-rules convention (analogous to `.lovable`) are buildable now and should be named in scope.
- **Maestro is no longer just "default design library."** There is a concrete repo (`maestro-prototype-builder` by Diogo) and an open technical gap: there is no CLI alternative to Figma MCP, which means a Figma middleware has to be built or brokered.
- **"1 design system, 1 UI kit" is listed as a dependency, but in the meeting you proposed an explicit intermediate-solution stance.** The ticket should state that position instead of parking the question.
- **Code Connect is already in progress** (first component connected). That should be reflected in Phase tracking.

---

## 2. Proposed edits to existing sections

### 2.1 Abstract — tighten the AI framing

Replace the sentence:

> "AI development tools cannot generate Picasso-aware UI, putting every Toptal frontend team at a productivity disadvantage and preventing Picasso from serving as the default design library for Maestro."

with:

> "AI development tools cannot generate Picasso-aware UI today. This blocks two workflows that are already becoming standard at Toptal: (1) design-driven AI implementation from Figma (engineers using Cursor/Claude Code + Figma MCP), and (2) Maestro prototypes, which currently default to generic frameworks instead of Picasso. This PI closes both gaps by modernizing Picasso's internals and delivering an AI-context layer (llm index, `.picasso` rules, Code Connect, Figma middleware for Maestro)."

### 2.2 Value Proposition — replace "codemod-driven migration"

Change:

> "Codemod-driven migration minimizes manual migration effort across 39 repos"

to:

> "**AI-agent-driven migration** (validated on Button + Switch via Codex) combined with existing `picasso-codemod` infrastructure minimizes manual migration effort across 39 repos. Migration cost is paid from a dedicated AI budget rather than engineer-weeks."

Add one new bullet under *For Engineering*:

> "**Per-project `.picasso` ruleset** (analogous to `.lovable`) gives every consumer repo a project-level AI context file so Cursor/Claude Code/Codex pick the right Picasso component on the first try."

Under *For Platform/Organization*, add:

> "**Picasso becomes the Maestro default via a Figma middleware.** Because no CLI today replaces Figma MCP, we build/broker a middleware so Maestro can consume BASE → Picasso mappings without forcing every Maestro user through Figma MCP directly."

### 2.3 Scope — revise to match the new 4-track breakdown

Replace the current "Scope includes" list with the four tracks from the Slack proposal, so the PI mirrors how the work is actually being organized:

> **Scope includes:**
>
> **Track 1 — Modernization (MUI v4/JSS → Base UI + Tailwind)**
> - Validate AI-agent migration (Codex-based, extending the Button/Switch prototype)
> - Produce the migration plan and scope covered by AI vs. human
> - Define the AI migration budget (tokens / $ envelope / stop conditions)
> - Execute 75-component migration and codemod fallback for consumer repos
>
> **Track 2 — AI context layer**
> - Generate Picasso llm index from Storybook (extend Daniel's parser)
> - Publish `llms.txt` + per-component `.md` at `picasso.toptal.net/llms.txt` (Base UI pattern)
> - Define and ship `.picasso` project-rules convention for consumer repos
> - Adopt `.picasso` in Portal apps as first wave
> - Close the loop: use AI to extract Picasso usage patterns from Portals and feed them back into rules/skills
>
> **Track 3 — Figma**
> - Code Connect for all 75 components (first component already connected)
> - Figma Make template + guidelines (private npm + `guidelines/`)
>
> **Track 4 — Maestro**
> - Create Picasso project in Maestro (builds on `maestro-prototype-builder`)
> - Ship Figma middleware to remove the Figma MCP dependency for Maestro users (research + build)
>
> **Cross-cutting**
> - 3-week gated pilot with defined success criteria (unchanged)

### 2.4 Scope does NOT include — add one line

Add:

> "Commitment to a single, final answer on the '1 design system / 1 UI kit' question within this PI. This PI intentionally delivers an *intermediate* solution (modernize + add AI layer on top of existing Picasso) so that the organization retains flexibility to either (a) continue on a modernized Picasso, or (b) replace parts or all of it later once AI tooling stabilizes. See section 'Strategic stance' below."

### 2.5 Impact table — add two new rows, refine two existing rows

Add:

| Metric | Current | Target | How Measured |
| --- | --- | --- | --- |
| AI migration cost per component (Track 1) | TBD (baseline: Button, Switch) | < $X / component, < Y hours human review | Migration log + AI spend report |
| Portal repos adopting `.picasso` rules | 0 | All active Portal apps | Repo audit |
| Picasso llm index coverage | 0/75 | 75/75 components + patterns + tokens | Index manifest |
| Maestro prototypes using Picasso | 0 | 100% of new Maestro prototypes | Maestro project audit |

Refine "AI component accuracy" and "AI prop mapping accuracy" by tagging them explicitly as **pilot gate metrics** and clarifying that they are measured with and without the `.picasso` rules on the same pilot screens — otherwise the baseline for improvement is missing.

### 2.6 Phases — reflect that Track 2/3 work is already underway

The ticket currently frames Phase 2 as 100% gated on the pilot. In reality:

- Code Connect for 1 component is done.
- Storybook → markdown parser exists.
- Button + Switch AI migration is done.

Change Phase 1 wording from "1 engineer + 1 Design Systems designer" and "Prove the Figma + AI pipeline on real production screens" to:

> "Phase 1 pilot consolidates existing spikes (Button/Switch AI migration, Storybook parser, first Code Connect component, `.picasso` v1) into a measurable end-to-end pipeline on 3–5 real production screens. It does not start from zero."

Add an explicit **Phase 0 (Already done / in flight)** section above Phase 1 so leadership sees that momentum exists:

> **Phase 0 — In flight (no approval needed):**
> - AI migration validated on Button + Switch (Codex)
> - Storybook → markdown parser (Daniel)
> - First Code Connect component shipped
> - `.picasso` v1 draft (attached in Slack)
> - `maestro-prototype-builder` scaffold (Diogo)

### 2.7 Dependencies — sharpen Tailwind 4 and "1 design system" rows

Replace "Design system consolidation decision ('1 design system, 1 UI kit')" with:

> "**Not a hard dependency.** This PI deliberately decouples from the '1 design system / 1 UI kit' decision by delivering an intermediate solution. The decision informs Q3+ direction, not Q2 execution."

For Tailwind 4 / PNPM, add the blocker direction explicitly:

> "**Blocks:** Tailwind 4 preset work in Track 1 cannot merge until PNPM migration lands in consumer repos."

### 2.8 "This PI blocks" — add two items

Add:

- "AI budget allocation for Track 1 migration (blocked until Finance/Eng Leadership approves the AI spend envelope)."
- "Maestro design-library standardization (currently blocked on Figma middleware; today Maestro users must install Figma MCP locally, which is a non-starter for non-engineers)."

### 2.9 Open questions — replace with a cleaner list

Keep existing questions, but also add / clarify:

- **AI migration budget:** What $ envelope and stop-condition are we approving? Who owns the spend?
- **`.picasso` convention ownership:** Is this Picasso-team-owned, Platform-Foundation-owned, or co-owned with the consuming Portal teams?
- **Figma middleware build vs. buy:** Is there a vendor (Anima, Builder.io, custom) or do we build a thin server inside Toptal?
- **Maestro integration depth** (already listed — leave, but mark it as "gated by middleware decision above").
- **Living-system ownership:** Who owns Code Connect + llm index + skills upkeep ongoing (estimated 0.25–0.5 FTE per the proposal doc)?

---

## 3. New sections to add

### 3.1 Strategic stance: "Intermediate solution, not final answer"

Add a short section near the top, right after Value Proposition, that encodes your meeting stance explicitly so the PI doesn't look like a one-shot bet.

> **Why an intermediate solution.** The "1 design system / 1 UI kit" question is primarily organizational and will not resolve inside this PI's horizon. Meanwhile, three forces make commitment to any single end-state risky right now: (1) 20 projects are still on Picasso and cannot be moved quickly; (2) AI tooling is evolving fast (Figma MCP launched late 2024, Code Connect only recently matured, Figma Make is still new); and (3) we do not yet know whether the right long-term home is modernized Picasso, shadcn-based kit, or something else.
>
> This PI therefore delivers the cheapest *optionality-preserving* path: modernize Picasso's internals so it is safe and React 19-ready, and add an AI layer on top of the existing API. If in 6–12 months the answer is "rewrite to shadcn" or "Figma is no longer the source of truth," most of Track 2 (llm index, `.picasso`, skills) still applies, and Track 1 (Base UI + Tailwind) is not wasted — it is the foundation for any future kit.

### 3.2 AI migration budget — new subsection under Phase 2 Track 1

The PI currently does not ask for an AI spend line item. It should. Something like:

> **AI migration budget (Track 1).** Based on Button + Switch prototypes, estimate $X per component × 75 components + Y% buffer for retries. Monthly cap $Z. Ownership: Vedran. Review: monthly with Finance + Platform Foundation lead. Stop condition: if cost/component exceeds 2× estimate on a rolling 5-component window, pause and re-scope.

Replace the placeholders with your numbers before publishing — if no numbers exist yet, mark it as the first decision output of week 1 of the pilot.

### 3.3 Feedback loop — extracting patterns from Portals

Add to Track 2:

> "Once `.picasso` v1 is adopted in one Portal app, run an AI agent against the Portal codebase to extract recurring Picasso usage patterns (common compositions, anti-patterns, house-specific wrappers) and fold the output back into the llm index and skills. This is the pattern-knowledge loop described in the Figma + AI strategy doc and is what closes the gap to shadcn's 'seen it 10,000 times' advantage."

### 3.4 Figma middleware for Maestro — new subsection

Worth its own paragraph because it is the only genuine unknown in the plan:

> **Figma middleware (Track 4).** Maestro cannot depend on Figma MCP directly because (a) MCP assumes a local Figma desktop or API-token setup that non-engineers do not have, and (b) there is no CLI today that replaces it. We will spike two options in week 1 of the pilot:
>
> 1. **Thin in-house middleware** that wraps the Figma REST API + our Code Connect map and exposes it to Maestro over HTTP.
> 2. **Broker via Anima / Builder.io** component-mapping APIs.
>
> Decision exit criterion: whichever option takes <1 engineer-week to a working prototype and <2 engineer-weeks to production. If neither does, Maestro integration drops to "Phase 3" and ships after Track 1 and 2.

---

## 4. Supporting documentation — add the new artifacts

Add to the list at the bottom:

- `.picasso` v1 draft (attached in Slack thread)
- `maestro-prototype-builder` repo: https://github.com/toptal/maestro-prototype-builder
- Storybook → Markdown parser output (Daniel) — link
- Button + Switch AI migration PRs (Oleksandr) — links
- First Code Connect component PR — link

---

## 5. Suggested one-paragraph revised Abstract

For copy-paste convenience, a drop-in replacement for the Abstract:

> Picasso, Toptal's design system, runs on MUI v4 (deprecated since 2021, no security patches) and JSS (unmaintained). It sits under 75% of Toptal's React code across 39 repos and 23 products and blocks React 19 adoption org-wide. At the same time, AI tools (Cursor, Claude Code, Figma Make, Maestro) cannot generate Picasso-aware UI, so every Toptal frontend team is at a productivity disadvantage and Maestro prototypes default to generic frameworks. This PI delivers an intermediate, optionality-preserving solution: modernize Picasso's internals (Base UI + Tailwind) via AI-agent-driven migration, and ship an AI-context layer (Picasso llm index, `.picasso` project rules, Figma Code Connect + Figma Make template, Maestro Picasso project + Figma middleware). The PI starts with a gated 3-week pilot that consolidates existing spikes (AI migration of Button/Switch, Storybook parser, first Code Connect component, `.picasso` v1, Maestro scaffold) into a measurable pipeline before the full investment is committed.

---

## 6. Summary of recommended edits (checklist)

1. Rewrite Abstract to include Maestro and the intermediate-solution framing.
2. Replace "codemod-driven" with "AI-agent-driven (codemod fallback)" and add AI budget to Value Prop + Phases.
3. Rework Scope into the four-track structure (Modernization / AI context / Figma / Maestro).
4. Add "Strategic stance: intermediate solution" section.
5. Add Phase 0 listing work already done.
6. Reframe pilot as consolidation of existing spikes, not greenfield.
7. Add four new Impact metrics (AI cost/component, Portal `.picasso` adoption, llm index coverage, Maestro adoption).
8. Add `.picasso` convention, feedback loop from Portals, and Figma middleware as named deliverables.
9. Update Dependencies: "1 design system" → not a hard dependency; Tailwind 4 → explicit blocker relationship.
10. Update Open Questions with AI budget, `.picasso` ownership, middleware build-vs-buy, and living-system ownership.
11. Update Supporting Documentation with the in-flight artifacts.

If you want, I can apply these directly to the Confluence PI page (I have write access to the Platform Foundation space) — just confirm which section titles to keep verbatim from the current ticket.
