import { ChartDataPoint } from '@toptal/picasso-charts'

import { Point } from './../../AnalyticsChart'

const toChartFormat = (data: Point[], xAxisKey: string) => {
  const formattedData: ChartDataPoint[] = []

  data.forEach(({ id, values }) => {
    Object.keys(values).forEach(label => {
      const index = formattedData.findIndex(
        ({ [xAxisKey]: existingLabel }) => existingLabel === label
      )

      if (index > -1) {
        formattedData[index][id] = values[label]
        return
      }

      formattedData.push({
        [xAxisKey]: label,
        [id]: values[label]
      })
    })
  })

  return formattedData
}

export default toChartFormat
