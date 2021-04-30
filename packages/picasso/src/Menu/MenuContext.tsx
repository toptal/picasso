import React, { createContext, ReactElement } from 'react'

import { MenuVariant } from './types'

export interface MenuContextProps {
  variant?: MenuVariant
  activeItemKey?: string
  onItemClick?: (key: string, menu?: ReactElement) => void
  onBackClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onAwayClick?: () => void
  onItemUpdate?: (key: string, menu?: ReactElement) => void
  onItemMouseEnter?: (key: string, menu?: ReactElement) => void
  onMenuMouseLeave?: () => void
}

export default createContext<MenuContextProps>({})
