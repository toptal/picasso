import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { forwardRef, useCallback } from 'react'

import MenuItem from '../MenuItem'
import SidebarItemContent from '../SidebarItemContent'
import styles from './styles'
import { Props } from './types'
import { useSubMenuContext } from './SubMenuContextProvider'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemHeader'
})

export const SidebarItemHeader = forwardRef<HTMLElement, Props>(
  function SidebarItemHeader(props: Props, ref) {
    const {
      className,
      disabled,
      menu,
      selected,
      compact,
      variant = 'light',
      onClick,
      collapsible,
      icon,
      // these props are being destructured only for the purpose of excluding them from `...rest`
      /* eslint-disable @typescript-eslint/no-unused-vars */
      badge,
      testIds,
      isExpanded,
      expand,
      index,
      /* eslint-enable */
      ...rest
    } = props

    const { isSubMenu } = useSubMenuContext()

    const classes = useStyles()

    const hasMenu = menu != null
    const hasIcon = icon != null

    const handleMenuItemClick = useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!hasMenu) {
          onClick?.(event)
        }
      },
      [hasMenu, onClick]
    )

    return (
      <MenuItem
        {...rest}
        classes={classes}
        ref={ref}
        className={cx(
          classes.root,
          classes.noWrap,
          classes.roundedBorder,
          classes[variant],
          {
            [classes.compact]: compact,
            [classes.selected]: !hasMenu && selected,
            [classes.collapsible]: hasMenu && collapsible,
            [classes.nestedMenu]: isSubMenu,
            [classes.nestedMenuWithIcon]: isSubMenu && hasIcon
          },
          className
        )}
        onClick={handleMenuItemClick}
        selected={!hasMenu && selected}
        disabled={disabled}
        variant={variant}
        nonSelectable
      >
        <SidebarItemContent {...props} />
      </MenuItem>
    )
  }
)
