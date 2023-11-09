import type { BaseProps } from '@toptal/picasso'
import type { ReactNode } from 'react'

export type CoordinatePayload = {
  activeCoordinate?: { x: number; y: number }
  activeLabel?: string
  activePayload?: object[]
  activeTooltipIndex?: number
  chartX?: number
  chartY?: number
  isTooltipActive?: boolean
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
  /** Height of chart */
  height?: number | string
  /** Width of chart */
  width?: number | string
  /** Toggle tooltip on hover */
  tooltip?: boolean
  /** Requires `tooltip` to be `true` */
  customTooltip?: React.ReactElement
  /** Allows the tooltip to extend beyond the viewBox of the chart itself */
  allowTooltipEscapeViewBox?: boolean
  /** Layout of the barChart */
  layout?: 'vertical' | 'horizontal'
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
  /** Text label to be displayed on the Y axis */
  unit?: string
  /** Name of point on the horizontal axis */
  xAxisKey?: string
  /**
   * A dictionary of each line name as a key and the line's color and variant for value
   * @type Record<string, { color: string; variant?: 'solid' | 'reference' }>
   */
  lineConfig: LineConfig
  /** Children component which will be rendered below the line graphs */
  children?: ReactNode
  /** Shows the bottom Y axis label */
  showBottomYAxisLabel?: boolean
  /** Returns X axis ticks based on data */
  getXAxisTicks?: (orderedChartData: OrderedChartDataPoint[]) => number[]
  /** Returns Y axis ticks */
  getYAxisTicks?: (domain: Domain) => number[]
  /** The formatter function of tick. */
  formatYAxisTick?: (value: number, domain: Domain) => string
}

export type HighlightConfig = {
  from: number
  to: number
  color: string
}

export type BarIndicatorConfig = {
  color: string
  label: string
}

export type BarChartDataItem<K extends string | number | symbol> = {
  name: string
  value: {
    [key in K]: string | number | symbol
  }
}

export type BarOptions = {
  dataKey: string
  dataItem?: any
  index?: number
}

// Private type for a prop not exported by recharts
declare module 'recharts/types/chart/generateCategoricalChart' {
  interface CategoricalChartProps {
    overflow?: string
  }
}
