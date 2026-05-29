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

## `classes` handling — KEEP FormControlLabel's narrowed surface (audit-verified used)

Cross-tier audit (`decisions/classes-audit.md` §3) found:
- **FormLabel** (`FormLabel.tsx`): extends `BaseProps` only — **no `classes` API**. No-op.
- **FormControlLabel** (`FormControlLabel.tsx`): locally narrows `classes?: { root?, label? }` at lines 27–30. The narrow IS used internally by 3 Picasso components:
  - `packages/base/Switch/src/Switch/Switch.tsx:100`
  - `packages/base/Radio/src/Radio/Radio.tsx:92`
  - `packages/base/Checkbox/src/Checkbox/Checkbox.tsx:114`
- External real callsites: 0.

### Hypothesis to verify

KEEP the FormControlLabel narrowed `classes?: { root?, label? }` surface unchanged during the cleanup migration. FormLabel itself: no-op for `classes`.

### Verify per migration (DO this)

1. **FormLabel.tsx**:
   - Open `packages/base/FormLabel/src/FormLabel/FormLabel.tsx`.
   - Confirm it extends `BaseProps` only (no `StandardProps`).
   - Confirm no `classes` prop declared.
   - Action: no `classes` change.

2. **FormControlLabel.tsx**:
   - Open `packages/base/FormLabel/src/FormControlLabel/FormControlLabel.tsx`.
   - Confirm local `classes?: { root?: string; label?: string }` declaration intact (audit says lines 27–30).
   - Confirm body reads `classes` (audit says line 43 destructure → twMerge usage downstream).

3. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<FormControlLabel\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' packages/
   ```
   Expected: 3 hits in Switch/Radio/Checkbox sources, all using `{ root, label }`. If fewer (callers migrated away) or more (new caller) — note in PR.

4. **Action**: NONE for `classes`. The Tier 1 migration is type-only (replace `import type { FormControlLabelProps }` from MUI v4 with local type). Don't touch the `classes` shape on FormControlLabel.

5. **Defensive check** — if you find the local `classes?: { root, label }` declaration was lost in some past edit and FormControlLabel now extends `StandardProps` without override: STOP, this is a regression. Restore the narrowed declaration.

### Future sunset

FormControlLabel's `classes` surface will eventually be sunset alongside its consumers' migrations (Switch — Tier 0; Radio + Checkbox — Tier 2). Those migrations decide whether to keep the slot API or rewrite callers to use `className`. NOT a concern for this Tier 1 cleanup PR.
