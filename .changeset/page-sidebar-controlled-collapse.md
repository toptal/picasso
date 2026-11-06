---
'@toptal/picasso-page': minor
---

### PageSidebar

- add a `collapsed` prop that controls whether a `collapsible` sidebar is collapsed; without it, `defaultCollapsed` still sets the initial state and the collapse button flips it. When `collapsed` is unset, the sidebar keeps its last state
- call `onCollapse` with the collapsed state the collapse button requests, `true` to collapse and `false` to expand. Handlers that take no argument keep working, but a handler with an optional parameter now receives that value: a toggle like `toggle(next?: boolean)` sets the state instead of flipping it, and a parameter of another type fails type checking
- apply `collapsed` and `defaultCollapsed` only to a `collapsible` sidebar; `defaultCollapsed` alone used to render compact menus and the collapsed logo at full width
- let keyboard users tab to the collapse button, which adds a tab stop before the first sidebar item. The button shows while it has focus; at rest it stays invisible and ignores the pointer
- expose the collapse button's state with `aria-expanded`
