# Form — migration plan

## Identity
- Path: `packages/base/Form/`
- Tier: Tier 1 — already-clean (~767 LOC across 11 thin subcomponents; per migration plan v3 §3.2)
- Track: Modernization (PF-1994)
- `target_path`: `none` (already-clean; peer-dep cleanup + React 19 cap lift only)

## Dependencies
Migration must be applied AFTER:
- FormLabel (FormControlLabel re-uses FormLabel)
- Typography (FormError, FormHint, FormWarning render `<Typography>`)

## Migration scope
- Source is MUI-clean (verified: 0 `@material-ui/*` imports, 0 JSS calls in `src/`).
- `packages/base/Form/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.
- Confirm `@toptal/picasso-tailwind-merge` is listed as a peer-dep (search the file).
- 11 subcomponents (FieldRequirements, Form, FormActionsContainer, FormAutoSaveIndicator, FormCompound, FormError, FormField, FormHint, FormLevelError, FormLevelWarning, FormWarning) — check each for any lingering `style={{ ... }}` that should move to Tailwind. The grep showed zero MUI/JSS, but inline style cleanup may still be in scope.

## Known gotchas
- `FormCompound` is a barrel re-export — don't break the public surface.
- `FormError` / `FormLevelError` / `FormLevelWarning` use ARIA live-regions; preserve the `aria-live` attribute exactly during any class-name churn.
- 767 LOC sounds heavy but it's distributed across 11 small files; treat each subcomponent independently.

## Acceptance criteria (component-specific)
- [ ] All 11 subcomponents pass Happo pixel-identical.
- [ ] No `style={{ ... }}` introductions; existing dynamic styles either retained (if truly dynamic) or moved to Tailwind class arrays.
- [ ] `packages/base/Form/package.json` has no `@material-ui/core` entry.
- [ ] Cypress component spec (`cypress/component/Form.spec.tsx`) passes — Form is one of the few Tier 1 components with a Cypress spec; do not skip.

## Reviewer notes
- The Cypress spec is load-bearing for Form. If it asserts on class names (bad practice but possible), flag and fix as a separate change before merge.
- ARIA semantics matter to a11y compliance audits — review any class changes around live-regions carefully.

## Slot keys

**Not applicable.** Per the May 2026 audit, Form does not currently expose a `classes` prop in its public Props (neither directly nor via `StandardProps`). The migration is a clean swap; do not add `withClasses`. Adding it would be net-new API, not preservation. See `decisions/classes-shim.md` for the strict-preservation policy.

Implementation note: already-clean (Tier 1 cleanup); migration is package.json delta only.
