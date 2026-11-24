---
'@toptal/picasso-charts': major
'@topkit/analytics-charts': major
---

### Charts

- upgrade `recharts` from `^2.15.4` to `~3.10.1 || ^3.11.1`. npm marks every 2.x release deprecated, and 2.x gets no more fixes. 3.11.0 is skipped: it makes the chart's layers Tab stops that show no focus
- **consumer action** install `react-is` matching your React major: recharts 3 takes it as a peer dependency, and so does this package now
- **consumer action** install `recharts` `~3.10.1 || ^3.11.1`: it is a peer dependency now, so your app and the charts share one copy. If you pass recharts parts yourself, such as `Line`, `ReferenceLine` or `Tooltip` as `LineChart` children, they must come from that copy. Parts from a recharts 2 copy don't work inside a recharts 3 chart
- charts with a `tooltip` get `role="application"` and `tabindex="0"` from the recharts 3 accessibility layer: Tab focuses the chart and the arrow keys move its tooltip. Charts without a tooltip are not Tab stops, as before
- recharts 3 draws a chart in layers with `tabindex="-1"`, so a click can focus one. A focused layer draws no outline of its own, except the system outline in forced colors mode. In a chart with a `tooltip`, where the arrow keys move the tooltip, the chart shows the focus ring once a key is pressed
- a focused chart shows the Picasso focus ring instead of the browser's outline. In forced colors mode it keeps the system outline
- add an `aria-label` prop to `LineChart`, `BarChart` and `CategoriesChart` to name the chart
- a `LineChart` with `tooltip={false}` and your own recharts `Tooltip` as a child has no keyboard access to that tooltip
- recharts 3 renders labels in their own layer, so a `ReferenceLine` label is no longer inside the line's element. CSS that targets `.recharts-reference-line text` has to target `.recharts-label` instead
- recharts 3 renders axis tick labels in their own layer too: the text is in `.recharts-cartesian-axis-tick-label`, no longer in `.recharts-cartesian-axis-tick`. CSS that targets the tick's `text` has to follow
- apply a percentage `width` or `height` of `BarChart` once. `width="50%"` now fills half the parent; before, the percentage was applied twice and the chart filled a quarter
- drop `tooltipPayload` from the `dataItem` that `BarChart` passes to `renderBarIndicators`. Read the bar's series from `dataItem.dataKey` instead
- render `BarChart` when `width` keeps its default, `auto`. It rendered nothing before
- fix the `LineChart` tooltip with `allowTooltipEscapeViewBox`: recharts places it, so it follows the mouse, touch and keyboard instead of staying in the chart's top-left corner
- with `allowTooltipEscapeViewBox`, the `LineChart` and `BarChart` tooltips escape the chart only vertically. Near the chart's right edge they flip to the left of the point or bar (of the cursor in a vertical `BarChart`) instead of escaping to the right. A tooltip wider than the chart's plot area still overflows on the right
