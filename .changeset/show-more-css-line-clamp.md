---
'@toptal/picasso-show-more': patch
'@toptal/picasso': patch
---

### ShowMore

- replace the unmaintained `react-truncate` dependency (last published 2018, React peer locked to `<= 16`) with a dependency-free CSS `line-clamp` implementation; the public API is unchanged and the toggle still appears only when content actually overflows
- lift React peer-dependency cap (drop `< 19.0.0`)
- the SSR output now contains the full text already clamped by CSS, where previously the text was truncated only client-side after measurement
- collapsed content now keeps the full text in the DOM (clamping is visual), so it stays selectable, findable and queryable in tests

### Picasso

- remove the unused `react-truncate` dependency
