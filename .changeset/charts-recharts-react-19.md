---
'@toptal/picasso-charts': patch
---

### Charts

- upgrade `recharts` to `^2.15.4`, the first release that runs under React 19: it admits React 19 in its peer range and no longer relies on `defaultProps` for `XAxis`, `YAxis`, `ReferenceArea` and `ReferenceLine`, which React 19 stops applying on function components. No `LineChart` or `BarChart` API or behavior change
- **consumer action** on React 19: install a `react-is` that matches your React major, for example with a package-manager override, as recharts documents. recharts ships `react-is@18`, which does not recognise React 19 fragments, so chart children wrapped in a fragment are dropped
