import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../../Picasso'
import Menu, { ListNativeProps } from '../../Menu/Menu'
import styles from './styles'

export interface Props extends StandardProps, ListNativeProps {
  /** Defines is sidebar menu pushed to bottom of sidebar */
  bottom?: boolean
  /** Disables all items in menu */
  disabled?: boolean
}

export const SidebarMenu: FunctionComponent<Props> = ({
  bottom,
  disabled,
  children,
  classes,
  style,
  className,
  ...rest
}) => {
  const resolvedChildren = React.Children.map(children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          disabled: disabled || child.props.disabled
        })
      : child
  )

  return (
    <Menu
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      style={style}
      className={cx(classes.root, { [classes.bottom]: bottom }, className)}
    >
      {resolvedChildren}
    </Menu>
  )
}

SidebarMenu.defaultProps = {
  bottom: false,
  disabled: false
}

SidebarMenu.displayName = 'SidebarMenu'

export default withStyles(styles)(SidebarMenu)
