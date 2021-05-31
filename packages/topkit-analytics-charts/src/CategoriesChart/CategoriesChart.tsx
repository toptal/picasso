import React, { useMemo } from 'react'
import { BarChartProps, BarChart } from '@toptal/picasso-charts'

import { Bar, Labels, Tooltips } from './types'
import { formatData, getColor } from './utils'
import CategoriesChartTooltip from '../CategoriesChartTooltip'

export type Props = Pick<BarChartProps<string>, 'width' | 'height'> & {
  data: Bar[]
  labels: Labels
  tooltips: Tooltips
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
    dataKey
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
        // @ts-expect-error: There is some magic in recharts that adding the props for us
        <CategoriesChartTooltip originalData={data} tooltips={tooltips} />
      }
      getBarColor={getColor}
      {...restProps}
    />
  )
}

CategoriesChart.defaultProps = {}

CategoriesChart.displayName = 'CategoriesChart'

export default CategoriesChart
