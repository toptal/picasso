import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageSidebar'

export { default as PageSidebar } from './PageSidebar'
export type PageSidebarProps = OmitInternalProps<Props>

export type { Props as SidebarContextProviderProps } from './SidebarContextProvider'
