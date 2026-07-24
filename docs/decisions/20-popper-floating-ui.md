# Popper positioning with Floating UI

## Problem

Picasso ships a standalone `<Popper>` component (`@toptal/picasso-popper`) for positioning floating content relative to an anchor. It is used by `Dropdown` and by a number of bespoke consumer sites that need positioning **without** full popover semantics (focus management, dismiss-on-outside-click).

Picasso's UI primitives moved to `@base-ui/react` (see [ADR 22](22-base-ui-tailwind-modernization.md)), which — unlike `@material-ui/core` — does **not** ship a standalone positioning primitive: positioning lives inside `Tooltip` / `Popover` / `Menu` / `Dialog`. So there is no drop-in Base UI primitive for a standalone `<Popper>`, and the component's public API must be preserved for its consumers.

## Decision

Picasso's `<Popper>` keeps its public API; internally it is positioned with a **direct dependency on `@floating-ui/react`**.

`@floating-ui/react` is chosen because:

- **It's already in the tree.** `@base-ui/react` uses Floating UI internally, so promoting it from a transitive to a direct dependency adds zero net weight for Picasso consumers and avoids resolving a second positioning library.
- **It's the de-facto standard.** Floating UI is the positioning engine behind Radix, Mantine, Headless UI, and Base UI itself — stable, mature, and framework-agnostic.
- **Its hook API maps cleanly.** `useFloating`, `useDismiss`, `useInteractions` fit Picasso's existing open/close lifecycle (`useState` + `useEffect`) without an architectural change.

## Alternatives

| Option | Description | Verdict |
|---|---|---|
| **Floating UI (chosen)** | `<Popper>` positions with `@floating-ui/react` | ✅ Minimal blast radius; already a transitive dep; preserves the public API |
| Refactor consumers onto `Popover` | Move every `<Popper>` consumer to `@base-ui/react/popover`'s built-in positioning | ❌ Popover semantics differ (focus management, dismiss-on-outside-click) — too large a behavior change, and standalone-positioning sites don't want full popover semantics |
| Deprecate `<Popper>` | Offer only `Dropdown` / `Menu` positioning | ❌ Breaking API change; standalone-positioning sites have no Picasso substitute |

## Implementation

The existing `anchorEl` / `open` / `placement` public props drive Floating UI's middleware:

```tsx
import { useFloating, autoUpdate, flip, offset, shift } from '@floating-ui/react'

const { refs, floatingStyles } = useFloating({
  open,
  placement, // same 'top' | 'bottom' | 'left' | 'right' (+ -start / -end) enum, preserved verbatim
  middleware: [offset(8), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate,
  elements: { reference: anchorEl },
})
```

A MUI-style `modifiers` prop maps onto Floating UI middleware (`flip`, `shift`, `offset`, `arrow`, `hide`, `size`, `autoPlacement`) for the common cases. Pin `@floating-ui/react` to the major already pulled by `@base-ui/react` so only one copy is resolved.

## Future direction

If a future `@base-ui/react` release ships a standalone positioning primitive, revisit this decision. Longer term, consumers that are themselves Base UI components (`Dropdown`, `Menu`) may adopt `@base-ui/react/popover`'s built-in positioning directly, after which Picasso's standalone `<Popper>` could be retired — a separate track, not part of this decision.
