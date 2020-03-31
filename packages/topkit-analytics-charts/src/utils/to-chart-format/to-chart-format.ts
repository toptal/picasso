import { ChartDataPoint } from '@toptal/picasso-charts'

import { Point } from './../../AnalyticsChart'

const toChartFormat = (data: Point[], xAxisKey: string) => {
  const formattedData: ChartDataPoint[] = []

  data.forEach(({ id, values }) => {
    Object.keys(values).forEach(date => {
      const index = formattedData.findIndex(
        ({ [xAxisKey]: label }) => label === date
      )

      if (index > -1) {
        formattedData[index][id] = values[date]
        return
      }

      formattedData.push({
        [xAxisKey]: date,
        [id]: values[date]
      })
    })
  })

  return formattedData
}

export default toChartFormat
