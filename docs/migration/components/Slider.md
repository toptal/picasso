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

## Known gotchas
- Slider source uses `SliderValueLabelSlotProps` from `@mui/base` for the value-label tooltip. `@base-ui/react/slider` exposes a `Slider.Value` part — migrate the value-label rendering to that. Confirm shape match in `rules/base-ui-react-api-crib.md` before assuming.
- Picasso's Slider API likely accepts `value`, `onChange`, `min`, `max`, `step`, `marks`. Map to `Slider.Root`'s `value` + `onValueChange`. Strict API preservation.
- Watch keyboard arrow-key behavior across the migration — `@base-ui/react`'s default keyboard nav may differ from `@mui/base`'s. Cypress component spec coverage matters here.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Slider Happo: pixel diff ≤0.5%.
- [ ] Cypress component spec passes (keyboard nav + `onChange` invocation count).

## Reviewer notes
- Slider has 2 `@mui/base` source imports per audit §1.4 — slightly more touch than Switch/Tabs. Expect a clean migration but budget an extra iteration if the value-label API differs.
