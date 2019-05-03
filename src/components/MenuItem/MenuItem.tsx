import React, { FunctionComponent, ReactNode } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIMenuItem from '@material-ui/core/MenuItem'

import { StandardProps } from '../Picasso'
import Typography from '../Typography'
import styles from './styles'

type MenuItemType = 'li' | 'div' | 'a' | 'button'

interface Props extends StandardProps {
  /** Component name to render the menu item as */
  as?: MenuItemType
  /** Whether to render disabled item */
  disabled?: boolean
  /** Whether to render without internal padding */
  disableGutters?: boolean
  children?: ReactNode
  /** Callback when menu item is clicked */
  onClick?: () => void
  /** Value of the item. Can be used when menu item is used inside Select component. */
  value?: string | string[] | number
}

export const MenuItem: FunctionComponent<Props> = ({
  as,
  children,
  classes,
  className,
  disabled,
  disableGutters,
  onClick,
  style,
  value
}) => {
  if (typeof children === 'string' || children instanceof String) {
    children = (
      <Typography
        className={cx(classes!.stringContent, className)}
        style={style}
      >
        {children}
      </Typography>
    )
  }

  return (
    <MUIMenuItem
      component={as}
      className={className}
      disabled={disabled}
      disableGutters={disableGutters}
      onClick={onClick}
      style={style}
      value={value}
    >
      {children}
    </MUIMenuItem>
  )
}

MenuItem.defaultProps = {
  as: 'li',
  onClick: () => {}
}

MenuItem.displayName = 'MenuItem'

export default withStyles(styles)(MenuItem)
