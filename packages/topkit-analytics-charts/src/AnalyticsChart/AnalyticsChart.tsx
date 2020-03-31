import React from 'react'
import {
  LineChart,
  LineChartProps,
  ChartDataPoint,
  LineConfig
} from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

import { toHighlightFormat, toChartFormat } from '../utils'

export type ReferenceLineData = Record<string, number>
export type DatePoint = Record<string, number>

export type Highlight = {
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
  highlights?: Highlight[]
  referenceLines?: ReferenceLine[]
  xAxisKey: string
  yAxisKey: string
}

const insertReferenceLine = (
  chartData: ChartDataPoint[],
  lineConfig: LineConfig,
  referenceLines: ReferenceLine[]
) => {
  chartData.forEach(point => {
    referenceLines.forEach(({ data, color }, index) => {
      const referenceLineName = `reference-${index}`
      point[referenceLineName] = data[point.date]
      lineConfig[referenceLineName] = {
        variant: 'reference',
        color
      }
    })
  })
}

const generateChartData = (
  chartData: ChartDataPoint[],
  lineConfig: LineConfig,
  referenceLines?: ReferenceLine[]
) => {
  if (referenceLines) {
    insertReferenceLine(chartData, lineConfig, referenceLines)
  }
  return { chartData, lineConfig }
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
  const line: LineConfig = {
    [yAxisKey]: { color: color! }
  }
  const formattedChartData = toChartFormat(data, xAxisKey, yAxisKey)

  const highlightsData =
    highlights && toHighlightFormat(formattedChartData, highlights!, xAxisKey)

  const { chartData, lineConfig } = generateChartData(
    formattedChartData,
    line,
    referenceLines
  )

  return (
    <LineChart
      xAxisKey={xAxisKey}
      data={chartData}
      highlightsData={highlightsData || null}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      lines={lineConfig}
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
