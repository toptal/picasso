import React, {
  FunctionComponent,
  ReactNode,
  LiHTMLAttributes,
  HTMLAttributes,
  ReactType
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

import { StandardProps, ButtonOrAnchorProps } from '../Picasso'
import Typography from '../Typography'
import styles from './styles'

export type MenuItemAttributes = LiHTMLAttributes<HTMLLIElement> &
  HTMLAttributes<HTMLDivElement> &
  ButtonOrAnchorProps

interface Props extends StandardProps, MenuItemAttributes {
  /** Component name to render the menu item as */
  as?: ReactType<MenuItemProps>
  /** Whether to render disabled item */
  disabled?: boolean
  /** Whether to render without internal padding */
  disableGutters?: boolean
  children?: ReactNode
  /** Callback when menu item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Highlights the item as selected */
  selected?: boolean
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
  selected,
  style,
  value,
  ...rest
}) => {
  if (typeof children === 'string') {
    children = (
      <Typography
        className={classes!.stringContent}
        style={style}
        color='inherit'
      >
        {children}
      </Typography>
    )
  }

  return (
    <MUIMenuItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // TODO: -1 is added to keep backward compatibility e.g. for AccountSelect component
      // Should be fixed during https://toptal-core.atlassian.net/browse/FX-310
      tabIndex={-1} // DEPRECATED: remove explicit value in v3 and use passed one from props
      component={as}
      className={className}
      disabled={disabled}
      disableGutters={disableGutters}
      onClick={onClick}
      style={style}
      value={value}
      selected={selected}
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
