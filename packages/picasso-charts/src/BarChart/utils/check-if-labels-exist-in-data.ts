import type { BarChartDataItem } from '../../types'

export const checkIfLabelsExistInData = <K extends string>(
  data: BarChartDataItem<K>[],
  labelKey: string
) => data.filter(entry => !(labelKey in entry)).length > 0
