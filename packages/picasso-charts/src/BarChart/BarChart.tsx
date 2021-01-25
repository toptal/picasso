import { palette } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Bar,
  YAxis,
  ResponsiveContainer
} from 'recharts'
import { ticks as getD3Ticks } from 'd3-array'

import BarChartLabel, { BarChartLabelProps } from '../BarChartLabel'
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
  NUMBER_OF_TICKS
} = CHART_CONSTANTS

type FillColor = 'blue' | 'dark-grey'

export interface Props<K extends string | number | symbol>
  extends BaseChartProps {
  data: { name: string; value: { [key in K]: number } }[]
  fillSchema?: { [key in K]: FillColor }
  labelColorSchema?: { [key in K]: BarChartLabelProps['color'] }
  height?: number
  width?: number
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

const getFillColor = (color: FillColor | undefined, barIndex: number) => {
  if (!color) return barIndex % 2 === 0 ? palette.blue.main : palette.grey.dark

  if (color === 'dark-grey') {
    return palette.grey.dark
  }

  return palette.blue.main
}

const formatData = <K extends string>(data: Props<K>['data']) =>
  data.map(dataItem => ({
    name: dataItem.name,
    ...dataItem.value
  }))

const extractValues = <K extends string>(data: Props<K>['data']) =>
  data.map(dataItem => dataItem.value)

const BarChart = <K extends string>({
  data,
  fillSchema,
  labelColorSchema,
  className,
  height,
  width,
  tooltip,
  customTooltip,
  allowTooltipEscapeViewBox,
  ...rest
}: Props<K>) => {
  const dataKeys = Object.keys(data[0].value) as K[]

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
        />
      ) : (
        undefined
      ),
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
            dataKey='name'
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
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
          {dataKeys.map((dataKey, index) => (
            <Bar
              key={dataKey}
              dataKey={dataKey}
              fill={getFillColor(fillSchema?.[dataKey], index)}
              label={<BarChartLabel color={labelColorSchema?.[dataKey]} />}
            />
          ))}
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
