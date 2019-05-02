import React, { FunctionComponent, ReactNode } from 'react'
import MUIMenuItem from '@material-ui/core/MenuItem'

import { BaseProps, JssProps } from '../Picasso'
import './styles'

type MenuItemType = 'li' | 'div' | 'a' | 'button'

interface Props extends BaseProps, Partial<JssProps> {
  /** Component name to render the menu item as */
  as?: MenuItemType
  /** Whether to render disabled item */
  disabled?: boolean
  children?: ReactNode
  /** Callback when menu item is clicked */
  onClick?: () => void
  /** Value of the item. Can be used when menu item is used inside Select component. */
  value?: string | string[] | number
}

const MenuItem: FunctionComponent<Props> = ({
  as,
  children,
  classes,
  className,
  disabled,
  onClick,
  style,
  value
}) => (
  <MUIMenuItem
    component={as}
    classes={classes}
    className={className}
    disabled={disabled}
    onClick={onClick}
    style={style}
    value={value}
  >
    {children}
  </MUIMenuItem>
)

MenuItem.defaultProps = {
  as: 'li',
  onClick: () => {}
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
