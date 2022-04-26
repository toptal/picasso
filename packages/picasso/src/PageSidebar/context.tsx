import React, { ReactNode, useContext, useState } from 'react'

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
  defaultCollapsed?: boolean
  isCollapsed: boolean
  isHovered: boolean
  children?: ReactNode
}

export const SidebarContextProvider = ({
  children,
  isCollapsed,
  variant,
  isHovered
}: Props) => {
  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)

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
