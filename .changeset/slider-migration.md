---
'@toptal/picasso-slider': major
---

### Slider

- Migrate internals from @mui/base to @base-ui/react (behavioral parity)
- Rebuild marks and value-label rendering on top of @base-ui/react's compound parts (Slider.Root + Slider.Control + Slider.Track + Slider.Indicator + Slider.Thumb)

## Intentional visual changes

- All Slider stories: thumb/track/indicator DOM structure now provided by @base-ui/react primitives. Inline positioning styles, `data-orientation`/`data-index` attributes, and the hidden `<input type="range">` (which now carries native `max`/`min`/`aria-valuenow` in place of explicit `aria-valuemin`/`aria-valuemax`) are emitted by the library. Visually pixel-equivalent; new baseline required in Happo.
