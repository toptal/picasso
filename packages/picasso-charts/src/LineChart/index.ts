import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './LineChart'

export {
  default,
  ReferenceLineType,
  ChartDataPoint,
  HighlightData,
  OrderedChartDataPoint,
  ChartLine
} from './LineChart'

export type LineChartProps = OmitInternalProps<Props>
