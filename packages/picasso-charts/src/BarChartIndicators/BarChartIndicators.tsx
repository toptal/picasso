import React from 'react'
import { Rectangle, Label, Layer } from 'recharts'

import type { BarIndicatorConfig } from '../types'

const INDICATOR_SIZE = 16

export type BarIndicatorFunction = (params: {
  dataKey: string
  index?: number
}) => BarIndicatorConfig

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

      const barIndicator = getBarChartIndicator({ dataKey, index })

      if (!barIndicator) {
        return
      }

      return (
        <BarChartIndicator
          item={item}
          key={`rect-${item.name}`}
          indicator={barIndicator}
        />
      )
    })
  })
}

export type BarChartIndicatorProps = {
  item: any
  indicator: BarIndicatorConfig
}

const BarChartIndicator = ({ item, indicator }: BarChartIndicatorProps) => (
  <Layer>
    <Rectangle
      width={INDICATOR_SIZE}
      height={INDICATOR_SIZE}
      x={item.x + item.width / 2 - INDICATOR_SIZE / 2}
      y={item.y + item.height - INDICATOR_SIZE / 2}
      fill={indicator.color}
      radius={2}
    />
    <Label
      value={indicator.label}
      stroke='#fff'
      position='center'
      viewBox={{
        cx: item.x + item.width / 2,
        cy: item.y + item.height,
      }}
    />
  </Layer>
)
