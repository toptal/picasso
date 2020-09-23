import { ChartDataPoint } from '@toptal/picasso-charts'

import { Point, ReferenceLine } from './../../AnalyticsChart'
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
      const isEmptyValue = value === null
      const nonNullValue = value === null ? 0 : value

      const existingItem = formattedData.find(
        ({ [xAxisKey]: existingLabel }) => existingLabel === label
      )

      if (existingItem) {
        existingItem[id] = nonNullValue
        if (isEmptyValue) {
          existingItem[`${id}IsEmpty`] = true
        }

        return
      }

      const dataPoint: ChartDataPoint = {
        [xAxisKey]: label,
        [id]: nonNullValue
      }

      // We indicate that value is empty for particular data set with the special flag.
      // Since single ChartDataPoint may contain values from multiple data sets, we'll may also have multiple number of flags.
      // Setting those flags will make this information available inside tooltips and other custom elements.
      // Please refer to this example for more details:
      // http://picasso.toptal.net/?path=/story/charts-folder--analyticschart#null-values
      if (isEmptyValue) {
        dataPoint[`${id}IsEmpty`] = true
      }

      formattedData.push(decoratePointWithRefData(dataPoint, key))
    })
  })

  return formattedData
}

export default toChartFormat
