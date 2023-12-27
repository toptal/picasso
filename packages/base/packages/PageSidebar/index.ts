/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageSidebar'

export { default } from './PageSidebar'
export type PageSidebarProps = OmitInternalProps<Props>

export type { Props as SidebarContextProviderProps } from './SidebarContextProvider'
