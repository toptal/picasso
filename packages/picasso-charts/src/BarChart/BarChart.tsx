import React, { useMemo } from 'react'
import { palette } from '@toptal/picasso/utils'
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Bar,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { ticks as getD3Ticks } from 'd3-array'

import BarChartLabel from '../BarChartLabel'
import type { BaseChartProps } from '../types'
import { findTopDomain } from './utils'
import CHART_CONSTANTS, { chartMargins } from '../utils/constants'

const {
  TICK_MARGIN,
  MIN_TICK_GAP,
  TICK_LINE,
  AXIS_LINE,
  Y_AXIS_WIDTH,
  BOTTOM_DOMAIN,
  NUMBER_OF_TICKS,
  TICK_WIDTH,
  TICK_HEIGHT,
} = CHART_CONSTANTS
const TOOLTIP_WRAPPER_STYLE = { outline: 'none' }

export type BarChartDataItem<K extends string | number | symbol> = {
  name: string
  value: {
    [key in K]: number
  }
}

export interface Props<K extends string | number | symbol>
  extends BaseChartProps {
  /**
   * A list of data points to be rendered as a bar chart
   * @type { name: string; value: { [key in K]: number }; }[]
   */
  data: BarChartDataItem<K>[]
  /** Name of point on the horizontal axis */
  labelKey?: string
  /** Maps bar's key with a color to fill */
  getBarColor: (params: {
    dataKey: string
    entry?: {
      name: string
      value: { [key in K]: number }
    }
    index?: number
  }) => string
  /** Maps bar's key with a label color */
  getBarLabelColor?: (params: { dataKey: string; index?: number }) => string
  testIds?: {
    tooltip?: string
  }
  /** Shows label of each bar */
  showBarLabel?: boolean
  /** If set false, animation of bar will be disabled */
  isAnimationActive?: boolean
}

const StyleOverrides = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          tspan {
            font-size: 11px;
            fill: ${palette.grey.dark};
          }
      `,
    }}
  />
)

export const formatData = <K extends string>(data: Props<K>['data']) =>
  data.map(dataItem => ({
    ...dataItem.value,
    ...dataItem,
  }))

const defaultGetBarColor = () => palette.blue.main
const defaultGetBarLabelColor = () => palette.grey.dark

export const extractValues = <K extends string>(data: Props<K>['data']) =>
  data.map(dataItem => dataItem.value)

const BarChart = <K extends string>({
  data,
  className,
  height,
  width,
  tooltip,
  customTooltip,
  allowTooltipEscapeViewBox,
  getBarColor = defaultGetBarColor,
  labelKey,
  getBarLabelColor = defaultGetBarLabelColor,
  testIds,
  showBarLabel,
  isAnimationActive,
  layout,
  ...rest
}: Props<K>) => {
  const horizontal = layout === 'horizontal'
  const dataKeys = Object.keys(data[0].value) as K[]

  const formattedData = formatData(data)

  const tooltipElement = useMemo(
    () =>
      tooltip ? (
        <Tooltip
          wrapperStyle={TOOLTIP_WRAPPER_STYLE}
          data-testid={testIds?.tooltip}
          allowEscapeViewBox={
            allowTooltipEscapeViewBox ? { x: true, y: true } : undefined
          }
          content={customTooltip}
          cursor={false}
        />
      ) : undefined,
    [tooltip, customTooltip, allowTooltipEscapeViewBox, testIds?.tooltip]
  )

  const topDomain = findTopDomain(extractValues(data))
  const ticks = getD3Ticks(BOTTOM_DOMAIN, topDomain, NUMBER_OF_TICKS)

  const categoryAxisProps = {
    dataKey: labelKey || 'name',
    height: TICK_HEIGHT,
    interval: 0,
    tick: { width: TICK_WIDTH },
  }
  const valueAxisProps = {
    width: Y_AXIS_WIDTH,
    ticks: ticks,
    domain: [ticks[0], ticks[ticks.length - 1]],
  }

  const xAxisProps = horizontal ? categoryAxisProps : valueAxisProps
  const yAxisProps = !horizontal ? categoryAxisProps : valueAxisProps

  return (
    <div style={{ height, width }} className={className} {...rest}>
      <StyleOverrides />
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
          layout={layout}
          margin={chartMargins}
          data={formattedData}
          barGap={2}
          barCategoryGap={50}
          barSize={32}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke={palette.grey.lighter2}
            vertical={!horizontal}
          />
          <XAxis
            {...xAxisProps}
            type={horizontal ? 'category' : 'number'}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
          />
          <YAxis
            {...yAxisProps}
            type={horizontal ? 'number' : 'category'}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
          />
          {tooltipElement}
          {dataKeys.map(dataKey => (
            <Bar
              key={dataKey}
              dataKey={dataKey}
              label={
                showBarLabel ? (
                  <BarChartLabel
                    dataKey={dataKey}
                    getBarLabelColor={getBarLabelColor}
                  />
                ) : undefined
              }
              isAnimationActive={isAnimationActive}
            >
              {data.map((entry, index) => {
                const fill = getBarColor?.({ dataKey, entry, index })

                return (
                  <Cell
                    key={`${entry.value}-${entry.name}-${String(index)}`}
                    fill={fill}
                  />
                )
              })}
            </Bar>
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

BarChart.defaultProps = {
  height: 200,
  width: 'auto',
  tooltip: false,
  showBarLabel: true,
  layout: 'horizontal',
}

export default BarChart
