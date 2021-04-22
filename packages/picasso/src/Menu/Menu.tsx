import React, { HTMLAttributes, forwardRef } from 'react'
import cx from 'classnames'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import { BackMinor16 } from '../Icon'
import MenuItem from '../MenuItem'
import Typography from '../Typography'
import { useMenu } from './hooks'
import MenuContext from './MenuContext'
import styles from './styles'
import { MenuMode } from './types'

export type MenuAttributes = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends BaseProps, MenuAttributes {
  // Switches between slider and drilldown modes
  mode?: MenuMode
  // Whether or not to handle nested navigation
  allowNestedNavigation?: boolean
}

export interface StaticProps {
  Item: typeof MenuItem
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Menu'
})

export const Menu = forwardRef<HTMLUListElement, Props>(function Menu (
  props,
  ref
) {
  const {
    children,
    className,
    style,
    mode,
    allowNestedNavigation,
    ...rest
  } = props
  const classes = useStyles()
  const { context, innerMenu, hasBackButton } = useMenu({ mode })
  const { onBackClick, onMenuMouseLeave } = context

  return (
    <MenuContext.Provider value={context}>
      {innerMenu ?? (
        <MUIMenuList
          {...rest}
          ref={ref}
          className={cx(classes.root, className)}
          style={style}
          onMouseLeave={onMenuMouseLeave}
        >
          {hasBackButton && allowNestedNavigation && (
            <MenuItem key='back' onClick={onBackClick}>
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
  mode: 'slider',
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
