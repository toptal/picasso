---
'@toptal/picasso-query-builder': major
---

### QueryBuilder

- Re-implement styling on Tailwind; remove the `@material-ui/core` dependency (JSS `makeStyles`/`createStyles` → Tailwind classes). Public API, exports, and behavior are unchanged (behavioral parity).
- The react-querybuilder layout, drag-and-drop, and branch-connector styles move from JSS descendant selectors to Tailwind arbitrary descendant variants on the QueryBuilder root.
- Lift the `react` / `react-dom` peer-dependency upper bound (`< 19.0.0` removed).
