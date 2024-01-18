import type { ReactNode } from 'react'
import React, { createContext, useContext } from 'react'

export interface ContextProps {
  parentSidebarItemIndex?: number | null
  isSubMenu: boolean
  parentMenu: { icon?: ReactNode; compact?: boolean } | null
}

const Context = createContext<ContextProps>({
  isSubMenu: false,
  parentMenu: null,
})

export interface Props {
  children?: ReactNode
  parentSidebarItemIndex?: number | null
  parentMenu: ContextProps['parentMenu']
}

export const SubMenuContextProvider = ({
  children,
  parentMenu,
  parentSidebarItemIndex,
}: Props) => (
  <Context.Provider
    value={{
      isSubMenu: true,
      parentSidebarItemIndex,
      parentMenu,
    }}
  >
    {children}
  </Context.Provider>
)

export const useSubMenuContext = () => useContext(Context)
