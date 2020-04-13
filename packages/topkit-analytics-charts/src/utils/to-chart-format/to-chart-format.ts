import { ChartDataPoint } from '@toptal/picasso-charts'

import { Point } from './../../AnalyticsChart'

const toChartFormat = (
  data: Point[],
  xAxisKey: string,
  labelFormatter: (label: string) => string = label => label
) => {
  const formattedData: ChartDataPoint[] = []

  data.forEach(({ id, values }) => {
    Object.entries(values).forEach(([key, value]) => {
      const label = labelFormatter(key)
      const index = formattedData.findIndex(
        ({ [xAxisKey]: existingLabel }) => existingLabel === label
      )

      if (index > -1) {
        formattedData[index][id] = value
        return
      }

      formattedData.push({
        [xAxisKey]: label,
        [id]: value
      })
    })
  })

  return formattedData
}

export default toChartFormat
