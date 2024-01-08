import type { BaseProps } from '@toptal/picasso-shared'
import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Menu } from '@toptal/picasso-menu'

import { useRegisterMenu } from '../PageHamburger'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Menu content */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTopBarMenu' })

export const TopBarMenu = forwardRef<HTMLUListElement, Props>(
  function TopBarMenu(props, ref) {
    const { children, ...rest } = props
    const classes = useStyles()

    // not more than 6 menu items are allowed by BASE design
    const items = React.Children.toArray(children).slice(0, 6)

    useRegisterMenu()

    return (
      <Menu
        {...rest}
        allowNestedNavigation={false}
        ref={ref}
        className={classes.root}
      >
        {items}
      </Menu>
    )
  }
)

TopBarMenu.displayName = 'TopBarMenu'

export default TopBarMenu
