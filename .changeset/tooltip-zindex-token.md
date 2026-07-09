---
'@toptal/picasso-tailwind': minor
---

### Tailwind theme

- add a `tooltip` z-index token (`1300`) to the theme scale, exposing a
  `z-tooltip` utility. The value matches the `zIndex.tooltip` Picasso's MUI
  theme set, restoring the tooltip stacking layer that was lost in the Tailwind
  migration so tooltips stack correctly relative to Popper-based overlays such
  as Dropdown.
