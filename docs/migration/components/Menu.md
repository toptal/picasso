# Menu — migration plan

## Identity
- Path: `packages/base/Menu/`
- Tier: Tier 1 — package.json cleanup only (per migration plan v3 §3.1 / §3.2; ~0.05d effort)
- Track: Modernization (PF-1994)
- `target_path`: `none` (source already migrated to `@toptal/picasso-popper` + `@toptal/picasso-paper`; no further primitive change)

## Dependencies
Migration must be applied AFTER:
- (none — Menu's source is already on Picasso primitives)

## Migration scope
Per migration plan v3 §3.1 (Tier 0 table footnote) + §3.2 (Tier 1 table): **source already migrated**, only the stale `@mui/base` package.json declaration remains.

- Source has zero `@material-ui/*` imports and zero `@mui/base` runtime imports.
- `packages/base/Menu/package.json`:
  - Drop the stale `@mui/base` declaration (likely in `dependencies` or `peerDependencies` from a prior partial migration).
  - Confirm `@material-ui/core` is absent (likely already gone).
  - Lift React peer cap to `>=16.12.0` if not already.

## Known gotchas
- Menu currently composes `@toptal/picasso-popper` (Tier 2 migration target) for positioning. **After Popper (Tier 2) migrates** — likely to `@floating-ui/react` per [`decisions/popper-replacement.md`](../decisions/popper-replacement.md) — Menu's positioning may shift. That's downstream re-validation, not a blocker for this Tier 1 cleanup.
- Verify there's no consumer code in active repos importing `@mui/base/Menu` from Picasso's re-export surface (shouldn't be, but grep before removing).

## Acceptance criteria (component-specific)
- [ ] `packages/base/Menu/package.json` has no `@mui/base` entry and no `@material-ui/core` entry.
- [ ] No source changes needed; build + types green.

## Reviewer notes
- The smallest of all Tier 1 units. This entry exists in the manifest mainly for hygiene — without it, the next package-deps audit would still flag Menu's package.json. Quick win.
