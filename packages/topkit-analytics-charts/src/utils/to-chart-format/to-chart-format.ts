import { ChartDataPoint } from '@toptal/picasso-charts'

import { Point } from './../../AnalyticsChart'

const toChartFormat = (
  data: Point[],
  xAxisKey: string,
  formatLabel: (label: string) => string
) => {
  const formattedData: ChartDataPoint[] = []

  data.forEach(({ id, values }) => {
    Object.entries(values).forEach(([key, value]) => {
      const label = formatLabel(key)
      const item = formattedData.find(
        ({ [xAxisKey]: existingLabel }) => existingLabel === label
      )

      if (item) {
        item[id] = value
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
