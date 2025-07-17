import React, { useMemo } from 'react'
import type { BaseLineChartProps } from '@toptal/picasso-charts'
import { LineChart } from '@toptal/picasso-charts'

import {
  toChartFormat,
  toHighlightFormat,
  toLineConfigFormat,
  getXAxisTicks,
  getYAxisTicks,
  formatYAxisTick,
} from './../utils'
import type { Point, Highlight, ReferenceLine, ChartGranularity } from './types'

export type Props = BaseLineChartProps & {
  /**
   * A record of data points to be rendered as a line chart
   * @type { id: string; values: Record<string, number|null>; }[]
   */
  data: Point[]
  /**
   * A list of dates and to be highlighted
   * @type { data: string[]; color: string; }[]
   */
  highlights?: Highlight[]
  /**
   * A record of data points to be rendered as a dashed horizontal line
   * @type { data: Record<string, number>; color: string; }[]
   */
  referenceLines?: ReferenceLine[]
  /** A function to custom format the X axis label */
  formatXAxisLabel?: (label: string) => string
  /** A value that helps formatting the chart */
  granularity?: ChartGranularity
}

export const AnalyticsChart = ({
  data,
  highlights,
  referenceLines,
  xAxisKey = 'x',
  lineConfig: lines,
  formatXAxisLabel = (label: string) => label,
  granularity,
  unit,
  ...rest
}: Props) => {
  const chartData = useMemo(
    () => toChartFormat(data, referenceLines, xAxisKey, formatXAxisLabel),
    [data, referenceLines, xAxisKey, formatXAxisLabel]
  )
  const lineConfig = useMemo(
    () => (referenceLines ? toLineConfigFormat(lines, referenceLines) : lines),
    [referenceLines, lines]
  )
  const highlightsData = useMemo(
    () =>
      highlights &&
      toHighlightFormat(chartData, highlights, xAxisKey, formatXAxisLabel),
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
      {...rest}
    />
  )
}

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
