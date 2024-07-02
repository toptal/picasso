import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props, TabsValueType } from './Tabs'

export { default as Tabs } from './Tabs'
export type TabsProps = OmitInternalProps<Props<TabsValueType>>
export type { TabsValueType } from './Tabs'
