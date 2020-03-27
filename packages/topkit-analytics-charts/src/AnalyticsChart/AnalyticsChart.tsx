import React from 'react'
import { LineChart, LineChartProps } from '@toptal/picasso-charts'
import { Line } from 'recharts'
import { palette } from '@toptal/picasso/utils'
import { orderData } from '@toptal/picasso-charts/utils'

import { toHighlightFormat, toChartFormat } from '../utils'

export type Props = LineChartProps & {
  data: Record<string, number>
  lineColor?: string
  highlightsData?: string[]
  highLightsColor?: string
  referenceLineData: Record<string, Record<string, number>>
  referenceLineColor?: string
  xAxisKey: string
  yAxisKey: string
}

const generateReferenceLine = (
  data: Record<string, Record<string, number>>,
  color: string
) => {
  const lineData = orderData(toChartFormat(Object.values(data)[0], 'x', 'y'))
  // const lineData = toChartFormat(Object.values(data)[0], 'x', 'y').map(
  //   (point, index: number) => ({
  //     ...point,
  //     order: index
  //   })
  // )
  console.log('lineData: ', lineData)
  return (
    <Line
      dot={false}
      data={lineData}
      dataKey='y'
      stroke={color}
      strokeDasharray='3 3'
    />
  )
  return (
    <Line
      dot={false}
      data={[
        {
          x: 0,
          y: 1,
          order: 0
        },
        {
          x: 3,
          y: 1,
          order: 1
        },
        {
          x: 3,
          y: 3,
          order: 1
        },
        {
          x: convertedChartData.length - 1,
          y: 3,
          order: convertedChartData.length - 1
        }
      ]}
      dataKey='y'
      stroke='#d42551'
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

  const referenceLine = generateReferenceLine(
    referenceLineData,
    referenceLineColor
  )

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
