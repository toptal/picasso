import type { ElementType, ReactElement } from 'react'
import type React from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { MenuItemProps } from '@material-ui/core/MenuItem'

import type { MenuItemAttributes } from '../MenuItem'
import type { VariantType } from '../PageSidebar/types'
import type {
  SidebarTagProps,
  SidebarBadgeProps,
} from '../SidebarItemContent/types'

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
  badge?: number | SidebarBadgeProps
  /** Render Tag.Rectangular */
  tag?: string | SidebarTagProps
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
    header?: string
  }
}
