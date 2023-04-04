import React, { createContext, useContext } from 'react'

export interface ListContextType {
  /** Level of list nesting, when not a child of a list it has level 0 */
  level: number
}

const ListContext = createContext<ListContextType>({ level: 0 })

export const useListContext = () => useContext(ListContext)

export interface ListContextProviderProps {
  children: React.ReactNode
}

export const ListContextProvider = ({ children }: ListContextProviderProps) => {
  const { level } = useListContext()

  return (
    <ListContext.Provider value={{ level: level + 1 }}>
      {children}
    </ListContext.Provider>
  )
}
