---
'@toptal/picasso-charts': patch
---

### Charts

- upgrade `recharts` to `^2.15.4` so the package can run under React 19. `2.15.0` is the first recharts release whose `react` peer range admits `^19.0.0`, and it also rewrites the function components that carried `defaultProps` — `XAxis`, `YAxis`, `ReferenceArea` and `ReferenceLine`, all used by `LineChart` and `BarChart`. React 19 no longer applies `defaultProps` on function components, which would have dropped defaults such as `xAxisId`/`yAxisId`, `orientation` and `type` and left charts blank or misaligned
- `react-smooth` moves to `4.0.4` and `react-is` to 18 inside recharts' dependency tree; `react-smooth@4.0.4` is the first release whose peer range admits React 19
- no `@toptal/picasso-charts` API or behavior change. The `react` peer range stays capped at `< 19.0.0`; lifting that cap library-wide is tracked separately in PF-2262
