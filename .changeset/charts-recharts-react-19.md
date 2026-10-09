---
'@toptal/picasso-charts': patch
---

### Charts

- upgrade `recharts` to `^2.15.4`, the first release that runs under React 19: it admits React 19 in its peer range and no longer relies on `defaultProps` for `XAxis`, `YAxis`, `ReferenceArea` and `ReferenceLine`, which React 19 stops applying on function components. No `LineChart` or `BarChart` API or behavior change
- on React 19, `LineChart` no longer drops the chart parts its children wrap in a fragment. recharts unwraps fragments with the `react-is@18` it ships, which does not recognise a React 19 fragment, so `LineChart` now unwraps them first
- **consumer action** on React 19, only for charts you render with recharts yourself: install a `react-is` that matches your React major, for example with a package-manager override, as recharts documents, or the chart parts you wrap in a fragment are dropped
