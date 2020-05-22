import React, { ReactElement, ReactNode } from 'react'
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

import {
  findTopDomain,
  getChartTicks,
  toRechartsHighlightFormat,
  orderData
} from '../utils'
import CHART_CONSTANTS from '../utils/constants'

const {
  BOTTOM_DOMAIN,
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

export type ChartDataPoint = Record<string, string | number>

export type HighlightConfig = {
  from: number
  to: number
  color: string
}

export type OrderedChartDataPoint = ChartDataPoint & {
  order: number
}

export type LineConfig = Record<
  string,
  { color: string; variant?: 'solid' | 'reference' }
>

export type BaseChartProps = {
  lineConfig: LineConfig
  unit?: string
  xAxisKey?: string
  height?: number
  tooltip?: boolean
  customTooltip?: ReactElement
  allowTooltipEscapeViewBox?: boolean
  className?: string
  children?: ReactNode
}

export type Props = BaseChartProps & {
  data: ChartDataPoint[]
  highlights?: HighlightConfig[] | null
  referenceLines?: ReferenceLineType[]
}

const StyleOverrides = () => (
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

const countNonReferenceLines = (lines: LineConfig) =>
  Object.values(lines).filter(({ variant }) => !variant || variant === 'solid')
    .length

const generateHighlightedAreas = (
  topDomain: number,
  dataPointCount: number,
  highlights?: HighlightConfig[] | null
) => {
  if (!highlights) {
    return null
  }

  const highlightAreas = toRechartsHighlightFormat(
    topDomain,
    dataPointCount,
    highlights
  )

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
  lines: LineConfig,
  orderedData: OrderedChartDataPoint[]
) =>
  Object.keys(lines).map((name, index) => {
    const line = lines[name]
    const isReferenceLine = line.variant === 'reference'
    return (
      <Line
        key={`line-${index}`}
        data={orderedData}
        dataKey={name}
        stroke={line.color}
        dot={isReferenceLine ? false : { fill: line.color }}
        isAnimationActive={IS_ANIMATION_ACTIVE}
        strokeDasharray={isReferenceLine ? '3 3' : 'none'}
      />
    )
  })

export const LineChart = ({
  data,
  lineConfig: lines,
  unit,
  xAxisKey,
  height,
  tooltip,
  customTooltip,
  allowTooltipEscapeViewBox,
  highlights,
  referenceLines,
  children
}: Props) => {
  const yKey = Object.keys(lines)[0]
  const isSingleChart = countNonReferenceLines(lines) === 1

  const topDomain = findTopDomain(data, xAxisKey!)
  const orderedData = orderData(data)
  const ticks = getChartTicks(orderedData)

  const referenceLineList = generateReferenceLines(referenceLines)
  const highlightedAreas = generateHighlightedAreas(
    topDomain,
    orderedData.length - 1,
    highlights
  )
  const lineGraphs = generateLineGraphs(lines, orderedData)

  const formatTicks = (tick: unknown) =>
    orderedData.find(item => item.order === tick)![xAxisKey!]

  return (
    <div
      // ResponsiveContainer expects a wrapper with a fixed height
      style={{ height }}
    >
      <StyleOverrides />
      <ResponsiveContainer>
        <ComposedChart
          margin={{
            top: DEFAULT_MARGIN,
            right: DEFAULT_MARGIN,
            bottom: DEFAULT_MARGIN,
            left: 0
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
          {children}

          {tooltip && (
            <Tooltip
              allowEscapeViewBox={
                allowTooltipEscapeViewBox ? { x: true, y: true } : undefined
              }
              content={customTooltip}
            />
          )}

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
  allowTooltipEscapeViewBox: false,
  xAxisKey: 'x'
}

LineChart.displayName = 'LineChart'

export default LineChart
