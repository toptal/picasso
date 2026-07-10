# Checkbox — migration plan

## Identity
- Path: `packages/base/Checkbox/`
- Tier: Tier 2 — heavy path (MUI v4 + JSS rewrite)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/checkbox + @base-ui/react/checkbox-group`

## Dependencies
Migration must be applied AFTER:
- FormLabel (Checkbox wraps `<FormControlLabel>` for its label slot)

## Migration scope
- Replace MUI v4 `Checkbox` + `CheckboxGroup` with `@base-ui/react/checkbox` + `@base-ui/react/checkbox-group`.
- Rewrite JSS `createStyles({ root, disabled, withLabel, focused, checkedIcon, uncheckedIcon, indeterminateIcon, labelWithRightSpacing, checkboxWrapper })` to Tailwind classes on @base-ui/react parts.
- `packages/base/Checkbox/package.json`: drop `@material-ui/core` from `peerDependencies`, lift React 19 cap.

## Known gotchas
- Indeterminate state — verify @base-ui/react/checkbox's indeterminate prop maps cleanly. If not, may need a custom render with explicit indeterminate handling.
- CheckboxGroup composition — Base UI uses `<CheckboxGroup>` with controlled `value: string[]`. Check that Picasso's existing API surface (`onChange(values, event)`) preserves verbatim.
- The `<FormControlLabel classes={{ root, label }}>` wrap at line 114 — see `classes handling` below.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports in `src/**`.
- [ ] Indeterminate state still works (Cypress: Checkbox.indeterminate.spec).
- [ ] CheckboxGroup `onChange` signature unchanged.
- [ ] Happo: visual diff ≤0.5% pixel.

## `classes` handling — no-op (audit-verified, no public classes prop)

Cross-tier audit (`decisions/classes-audit.md` §4, corrected) verified:
- Checkbox `extends BaseProps` (line 22) — **NOT** StandardProps.
- No local `classes?: { ... }` declaration.
- The `classes` inside Checkbox.tsx (lines 66+) is a JSS-LOCAL variable (`const classes = useStyles()`), NOT a public prop.
- Internal callsites within Checkbox.tsx that pass `classes={{...}}` to MUICheckbox (line 85) and FormControlLabel (line 114) target those COMPONENTS' classes APIs, not Checkbox's own.
- Checkbox has **no public `classes` prop** to drop, narrow, or preserve.

### Verify per migration (DO this — confirm before assuming no-op)

1. **Source check**:
   - Open `packages/base/Checkbox/src/Checkbox/Checkbox.tsx`.
   - Confirm `extends BaseProps` (line 22).
   - Confirm no local `classes?: { ... }` declaration.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<Checkbox\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0 (Checkbox doesn't accept the prop).

3. **External freshness check** (paranoid):
   ```bash
   gh search code 'Checkbox classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect fragments. If real callsites exist passing `classes` to `<Checkbox>`, they're already broken (TS rejects). Note any.

4. **Action**: **no-op for the public `classes` prop**. Don't add `Omit<StandardProps, 'classes'>` — there's nothing to omit; Checkbox already doesn't extend StandardProps.

5. **Internal rewrite during heavy migration**: the JSS-local `classes.root` / `classes.disabled` / etc. references in Checkbox.tsx body all rewrite as Tailwind classNames on the @base-ui/react/checkbox parts. That's part of the main migration scope, not a `classes`-prop concern.

6. **The line 114 callsite** (`<FormControlLabel classes={{ root, label }}>`) targets FormControlLabel's narrowed surface — preserve verbatim (per FormControlLabel.md).

7. **If source state contradicts**: STOP, update audit §4.

### Forbidden

- Don't `Omit<StandardProps, 'classes'>` if the source doesn't extend StandardProps — that's a no-op TypeScript-wise but adds noise.
- Don't add a public `classes` prop where none exists.
