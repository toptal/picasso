import { createContext, ReactElement } from 'react'

import { MenuMode } from './types'

export interface MenuContextProps {
  mode?: MenuMode
  activeItemKey?: string
  onItemClick?: (key: string, menu?: ReactElement) => void
  onBackClick?: () => void
  onAwayClick?: () => void
  onItemUpdate?: (key: string, menu?: ReactElement) => void
  onItemMouseEnter?: (key: string, menu?: ReactElement) => void
  onMenuMouseLeave?: () => void
}

export default createContext<MenuContextProps>({})
