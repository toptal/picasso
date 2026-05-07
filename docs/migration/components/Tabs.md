# Tabs — migration plan

## Identity
- Path: `packages/base/Tabs/`
- Tier: Tier 0 — light path (per migration plan v3 §3.1)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/tabs`

## Dependencies
Migration must be applied AFTER:
- (none — Tabs is independent within Tier 0)

## Migration scope
Per migration plan v3 §3.1: direct match — `@base-ui/react/tabs` exists with a 1-to-1 API.

- Replace `@mui/base/Tab` and `@mui/base/Tabs` imports (audit §1.4 shows 2 `@mui/base` source files in Tabs, including `TabProps`).
- Migrate to compound parts: `Tabs.Root` + `Tabs.List` + `Tabs.Tab` + `Tabs.Panel` (per `@base-ui/react` v1.4.1; verify via `rules/base-ui-react-api-crib.md`).
- Tailwind class composition stays.
- `packages/base/Tabs/package.json`:
  - Drop `@mui/base` from `dependencies`.
  - Add `@base-ui/react`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Picasso's Tabs API has `value` + `onChange` for the active tab; map to `Tabs.Root`'s `value` + `onValueChange`. Strict API preservation.
- The `Tabs.Tab` accepts an active state via `data-active` — drive Tailwind classes via `data-active:text-blue-500` etc. instead of a JSS-style class toggle (if any survived).
- `Tabs.Panel` requires a `value` matching its corresponding `Tabs.Tab` — verify Picasso's internal mapping logic preserves this.
- Active tab indicator (the underline animation) — `@base-ui/react/tabs` doesn't ship this; Picasso must continue rendering its own indicator. Ensure the indicator's positioning logic survives the swap.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Tabs Happo: pixel diff ≤0.5%.
- [ ] Active tab indicator animation visually identical (designer review on the timing curve).
- [ ] Keyboard navigation (Arrow keys, Home/End) preserved.

## Reviewer notes
- Tabs is one of the more API-rich Tier 0 components (active state, indicator, keyboard nav). Budget an extra iteration if the indicator logic needs custom work.
- After Tabs ships, query-builder (Tier 4) can start consuming the migrated Tabs primitive transitively — though that's not a hard dep.

## Slot keys

Per migration plan v4 §2.3, Tabs preserves a `classes` prop via the `withClasses` shim from `@toptal/picasso-utils`.

```ts
export type TabsClassKey = 'root' | 'list' | 'indicator' | 'tab'
```

- `root` — the outermost Tabs.Root container
- `list` — the Tabs.List wrapper holding individual tabs
- `indicator` — the moving underline/highlight tracking the active tab
- `tab` — individual Tab triggers (per-tab styling)
