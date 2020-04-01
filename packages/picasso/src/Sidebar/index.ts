import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Sidebar'

export { default, SidebarContext, DEFAULT_EXPANDED_ITEM_KEY } from './Sidebar'
export type SidebarProps = OmitInternalProps<Props>
