import { createContext, ReactElement } from 'react'

export interface MenuContextProps {
  onItemUpdate?: (key: string, menu: ReactElement) => void
  onItemClick?: (key: string, menu: ReactElement) => void
  onBackClick?: () => void
}

export default createContext<MenuContextProps>({})
