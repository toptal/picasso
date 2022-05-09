import React, { ElementType, ReactElement } from 'react'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { MenuItemProps } from '@material-ui/core/MenuItem'

import { MenuItemAttributes } from '../MenuItem'
import { VariantType } from '../PageSidebar/types'
import { BadgeProps } from '../Badge'

export interface Props extends BaseProps, TextLabelProps, MenuItemAttributes {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Whether to render disabled item */
  disabled?: boolean
  /** If item has menu defines can menu be collapsed */
  collapsible?: boolean
  /** Renders nested sidebar menu */
  menu?: ReactElement
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  /** Definition of the embedded badge  */
  badge?: Omit<BadgeProps, 'size' | 'children'>
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Should it be shown as a compact variant. It becomes a single icon, content becomes a tooltip and badges become overlaid */
  compact?: boolean
  variant?: VariantType
  isExpanded?: boolean
  expand?: (index: number | null) => void
  index?: number | null
  isSubMenu?: boolean
  testIds?: {
    content?: string
  }
}
