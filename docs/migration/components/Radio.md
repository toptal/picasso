# Radio — migration plan

## Identity
- Path: `packages/base/Radio/`
- Tier: Tier 2 — heavy path (MUI v4 + JSS rewrite)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/radio + @base-ui/react/field`

## Dependencies
Migration must be applied AFTER:
- FormLabel (Radio wraps `<FormControlLabel>` for its label slot)

## Migration scope
- Replace MUI v4 `Radio` + `RadioGroup` with `@base-ui/react/radio` + `@base-ui/react/field`.
- RadioGroup composition: @base-ui/react doesn't ship a RadioGroup primitive — use `@base-ui/react/field` for the group container with own context.
- Rewrite JSS `createStyles({ root, disabled, withLabel, focused, uncheckedIcon, checkedIcon })` (6 keys) to Tailwind on @base-ui/react parts.
- `packages/base/Radio/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap.

## Known gotchas
- Group context: Picasso's existing `RadioGroup` provides a context (`name`, `value`, `onChange`) consumed by child `<Radio>` items. Preserve that contract — children should continue to work as a controlled group.
- `<FormControlLabel classes={{ root, label }}>` wrap at line 92 — same plumbing pattern as Checkbox.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports in `src/**`.
- [ ] RadioGroup context API preserved.
- [ ] Happo: visual diff ≤0.5% pixel.

## `classes` handling — drop public surface (audit-verified)

Cross-tier audit (`decisions/classes-audit.md` §4) flagged Radio's `classes`:
- Source `extends StandardProps` (line 17) — open-ended inherited.
- Body reads `classes` for plumbing (line 69: passed to MUIRadio, line 92: passed to FormControlLabel).
- Internal callsites passing `<Radio classes={{...}}>`: 0.
- External real callsites: 0.

### Hypothesis to verify

Drop public `classes` via `Omit<StandardProps, 'classes'>` + runtime backstop. Internal plumbing rewrites with the @base-ui/react migration.

### Verify per migration (DO this)

1. **Source**: confirm `extends StandardProps` (line 17). Confirm 6 JSS keys in styles.ts. Confirm body reads are plumbing-only.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<Radio\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0.

3. **External freshness check**:
   ```bash
   gh search code 'Radio classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect fragments.

4. **Action if confirmed**: `extends Omit<StandardProps, 'classes'>` + `classes: _classes` destructure backstop. Rewrite slot-routing on @base-ui/react/radio parts.

5. **If contradicted**: STOP, update audit.

6. **No diff JSON**.
