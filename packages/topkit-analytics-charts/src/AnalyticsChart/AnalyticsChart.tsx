import React from 'react'
import {
  LineChart,
  LineChartProps,
  ChartDataPoint
} from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

import { toHighlightFormat, toChartFormat } from '../utils'

export type ReferenceLineData = Record<string, number>
export type DatePoint = Record<string, number>

export type Highlights = {
  data: string[]
  color: string
}

export type ReferenceLine = {
  data: ReferenceLineData
  color: string
}

export type Props = LineChartProps & {
  data: DatePoint
  color?: string
  highlights?: Highlights
  referenceLine?: ReferenceLine
  xAxisKey: string
  yAxisKey: string
}

const generateChartData = (
  chartData: ChartDataPoint[],
  referenceLineData?: ReferenceLineData
) => {
  if (referenceLineData) {
    return chartData.map(point => ({
      ...point,
      reference: referenceLineData[point.date]
    }))
  }
  return chartData
}

export const AnalyticsChart = ({
  data,
  color,
  highlights,
  referenceLine,
  xAxisKey,
  yAxisKey,
  ...rest
}: Props) => {
  const lines = {
    [yAxisKey]: { color },
    ...(referenceLine && {
      reference: { color: referenceLine?.color, variant: 'reference' }
    })
  }
  const formattedChartData = toChartFormat(data, xAxisKey, yAxisKey)

  const highlightsData =
    highlights && toHighlightFormat(formattedChartData, highlights!, xAxisKey)

  const chartData = generateChartData(formattedChartData, referenceLine?.data)
  console.log('chartData: ', chartData)

  return (
    <LineChart
      xAxisKey={xAxisKey}
      data={chartData}
      highlightsData={highlightsData || null}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      lines={lines}
    />
  )
}

AnalyticsChart.defaultProps = {
  xAxisKey: 'x',
  yAxisKey: 'y',
  color: palette.blue.main
}

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
