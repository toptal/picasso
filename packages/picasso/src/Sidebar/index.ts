import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Sidebar'

export { default } from './Sidebar'
export { SidebarContext } from './SidebarContext'
export type SidebarProps = OmitInternalProps<Props>
