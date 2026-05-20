import React from 'react'
import type { ReactNode } from 'react'

const INDICATOR_SIZE = 16

export type Props = {
  renderIndicator: (params: any) => ReactNode
  formattedGraphicalItems?: any
}

export const BarChartIndicators = ({
  formattedGraphicalItems,
  renderIndicator,
}: Props) => {
  return formattedGraphicalItems.map((seriesData: any) => {
    const series = seriesData?.props?.data

    return series.map((item: any, index: number) => {
      const dataKey = item.name
      const dataItem = item

      const barIndicatorComponent = renderIndicator({
        dataKey,
        index,
        dataItem,
      })

      if (!barIndicatorComponent) {
        return
      }

      return (
        <svg
          key={`indicator-${dataKey}`}
          width={INDICATOR_SIZE}
          height={INDICATOR_SIZE}
          x={item.x + item.width / 2}
          y={item.y + item.height}
          overflow='visible'
        >
          {barIndicatorComponent}
        </svg>
      )
    })
  })
}
