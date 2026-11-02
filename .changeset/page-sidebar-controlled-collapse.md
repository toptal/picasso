---
'@toptal/picasso-page': minor
---

### PageSidebar

- add a `collapsed` prop that controls whether a `collapsible` sidebar is collapsed; without it, `defaultCollapsed` still sets the initial state and the collapse button flips it
- call `onCollapse` with the collapsed state the collapse button requests, `true` to collapse and `false` to expand; handlers that take no argument keep working
- let keyboard users tab to the collapse button, which shows while it has keyboard focus; at rest it stays invisible and ignores the pointer
- expose the collapse button's state with `aria-expanded`, and name it "Toggle sidebar" instead of "collapse sidebar", so that the name fits both states
