---
'@toptal/picasso-slider': patch
---

### Slider

- Re-implement on `@base-ui/react/slider`; public API unchanged.

## Intentional visual changes

Slider now matches the current Figma design-of-record (diverged from the legacy
`@mui/base` pixels). Pre-authorized in `docs/migration/components/Slider.md`
§"Approved visual deltas":

- Thumb diameter `15px` → `19px` (2px white border retained).
- Rail fill: translucent `bg-gray-500` @ `opacity-[0.24]` → solid `bg-gray-500`.
- Disabled track (under `disableTrackHighlight`): `bg-gray-200` → `bg-gray-500`.
- Mark: `6px` + 2px white border → `9px` solid fill, no border.
- Container vertical rhythm: `my-[6px]` → `mt-[5px] mb-[4px]` + `h-[15px]`.
