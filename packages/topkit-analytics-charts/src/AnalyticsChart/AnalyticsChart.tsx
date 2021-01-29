import React, { useMemo } from 'react'
import { BaseLineChartProps, LineChart } from '@toptal/picasso-charts'

import {
  toChartFormat,
  toHighlightFormat,
  toLineConfigFormat,
  getXAxisTicks,
  getYAxisTicks,
  formatYAxisTick
} from './../utils'

export type ChartGranularity = 'month' | 'week' | 'day' | 'hour'

export type Point = {
  id: string
  values: Record<string, number | null>
}

export type Highlight = {
  data: string[]
  color: string
}

export type ReferenceLine = {
  data: Record<string, number>
  color: string
}

export type Props = BaseLineChartProps & {
  data: Point[]
  highlights?: Highlight[]
  referenceLines?: ReferenceLine[]
  formatXAxisLabel?: (label: string) => string
  granularity?: ChartGranularity
}

export const AnalyticsChart = ({
  data,
  highlights,
  referenceLines,
  xAxisKey,
  lineConfig: lines,
  formatXAxisLabel,
  granularity,
  unit,
  ...rest
}: Props) => {
  const chartData = useMemo(
    () => toChartFormat(data, referenceLines, xAxisKey!, formatXAxisLabel!),
    [data, referenceLines, xAxisKey, formatXAxisLabel]
  )
  const lineConfig = useMemo(
    () => (referenceLines ? toLineConfigFormat(lines, referenceLines) : lines),
    [referenceLines, lines]
  )
  const highlightsData = useMemo(
    () =>
      highlights &&
      toHighlightFormat(chartData, highlights, xAxisKey!, formatXAxisLabel!),
    [chartData, formatXAxisLabel, highlights, xAxisKey]
  )

  return (
    <LineChart
      xAxisKey={xAxisKey}
      data={chartData}
      highlights={highlightsData || null}
      lineConfig={lineConfig}
      getXAxisTicks={orderedData => getXAxisTicks(orderedData, granularity)}
      getYAxisTicks={domain => getYAxisTicks(domain, unit)}
      formatYAxisTick={(value, domain) => formatYAxisTick(value, domain, unit)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

AnalyticsChart.defaultProps = {
  xAxisKey: 'x',
  formatXAxisLabel: (label: string) => label
}

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
