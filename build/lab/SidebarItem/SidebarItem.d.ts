import React, { ReactElement, ElementType } from 'react'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import { BaseProps, OverridableComponent } from '../../Picasso'
import { MenuItemAttributes } from '../../MenuItem/MenuItem'
export interface Props extends BaseProps, MenuItemAttributes {
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
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
}
export declare const SidebarItem: OverridableComponent<Props>
export default SidebarItem
