import { OrderedChartDataPoint } from '@toptal/picasso-charts'

import { ChartGranularity } from '../../AnalyticsChart'

const getXAxisTicks = (
  orderedData: OrderedChartDataPoint[],
  granularity?: ChartGranularity
) => {
  if (granularity === 'day') {
    return orderedData
      .filter(({ order }) => order % 2 === 0)
      .map(({ order }) => order)
  }

  if (granularity === 'hour') {
    return orderedData
      .filter(({ order }) => order % 2 !== 0)
      .map(({ order }) => order)
  }

  return orderedData.map(({ order }) => order)
}

export default getXAxisTicks
