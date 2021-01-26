import { OrderedChartDataPoint, ChartDataPoint } from '../../types'

const orderData = (data: ChartDataPoint[]): OrderedChartDataPoint[] =>
  data.map((point, index: number) => ({
    ...point,
    order: index
  }))

export default orderData
