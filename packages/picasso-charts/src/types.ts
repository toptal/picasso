import { BaseProps } from '@toptal/picasso'
import { ReactNode } from 'react'

export type CoordinatePayload = {
  activeCoordinate: { x: number; y: number }
  activeLabel: number
  activePayload: object[]
  activeTooltipIndex: number
  chartX: number
  chartY: number
  isTooltipActive: boolean
}

export type PositionTranslate = {
  key: 'x' | 'y'
  cursorCoordinate: number
  chartScreenOffset: number
  tooltipDimension: number
  screenDimension: number
  offset: number
  viewbox: { x: number; y: number }
}

export interface BaseChartProps extends BaseProps {
  height?: number
  width?: number
  tooltip?: boolean
  customTooltip?: React.ReactElement
  allowTooltipEscapeViewBox?: boolean
}

export type ChartDataPoint = Record<string, string | number | boolean>

export type OrderedChartDataPoint = ChartDataPoint & {
  order: number
}

export type LineConfig = Record<
  string,
  { color: string; variant?: 'solid' | 'reference' }
>

export type Domain = [number, number]

export type BaseLineChartProps = BaseChartProps & {
  unit?: string
  xAxisKey?: string
  lineConfig: LineConfig
  children?: ReactNode
  showBottomYAxisLabel?: boolean
  getXAxisTicks?: (orderedChartData: OrderedChartDataPoint[]) => number[]
  getYAxisTicks?: (domain: Domain) => number[]
  formatYAxisTick?: (value: number, domain: Domain) => string
}
