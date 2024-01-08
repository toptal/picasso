import type { ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'

export interface ContextProps {
  /**
   * Render indicator on the parent item
   * when some of children has badge or tag rendered
   */
  isIndicatorVisible: boolean
  /**
   * When submenu item with badge or tag is mounted
   */
  handleDecoratedItemMount: () => void
  /**
   * When submenu item with badge or tag is unmounted
   */
  handleDecoratedItemUnmount: () => void
}

const Context = createContext<ContextProps>({
  isIndicatorVisible: false,
  handleDecoratedItemMount: () => {},
  handleDecoratedItemUnmount: () => {},
})

export interface Props {
  children?: ReactNode
  isOpened: boolean
}

export const ParentItemContextProvider = ({ children, isOpened }: Props) => {
  const [countItemsWithBadgeOrTag, updateCount] = useState(0)

  const isIndicatorVisible = countItemsWithBadgeOrTag > 0 && !isOpened
  const handleDecoratedItemMount = () => updateCount(count => count + 1)
  const handleDecoratedItemUnmount = () => updateCount(count => count - 1)

  const value = {
    isIndicatorVisible,
    handleDecoratedItemMount,
    handleDecoratedItemUnmount,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useParentItemContext = () => useContext(Context)
