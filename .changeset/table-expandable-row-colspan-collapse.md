---
'@toptal/picasso-table': minor
---

### Table.ExpandableRow

- add `colSpan` for the collapsible content cell, defaulting to the previous hardcoded `100`. Under `table-layout: fixed` that span rendered as phantom columns that crushed the real ones — pass the table's actual column count instead
- animate closing. The content row used to unmount the moment `expanded` turned `false`, so only opening was animated; it now stays mounted until the transition ends
- always grow from zero height when opening. `Collapse` used to mount already open and reset to `0` on mount, which showed as a stutter; it now mounts closed and opens one commit later
- narrow `defaultExpanded` to what it documents — skipping the transition for a row already expanded on the first render. It also used to skip the first expansion triggered later by a click, which now animates like any other
