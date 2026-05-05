# PROMPT.md — v1 (DEPRECATED)

> **DEPRECATED — DO NOT USE.** This prompt was authored against the v1 migration plan, which incorrectly named **`@mui/base`** as the target stack. The May 2026 v3 re-audit ([`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../../modernization/PI-4318-P1-MOD-01-migration-plan.md)) corrects this: the target is **`@base-ui/react` v1.4.1+** ([base-ui.com](https://base-ui.com)). `@mui/base` is the predecessor of `@base-ui/react` and is itself a **source** stack to migrate away from, never a target.
>
> Live prompts are now split by migration path:
> - [`PROMPT-light.md`](../PROMPT-light.md) — `@mui/base` → `@base-ui/react` (Tier 0).
> - [`PROMPT-heavy.md`](../PROMPT-heavy.md) — MUI v4 + JSS → `@base-ui/react` + Tailwind (Tier 1 type fixes, Tier 2, Tier 3, sibling packages, provider).
>
> This file is preserved for diffability against the v1 misconception. Do not feed it to the agent.

---

# Migration prompt (v1)

**Versioned.** Iterate; bump version on the `## v<N>` heading, leave older versions in `archive/` for diff purposes. Loaded into the agent at every component migration.

---

## v1

You are migrating a component from Picasso's legacy stack (MUI v4 + JSS) to Picasso's modern stack (Tailwind + `@mui/base`).

You have read access to:

- `reference/Button.tsx` — canonical Tailwind-migrated reference.
- `reference/Switch.tsx` — minimal Tailwind-migrated reference.
- `rules/styling.md`, `rules/api-preservation.md`, `rules/jss-to-tailwind-crib.md` — three rule files you MUST follow.
- `tokens/picasso-tailwind-tokens.md` — the tokens available.
- `components/<Name>.md` — per-component plan with dependencies, gotchas, and component-specific acceptance criteria.

You are migrating: `packages/base/<NAME>`.

### Your task

1. **Replace `@material-ui/core` imports:**
   - `@material-ui/core/<Component>` → `@mui/base/<Component>` when available.
   - `@material-ui/core/styles` → delete; styles move to Tailwind classes.
   - `@material-ui/core/PicassoTheme` → delete; use tokens directly via Tailwind classes.

2. **Replace JSS with Tailwind:**
   - Every `createStyles` / `makeStyles` object becomes either:
     a) inline `className={cx(...)}` if styles are static, or
     b) a helper function in `styles.ts` returning `string[]` (Button pattern).
   - JSS parent-refs like `&$expanded` convert to Tailwind pseudo-classes or conditional class arrays driven by component state.
   - Raw hex / px values: use Picasso Tailwind tokens where they exist. Otherwise keep the literal AND add `// TODO(tokens): <description>` so P1-FIG-03 can triage.

3. **Preserve the public prop surface** EXCEPT where a prop leaks an MUI v4 type (e.g., `classes: Classes`) that cannot be preserved. If you remove a prop, add it to a machine-readable diff at `docs/migration/<Component>-diff.json`.

4. **Update the component's `package.json`:**
   - Remove `@material-ui/core` from `dependencies` AND `peerDependencies`.
   - Add `@mui/base` if used.
   - Add `@toptal/picasso-tailwind-merge` (peer) and `@toptal/picasso-tailwind` (peer) if not already present.
   - Lift the React peer cap: `"react": ">=16.12.0"` (drop the `< 19.0.0` upper bound).

5. **Do NOT change:**
   - `test.tsx` assertions (snapshots will regenerate; assertions stay).
   - Story files (they exercise the public API).
   - File locations or export names.

### Output contract

- File edits only. Do not write explanations. Do not narrate.
- Stop when all files under `packages/base/<NAME>/src/**` are updated AND `package.json` is updated.
- The orchestrator runs `bin/migration-gate.sh <NAME>` after you stop. If gates fail, you receive a follow-up prompt with the failing report.

### Constraints

- **Hard iteration cap:** 3 attempts. After the third, the orchestrator escalates to a human.
- **No `@material-ui/styles` survivors.** Including type-only imports.
- **No JSS parent-refs.** Convert every `&$x` to a conditional class.
- **No `style={{...}}`** unless the value is genuinely dynamic at runtime (user-provided, computed from refs, etc.).

### Tier-specific notes

The orchestrator selects context based on the component's tier:

- **Tier 1** (leaf, ≤150 LOC): you get the prompt + Switch reference + tokens + per-component plan. Short and lean.
- **Tier 2** (compound, 150–400 LOC): adds the Button reference + relevant rule docs.
- **Tier 3** (composite, 400+ LOC): adds Happo screenshots of the current state + `references/subagent-playbook.md` (consider parallel exploration subagents) + failing-iteration history if any.

---

## Open questions (resolve during pilot wk1)

- Does the agent reliably follow "don't explain" across iterations? Claude Code does well; document tool-specific wrappers if needed.
- Should the prompt include Happo screenshots of the current state for Tier 1, or save them for Tier 3? Current call: Tier 3 only.

## Changelog

- **v1** — Initial draft. Lifted from `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` §5.2 with §4 of the Phase 0 Codex prompt folded in.
