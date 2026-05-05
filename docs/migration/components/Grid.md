# Grid — migration plan

## Identity
- Path: `packages/base/Grid/`
- Tier: Tier 1 — type-only fix (per migration plan v3 §3.2; ~0.1d effort)
- Track: Modernization (PF-1994)
- `target_path`: `none` (no `@base-ui/react` Grid; pure CSS Grid + Tailwind, stays custom)

## Dependencies
Migration must be applied AFTER:
- (none — Grid is a layout primitive)

## Migration scope
Per migration plan v3 §3.2 + audit §1.4: **single MUI v4 type re-export**, no JSS, no runtime MUI usage.

- One MUI v4 type re-export remains in source:
  - `packages/base/Grid/src/...` — `export type { GridSize } from '@material-ui/core/Grid'`
- Define a Picasso-native `GridSize` literal type union locally. MUI v4's `GridSize` is `false | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12` — replicate as needed (Picasso's existing usage probably already constrains to a subset).
- `packages/base/Grid/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Page (Tier 3) consumes Grid heavily for the responsive shell. Grid's public type surface (especially `GridSize`) must stay stable so Page's migration doesn't trigger cascading type errors.
- Picasso's `tokens/picasso-tailwind-tokens.md` §Spacing has `maxWidth` 12-column tokens (`max-w-1/12` ... `max-w-11/12`) — Grid likely uses these internally already; don't reach for arbitrary values when migrating.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports / re-exports in `src/**`.
- [ ] `GridSize` is exported from Grid's public API with the same name and accepts the same value range.
- [ ] `packages/base/Grid/package.json` has no `@material-ui/core` entry.

## Reviewer notes
- Grid stays custom (no `@base-ui/react` Grid analog). The migration is genuinely just a type-import replacement plus peer-dep cleanup.
