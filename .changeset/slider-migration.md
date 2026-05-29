---
'@toptal/picasso-slider': major
---

### Slider

- Migrate internals from @mui/base to @base-ui/react (behavioral parity)
- Rebuild marks and value-label rendering on top of @base-ui/react's compound parts (Slider.Root + Slider.Control + Slider.Track + Slider.Indicator + Slider.Thumb)
- Remove `@mui/base` peer dependency; add `@base-ui/react` peer dependency
- React peer range lifted: upper bound dropped (`>=16.12.0 < 19.0.0` → `>=16.12.0`), enabling React 19 consumers
- **DOM structure change**: the root element is now a `<div>` (was `<span>` in @mui/base). Nesting depth increases by two levels — all slider content now lives inside Control > Track wrappers rather than directly under the root. Snapshots that assert on the DOM tree will need updating.
