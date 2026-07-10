# Migration plan — pointer

The authoritative Picasso migration plan is **[`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../modernization/PI-4318-P1-MOD-01-migration-plan.md)** (v3, May 4, 2026 re-audit).

That document is the single source of truth for:

- **Tier inventory** (28 base/* component-migration units + 4 sibling packages = 32 manifest entries; Tier 0 / 1 / 2 / 3 / 4 / 5 — see [§3](../modernization/PI-4318-P1-MOD-01-migration-plan.md#3-tier-inventory-v3--may-2026-re-audit))
- **Target stack** (`@base-ui/react` v1.4.1+ + Tailwind 4 — [§1.3](../modernization/PI-4318-P1-MOD-01-migration-plan.md#13-base-uireact-status))
- **Per-component target mapping** ([§3.1](../modernization/PI-4318-P1-MOD-01-migration-plan.md#31-tier-0--mui-base--base-uireact-light-path-8-components), [§3.3](../modernization/PI-4318-P1-MOD-01-migration-plan.md#33-tier-2--heavy-migrations-6-components), [§3.4](../modernization/PI-4318-P1-MOD-01-migration-plan.md#34-tier-3--heavy-composites-3-components))
- **Dependency map** ([§3.7](../modernization/PI-4318-P1-MOD-01-migration-plan.md#37-migration-ordering-dependency-aware))
- **Per-component playbook** ([§4](../modernization/PI-4318-P1-MOD-01-migration-plan.md#4-per-component-migration-playbook))
- **AI prompts (light + heavy)** ([§5.2 / §5.3](../modernization/PI-4318-P1-MOD-01-migration-plan.md#5-ai-prompt--context-pack))
- **Risk register** ([§8](../modernization/PI-4318-P1-MOD-01-migration-plan.md#8-risk-register), R1–R17)
- **Open architectural decisions** ([§9.8](../modernization/PI-4318-P1-MOD-01-migration-plan.md#98-open-decision-popper--backdrop--standalone-positioning-replacement) — Backdrop + Popper replacement)
- **Phase-2 sequence** ([§10](../modernization/PI-4318-P1-MOD-01-migration-plan.md#10-sequence-proposal-phase-2))

This `docs/migration/` directory hosts the **operational tooling** that executes against that plan:

| Asset | Purpose |
|---|---|
| [`ORCHESTRATOR.md`](./ORCHESTRATOR.md) | Runbook for `bin/migration-orchestrator.ts`. |
| [`PROMPT-light.md`](./PROMPT-light.md) / [`PROMPT-heavy.md`](./PROMPT-heavy.md) | Path-specific migration prompts. |
| [`manifest.json`](./manifest.json) + [`manifest.schema.json`](./manifest.schema.json) | The autonomous-loop work queue (32 entries). |
| [`components/`](./components/) | Per-component plan files (Tier 0 + Tier 1; Tier 2/3/4/5 deferred to their tickets). |
| [`rules/`](./rules/) | Non-negotiable rules (styling, API preservation, JSS-to-Tailwind crib, `@base-ui/react` API crib). |
| [`tokens/`](./tokens/) | Picasso Tailwind token reference. |
| [`references/`](./references/) | On-demand context (agent loop, PR workflow, commit conventions, subagent playbook, escalation). |
| [`decisions/`](./decisions/) | Locked architectural decisions (Backdrop replacement, Popper replacement). |
| [`archive/`](./archive/) | Deprecated content preserved for diffability (e.g. v1 PROMPT.md). |

## Why a pointer instead of a copy

A previous version of this file (v1, ~28KB) duplicated the migration plan content in-tree. The May 2026 v3 re-audit ([`docs/modernization/`](../modernization/)) corrected the target stack from `@mui/base` to `@base-ui/react`, which made the duplicated content stale on a critical detail. **One source of truth** prevents that drift class. PF-1992 Step 7 consolidates here: the plan lives upstream; the operational tooling lives in this directory; this file is the bridge.

## Quick links into the plan

- **What's the current state?** [§1.4 per-component source-stack audit](../modernization/PI-4318-P1-MOD-01-migration-plan.md#14-per-component-source-stack-audit-may-2026)
- **What does "migrated" mean?** [§2](../modernization/PI-4318-P1-MOD-01-migration-plan.md#2-what-migrated-means)
- **How does the per-component loop work?** [§4](../modernization/PI-4318-P1-MOD-01-migration-plan.md#4-per-component-migration-playbook)
- **Which prompt do I use for which tier?** [§5](../modernization/PI-4318-P1-MOD-01-migration-plan.md#5-ai-prompt--context-pack)
- **What do I do about Backdrop / Popper not having `@base-ui/react` analogs?** [§9.8](../modernization/PI-4318-P1-MOD-01-migration-plan.md#98-open-decision-popper--backdrop--standalone-positioning-replacement) + [`decisions/`](./decisions/)
- **What's the Phase-2 calendar?** [§10](../modernization/PI-4318-P1-MOD-01-migration-plan.md#10-sequence-proposal-phase-2) + [`docs/modernization/PI-4318-timeline_final.md`](../modernization/PI-4318-timeline_final.md)
