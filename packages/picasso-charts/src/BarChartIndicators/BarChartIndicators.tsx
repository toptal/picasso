import React, { ReactNode } from 'react'
import { Rectangle, Label, Layer } from 'recharts'

const INDICATOR_SIZE = 16

export type BarIndicatorFunction = (params: {
  dataKey: string
  index?: number
}) => ReactNode

export type Props = {
  getBarChartIndicator: BarIndicatorFunction
  formattedGraphicalItems?: any
}

export const BarChartIndicators = ({
  formattedGraphicalItems,
  getBarChartIndicator,
}: Props) => {
  return formattedGraphicalItems.map((seriesData: any) => {
    const series = seriesData?.props?.data

    return series.map((item: any, index: number) => {
      const dataKey = item.name

      const barIndicatorComponent = getBarChartIndicator({ dataKey, index })

      if (!barIndicatorComponent) {
        return
      }

      return (
        <BarChartIndicator
          item={item}
          key={`rect-${item.name}`}
          indicatorComponent={barIndicatorComponent}
        />
      )
    })
  })
}

export type BarChartIndicatorProps = {
  item: any
  indicatorComponent: ReactNode | string
}

export const BarChartIndicator = ({ item, indicatorComponent }: BarChartIndicatorProps) => (
  <svg
    width={INDICATOR_SIZE}
    height={INDICATOR_SIZE}
    x={item.x + item.width / 2}
    y={item.y + item.height}
    overflow='visible'
  >
    <Rectangle
      width={INDICATOR_SIZE}
      height={INDICATOR_SIZE}
      x={ -INDICATOR_SIZE / 2}
      y={ -INDICATOR_SIZE / 2}
      fill='#f00'
      radius={2}
    />
    { indicatorComponent }
  </svg>
)
