import { OmitInternalProps } from '@toptal/picasso-shared'

export { default, SidebarContext } from './Sidebar'
import { Props } from './Sidebar'
export type SidebarProps = OmitInternalProps<Props>
