import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './LineChart'

export { default } from './LineChart'
export type {
  HighlightConfig,
  ReferenceLineType
} from './LineChart'

export type LineChartProps = OmitInternalProps<Props>
