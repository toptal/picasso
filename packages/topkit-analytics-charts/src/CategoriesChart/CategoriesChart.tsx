import React, { useMemo } from 'react'
import type { BarChartProps } from '@toptal/picasso-charts'
import { BarChart } from '@toptal/picasso-charts'

import type { DataItem, LabelMap, TooltipMap } from './types'
import { formatData, getColor } from './utils'
import CategoriesChartTooltip from '../CategoriesChartTooltip'

export type Props = Pick<
  BarChartProps<string>,
  'width' | 'height' | 'isAnimationActive'
> & {
  data: DataItem[]
  labels: LabelMap
  tooltips: TooltipMap
}

export const CategoriesChart = ({
  data,
  labels,
  tooltips,
  ...restProps
}: Props) => {
  const chartData = useMemo(() => formatData(data, labels), [data, labels])

  const getBarLabelColor = ({
    index,
    dataKey,
  }: {
    index?: number
    dataKey: string
  }) =>
    index !== undefined ? getColor({ dataKey, entry: chartData[index] }) : ''

  return (
    <BarChart
      labelKey='label'
      data={chartData}
      tooltip
      getBarLabelColor={getBarLabelColor}
      customTooltip={
        // @ts-expect-error: Recharts passes 2 props under the hood: active and payload. We need to assume they are there without explicitly passing them.
        <CategoriesChartTooltip originalData={data} tooltips={tooltips} />
      }
      getBarColor={getColor}
      {...restProps}
    />
  )
}

CategoriesChart.displayName = 'CategoriesChart'

export default CategoriesChart
