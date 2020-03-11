import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  Area,
  Line,
  Tooltip,
  ContentRenderer,
  TooltipProps
} from 'recharts'

import './DemoChart.css'

export type Props = BaseProps

const data = [
  { date: 'Oct 20', order: 0, y: 1.7 },
  { date: 'Oct 21', order: 1, y: 2 },
  { date: 'Oct 22', order: 2, y: 1.7 },
  { date: 'Oct 23', order: 3, y: 2 },
  { date: 'Oct 24', order: 4, y: 1.5 },
  { date: 'Oct 25', order: 5, y: 1.3 },
  { date: 'Oct 26', order: 6, y: 1.6 },
  { date: 'Oct 27', order: 7, y: 2.7 },
  { date: 'Oct 28', order: 8, y: 3.7 },
  { date: 'Oct 29', order: 9, y: 1.7 },
  { date: 'Oct 30', order: 10, y: 1.5 },
  { date: 'Oct 31', order: 11, y: 1.6 },
  { date: 'Nov 01', order: 12, y: 2 },
  { date: 'Nov 02', order: 13, y: 1.5 },
  { date: 'Nov 03', order: 14, y: 1.3 },
  { date: 'Nov 04', order: 15, y: 1.5 },
  { date: 'Nov 05', order: 16, y: 1.5 },
  { date: 'Nov 06', order: 17, y: 1.8 },
  { date: 'Nov 07', order: 18, y: 1.6 },
  { date: 'Nov 08', order: 19, y: 2 },
  { date: 'Nov 09', order: 20, y: 2 },
  { date: 'Nov 10', order: 21, y: 3.1 },
  { date: 'Nov 11', order: 22, y: 1.9 },
  { date: 'Nov 12', order: 23, y: 1.4 },
  { date: 'Nov 13', order: 24, y: 1.6 },
  { date: 'Nov 14', order: 25, y: 2 },
  { date: 'Nov 15', order: 26, y: 1.7 },
  { date: 'Nov 16', order: 27, y: 1.4 },
  { date: 'Nov 17', order: 28, y: 1.5 },
  { date: 'Nov 18', order: 29, y: 1.7 },
  { date: 'Nov 19', order: 30, y: 1.3 }
]

const renderTooltip: ContentRenderer<TooltipProps> = dataPoint => {
  const date = dataPoint.payload?.[0]?.payload?.date
  const val = dataPoint.payload?.[0]?.payload?.y
  return (
    <div
      style={{ border: '1px solid green', background: 'white', padding: 10 }}
    >
      <div>
        hey, on <b>{date}</b> it was:
      </div>
      <div>{val}</div>
    </div>
  )
}

export const DemoChart = (props: Props) => (
  <ComposedChart
    width={920}
    height={170}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    data={data}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <CartesianGrid stroke='#ebeced' />
    <Tooltip content={renderTooltip} isAnimationActive={false} />

    {/* Axis */}
    <XAxis
      type='number'
      dataKey='order'
      name='date'
      tickLine={false}
      axisLine={false}
      interval='preserveStartEnd'
      ticks={data.map(tick => tick.order)}
      minTickGap={-10}
      tickMargin={16}
      tickFormatter={(tick: unknown) => {
        return data.find(item => item.order === tick)?.date
      }}
      domain={[0, 30]}
    />
    <YAxis
      type='number'
      dataKey='y'
      unit='d'
      domain={[0, 4]}
      tickLine={false}
      axisLine={false}
      interval={0}
      minTickGap={-10}
      tickMargin={16}
    />

    {/* Reference lines */}
    <ReferenceLine y={2} stroke='#d42551' strokeDasharray='3 3 3' />
    <ReferenceLine y={1.5} stroke='#e59c01' strokeDasharray='3 3' />
    <ReferenceLine y={1} stroke='#00cc83' strokeDasharray='3 3' />

    {/* Shape */}
    <Area
      type='linear'
      dataKey='y'
      fill='#204ecf'
      fillOpacity={0.1}
      isAnimationActive={false}
    />
    <Line
      data={data}
      dataKey='y'
      stroke='#204ecf'
      dot={{ fill: '#204ecf' }}
      isAnimationActive={false}
    />

    {/* Red selectinos */}
    <ReferenceArea
      x1={6.5}
      x2={8.5}
      y1={0}
      y2={4}
      fillOpacity={0.1}
      fill='#d42551'
    />

    <ReferenceArea
      x1={6.5}
      x2={8.5}
      y1={3.95}
      y2={4}
      fillOpacity={1}
      fill='#d42551'
    />

    <ReferenceArea
      x1={20.5}
      x2={21.5}
      y1={0}
      y2={4}
      fillOpacity={0.1}
      fill='#d42551'
    />

    <ReferenceArea
      x1={20.5}
      x2={21.5}
      y1={3.95}
      y2={4}
      fillOpacity={1}
      fill='#d42551'
    />
  </ComposedChart>
)

DemoChart.defaultProps = {}

DemoChart.displayName = 'DemoChart'

export default DemoChart
