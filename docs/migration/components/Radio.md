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
  **SUPERSEDED 2026-06-10 — see §"target_path deviation" below: implemented on a native
  `<input type="radio">` + own context instead.**
- RadioGroup composition: @base-ui/react doesn't ship a RadioGroup primitive — use `@base-ui/react/field` for the group container with own context.
  **(Factually outdated: `@base-ui/react@1.4.1` DOES ship `radio-group`. Irrelevant either way per the deviation rationale below.)**
- Rewrite JSS `createStyles({ root, disabled, withLabel, focused, uncheckedIcon, checkedIcon })` (6 keys) to Tailwind on @base-ui/react parts.
- `packages/base/Radio/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap.

## target_path deviation — native `<input type="radio">` (agent-proposed 2026-06-10, OPERATOR REVIEW REQUESTED)

The plan's `target_path` (`@base-ui/react/radio + @base-ui/react/field`) cannot satisfy
`rules/api-preservation.md` for this component. Evidence from
`node_modules/@base-ui/react/radio/root/RadioRoot.js` (v1.4.1):

- `checked = groupContext ? checkedValue === value : value === ''` — there is **no `checked`
  prop**; a group-less `Radio.Root` is inert (`setCheckedValue = NOOP` standalone, and its
  hidden-input `onChange` early-returns when `value === undefined`).
- Picasso's public contract requires: standalone `checked` (Checked story + consumers),
  uncontrolled click-to-check (Default/CustomLabel stories), per-item
  `onChange(event, checked)`, and external `<label htmlFor>` association — all unreachable
  or inert on a group-less Base UI radio. Wrapping every standalone radio in its own
  `RadioGroup` would emit a spurious `div[role=radiogroup]` per radio (a11y + DOM regression).
- `@base-ui/react@1.4.1` DOES ship a `radio-group` primitive (plan note outdated), but that
  does not close the standalone-`checked` gap, which is the decisive blocker.

Chosen approach (matches the crib's "no analog → stay custom" path — Backdrop/Badge/FileInput
precedent): root `<span>` + visually-hidden native `<input type="radio">` + Tailwind
pseudo-element icons; `Radio.Group` = `div[role=radiogroup]` + Picasso-internal
`RadioGroupContext` replicating MUI's `{name, value, onChange}` contract (incl. uncontrolled
`defaultValue`). Native inputs preserve keyboard/form/label semantics that the old MUI
implementation also relied on.

All component-specific acceptance criteria hold under this approach (zero `@material-ui/*`
imports; group context contract preserved; Storybook-Happo green as of iter 2). Full
rationale + per-fix history: PR description. If the operator prefers the Base UI composition
despite the API gaps, escalate before merge — do not silently rework.

## Approved visual deltas

Intentional, designer-accepted visual change shipped with this migration. The Happo gate
waives the snapshots listed below (per-snapshot; any *unlisted* diff still fails).

**Reason.** `Radio.Group`'s `spacing` prop was silently ignored on master — the line
`spacing ?? horizontal ? themeSpacing(2) : 0` parses (by JS precedence) as
`(spacing ?? horizontal) ? 16 : 0`, so any non-nullish `spacing` was forced to `16px`. The
migration corrects this to `spacing ?? (horizontal ? 16 : 0)`, so the prop is now honored.
The picasso-forms Form Default story (`packages/picasso-forms/src/Form/story/Default.example.tsx:109`,
`<RadioGroup horizontal spacing={8}>`) therefore renders an **8px** gap where master forced
**16px** — a deliberate fix, confirmed intended (8px is the design-correct gap). See the
`@toptal/picasso-radio` changeset.

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
