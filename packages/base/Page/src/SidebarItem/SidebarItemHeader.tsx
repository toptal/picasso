import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { forwardRef, useCallback } from 'react'
import { MenuItem } from '@toptal/picasso-menu'

import { SidebarItemContent } from '../SidebarItemContent'
import styles from './styles'
import type { Props } from './types'
import { useSubMenuContext } from './SubMenuContextProvider'
import { getTagProps, getBadgeProps } from './utils'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemHeader',
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
      testIds,
      // these props are being destructured only for the purpose of excluding them from `...rest`
      /* eslint-disable @typescript-eslint/no-unused-vars */
      icon,
      isSubMenu,
      badge,
      tag,
      isExpanded,
      expand,
      index,
      /* eslint-enable */
      ...rest
    } = props

    const classes = useStyles()

    const { parentMenu } = useSubMenuContext()

    const hasMenu = menu != null

    const handleMenuItemClick = useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!hasMenu) {
          onClick?.(event)
        }
      },
      [hasMenu, onClick]
    )

    const subMenuClass =
      parentMenu &&
      (parentMenu.icon ? classes.nestedMenuWithIcon : classes.nestedMenu)

    const shouldShowSelected = (compact || !hasMenu) && selected

    return (
      <MenuItem
        {...rest}
        classes={classes}
        ref={ref}
        className={cx(
          classes.root,
          classes.noWrap,
          classes[variant],
          subMenuClass,
          {
            [classes.compact]: compact,
            [classes.selected]: shouldShowSelected,
            [classes.parentCompact]: parentMenu?.compact,
            [classes.collapsible]: hasMenu && (collapsible || compact),
          },
          className
        )}
        onClick={handleMenuItemClick}
        selected={shouldShowSelected}
        disabled={disabled}
        variant={variant}
        nonSelectable
        data-testid={testIds?.header}
      >
        <SidebarItemContent
          {...props}
          badge={getBadgeProps(badge)}
          tag={getTagProps(tag)}
        />
      </MenuItem>
    )
  }
)
