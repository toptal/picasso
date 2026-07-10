---
'@toptal/picasso-dropdown': patch
---

### Dropdown

- nudge floating descendants to re-measure once the menu's reveal animation
  finishes. The menu Paper reveals with a scale-in transition, and a CSS
  transform taints the `getBoundingClientRect` of the nodes inside it while it
  plays — so a floating element anchored to menu content (an open Tooltip on a
  `Menu.Item`) measured a ~4px-off rect on first paint. On the Paper's
  `transitionend` the Dropdown now dispatches the same synthetic scroll pulse the
  Popper already uses, so those descendants settle onto the true geometry. Purely
  additive — a no-op for menus without positioned descendants.
