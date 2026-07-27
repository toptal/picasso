---
'@toptal/picasso-show-more': patch
'@toptal/picasso': patch
---

### ShowMore

- replace the unmaintained `react-truncate` dependency (last published 2018, React peer locked to `<= 16`) with the maintained fork `@re-dev/react-truncate`, pinned to `0.6.0`; browser rendering, SSR markup and the public API are unchanged
- lift React peer-dependency cap (drop `< 19.0.0`)
- in DOM-less test environments (jsdom) the new library renders collapsed content only after it can measure real layout, so collapsed ShowMore text is not queryable in jsdom (the toggle button still renders and works) — assert on the expanded state or test in a real browser

### Picasso

- remove the unused `react-truncate` dependency
