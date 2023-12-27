/* eslint-disable import/no-extraneous-dependencies */
import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { MenuList as MUIMenuList } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import { BackMinor16 } from '@toptal/picasso-icon'
import MenuItem from '@toptal/picasso-menu-item'
import Typography from '@toptal/picasso-typography'

import { useMenu } from './hooks'
import MenuContext from './MenuContext'
import styles from './styles'
import type { MenuVariant } from './types'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Switches between slide and drilldown variants */
  variant?: MenuVariant
  /** Whether or not to handle nested navigation */
  allowNestedNavigation?: boolean
  testIds?: {
    menuItem?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoMenu',
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
    testIds,
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
            <MenuItem
              key='back'
              data-testid={testIds?.menuItem}
              onClick={onBackClick}
            >
              <Typography size='xsmall' color='dark-grey' variant='body'>
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
})

Menu.defaultProps = {
  variant: 'slide',
  allowNestedNavigation: true,
}

Menu.displayName = 'Menu'

export default Menu
