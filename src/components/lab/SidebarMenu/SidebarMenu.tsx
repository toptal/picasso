import React, { forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../../Picasso'
import Menu, { ListNativeProps } from '../../Menu/Menu'
import styles from './styles'

export interface Props extends StandardProps, ListNativeProps {
  /** Defines is sidebar menu pushed to bottom of sidebar */
  bottom?: boolean
}

export const SidebarMenu = forwardRef<HTMLUListElement, Props>(
  function SidebarMenu({ bottom, classes, style, className, ...rest }, ref) {
    return (
      <Menu
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        style={style}
        className={cx(classes.root, { [classes.bottom]: bottom }, className)}
      />
    )
  }
)

SidebarMenu.defaultProps = {
  bottom: false
}

SidebarMenu.displayName = 'SidebarMenu'

export default withStyles(styles)(SidebarMenu)
