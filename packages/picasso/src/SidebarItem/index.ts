import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './SidebarItem'

export { default, getSelectedSubMenu } from './SidebarItem'
export type SidebarItemProps = OmitInternalProps<Props>
