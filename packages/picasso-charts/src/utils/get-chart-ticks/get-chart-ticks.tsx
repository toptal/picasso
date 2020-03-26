import { OrderedChartDataPoint } from '../../LineChart'

const getChartTicks = (orderedData: OrderedChartDataPoint[]) =>
  orderedData.map(({ order }) => order)

export default getChartTicks
