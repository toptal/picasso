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
import CHART_CONSTANTS, { chartMargins } from '../utils/constants'
import { findTopDomain } from './utils'

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

export interface Props<
  K extends string | number | symbol,
  V = { [key in K]?: number }
> extends BaseChartProps {
  data: {
    name: string
    value: V
  }[]
  dataKeys: K[]
  labelKey?: string
  getBarColor: (
    dataKey: string,
    entry?: {
      name: string
      value: V
    },
    index?: number
  ) => string
  getBarLabelColor?: (params: { dataKey: string; index?: number }) => string
  getBarStackId?: (dataKey: string) => string | undefined
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

export const extractValues = <K extends string>(data: Props<K>['data']) =>
  data.map(dataItem => dataItem.value)

const BarChart = <K extends string>({
  data,
  dataKeys,
  className,
  height,
  width,
  tooltip,
  customTooltip,
  allowTooltipEscapeViewBox,
  getBarColor = () => palette.blue.main,
  labelKey,
  getBarLabelColor = () => palette.grey.dark,
  getBarStackId = () => undefined,
  ...rest
}: Props<K>) => {
  const formattedData = formatData(data)

  const tooltipElement = useMemo(
    () =>
      tooltip ? (
        <Tooltip
          data-testid='tooltip'
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

  const renderBars = () => {
    return dataKeys.map(dataKey => {
      return (
        <Bar
          key={dataKey}
          dataKey={dataKey}
          stackId={getBarStackId(dataKey)}
          fill={getBarColor(dataKey)}
          label={
            <BarChartLabel
              dataKey={dataKey}
              getBarLabelColor={getBarLabelColor}
            />
          }
        >
          {data.map((entry, entryIndex) => {
            const fill = getBarColor?.(dataKey, entry, entryIndex)

            return <Cell key={`cell-${entryIndex}`} fill={fill} />
          })}
        </Bar>
      )
    })
  }

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
          {renderBars()}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

BarChart.defaultProps = {
  height: 200,
  width: 'auto',
  tooltip: false
}

export default BarChart
