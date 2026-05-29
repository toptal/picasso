# ModalContext — migration plan

## Identity
- Path: `packages/base/ModalContext/`
- Tier: Tier 1 — already-clean, trivial (~4 LOC, context provider + index; per migration plan v3 §3.2)
- Track: Modernization (PF-1994)
- `target_path`: `none` (already-clean; peer-dep cleanup + React 19 cap lift only)

## Dependencies
Migration must be applied AFTER:
- (none — pure context provider)

## Migration scope
- Source is a 4-line React context. No MUI, no JSS.
- `packages/base/ModalContext/package.json`:
  - Drop `@material-ui/core` from `peerDependencies` (the peer-dep is vestigial; ModalContext doesn't actually import from MUI).
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Smallest Tier 1 component. The migration is exclusively `package.json` cleanup.
- Confirm the `@material-ui/core` peer-dep is actually unused before removing — it could be there as an indirect signal that the modal *consumer* ecosystem expects MUI v4 to be present. If yes, document the rationale in the PR; if no, just drop it.

## Acceptance criteria (component-specific)
- [ ] `packages/base/ModalContext/package.json` has no `@material-ui/core` entry.
- [ ] Build + types green (this is the entire test surface for a 4-LOC context provider).

## Slot keys

ModalContext is a React context provider, not a DOM-rendering component. The `withClasses` shim does not apply: there are no slots to route classes to.

```ts
// Not applicable — ModalContext is context-only.
```

Tier 1 already-clean: the cleanup is package.json delta (drop `@material-ui/core` peer-dep + lift React 19 cap). Public API is the context provider's value shape, not classes.
