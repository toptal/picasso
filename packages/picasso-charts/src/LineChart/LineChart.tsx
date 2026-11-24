/* eslint-disable complexity */
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import cx from 'classnames'
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
  Tooltip,
  DefaultZIndexes,
} from 'recharts'
import { ticks as getD3Ticks } from 'd3-array'

import { ChartDot } from './ChartDot'
import { getChartTicks, toRechartsHighlightFormat, orderData } from '../utils'
import { findTopDomain } from './utils'
import CHART_CONSTANTS, {
  chartMargins,
  LAYER_NO_OUTLINE,
  SURFACE_FOCUS_RING,
  SURFACE_OVERFLOW_VISIBLE,
} from '../utils/constants'
import type {
  BaseLineChartProps,
  ChartDataPoint,
  Domain,
  LineConfig,
  OrderedChartDataPoint,
  HighlightConfig,
} from '../types'

const {
  BOTTOM_DOMAIN,
  TICK_MARGIN,
  MIN_TICK_GAP,
  TICK_LINE,
  AXIS_LINE,
  IS_ANIMATION_ACTIVE,
  Y_AXIS_WIDTH,
  NUMBER_OF_TICKS,
} = CHART_CONSTANTS

const HIDE_BOTTOM_Y_AXIS_LABEL_CLASS = 'picasso-charts-hide-bottom-y-axis-label'

export type ReferenceLineType = {
  y: number
  color: string
}

export type Props = BaseLineChartProps & {
  /**
   * A list of data points to be rendered as a line chart
   * @type { [key: string]: string|number; }[]
   */
  data: ChartDataPoint[]
  /**
   * A list of regions to be highlighted
   * @type { from: number; to: number; color: string; }[]
   */
  highlights?: HighlightConfig[] | null
  /**
   * Will display a full-width horizontal dashed line at the specified height in the specified color
   * @type { y: number; color: string; }[]
   */
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
          .${HIDE_BOTTOM_Y_AXIS_LABEL_CLASS} .recharts-yAxis-tick-labels .recharts-cartesian-axis-tick-label:first-child {
            display: none;
          }
      `,
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

  return highlightAreas.map(highlightArea =>
    highlightArea.map(props => (
      <ReferenceArea
        key={Object.values(props).join('-')}
        {...props}
        // draw highlight areas above the line and its dots
        zIndex={DefaultZIndexes.scatter + 1}
      />
    ))
  )
}

const generateReferenceLines = (referenceLines?: ReferenceLineType[]) => {
  if (!referenceLines) {
    return null
  }

  // eslint-disable-next-line id-length
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
  Object.keys(lines).map(name => {
    const line = lines[name]
    const isReferenceLine = line.variant === 'reference'

    return (
      <Line
        key={`${line.color}-${name}`}
        data={orderedData}
        dataKey={name}
        stroke={line.color}
        dot={isReferenceLine ? false : <ChartDot color={line.color} />}
        isAnimationActive={IS_ANIMATION_ACTIVE}
        strokeDasharray={isReferenceLine ? '3 3' : 'none'}
      />
    )
  })

const defaultGetYAxisTicks = (domain: Domain) =>
  getD3Ticks(domain[0], domain[1], NUMBER_OF_TICKS)

const TOOLTIP_WRAPPER_STYLE = { outline: 'none' }

export const LineChart = ({
  height = 200,
  unit = 'd',
  tooltip = false,
  allowTooltipEscapeViewBox = false,
  xAxisKey = 'x',
  getXAxisTicks = getChartTicks,
  getYAxisTicks = defaultGetYAxisTicks,
  ...props
}: Props): React.ReactElement => {
  const {
    data,
    lineConfig: lines,
    customTooltip,
    highlights,
    referenceLines,
    showBottomYAxisLabel,
    children,
    formatYAxisTick,
    'aria-label': ariaLabel,
  } = props

  const yKey = Object.keys(lines)[0]
  const isSingleChart = countNonReferenceLines(lines) === 1
  const topDomain = findTopDomain(data, xAxisKey)
  const orderedData = orderData(data)
  const xAxisTicks = getXAxisTicks(orderedData)
  const referenceLineList = generateReferenceLines(referenceLines)
  const highlightedAreas = generateHighlightedAreas(
    topDomain,
    orderedData.length - 1,
    highlights
  )

  const lineGraphs = generateLineGraphs(lines, orderedData)

  const formatTicks = (tick: unknown) =>
    orderedData.find(item => item.order === tick)?.[xAxisKey] as string

  const yDomain: Domain = [BOTTOM_DOMAIN, topDomain]

  return (
    // ResponsiveContainer expects a wrapper with a fixed height
    <div style={{ height }}>
      <StyleOverrides />
      <ResponsiveContainer>
        <ComposedChart
          margin={chartMargins}
          data={orderedData}
          aria-label={ariaLabel}
          className={cx(
            SURFACE_OVERFLOW_VISIBLE,
            SURFACE_FOCUS_RING,
            LAYER_NO_OUTLINE,
            {
              [HIDE_BOTTOM_Y_AXIS_LABEL_CLASS]: !showBottomYAxisLabel,
            }
          )}
          accessibilityLayer={Boolean(tooltip)}
        >
          <CartesianGrid stroke={palette.grey.lighter2} />

          {/* Axis */}
          <XAxis
            type='number'
            dataKey='order'
            name={xAxisKey}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            interval='preserveStartEnd'
            ticks={xAxisTicks}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
            tickFormatter={formatTicks}
            domain={[BOTTOM_DOMAIN, orderedData.length - 1]}
          />
          <YAxis
            type='number'
            dataKey={yKey}
            // re-charts will append unit even if we have a format function, hence it's removed here
            unit={formatYAxisTick ? undefined : unit}
            domain={yDomain}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            interval={0}
            ticks={getYAxisTicks(yDomain)}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
            width={Y_AXIS_WIDTH}
            tickFormatter={
              formatYAxisTick
                ? value => formatYAxisTick(value, yDomain)
                : undefined
            }
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
              wrapperStyle={TOOLTIP_WRAPPER_STYLE}
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

LineChart.displayName = 'LineChart'

export default LineChart
