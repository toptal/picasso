import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './BarChart'

export { default } from './BarChart'

export type BarChartProps<K extends string> = OmitInternalProps<Props<K>>
