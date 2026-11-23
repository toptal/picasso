---
'@toptal/picasso-charts': major
'@topkit/analytics-charts': major
---

### Charts

- upgrade `recharts` from `^2.15.4` to `^3.10.1`. npm marks every 2.x release deprecated, and 2.x gets no more fixes
- **consumer action** install `react-is` matching your React major: recharts 3 takes it as a peer dependency, and so does this package now
- **consumer action** if you pass recharts parts yourself, such as `Line`, `ReferenceLine` or `Tooltip` as `LineChart` children, import them from recharts `^3.10.1` too. Parts from a recharts 2 copy don't work inside a recharts 3 chart
- charts with a `tooltip` get `role="application"` and `tabindex="0"` from the recharts 3 accessibility layer: Tab focuses the chart and the arrow keys move its tooltip. Charts without a tooltip are not focusable, as before
- a `LineChart` with `allowTooltipEscapeViewBox` is not focusable, since that tooltip is only placed on mouse moves
- a `LineChart` with `tooltip={false}` and your own recharts `Tooltip` as a child has no keyboard access to that tooltip
- recharts 3 renders labels in their own layer, so a `ReferenceLine` label is no longer inside the line's element. CSS that targets `.recharts-reference-line text` has to target `.recharts-label` instead
- recharts 3 renders axis tick labels in their own layer too: the text is in `.recharts-cartesian-axis-tick-label`, no longer in `.recharts-cartesian-axis-tick`. CSS that targets the tick's `text` has to follow
- apply a percentage `width` or `height` of `BarChart` once. `width="50%"` now fills half the parent; before, the percentage was applied twice and the chart filled a quarter
- drop `tooltipPayload` from the `dataItem` that `BarChart` passes to `renderBarIndicators`. Read the bar's series from `dataItem.dataKey` instead
- render `BarChart` when `width` keeps its default, `auto`. It rendered nothing before
- fix the `LineChart` tooltip with `allowTooltipEscapeViewBox`: it follows the cursor again instead of staying in the chart's top-left corner
