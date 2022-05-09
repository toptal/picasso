import React, { createContext, useContext, ReactNode } from 'react'

export interface ContextProps {
  parentSidebarItemIndex?: number | null
  isSubMenu: boolean
  extraClasses: { header?: string }
}

const Context = createContext<ContextProps>({
  isSubMenu: false,
  extraClasses: {}
})

export interface Props {
  children?: ReactNode
  parentSidebarItemIndex?: number | null
  extraClasses?: ContextProps['extraClasses']
}

export const SubMenuContextProvider = ({
  children,
  extraClasses = {},
  parentSidebarItemIndex
}: Props) => (
  <Context.Provider
    value={{
      isSubMenu: true,
      parentSidebarItemIndex,
      extraClasses
    }}
  >
    {children}
  </Context.Provider>
)

export const useSubMenuContext = () => useContext(Context)
