/* eslint-disable import/no-extraneous-dependencies */
import type { ReactElement } from 'react'
import type React from 'react'
import { createContext } from 'react'

import type { MenuVariant } from './types'

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
