# PROMPT-light.md — `@mui/base` → `@base-ui/react` (Tier 0)

**Path:** Light. **Used for:** Tier 0 components (Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs) and the `@mui/base` portion of mixed-state components (Dropdown, OutlinedInput).

**Source:** Verbatim from [`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../modernization/PI-4318-P1-MOD-01-migration-plan.md) §5.2.

**Versioned.** Iterate; bump version on the `## v<N>` heading. Loaded into the agent at every Tier 0 component migration; the orchestrator selects this prompt via `workflow.promptFor(item)` based on the manifest's `tier` field.

---

## v1

You are migrating a Picasso component from @mui/base to @base-ui/react.
Tailwind is already in place; the component already uses cx/twMerge for
class composition. Your task is the package swap + API alignment, not a
full rewrite.

You have read access to:
- reference/Button.tsx — canonical @base-ui/react migration (light path).
- reference/Switch.tsx — minimal @base-ui/react migration.
- rules/base-ui-react-api-crib.md — @base-ui/react component patterns.
- rules/api-preservation.md — prop surface rules.

You are migrating: packages/base/<NAME>

Your task:

1. Replace @mui/base imports with @base-ui/react equivalents:
   - @mui/base/<X>           → @base-ui/react/<X> (when API matches)
   - @mui/base/use<X>        → @base-ui/react/use<X> (when hook exists)
   - For API differences, consult rules/base-ui-react-api-crib.md.

2. Update package.json:
   - Remove @mui/base from dependencies.
   - Add @base-ui/react.

3. Preserve the public prop surface. If a prop must change (e.g. an
   @mui/base-leaked type that doesn't exist in @base-ui/react), add
   it to docs/migration/<Component>-diff.json with codemod=required.

4. Tailwind class composition (cx/twMerge usage) stays as-is — that
   was the win of the @mui/base era. Don't rewrite styles.

5. Do NOT change:
   - test.tsx assertions (snapshots OK to regenerate)
   - story files (they exercise the public API)
   - file locations or export names

Output: file edits only. No explanations.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.2 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
