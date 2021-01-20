import { palette } from '@toptal/picasso/utils'
import React from 'react'
import {
  BarChart as RechartsBarChart,
  LabelProps,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  YAxis,
  ViewBox
} from 'recharts'

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

export type BarLabelProps = LabelProps

export interface Props<K extends string> extends BaseChartProps {
  data: { name: string; value: { [key in K]: number } }[]
  fill: { [key in K]: string }
  label?: boolean | React.FC<LabelProps>
  height?: number
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

const DefaultBarLabel = ({ value, viewBox }: LabelProps) => {
  const width = (viewBox as ViewBox)?.width ?? 0
  const xPosition = (viewBox as ViewBox)?.x ?? 0
  const yPosition = (viewBox as ViewBox)?.y ?? 0

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={palette.grey.dark}
      style={{ fontSize: 11 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

const BarChart = <K extends string>({
  data,
  fill,
  tooltip,
  className,
  height,
  customTooltip,
  label,
  allowTooltipEscapeViewBox
}: Props<K>) => {
  const dataKeys = Object.keys(data[0].value) as K[]
  const formattedData = data.map(dataItem => ({
    name: dataItem.name,
    ...dataItem.value
  }))

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
          {tooltip && (
            <Tooltip
              allowEscapeViewBox={
                allowTooltipEscapeViewBox ? { x: true, y: true } : undefined
              }
              content={customTooltip}
            />
          )}
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
              label={label === true ? DefaultBarLabel : label}
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
