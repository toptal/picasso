import { ChartDataPoint } from '@toptal/picasso-charts'

import { Point } from './../../AnalyticsChart'
import { ReferenceLine } from '../../AnalyticsChart/AnalyticsChart'
import generateReferenceKey from '../generate-reference-key'

const toChartFormat = (
  data: Point[],
  referenceLines: ReferenceLine[] | undefined,
  xAxisKey: string,
  formatLabel: (label: string) => string
) => {
  const formattedData: ChartDataPoint[] = []
  const decoratePointWithRefData = (point: ChartDataPoint, dataKey: string) =>
    referenceLines?.reduce((point, { data }, index) => {
      point[generateReferenceKey(index)] = data[dataKey]
      return point
    }, point) || point

  data.forEach(({ id, values }) => {
    Object.entries(values).forEach(([key, value]) => {
      const label = formatLabel(key)
      const existingItem = formattedData.find(
        ({ [xAxisKey]: existingLabel }) => existingLabel === label
      )

      if (existingItem) {
        existingItem[id] = value
        return
      }

      formattedData.push(
        decoratePointWithRefData({ [xAxisKey]: label, [id]: value }, key)
      )
    })
  })

  return formattedData
}

export default toChartFormat
