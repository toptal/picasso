---
'@toptal/picasso-utils': patch
---

### Utils

- `getElementRef` now reads element refs from `props.ref` on React 19 and newer, where `element.ref` is deprecated and logs a removal warning on every access; on React 17/18 it keeps reading `element.ref`, whose dev builds warn on `props.ref` instead. Fade, Slide and ClickAwayListener consumers stop emitting the React 19 deprecation warning
- switch `ClickAwayListener` to the shared `getElementRef` helper instead of its own `element.ref` cast, so DatePicker, Dropdown and MenuItem inherit the version-aware read
