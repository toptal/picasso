---
'@toptal/picasso-calendar': patch
'@toptal/picasso': patch
---

### Calendar

- upgrade `react-day-picker` to `^8.10.2`, the first 8.x release that runs under React 19: it admits React 19 in its peer range and imports `react/jsx-runtime` instead of inlining a copy that read React 18 internals. No `Calendar` API or behavior change; it renders identically under React 18

### Picasso

- remove the unused direct `react-day-picker` dependency from `@toptal/picasso`; nothing under the aggregate imports it, and it stays installed transitively via `@toptal/picasso-calendar`
