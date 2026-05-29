# Decision — Popper replacement

**Status:** **LOCKED** (PF-1992 spike).
**Date:** 2026-05-04.
**Risk reference:** [migration plan v3 §9.8 R15](../../modernization/PI-4318-P1-MOD-01-migration-plan.md#98-open-decision-popper--backdrop--standalone-positioning-replacement).
**Affected manifest entries:** `Popper` (Tier 2), transitively `Dropdown` (Tier 3) and any other consumers of `@toptal/picasso-popper`.

---

## Decision

Replace Picasso's standalone Popper with a **direct dependency on `@floating-ui/react`** for the rare standalone-positioning use sites. Picasso's `<Popper>` public API stays; the internal implementation swaps from `@material-ui/core/Popper` (current) to `@floating-ui/react`.

**`manifest.json` `target_path` for Popper: `@floating-ui/react`.**

Consumers of `<Popper>` that are themselves migrated `@base-ui/react` components (Dropdown, Menu after Tier 3) **may** refactor to use `@base-ui/react/popover`'s built-in positioning instead — that's a follow-up post-PI, not a v3 commitment.

## Why

`@base-ui/react` v1.4.1 does **not** ship a standalone Popper primitive. Positioning is internal to Tooltip / Popover / Menu / Dialog. Picasso has a standalone `<Popper>` component, with consumers including Dropdown (Tier 3 mixed-state) and a small number of bespoke use sites where the consumer needs positioning without the full Popover semantics.

Three options were considered:

| Option | Description | Verdict |
|---|---|---|
| **A** (chosen) | Picasso's `<Popper>` swaps internals to `@floating-ui/react` | ✅ Minimal blast radius; `@floating-ui/react` is **already a transitive dep** via `@base-ui/react` (which uses it internally); preserves Picasso's public API |
| B | Refactor every Popper consumer onto `@base-ui/react/popover` | ❌ Too big a behavior change for v3 — Popover semantics differ (focus management, dismiss-on-outside-click). Defer post-PI when consumers stabilize. |
| C | Deprecate Popper in favour of `Dropdown`/`Menu`-only positioning | ❌ Breaking API change; standalone-positioning use sites genuinely have no Picasso primitive substitute |

## Why `@floating-ui/react` specifically

- **Already a transitive dependency.** `@base-ui/react` consumes Floating UI internally; bumping it from transitive to direct adds zero net dependency weight to Picasso consumers.
- **Stable, mature, framework-agnostic.** Floating UI is the de-facto standard for positioning primitives in React (used by Radix, Mantine, Headless UI, and now `@base-ui/react`).
- **Hook-based API.** `useFloating`, `useDismiss`, `useInteractions` map cleanly to Picasso's existing Popper internals (`useState` + `useEffect` for the open/close lifecycle).

## Implementation outline

Sketch only — full migration belongs to PF-2024:

```tsx
// packages/base/Popper/src/Popper/Popper.tsx
import { useFloating, autoUpdate, flip, offset, shift } from '@floating-ui/react'

export const Popper = ({ open, anchorEl, placement = 'bottom', children }: PopperProps) => {
  const { refs, floatingStyles } = useFloating({
    open,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchorEl,  // Picasso's existing anchorEl prop continues to drive positioning
    },
  })

  if (!open || !anchorEl) return null

  return (
    <div ref={refs.setFloating} style={floatingStyles}>
      {children}
    </div>
  )
}
```

Notes on the sketch:
- Picasso's `<Popper>` API likely accepts `open`, `anchorEl`, `placement`, `children`, and possibly `modifiers` (MUI-style middleware customization). Map MUI-style modifier objects to `@floating-ui/react` middleware; document any prop-surface diff in `Popper-diff.json` per `rules/api-preservation.md`.
- `@floating-ui/react` ships `flip`, `shift`, `offset`, `arrow`, `hide`, `size`, `autoPlacement` middleware. The MUI `modifiers` prop maps directly for the common cases; uncommon cases (custom modifiers passed through to popper.js) need codemod entries.
- `placement` prop accepts the same string enum (`'top' | 'bottom' | 'left' | 'right'` plus `-start` / `-end` variants) — preserve the enum verbatim.

## `package.json` impact

```diff
 "dependencies": {
-  "@material-ui/core": "4.12.4",
+  "@floating-ui/react": "^0.27.0",  // pin against the version pulled by @base-ui/react v1.4.1
   ...
 }
```

Verify the version of `@floating-ui/react` already pulled transitively via `@base-ui/react` and pin to the same major. Picasso should not pull a second floating-ui copy.

## Sequencing

Per migration plan §3.7:

- **Popper (Tier 2) migrates BEFORE Dropdown (Tier 3).** Dropdown's `target_path` is `@base-ui/react/menu + @base-ui/react/popover`; the `Grow` transition replacement happens in the same PR. Popper's migration unblocks Dropdown.
- **FileInput (Tier 2) → Tooltip (Tier 2) first** is independent of Popper. Tooltip uses `@base-ui/react/tooltip` which has its own positioning; it does not depend on Picasso's `<Popper>`.
- Other consumers of `<Popper>` (DatePicker, Tagselector, etc. — see `bin/migration-audit.sh` output) inherit the swap transitively. No source change needed in those consumers.

## Risk + mitigation

- **R15 (medium / medium impact):** Popper has no standalone `@base-ui/react` analog. **Mitigated** by Option A: `@floating-ui/react` direct dep. Already transitive — minimal new surface area.
- **API parity for `modifiers` prop:** `@material-ui/core/Popper`'s `modifiers` array maps to Floating UI middleware but with different shape. If Picasso consumers pass custom `modifiers`, a codemod is required. **Mitigation:** audit consumer call-sites during PF-2024 implementation (the per-component plan covers it).
- **Future revisit:** if `@base-ui/react` v1.5+ ships a standalone Popper primitive, revisit per [`rules/base-ui-react-api-crib.md` refresh checklist](../rules/base-ui-react-api-crib.md#refresh-checklist). Migration would be ~0.5d (similar shape to Floating UI's hook).

## What this unlocks

- PF-2024 Tier 2 Popper migration has a clear target.
- PF-2025 Tier 3 Dropdown migration has its `Popper` dependency on a stable foundation.
- The `target_path` for Popper in [`manifest.json`](../manifest.json) is locked at `"@floating-ui/react"`.

## Out of scope (post-PI follow-ups)

- **Refactor Popper consumers onto `@base-ui/react/popover` directly.** Cleaner long-term but not v3. When consumer apps have all migrated to modernized Picasso (post-O5), revisit and remove Picasso's `<Popper>` component entirely.
- **Remove `@floating-ui/react` direct dep once all consumers migrate.** Same trigger as above. Not v3.
