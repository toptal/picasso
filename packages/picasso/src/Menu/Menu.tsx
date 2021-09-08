import React, { HTMLAttributes, forwardRef } from 'react'
import cx from 'classnames'
import MUIMenuList from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import { BackMinor16 } from '../Icon'
import MenuItem from '../MenuItem'
import Typography from '../Typography'
import { useMenu } from './hooks'
import MenuContext from './MenuContext'
import styles from './styles'
import { MenuVariant } from './types'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  // Switches between slide and drilldown variants
  variant?: MenuVariant
  // Whether or not to handle nested navigation
  allowNestedNavigation?: boolean
}

export interface StaticProps {
  Item: typeof MenuItem
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoMenu'
})

export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  props,
  ref
) {
  const {
    children,
    className,
    style,
    variant,
    allowNestedNavigation,
    ...rest
  } = props
  const classes = useStyles()
  const { context, innerMenu, hasBackButton } = useMenu({ variant })
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
            <MenuItem key='back' data-testid='menu-back' onClick={onBackClick}>
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
  variant: 'slide',
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
