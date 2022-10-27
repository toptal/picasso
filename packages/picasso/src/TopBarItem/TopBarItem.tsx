import {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import React, { forwardRef, memo, ElementType, ReactElement } from 'react'
import { MenuItemProps } from '@material-ui/core/MenuItem'

import Link from '../Link'
import MenuItem from '../MenuItem'
import { useBreakpoint, noop } from '../utils'

export interface Props extends BaseProps, TextLabelProps {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Whether to render disabled item */
  disabled?: boolean
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Should it be shown as a compact variant. It becomes a single icon, content becomes a tooltip and badges become overlaid */
  index?: number | null
  testIds?: {
    content?: string
    header?: string
  }
}

export const TopBarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function TopBarItem(props, ref) {
    const isCompactLayout = useBreakpoint(['small', 'medium'])

    return isCompactLayout ? (
      <MenuItem ref={ref} {...props} />
    ) : (
      <Link {...props} color='white' ref={ref} />
    )
  })
)

TopBarItem.defaultProps = {
  onClick: noop,
  selected: false,
}

TopBarItem.displayName = 'TopBarItem'

export default TopBarItem
