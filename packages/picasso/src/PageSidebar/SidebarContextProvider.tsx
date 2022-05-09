import React, { ReactNode, useContext } from 'react'

import { noop } from '../utils'
import { SidebarContextProps, VariantType } from './types'

const SidebarContext = React.createContext<SidebarContextProps>({
  expandedItemKey: null,
  setExpandedItemKey: noop,
  isHovered: false,
  isCollapsed: false
})

export interface Props {
  variant?: VariantType
  isCollapsed: boolean
  isHovered: boolean
  expandedItemKey: number | null
  setExpandedItemKey: (expanded: number | null) => void
  children?: ReactNode
}

export const SidebarContextProvider = ({
  children,
  isCollapsed,
  variant,
  expandedItemKey,
  setExpandedItemKey,
  isHovered
}: Props) => {
  return (
    <SidebarContext.Provider
      value={{
        expandedItemKey,
        setExpandedItemKey,
        isCollapsed,
        isHovered,
        variant
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext)
