import React, { createContext, useContext, ReactNode } from 'react'

export interface ContextProps {
  parentSidebarItemIndex?: number | null
  isSubMenu: boolean
}

const Context = createContext<ContextProps>({
  isSubMenu: false
})

export interface Props {
  children?: ReactNode
  parentSidebarItemIndex?: number | null
}

export const SubMenuContextProvider = ({
  children,
  parentSidebarItemIndex
}: Props) => (
  <Context.Provider value={{ isSubMenu: true, parentSidebarItemIndex }}>
    {children}
  </Context.Provider>
)

export const useSubMenuContext = () => useContext(Context)
