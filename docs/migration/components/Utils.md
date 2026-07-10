# Utils — migration plan

## Identity
- Path: `packages/base/Utils/`
- Tier: Tier 1 — small re-export rewrite (the meatiest Tier 1 unit per migration plan v3 §3.2; ~0.3d effort)
- Track: Modernization (PF-1994)
- `target_path`: `none` (own implementation; consumer-side swap to `@base-ui/react` built-in dismiss is preferred for ClickAwayListener)

## Dependencies
Migration must be applied AFTER:
- (none — Utils is foundational; many components consume Utils' helpers and Transitions)

## Migration scope

This is the only Tier 1 component with **real source-level migration work**. Concretely:

### MUI re-exports to replace

- `packages/base/Utils/src/utils/capitalize.ts:1`
  ```ts
  export { default as capitalize } from '@material-ui/core/utils/capitalize'
  ```
  → Replace with a local 3-line implementation (`s.charAt(0).toUpperCase() + s.slice(1)`). MUI's version handles non-string defensively; mirror that.

- `packages/base/Utils/src/utils/index.ts:33`
  ```ts
  export { default as ClickAwayListener } from '@material-ui/core/ClickAwayListener'
  ```
  → **Strategy:** small custom hook (~15 lines, `useEffect` listening on `document` for `mousedown` / `touchstart` outside the ref'd element). **Not** `@mui/base/ClickAwayListener` — `@mui/base` is the predecessor source stack, not a target. Where consumers are themselves `@base-ui/react` components (Dialog, Popover, Menu), they ship built-in dismiss handling — those consumers should swap to the built-in instead of depending on Utils' export. Per migration plan v3 §3.2 + R17.

### JSS migration (Rotate180 transition)

- `packages/base/Utils/src/utils/Transitions/Rotate180/Rotate180.tsx:5-6`
  ```ts
  import type { Theme } from '@material-ui/core/styles'
  import { makeStyles } from '@material-ui/core/styles'
  ```
- `packages/base/Utils/src/utils/Transitions/Rotate180/Rotate180.tsx:17`
  ```ts
  const useStyles = makeStyles<Theme>(styles, { ... })
  ```
- `packages/base/Utils/src/utils/Transitions/Rotate180/styles.ts:1`
  ```ts
  import { createStyles } from '@material-ui/core/styles'
  ```
- `packages/base/Utils/src/utils/Transitions/Rotate180/styles.ts:4`
  ```ts
  createStyles({ ... })
  ```

→ Convert to Tailwind. Pattern: drive rotation via a `data-rotated` attribute or a conditional class:

```tsx
<div className={cx(
  'transition-transform duration-150 ease-in-out',
  { 'rotate-180': rotated, 'rotate-0': !rotated }
)} />
```

The MUI `<Theme>` type import goes; rotation timing pulls from `tokens/picasso-tailwind-tokens.md` (or stays at `duration-150` if that matches the legacy `theme.transitions.duration.short`).

### package.json

- Drop `@material-ui/core` from `dependencies` AND `peerDependencies`.
- Lift React peer cap to `>=16.12.0`.

## Known gotchas

- `Rotate180` is consumed by Accordion (Tier 3) for the chevron. After migrating Utils, Accordion's Happo will shift transitively — re-record baseline.
- `capitalize` is used in label rendering across many components (search consumer code). The output must remain identical character-for-character.
- `ClickAwayListener` from MUI v4 supports `mouseEvent` and `touchEvent` props for choosing which DOM events to listen on. The custom hook should accept the same options for API parity, or document a codemod entry in `Utils-diff.json`. Consumers that switch to `@base-ui/react` Dialog/Popover/Menu drop the dependency entirely — those don't need the prop.
- 4 JSS calls and 5 MUI imports sounds small but the JSS surface in `Rotate180/styles.ts` may have animation timing that's not 1:1 expressible in Tailwind utilities. Use arbitrary values if needed (`duration-[150ms]`) and add `// TODO(tokens):` comments where Picasso lacks a token.

## Acceptance criteria (component-specific)

- [ ] Zero `@material-ui/*` imports in `src/**` (verified by grep).
- [ ] `capitalize` produces identical output to MUI v4's `capitalize` for all string inputs (Jest snapshot covers this).
- [ ] `ClickAwayListener` API surface preserved or codemod entry filed.
- [ ] `Rotate180` rotation animation visually identical (Happo) — designer review on the timing curve.
- [ ] `packages/base/Utils/package.json` has no `@material-ui/core` entry.

## Reviewer notes

- **Utils is the agent's first real exercise of the JSS-to-Tailwind crib** in PF-1994. If the agent stumbles on `Rotate180`, that's a signal to sharpen `rules/jss-to-tailwind-crib.md` before Tier 2.
- ClickAwayListener replacement strategy is small custom hook by default (per migration plan §3.2 + R17). Consumers that are themselves migrated `@base-ui/react` components (Dropdown via `Menu` + `Popover`, future Dialog usages) should swap to the built-in dismiss instead of depending on Utils' export — coordinate that consumer audit alongside this migration.

## Slot keys

Utils is a utility module, not a DOM-rendering component. The `withClasses` shim does not apply at the package boundary; instead, **Utils EXPORTS the shim itself** (`withClasses` from `packages/base/Utils/src/utils/with-classes.ts`).

```ts
// Not applicable — Utils is a utility module.
// Utils exports `withClasses` for OTHER components to use.
```

Tier 1 cleanup with utility-replacement work: reimplement `capitalize` (1-line) and `ClickAwayListener` (small custom hook), replace `Rotate180` JSS with Tailwind. The shim implementation itself is the headline new utility.
