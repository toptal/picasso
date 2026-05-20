import React, { useMemo } from 'react'
import type { ReactNode } from 'react'
import { palette } from '@toptal/picasso-utils'
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Bar,
  Customized,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { ticks as getD3Ticks } from 'd3-array'

import BarChartLabel from '../BarChartLabel'
import { BarChartIndicators } from '../BarChartIndicators'
import type { BaseChartProps, BarChartDataItem, BarOptions } from '../types'
import { defineStackId, findTopDomain } from './utils'
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

type ShowEveryNthTickValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

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
      value: { [key in K]: any }
    }
    index?: number
  }) => string
  /** Maps bar's key with a label color */
  getBarLabelColor?: (params: BarOptions) => string
  /** Customizes the bar indicators */
  renderBarIndicators?: (params: BarOptions) => ReactNode
  testIds?: {
    tooltip?: string
  }
  /** Shows label of each bar */
  showBarLabel?: boolean
  /** If set false, animation of bar will be disabled */
  isAnimationActive?: boolean
  /** List of bar groups to be stacked. i.e.: [ ['a', 'b'], ['c', 'd'] ] */
  stackedBars?: string[][]
  /** Makes X-axis show only every Nth tick. `0` hides all ticks, `1` shows all ticks (default behavior), `2` shows every 2nd tick, and so on */
  showEveryNthTickOnXAxis?: ShowEveryNthTickValue
  /** Makes Y-axis show only every Nth tick. `0` hides all ticks, `1` shows all ticks (default behavior), `2` shows every 2nd tick, and so on */
  showEveryNthTickOnYAxis?: ShowEveryNthTickValue
  /** If bars should fill all the empty space */
  autoSize?: boolean
  /** Maximum size for the bar */
  maxBarSize?: number
  /** Function to format ticks of the value axis */
  valueAxisTickFormatter?: ((value: any, index: number) => string) | undefined
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

export const formatData = <T extends string>(data: Props<T>['data']) =>
  data.map(dataItem => ({
    ...dataItem.value,
    ...dataItem,
  }))

const defaultGetBarColor = () => palette.blue.main
const defaultGetBarLabelColor = () => palette.grey.dark

export const extractValues = <T extends string>(data: Props<T>['data']) =>
  data.map(dataItem => dataItem.value)

const DEFAULT_BAR_CATEGORY_GAP = 50
const DEFAULT_BAR_SIZE = 32
const DEFAULT_BAR_GAP = 2

const BarChart = <T extends string>({
  data,
  className,
  height = 200,
  width = 'auto',
  tooltip = false,
  customTooltip,
  allowTooltipEscapeViewBox,
  getBarColor = defaultGetBarColor,
  labelKey = 'name',
  getBarLabelColor = defaultGetBarLabelColor,
  renderBarIndicators,
  testIds,
  showBarLabel = true,
  isAnimationActive,
  layout = 'horizontal',
  stackedBars,
  showEveryNthTickOnXAxis = 1,
  showEveryNthTickOnYAxis = 1,
  autoSize,
  maxBarSize,
  valueAxisTickFormatter,
  ...rest
}: Props<T>) => {
  const horizontal = layout === 'horizontal'
  const dataKeys = Object.keys(data[0].value) as T[]

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

  const topDomain = findTopDomain(extractValues(data), stackedBars)
  const ticks = getD3Ticks(BOTTOM_DOMAIN, topDomain, NUMBER_OF_TICKS)

  const categoryAxisProps = {
    dataKey: labelKey,
    height: TICK_HEIGHT,
    interval: 0,
    tick: { width: TICK_WIDTH },
  }
  const valueAxisProps = {
    width: Y_AXIS_WIDTH,
    ticks: ticks,
    domain: [ticks[0], ticks[ticks.length - 1]],
    tickFormatter: valueAxisTickFormatter,
  }

  const xAxisProps = horizontal ? categoryAxisProps : valueAxisProps
  const yAxisProps = !horizontal ? categoryAxisProps : valueAxisProps

  // If ticks are not shown, the corresponding axis is not rendered to avoid empty space
  const renderXAxis = showEveryNthTickOnXAxis !== 0
  const renderYAxis = showEveryNthTickOnYAxis !== 0

  return (
    <div style={{ height, width }} className={className} {...rest}>
      <StyleOverrides />
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
          layout={layout}
          margin={chartMargins}
          data={formattedData}
          maxBarSize={maxBarSize}
          barGap={DEFAULT_BAR_GAP}
          barCategoryGap={!autoSize ? DEFAULT_BAR_CATEGORY_GAP : undefined}
          barSize={!autoSize ? DEFAULT_BAR_SIZE : undefined}
          overflow='visible'
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke={palette.grey.lighter2}
            vertical={!horizontal}
          />

          {renderXAxis && (
            <XAxis
              {...xAxisProps}
              type={horizontal ? 'category' : 'number'}
              tickLine={TICK_LINE}
              axisLine={AXIS_LINE}
              minTickGap={MIN_TICK_GAP}
              tickMargin={TICK_MARGIN}
              interval={showEveryNthTickOnXAxis - 1}
            />
          )}

          {renderYAxis && (
            <YAxis
              {...yAxisProps}
              type={horizontal ? 'number' : 'category'}
              tickLine={TICK_LINE}
              axisLine={AXIS_LINE}
              minTickGap={MIN_TICK_GAP}
              tickMargin={TICK_MARGIN}
              interval={showEveryNthTickOnYAxis - 1}
            />
          )}

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
              stackId={stackedBars && defineStackId(dataKey, stackedBars)}
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
          {renderBarIndicators && (
            <Customized
              component={
                <BarChartIndicators renderIndicator={renderBarIndicators} />
              }
            />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart
