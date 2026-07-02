---
'@toptal/picasso-popper': minor
'@toptal/picasso-dropdown': minor
---

### Popper / Dropdown

- add a `strategy?: 'absolute' | 'fixed'` prop, threading directly into `@floating-ui/react`'s `useFloating` positioning strategy. `'fixed'` escapes a clipping/scrolling ancestor (e.g. an `overflow: hidden` container) that `'absolute'` positioning cannot.
- restore backwards compatibility with the pre-migration popper.js-based `popperOptions.positionFixed` option: when `strategy` is not set explicitly, `popperOptions.positionFixed: true` now resolves to `strategy: 'fixed'`, matching its old popper.js v1 behavior. An explicit `strategy` prop always takes precedence. `positionFixed` is typed as `@deprecated` — new code should use `strategy` directly.
