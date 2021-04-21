import React, { HTMLAttributes, forwardRef } from 'react'
import cx from 'classnames'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import MenuItem from '../MenuItem'
import MenuContext from './MenuContext'
import useMenuContext from './hooks/use-menu-context'
import styles from './styles'

export type ListNativeProps = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends BaseProps, ListNativeProps {
  // whether or not to handle nested navigation
  allowNestedNavigation?: boolean
}

export interface StaticProps {
  Item: typeof MenuItem
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Menu'
})

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLUListElement, Props>(function Menu (
  props,
  ref
) {
  const { children, className, style, ...rest } = props
  const classes = useStyles()
  const context = useMenuContext()

  return (
    <MenuContext.Provider value={context}>
      <MUIMenuList
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {children}
      </MUIMenuList>
    </MenuContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Menu.defaultProps = {
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
