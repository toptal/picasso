import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './types'

export type { SidebarTagProps, SidebarBadgeProps } from './types'
export { default } from './SidebarItemContent'
export type SidebarItemContentProps = OmitInternalProps<Props>
