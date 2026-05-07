# FormLabel — migration plan

## Identity
- Path: `packages/base/FormLabel/`
- Tier: Tier 1 — leaf, small surface (~270 LOC across FormLabel + FormControlLabel)
- Track: Modernization (PF-1994)

## Dependencies
Migration must be applied AFTER:
- Typography (FormLabel renders `<Typography>` for the label text)

## Migration scope
Per migration plan v3 §3.2: **Tier 1 type-only fix**. No primitive change; `target_path: "none"`. Switch + Checkbox + Radio all depend on FormLabel — sequence early in the Tier 1 batch.

- One MUI v4 type import remains in source:
  - `packages/base/FormLabel/src/FormControlLabel/FormControlLabel.tsx:3` — `import type { FormControlLabelProps } from '@material-ui/core/FormControlLabel'`
- Replace with a Picasso-native `FormControlLabelProps` shape defined locally. The MUI v4 type is mostly `{ control, label, value, disabled, onChange }` plus class-key props that don't apply post-migration. Trim to the props Picasso actually uses. Strip `classes` (inherited from MUI's `StandardProps`).
- `packages/base/FormLabel/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- `FormControlLabel` wraps a control (Switch, Checkbox, Radio) and a label. The wrapped control's `disabled` and `value` flow through props; preserve that contract verbatim.
- `htmlFor` linkage is a11y-critical — any class-name churn must not break the label-for-input association.
- No Cypress spec for FormLabel (verified). Coverage is via Jest snapshots + Happo only.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports (including `import type`) in `src/**`.
- [ ] `FormControlLabelProps` is exported from FormLabel's public API with the same name (consumer code may reference it).
- [ ] `packages/base/FormLabel/package.json` has no `@material-ui/core` entry.

## Reviewer notes
- The type-only import is the smallest possible "real source migration" in Tier 1 — useful as the agent's first iteration after Note's dep-only canary. Watch for the agent picking up subtle differences in the type shape (MUI v4's `FormControlLabelProps` extends `StandardProps` which carries `classes` — strip that).

## Slot keys

Per migration plan v4 §2.3, FormLabel preserves a `classes` prop via the `withClasses` shim from `@toptal/picasso-utils`.

```ts
export type FormLabelClassKey = 'root' | 'label'
```

- `root` — the wrapper element (e.g., a `<label>` or container)
- `label` — the label text node (when wrapped distinctly from the form-control)

Tier 1 type-only fix (replace `FormControlLabelProps` import from MUI v4 with own type). The `classes` contract is preserved verbatim.
