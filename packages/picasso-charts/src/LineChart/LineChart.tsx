import React, { ReactElement } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { palette } from '@toptal/picasso/utils'
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  Area,
  Line,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

import calcTopDomain from '../utils/calc-top-domain'
import CHART_CONSTANTS from '../utils/constants'

const {
  BOTTOM_DOMAIN,
  HIGHLIGHT_BOTTOM_START_POINT,
  HIGHLIGHT_BOTTOM_FILL_OPACITY,
  HIGHLIGHT_TOP_HEIGHT,
  HIGHLIGHT_TOP_FILL_OPACITY,
  TICK_MARGIN,
  MIN_TICK_GAP,
  DEFAULT_MARGIN,
  TICK_LINE,
  AXIS_LINE,
  IS_ANIMATION_ACTIVE
} = CHART_CONSTANTS

export type ReferenceLineType = {
  y: number
  color: string
}

export type ChartDataPoint = {
  [key: string]: string | number
}

export type HighlightData = {
  from: number
  to: number
  color: string
}

export type OrderedChartDataPoint = ChartDataPoint & {
  order: number
}

export type ChartLine = {
  [key: string]: string
}

export type Props = BaseProps & {
  data: ChartDataPoint[]
  lines: ChartLine
  unit?: string
  xAxisKey?: string
  height?: number
  tooltip?: boolean
  customTooltip?: ReactElement
  highlightsData?: HighlightData[]
  referenceLineData?: ReferenceLineType[]
}

const ChartStyle = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          .recharts-wrapper .recharts-cartesian-grid-horizontal line {
            stroke-dasharray: 3 3;
          }
          tspan {
            font-size: 11px;
            fill: ${palette.grey.dark};
          }
          .recharts-wrapper
            .recharts-yAxis
            .recharts-cartesian-axis-ticks
            .recharts-cartesian-axis-tick:first-child {
            display: none;
          }
    `
    }}
  />
)

const calcTicks = (orderedData: OrderedChartDataPoint[]) =>
  orderedData.map(({ order }) => order)

const convertHighlightData = (topDomain: number, data: HighlightData[]) =>
  data.map(({ from, to, color }) => {
    const x1 = from
    const x2 = to

    return [
      {
        x1,
        x2,
        y1: HIGHLIGHT_BOTTOM_START_POINT,
        y2: topDomain,
        fillOpacity: HIGHLIGHT_BOTTOM_FILL_OPACITY,
        fill: color
      },
      {
        x1,
        x2,
        y1: topDomain - HIGHLIGHT_TOP_HEIGHT,
        y2: topDomain,
        fillOpacity: HIGHLIGHT_TOP_FILL_OPACITY,
        fill: color
      }
    ]
  })

const generateHighlightedAreas = (
  topDomain: number,
  highlights?: HighlightData[]
) => {
  if (!highlights) {
    return null
  }

  const highlightAreas = convertHighlightData(topDomain, highlights)

  return highlightAreas.map((highlightArea, index) =>
    highlightArea.map((props, highlightIndex: number) => (
      <ReferenceArea
        key={`highlight-area-${index}-${highlightIndex}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    ))
  )
}

const generateReferenceLines = (referenceLines?: ReferenceLineType[]) => {
  if (!referenceLines) {
    return null
  }
  return referenceLines.map(({ y, color }) => (
    <ReferenceLine
      key={`reference-line-${y}`}
      y={y}
      stroke={color}
      strokeDasharray='3 3'
    />
  ))
}

const generateLineGraphs = (
  lineNames: string[],
  orderedData: OrderedChartDataPoint[],
  lines: ChartLine
) =>
  lineNames.map((name, index) => (
    <Line
      key={`line-${index}`}
      data={orderedData}
      dataKey={name}
      stroke={lines[name]}
      dot={{ fill: lines[name] }}
      isAnimationActive={IS_ANIMATION_ACTIVE}
    />
  ))

const orderData = (data: ChartDataPoint[]): OrderedChartDataPoint[] =>
  data.map((point, index: number) => ({
    ...point,
    order: index
  }))

export const LineChart = ({
  data,
  lines,
  unit,
  xAxisKey,
  height,
  tooltip,
  customTooltip,
  highlightsData,
  referenceLineData,
  ...rest
}: Props) => {
  const lineNames = Object.keys(lines)
  const yKey = lineNames[0]
  const isSingleChart = lineNames.length === 1

  const topDomain = calcTopDomain(data, xAxisKey!)
  const orderedData = orderData(data)
  const ticks = calcTicks(orderedData)

  const referenceLineList = generateReferenceLines(referenceLineData)
  const highlightedAreas = generateHighlightedAreas(topDomain, highlightsData)
  const lineGraphs = generateLineGraphs(lineNames, orderedData, lines)

  const formatTicks = (tick: unknown) =>
    orderedData.find(item => item.order === tick)![xAxisKey!]

  return (
    <div
      // ResponsiveContainer expects a wrapper with a fixed height
      style={{ height }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <ChartStyle />
      <ResponsiveContainer>
        <ComposedChart
          margin={{
            top: DEFAULT_MARGIN,
            right: DEFAULT_MARGIN,
            bottom: DEFAULT_MARGIN,
            left: DEFAULT_MARGIN
          }}
          data={orderedData}
        >
          <CartesianGrid stroke={palette.grey.lighter} />

          {/* Axis */}
          <XAxis
            type='number'
            dataKey='order'
            name={xAxisKey}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            interval='preserveStartEnd'
            ticks={ticks}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
            tickFormatter={formatTicks}
            domain={[BOTTOM_DOMAIN, orderedData.length - 1]}
          />
          <YAxis
            type='number'
            dataKey={yKey}
            unit={unit}
            domain={[BOTTOM_DOMAIN, topDomain]}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            interval={0}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
          />

          {referenceLineList}

          {/* blue shade under the line chart */}
          {isSingleChart && (
            <Area
              type='linear'
              dataKey={yKey}
              fill={palette.blue.main}
              fillOpacity={0.1}
              isAnimationActive={IS_ANIMATION_ACTIVE}
            />
          )}

          {lineGraphs}

          {tooltip && <Tooltip content={customTooltip} />}

          {highlightedAreas}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

LineChart.defaultProps = {
  height: 200,
  unit: 'd',
  tooltip: false,
  xAxisKey: 'x'
}

LineChart.displayName = 'LineChart'

export default LineChart
