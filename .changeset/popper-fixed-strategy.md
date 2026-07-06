---
'@toptal/picasso-popper': patch
'@toptal/picasso-dropdown': patch
---

### Popper / Dropdown

- restore backwards compatibility with the pre-migration popper.js-based `popperOptions.positionFixed` option: `popperOptions.positionFixed: true` again positions the popper with a `fixed` strategy (relative to the viewport), escaping a clipping/scrolling ancestor (e.g. an `overflow: hidden` container) that the default `absolute` positioning cannot, matching its old popper.js v1 behavior.
