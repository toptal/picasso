import { createContext } from 'react'

import { SidebarContextProps } from './types'

export const SidebarContext = createContext<SidebarContextProps>({
  expandedItemKey: null,
  setExpandedItemKey: () => {}
})
