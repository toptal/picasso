import { createContext, ReactElement } from 'react'

export interface MenuContextProps {
  activeItemKey?: string
  onItemClick?: (key: string, menu?: ReactElement) => void
  onBackClick?: () => void
  onAwayClick?: () => void
  onItemUpdate?: (key: string, menu?: ReactElement) => void
  onItemMouseEnter?: (key: string, menu?: ReactElement) => void
  onMenuMouseLeave?: () => void
}

export default createContext<MenuContextProps>({})
