# Container — migration plan

## Identity
- Path: `packages/base/Container/`
- Tier: Tier 1 — type-only fix (per migration plan v3 §3.2; ~0.1d effort)
- Track: Modernization (PF-1994)
- `target_path`: `none` (no `@base-ui/react` Container; pure layout wrapper, stays custom)

## Dependencies
Migration must be applied AFTER:
- (none — pure layout primitive)

## Migration scope
Per migration plan v3 §3.2 + audit §1.4: **single MUI v4 type import**, no JSS, no runtime MUI usage.

- One MUI v4 type import remains in source:
  - `packages/base/Container/src/Container/Container.tsx` — `import type { PropTypes } from '@material-ui/core'`
- Replace with `React.HTMLAttributes` or a Picasso-native type. `PropTypes` is MUI v4's namespace export carrying enums like `PropTypes.Color`; Container almost certainly uses it for one specific value (likely a `color` prop). Trim to the literal union actually consumed.
- `packages/base/Container/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- `PropTypes` from `@material-ui/core` is a namespace export — when the agent removes it, ensure no other file in the package references `PropTypes.<X>` (that would be a transitive use that gets missed).
- Pure layout wrapper — no Happo drift expected if the public render output is unchanged.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports (including `import type`) in `src/**`.
- [ ] `packages/base/Container/package.json` has no `@material-ui/core` entry.

## Reviewer notes
- One of 5 type-only fixes in the Tier 1 batch (Container, FormLabel, Grid, Notification, OutlinedInput). Pattern is the same: replace MUI-leaked type with own type or React's built-in. Watch for `classes` props that might leak from MUI v4's `StandardProps` extension.

## Slot keys

Per migration plan v4 §2.3, Container preserves a `classes` prop via the `withClasses` shim from `@toptal/picasso-utils`.

```ts
export type ContainerClassKey = 'root'
```

- `root` — the layout wrapper element

Container is a layout primitive; no internal slots beyond root. Tier 1 type-only fix (replace `import type { PropTypes }` from MUI v4) doesn't change this contract.
