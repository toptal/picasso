import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './LineChart'

export {
  default,
  ReferenceLineType,
  ChartDataPoint,
  HighlightConfig,
  OrderedChartDataPoint,
  LineConfig
} from './LineChart'

export type LineChartProps = OmitInternalProps<Props>
