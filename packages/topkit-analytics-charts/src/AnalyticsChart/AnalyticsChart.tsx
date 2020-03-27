import React from 'react'
import { LineChart, LineChartProps } from '@toptal/picasso-charts'

import { toHighlightFormat, toChartFormat } from '../utils'

export type Props = LineChartProps & {
  data: Record<string, number>
  highlightsData?: string[]
  highLightsColor?: string
  xAxisKey: string
  yAxisKey: string
}

export const AnalyticsChart = ({
  data,
  highlightsData,
  highLightsColor,
  xAxisKey,
  yAxisKey,
  ...rest
}: Props) => {
  const hasHighlights = highlightsData && highLightsColor

  const convertedChartData = toChartFormat(data, xAxisKey, yAxisKey)

  const convertedHighlightsData =
    hasHighlights &&
    toHighlightFormat(
      highlightsData!,
      convertedChartData,
      highLightsColor!,
      xAxisKey
    )

  return (
    <LineChart
      xAxisKey={xAxisKey}
      data={convertedChartData}
      highlightsData={convertedHighlightsData || null}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

AnalyticsChart.defaultProps = {}

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
