import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Sidebar'

export { default, SidebarContext } from './Sidebar'
export type SidebarProps = OmitInternalProps<Props>
