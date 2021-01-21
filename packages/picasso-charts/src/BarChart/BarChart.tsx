import { palette } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  YAxis
} from 'recharts'

import BarChartLabel from '../BarChartLabel'
import CHART_CONSTANTS, { chartMargins } from '../utils/constants'

const {
  TICK_MARGIN,
  MIN_TICK_GAP,
  TICK_LINE,
  AXIS_LINE,
  Y_AXIS_WIDTH,
  LEGEND_TOP_OFFSET
} = CHART_CONSTANTS

export type BaseChartProps = {
  height?: number
  tooltip?: boolean
  customTooltip?: React.ReactElement
  allowTooltipEscapeViewBox?: boolean
  className?: string
}

export interface Props<K extends string> extends BaseChartProps {
  data: { name: string; value: { [key in K]: number } }[]
  fill: { [key in K]: string }
  height?: number
  label?: boolean
  customLabel?: React.ReactElement
}

const StyleOverrides = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          tspan {
            font-size: 11px;
            fill: ${palette.grey.dark};
          }
      `
    }}
  />
)

const BarChart = <K extends string>({
  data,
  fill,
  className,
  height,
  tooltip,
  customTooltip,
  label,
  customLabel,
  allowTooltipEscapeViewBox
}: Props<K>) => {
  const dataKeys = Object.keys(data[0].value) as K[]

  const formattedData = data.map(dataItem => ({
    name: dataItem.name,
    ...dataItem.value
  }))
  const labelElement = useMemo(() => {
    if (customLabel) {
      return customLabel
    }

    return label ? <BarChartLabel /> : undefined
  }, [label, customLabel])

  const tooltipElement = useMemo(() => {
    return tooltip || customTooltip ? (
      <Tooltip
        allowEscapeViewBox={
          allowTooltipEscapeViewBox ? { x: true, y: true } : undefined
        }
        content={customTooltip}
      />
    ) : (
      undefined
    )
  }, [tooltip, customTooltip, allowTooltipEscapeViewBox])

  return (
    <div style={{ height }} className={className}>
      <StyleOverrides />
      <ResponsiveContainer>
        <RechartsBarChart
          margin={chartMargins}
          data={formattedData}
          maxBarSize={50}
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
            tickLine={TICK_LINE}
            axisLine={AXIS_LINE}
            minTickGap={MIN_TICK_GAP}
            tickMargin={TICK_MARGIN}
            width={Y_AXIS_WIDTH}
          />
          {tooltipElement}
          <Legend
            wrapperStyle={{
              fontSize: 11,
              color: palette.grey.dark,
              paddingTop: LEGEND_TOP_OFFSET
            }}
            iconSize={12}
          />
          {dataKeys.map(dataKey => (
            <Bar
              key={dataKey}
              dataKey={dataKey}
              fill={fill[dataKey]}
              label={labelElement}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

BarChart.defaultProps = {
  height: 200,
  tooltip: false,
  label: false
}

export default BarChart
