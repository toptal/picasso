import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './types'

export type { SidebarTagProps, SidebarBadgeProps } from './types'
export { default as SidebarItemContent } from './SidebarItemContent'
export type SidebarItemContentProps = OmitInternalProps<Props>
