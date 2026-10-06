---
'@toptal/picasso-typography-overflow': minor
---

### TypographyOverflow

- stop Safari from showing its native tooltip next to the TypographyOverflow tooltip on truncated text. An empty layer now covers the text, and it is skipped when `disableTooltip` is set
- add `disableTooltipGuard` prop to remove that layer when children contain links or other controls, because the layer takes their clicks
