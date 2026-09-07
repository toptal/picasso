---
'@toptal/picasso-charts': patch
---

### Charts

- upgrade `recharts` to `^2.15.4`, the first release that runs under React 19: it admits React 19 in its peer range and no longer relies on `defaultProps` for `XAxis`, `YAxis`, `ReferenceArea` and `ReferenceLine`, which React 19 stops applying on function components. No `LineChart` or `BarChart` API or behavior change
