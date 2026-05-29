# FormLayout — migration plan

## Identity
- Path: `packages/base/FormLayout/`
- Tier: Tier 1 — already-clean, trivial (~66 LOC, single subcomponent FieldsLayout; per migration plan v3 §3.2)
- Track: Modernization (PF-1994)
- `target_path`: `none` (already-clean; peer-dep cleanup + React 19 cap lift only)

## Dependencies
Migration must be applied AFTER:
- (none — FormLayout is a layout primitive; no base dependencies)

## Migration scope
- Source is fully MUI-clean (verified: 0 `@material-ui/*`, 0 JSS).
- `packages/base/FormLayout/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Single subcomponent (FieldsLayout). Whole package is ~66 LOC. The migration is trivial; expect a clean one-shot.
- No Cypress spec; Jest + Happo are the safety net.

## Acceptance criteria (component-specific)
- [ ] `packages/base/FormLayout/package.json` has no `@material-ui/core` entry.
- [ ] Happo: 0 pixel diff vs baseline.

## Slot keys

**Not applicable.** Per the May 2026 audit, FormLayout does not currently expose a `classes` prop in its public Props (neither directly nor via `StandardProps`). The migration is a clean swap; do not add `withClasses`. Adding it would be net-new API, not preservation. See `decisions/classes-shim.md` for the strict-preservation policy.

Implementation note: already-clean (Tier 1 cleanup); migration is package.json delta only.
