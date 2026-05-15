import React from 'react'
import type { ReactNode } from 'react'

const INDICATOR_SIZE = 16

// Shape of an individual series-data item as projected by Recharts onto a
// rendered bar — sourced from Recharts' internal `formattedGraphicalItems`
// payload passed to `<Customized>` render props.
export interface BarSeriesItem {
  name: string
  x: number
  y: number
  width: number
  height: number
}

interface FormattedGraphicalItem {
  props: {
    data: BarSeriesItem[]
  }
}

export interface RenderIndicatorParams {
  dataKey: string
  index: number
  dataItem: BarSeriesItem
}

export type Props = {
  renderIndicator: (params: RenderIndicatorParams) => ReactNode
  formattedGraphicalItems?: FormattedGraphicalItem[]
}

export const BarChartIndicators = ({
  formattedGraphicalItems,
  renderIndicator,
}: Props) => (
  <>
    {formattedGraphicalItems?.map(seriesData => {
      const series = seriesData?.props?.data

      return series.map((item, index) => {
        const dataKey = item.name
        const dataItem = item

        const barIndicatorComponent = renderIndicator({
          dataKey,
          index,
          dataItem,
        })

        if (!barIndicatorComponent) {
          return null
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
    })}
  </>
)
