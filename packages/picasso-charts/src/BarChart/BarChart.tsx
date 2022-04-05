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
  Cell
} from 'recharts'
import { ticks as getD3Ticks } from 'd3-array'

import BarChartLabel from '../BarChartLabel'
import { BaseChartProps } from '../types'
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
  TICK_HEIGHT
} = CHART_CONSTANTS

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
  /** Maps bar's key with a color to fill. */
  getBarColor: (params: {
    dataKey: string
    entry?: {
      name: string
      value: { [key in K]: number }
    }
    index?: number
  }) => string
  /** Maps bar's key with a label color. */
  getBarLabelColor?: (params: { dataKey: string; index?: number }) => string
  testIds?: {
    tooltip?: string
  }
  /** Shows label of each bar */
  showBarLabel?: boolean
}

const StyleOverrides = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          tspan {
            font-size: 11px;
            fill: ${palette.grey.dark};
          }

          /* Hide first tick */
          .recharts-yAxis .recharts-cartesian-axis-tick:first-child {
            display: none;
          }
      `
    }}
  />
)

export const formatData = <K extends string>(data: Props<K>['data']) =>
  data.map(dataItem => ({
    ...dataItem.value,
    ...dataItem
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
  ...rest
}: Props<K>) => {
  const dataKeys = Object.keys(data[0].value) as K[]

  const formattedData = formatData(data)

  const tooltipElement = useMemo(
    () =>
      tooltip ? (
        <Tooltip
          data-testid={testIds?.tooltip}
          allowEscapeViewBox={
            allowTooltipEscapeViewBox ? { x: true, y: true } : undefined
          }
          content={customTooltip}
          cursor={false}
        />
      ) : undefined,
    [tooltip, customTooltip, allowTooltipEscapeViewBox]
  )

  const topDomain = findTopDomain(extractValues(data))
  const ticks = getD3Ticks(BOTTOM_DOMAIN, topDomain, NUMBER_OF_TICKS)

  return (
    <div style={{ height, width }} className={className} {...rest}>
      <StyleOverrides />
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
          margin={chartMargins}
          data={formattedData}
          barGap={2}
          barCategoryGap={50}
          barSize={32}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke={palette.grey.lighter2}
            vertical={false}
          />
          <XAxis
            dataKey={labelKey || 'name'}
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
            height={TICK_HEIGHT}
            interval={0}
            tick={{ width: TICK_WIDTH }}
          />
          <YAxis
            type='number'
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
            width={Y_AXIS_WIDTH}
            ticks={ticks}
            domain={[ticks[0], ticks[ticks.length - 1]]}
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
  showBarLabel: true
}

export default BarChart
