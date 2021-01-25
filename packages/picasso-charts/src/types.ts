import { BaseProps } from '@toptal/picasso'
import { ReactNode } from 'react'

export interface BaseChartProps extends BaseProps {
  height?: number
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
