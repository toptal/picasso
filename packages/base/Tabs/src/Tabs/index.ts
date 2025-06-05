import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Tabs'
import type { TabsValueType } from './TabsContext'

export { default as Tabs } from './Tabs'
export type TabsProps = OmitInternalProps<Props<TabsValueType>>
export type { TabsValueType } from './TabsContext'
