# Tooltip — migration plan

## Identity
- Path: `packages/base/Tooltip/`
- Tier: Tier 2 — heavy path
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/tooltip`

## Dependencies
Migration must be applied AFTER: (none — independent within Tier 2)

Migration is a DEPENDENCY of: FileInput, picasso-rich-text-editor.

## Migration scope
- Replace MUI v4 `Tooltip` with `@base-ui/react/tooltip` composition: `Tooltip.Provider` + `Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` + `Tooltip.Positioner` + `Tooltip.Popup`.
- Rewrite JSS `createStyles({ tooltip, arrow, light, compact, noMaxWidth })` (5 keys) to Tailwind on @base-ui/react parts.
- `packages/base/Tooltip/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap.

## Known gotchas
- Tooltip.Provider scope: @base-ui/react requires `<Tooltip.Provider>` ancestor for `delay` settings. Either wrap each `<Tooltip>` (more boilerplate, scoped delay) or expect consumers to provide a top-level provider. Default in Picasso: wrap each instance with its own minimal provider.
- `arrow` slot: Picasso's existing Tooltip has an `arrow` JSS slot. Map to `<Tooltip.Arrow>` part with Tailwind classes.
- Light variant + compact variant + noMaxWidth — these are conditional class names; keep the same prop API (`variant`, `compact`, `noMaxWidth`) and map internally.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports in `src/**`.
- [ ] `arrow` rendering preserved (Cypress tooltip-arrow test).
- [ ] Variant prop API unchanged (`variant?: 'dark' | 'light'`).
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — no-op (audit-verified, no public classes prop)

Cross-tier audit (`decisions/classes-audit.md` §4, corrected) verified:
- Tooltip `extends BaseProps, HTMLAttributes<HTMLDivElement>` (line 59) — NOT StandardProps.
- No local `classes?: { ... }` declaration.
- The `classes` references at line 136+ are JSS-LOCAL (`const classes = useStyles()`), not the public prop.
- Internal callsite at line 200 passes `classes={{...}}` to MUITooltip (the MUI wrapper), targeting that component's API.
- Tooltip has **no public `classes` prop** to drop.

### Verify per migration (DO this)

1. **Source check**: confirm `extends BaseProps, HTMLAttributes`. Confirm no local `classes?: { ... }`. Confirm JSS-local `useStyles()` at line 136.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<Tooltip\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 1 hit in Tooltip.tsx itself (line 200 — passing to MUITooltip, which gets replaced by @base-ui/react/tooltip parts during migration).

3. **External freshness check**:
   ```bash
   gh search code 'Tooltip classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect fragments. Audit confirms 0 real external callsites; verify.

4. **Action**: **no-op for the public `classes` prop**. During the migration, rewrite the body's JSS-local `classes.arrow` / `classes.tooltip` / etc. as Tailwind classNames on @base-ui/react/tooltip parts (`<Tooltip.Arrow className=...>`, `<Tooltip.Popup className=...>`, etc.). That's main-migration scope, not a `classes`-prop concern.

5. **If source state contradicts** (e.g. source actually extends StandardProps): STOP, update audit.

### Forbidden

- Don't `Omit<StandardProps, 'classes'>` if source extends `BaseProps` — no-op edit that adds noise.
- Don't add a public `classes` prop where none exists.
