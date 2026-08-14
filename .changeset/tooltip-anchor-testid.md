---
'@toptal/picasso-tooltip': minor
---

### Tooltip

- add `testIds.anchor` for placing a `data-testid` on the tooltip's anchor — the rendered trigger child that owns the open/close listeners. Hover this element in tests: a natively disabled child swallows pointer events, so hovering the child itself never opens the tooltip. The top-level `data-testid` keeps flowing to the same element for backwards compatibility
