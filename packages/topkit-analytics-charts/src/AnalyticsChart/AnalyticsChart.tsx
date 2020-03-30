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
  color?: string
  highlights?: {
    data: string[]
    color?: string
  }
  referenceLines?: {
    data: ReferenceLineData
    color?: string
  }
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
  color,
  highlights,
  referenceLines,
  xAxisKey,
  yAxisKey,
  ...rest
}: Props) => {
  const hasHighlights = highlights?.data && highlights?.color
  const lines = {
    [yAxisKey]: color,
    test: referenceLines?.color!
  }

  const convertedChartData = toChartFormat(data, xAxisKey, yAxisKey)

  const convertedHighlightsData =
    hasHighlights &&
    toHighlightFormat(
      highlights?.data!,
      convertedChartData,
      highlights?.color!,
      xAxisKey
    )

  const referenceLine =
    referenceLines?.data &&
    generateReferenceLine(referenceLines?.data, referenceLines?.color!)

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
  color: palette.blue.main,
  highLights: {
    color: palette.red.main
  },
  referenceLines: {
    color: palette.red.main
  }
}

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
