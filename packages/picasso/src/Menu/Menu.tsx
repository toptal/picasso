import React, { HTMLAttributes, forwardRef } from 'react'
import cx from 'classnames'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import { BackMinor16 } from '../Icon'
import MenuItem from '../MenuItem'
import Typography from '../Typography'
import useMenu from './hooks/use-menu'
import MenuContext from './MenuContext'
import styles from './styles'

export type MenuAttributes = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends BaseProps, MenuAttributes {
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
  const { children, className, style, allowNestedNavigation, ...rest } = props
  const classes = useStyles()
  const { menu, context, hasBackButton } = useMenu()
  const { onBackClick: handleBackClick } = context

  return (
    <MenuContext.Provider value={context}>
      {menu ?? (
        <MUIMenuList
          {...rest}
          ref={ref}
          className={cx(classes.root, className)}
          style={style}
        >
          {hasBackButton && allowNestedNavigation && (
            <MenuItem key='back' onClick={handleBackClick}>
              <Typography size='small' color='dark-grey' variant='body'>
                <BackMinor16 className={classes.backButtonIcon} />
                Back
              </Typography>
            </MenuItem>
          )}
          {children}
        </MUIMenuList>
      )}
    </MenuContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Menu.defaultProps = {
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
