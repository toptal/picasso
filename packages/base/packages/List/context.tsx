/* eslint-disable import/no-extraneous-dependencies */
import React, { createContext, useContext } from 'react'

export type ListItemType =
  | 'circle'
  | 'disc'
  | 'checkmark'
  | 'arrow'
  | 'numeral'
  | 'alpha'
  | 'roman'

export interface ListContextType {
  styleType?: ListItemType
  /** Level of list nesting, when not a child of a list it has level 0 */
  level: number
}

const ListContext = createContext<ListContextType>({
  level: 0,
})

export const useListContext = () => useContext(ListContext)

export interface ListContextProviderProps {
  styleType?: ListItemType
  children: React.ReactNode
}

export const ListContextProvider = ({
  children,
  styleType,
}: ListContextProviderProps) => {
  const { level } = useListContext()

  return (
    <ListContext.Provider value={{ level: level + 1, styleType }}>
      {children}
    </ListContext.Provider>
  )
}
