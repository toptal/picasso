---
'@toptal/picasso-charts': major
'@topkit/analytics-charts': patch
---

### Charts

- upgrade `recharts` from `^2.15.4` to `^3.10.1`. npm marks every 2.x release deprecated, and 2.x gets no more fixes
- **consumer action** install `react-is` matching your React major: recharts 3 takes it as a peer dependency, and so does this package now
- **consumer action** if you pass recharts parts yourself, such as `Line`, `ReferenceLine` or `Tooltip` as `LineChart` children, import them from recharts `^3.10.1` too. Parts from a recharts 2 copy don't work inside a recharts 3 chart
- the chart `svg` has `role="application"` and `tabindex="0"`: recharts 3 turns its accessibility layer on, so a chart is a tab stop and the arrow keys move its tooltip
- recharts 3 renders labels in their own layer, so a `ReferenceLine` label is no longer inside the line's element. CSS that targets `.recharts-reference-line text` has to target `.recharts-label` instead
- drop `tooltipPayload` from the `dataItem` that `BarChart` passes to `renderBarIndicators`. Read the bar's series from `dataItem.dataKey` instead
- render `BarChart` when `width` keeps its default, `auto`. It rendered nothing before
- fix the `LineChart` tooltip with `allowTooltipEscapeViewBox`: it follows the cursor again instead of staying in the chart's top-left corner
- correction to the `102.0.0` entry: the move from recharts 2.12.3 also took in 2.12.4, which removed `role="region"` from `.recharts-wrapper`. The `defaultProps` rewrite of `XAxis`, `YAxis`, `ReferenceArea` and `ReferenceLine` landed in recharts 2.13.0, not 2.15

### CategoriesChart

- renders with recharts 3 through `@toptal/picasso-charts`. See its changelog for the changes
