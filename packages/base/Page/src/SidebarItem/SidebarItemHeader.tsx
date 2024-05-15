import { twMerge, twJoin } from 'tailwind-merge'
import React, { forwardRef, useCallback } from 'react'
import { MenuItem } from '@toptal/picasso-menu'

import { SidebarItemContent } from '../SidebarItemContent'
import type { Props } from './types'
import { useSubMenuContext, type ContextProps } from './SubMenuContextProvider'
import { getTagProps, getBadgeProps } from './utils'

const getColorStyles = ({
  variant,
  selected,
}: {
  variant: Props['variant']
  selected?: boolean
}) => {
  if (variant === 'light') {
    if (selected) {
      return 'text-blue-500 hover:text-blue-500 focus:text-blue-500 bg-gray-300 hover:bg-gray-300 focus:bg-gray-300'
    }

    return 'text-graphite-700 hover:text-blue-500 focus:text-blue-500'
  }

  if (variant === 'dark') {
    if (selected) {
      return 'text-white hover:text-white focus:text-white bg-graphite-700 hover:bg-graphite-700 focus:bg-graphite-700'
    }

    return 'hover:text-white focus:text-white'
  }
}

const getSpacingStyles = ({
  compact,
  parentMenu,
  hasMenu,
  collapsible,
}: {
  compact: Props['compact']
  parentMenu: ContextProps['parentMenu']
  hasMenu: boolean
  collapsible?: boolean
}) => {
  let pl = 'pl-4'
  let pr = 'pr-4'
  let pt = 'pt-0'
  let pb = 'pb-0'

  let ml = 'ml-4'
  let mr = 'mr-4'
  let mt = 'mt-0'
  let mb = 'mb-0'

  if (parentMenu) {
    pr = 'pr-4'
    pl = parentMenu.icon ? 'pl-[2.875rem]' : 'pl-8'
    mr = 'mr-4'
  }

  if (compact) {
    pt = 'pt-0'
    pb = 'pb-0'
    pr = 'pr-0'
    pl = 'pl-0'
  }

  if (hasMenu && (collapsible || compact)) {
    pt = 'pt-0'
    pb = 'pb-0'
    pr = 'pr-0'
    pl = 'pl-0'
    mt = 'mt-0'
    mb = 'mb-0'
    mr = 'mr-0'
    ml = 'ml-0'
  }

  if (parentMenu?.compact) {
    mr = 'mr-0'
    mt = 'mt-0'
    mb = 'mb-0'
    ml = 'ml-0'
    pt = 'pt-[0.375rem]'
    pb = 'pb-[0.375rem]'
    pl = 'pl-4'
    pr = 'pr-4'
  }

  return twJoin(pl, pr, pt, pb, mt, mb, mr, ml)
}

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

    const shouldShowSelected = (compact || !hasMenu) && selected

    return (
      <MenuItem
        {...rest}
        ref={ref}
        className={twMerge(
          'h-[2.75rem] whitespace-nowrap rounded-sm',
          'flex-1 min-w-0',
          getColorStyles({ variant, selected: shouldShowSelected }),
          getSpacingStyles({ compact, parentMenu, hasMenu, collapsible }),
          compact && 'overflow-visible',
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
