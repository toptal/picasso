import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './SidebarItem'

export { default, getSelectedSubMenu } from './SidebarItem'
export type SidebarItemProps = OmitInternalProps<Props>

export {
  SubMenuContextProvider,
  useSubMenuContext,
  ContextProps as SubMenuContextProps,
  Props as SubMenuContextProviderProps
} from './SubMenuContextProvider'
