# Slider — migration plan

## Identity
- Path: `packages/base/Slider/`
- Tier: Tier 0 — light path (per migration plan v3 §3.1)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/slider`

## Dependencies
Migration must be applied AFTER:
- (none — Slider is independent within Tier 0)

## Migration scope
Per migration plan v3 §3.1: direct match — `@base-ui/react/slider` exists with a 1-to-1 API.

- Replace `@mui/base/Slider` import (current source uses `SliderValueLabelSlotProps` per audit §1.4).
- Migrate to compound parts: `Slider.Root` + `Slider.Value` + `Slider.Control` + `Slider.Track` + `Slider.Indicator` + `Slider.Thumb` (per `@base-ui/react` v1.4.1 API; verify against `rules/base-ui-react-api-crib.md`).
- Tailwind class composition stays.
- `packages/base/Slider/package.json`:
  - Drop `@mui/base` from `dependencies`.
  - Add `@base-ui/react`.
  - Lift React peer cap to `>=16.12.0`.

## Approved visual deltas (Figma design-of-record)

> **Design-of-record:** [Figma — Slider](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=319-12959) (page `319:12959`).

The Slider's Figma spec has **diverged from the legacy `@mui/base` pixels**, so the migration deliberately departs from byte-for-byte parity for the items below. These were applied as manual operator fixes on PR #4976 and are **pre-authorized INTENTIONAL deltas** — Happo diffs limited to these are NOT regressions (see `references/practices.md §"Visual parity by default; geometric improvements via approved-delta channel"`). Re-baseline Happo to the Figma design; anything *outside* this list is still a regression.

| Element | Legacy `@mui/base` baseline | Shipped (Figma-matched) | Source |
|---|---|---|---|
| Thumb diameter | `w-[15px] h-[15px]` (2px white border) | `w-[19px] h-[19px]` (2px white border) | `Slider.tsx` `thumbClassName` |
| Rail fill | translucent `bg-gray-500` @ `opacity-[0.24]` | **solid** `bg-gray-500` (no alpha) | `Slider.Track` className |
| Disabled track (indicator under `disableTrackHighlight`) | `bg-gray-200` | `bg-gray-500` | `Slider.Indicator` className |
| Mark | `w-[6px] h-[6px]` + 2px white border | `w-[9px] h-[9px]`, no border (solid fill) | `SliderMark.tsx` |
| Container vertical rhythm | `my-[6px]` | `mt-[5px] mb-[4px]` + `h-[15px]` | `Slider.tsx` container |

- The **rail** delta is the "conditioned alpha" case (`references/practices.md §"@base-ui/react idioms" → "Translucent containers with nested parts"`): the legacy `opacity-[0.24]` alpha trick is intentionally dropped because the Figma spec defines a **solid** rail colour — do NOT reintroduce `bg-color/alpha` to "restore parity".
- Thumb centering uses `@base-ui/react`'s native `translate: -50% -50%` (rung -1); the legacy `-mt-[7px] -ml-[6px]` offsets are removed. Any residual sub-pixel thumb-centering diff is an intentional-improvement (`references/base-ui-styling.md §7.1`).

## Known gotchas
- Slider source uses `SliderValueLabelSlotProps` from `@mui/base` for the value-label tooltip. `@base-ui/react/slider` exposes a `Slider.Value` part, but it does NOT cover Picasso's tooltip + overlap-repositioning behavior — the custom `SliderValueLabel` is **retained** (drop the `@mui/base` type, define the props locally). See the live-value gotcha below for how it's fed.
- Picasso's Slider API likely accepts `value`, `onChange`, `min`, `max`, `step`, `marks`. Map to `Slider.Root`'s `value` + `onValueChange`. Strict API preservation.
- Watch keyboard arrow-key behavior across the migration — `@base-ui/react`'s default keyboard nav may differ from `@mui/base`'s. Cypress component spec coverage matters here.
- **Thumb collision (range): set `thumbCollisionBehavior='swap'` on `Slider.Root`.** `@base-ui/react` defaults to `'push'` (range thumbs shove each other and stay merged as one dot when dragged together); `@mui/base` swapped/crossed them. `'swap'` restores the prior behavior — drag one thumb through the other and the range re-separates. Without it you get a stuck-merged regression (PR #4976).
- **Live value for marks + value-labels.** The custom `SliderValueLabel` (tooltip + overlap repositioning) and `SliderMark` are retained — `Slider.Value` doesn't cover the tooltip/overlap behavior. Feed them the **live value** by reading `state.values` from a function-of-state `render` on `Slider.Track`, NOT a `useState` mirror (anti-pattern, `references/base-ui-styling.md §10`) and NOT a static `value ?? defaultValue` (freezes marks/labels in uncontrolled mode). PR #4976.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Slider Happo: the only diffs vs the `@mui/base` baseline are the "Approved visual deltas" above (re-baseline Happo to the Figma design); no other diffs.
- [ ] Cypress component spec passes (keyboard nav + `onChange` invocation count).

## Reviewer notes
- Slider has 2 `@mui/base` source imports per audit §1.4 — slightly more touch than Switch/Tabs. Expect a clean migration but budget an extra iteration if the value-label API differs.

## Slot keys

**Not applicable.** Per the May 2026 audit, Slider does not currently expose a `classes` prop in its public Props (neither directly nor via `StandardProps`). The migration is a clean swap; do not add `withClasses`. Adding it would be net-new API, not preservation. See `decisions/classes-shim.md` for the strict-preservation policy.
