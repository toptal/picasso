import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './LineChart'

export { default } from './LineChart'
export type {
  ReferenceLineType,
  ChartDataPoint,
  HighlightConfig,
  OrderedChartDataPoint,
  LineConfig
} from './LineChart'

export type LineChartProps = OmitInternalProps<Props>
