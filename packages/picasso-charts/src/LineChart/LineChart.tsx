/* eslint-disable complexity */
import React, { useRef } from 'react'
import { palette } from '@toptal/picasso/utils'
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
  Tooltip
} from 'recharts'
import { ticks as getD3Ticks } from 'd3-array'
import { makeStyles, Theme } from '@material-ui/core'

import { ChartDot } from './ChartDot'
import calculateTooltipPosition from '../utils/calculate-tooltip-position'
import { getChartTicks, toRechartsHighlightFormat, orderData } from '../utils'
import { findTopDomain } from './utils'
import CHART_CONSTANTS, { chartMargins } from '../utils/constants'
import styles from './styles'
import {
  CoordinatePayload,
  BaseLineChartProps,
  ChartDataPoint,
  Domain,
  LineConfig,
  OrderedChartDataPoint,
  HighlightConfig
} from '../types'

const {
  BOTTOM_DOMAIN,
  TICK_MARGIN,
  MIN_TICK_GAP,
  TICK_LINE,
  AXIS_LINE,
  IS_ANIMATION_ACTIVE,
  Y_AXIS_WIDTH,
  NUMBER_OF_TICKS
} = CHART_CONSTANTS

type RechartsOnMouseMove = CoordinatePayload | null

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

  return highlightAreas.map(highlightArea =>
    highlightArea.map(props => (
      <ReferenceArea key={Object.values(props).join('-')} {...props} />
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

const positionOverride = { x: 0, y: 0 }

const useStyles = makeStyles<Theme>(styles, {
  name: 'LineChart'
})

const defaultGetYAxisTicks = (domain: Domain) =>
  getD3Ticks(domain[0], domain[1], NUMBER_OF_TICKS)

export const LineChart = (props: Props) => {
  const classes = useStyles()
  const {
    data,
    lineConfig: lines,
    unit,
    xAxisKey = 'x',
    height,
    tooltip,
    customTooltip,
    allowTooltipEscapeViewBox,
    highlights,
    referenceLines,
    showBottomYAxisLabel,
    children,
    getXAxisTicks = getChartTicks,
    getYAxisTicks = defaultGetYAxisTicks,
    formatYAxisTick
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

  const containerRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const getTooltipElement = () => tooltipRef?.current || null

  const getChartElement = () => containerRef?.current || null

  const onMouseMovement = (next: RechartsOnMouseMove) => {
    if (allowTooltipEscapeViewBox && next?.isTooltipActive) {
      const tooltipElem = getTooltipElement()
      const chartElem = getChartElement()

      calculateTooltipPosition(next, tooltipElem, chartElem)
    }
  }

  const yDomain: Domain = [BOTTOM_DOMAIN, topDomain]

  return (
    <div
      // ResponsiveContainer expects a wrapper with a fixed height
      style={{ height }}
      ref={containerRef}
    >
      <StyleOverrides />
      <ResponsiveContainer>
        <ComposedChart
          margin={chartMargins}
          data={orderedData}
          onMouseMove={onMouseMovement}
          className={cx({
            [classes.hideBottomYAxisLabel]: !showBottomYAxisLabel
          })}
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
              allowEscapeViewBox={
                allowTooltipEscapeViewBox ? { x: true, y: true } : undefined
              }
              // override calculations for tooltip positioning
              position={
                allowTooltipEscapeViewBox ? positionOverride : undefined
              }
              content={customTooltip}
              ref={(node: any) =>
                (tooltipRef.current = node?.wrapperNode || null)
              }
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
