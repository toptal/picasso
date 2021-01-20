import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './BarChart'

export { default } from './BarChart'

export type BarChartProps<K extends string> = OmitInternalProps<Props<K>>
export { BaseChartProps, BarLabelProps } from './BarChart'
