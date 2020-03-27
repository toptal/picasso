import React from 'react'
import {
  LineChart,
  LineChartProps,
  ChartDataPoint
} from '@toptal/picasso-charts'
import { Line } from 'recharts'
import { palette } from '@toptal/picasso/utils'

import { toHighlightFormat, toChartFormat } from '../utils'

export type ReferenceLineData = Record<string, number>
export type DatePoint = Record<string, number>

export type Props = LineChartProps & {
  data: DatePoint
  lineColor?: string
  highlightsData?: string[]
  highLightsColor?: string
  referenceLineData?: ReferenceLineData
  referenceLineColor?: string
  xAxisKey: string
  yAxisKey: string
}

const generateReferenceLine = (data: ReferenceLineData, color: string) => {
  const lineData = toChartFormat(data, 'x', 'y').map(
    (point: ChartDataPoint, index: number) => ({
      ...point,
      order: index
    })
  )

  return (
    <Line
      dot={false}
      data={lineData}
      dataKey='y'
      stroke={color}
      strokeDasharray='3 3'
    />
  )
}
export const AnalyticsChart = ({
  data,
  lineColor,
  highlightsData,
  highLightsColor,
  referenceLineData,
  referenceLineColor,
  xAxisKey,
  yAxisKey,
  ...rest
}: Props) => {
  const hasHighlights = highlightsData && highLightsColor
  const lines = {
    [yAxisKey]: lineColor,
    test: referenceLineColor
  }

  const convertedChartData = toChartFormat(data, xAxisKey, yAxisKey)

  const convertedHighlightsData =
    hasHighlights &&
    toHighlightFormat(
      highlightsData!,
      convertedChartData,
      highLightsColor!,
      xAxisKey
    )

  const referenceLine =
    referenceLineData &&
    generateReferenceLine(referenceLineData, referenceLineColor!)

  return (
    <LineChart
      xAxisKey={xAxisKey}
      data={convertedChartData}
      lines={lines}
      highlightsData={convertedHighlightsData || null}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {referenceLine}
    </LineChart>
  )
}

AnalyticsChart.defaultProps = {
  xAxisKey: 'x',
  yAxisKey: 'y',
  lineColor: palette.blue.main,
  highLightsColor: palette.red.main,
  referenceLineColor: palette.red.main
}

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
