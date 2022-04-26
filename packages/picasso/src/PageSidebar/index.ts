import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './PageSidebar'

export { default } from './PageSidebar'
export type PageSidebarProps = OmitInternalProps<Props>

export {
  SidebarContextProvider,
  useSidebarContext,
  Props as SidebarContextProviderProps
} from './SidebarContextProvider'
