import React from 'react'
import {
  Rectangle,
  Label,
  Layer
} from 'recharts'

import type { BarIndicatorConfig } from '../types'

export type Props = {
  formattedGraphicalItems: any
}

export type BarIndicatorFunction = (params: { dataKey: string; index?: number }) => BarIndicatorConfig

const INDICATOR_SIZE = 16

const getBarChartIndicatorComponent = (getBarChartIndicator:BarIndicatorFunction) => {
  const BarChartIndicators = ({ formattedGraphicalItems }:any) => {
    return formattedGraphicalItems.map((seriesData: any, seriesIndex: number) => {
      return seriesData?.props?.data.map((item:any, index:number) => {
        const dataKey = item.name as string

        const barIndicatorConfig = getBarChartIndicator({dataKey, index})
        
        if (!barIndicatorConfig) return

        return (
          <Layer>
            <Rectangle
              key={`rect-s${seriesIndex}-${item.name}`}
              width={INDICATOR_SIZE}
              height={INDICATOR_SIZE}
              x={item.x + item.width/2 - INDICATOR_SIZE/2}
              y={item.y + item.height - INDICATOR_SIZE/2}
              fill={barIndicatorConfig.color}
              radius={2}
            />
            <Label
              key={`label-s${seriesIndex}-${item.name}`}
              value={barIndicatorConfig.label}
              stroke='#fff'
              position='center'
              viewBox={{
                cx: item.x + item.width/2,
                cy: item.y + item.height,
              }}
            />
          </Layer>
        )
      })
    })
  }

  return BarChartIndicators
}


export default getBarChartIndicatorComponent
