import type { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import type { HTMLAttributes } from 'react'
import React, { forwardRef, useCallback, useEffect } from 'react'
import { Menu } from '@toptal/picasso-menu'

import { useSidebarContext } from '../PageSidebar/SidebarContextProvider'
import type { SidebarItemProps } from '../SidebarItem'
import { useSubMenuContext } from '../SidebarItem'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Defines is sidebar menu pushed to bottom of sidebar */
  bottom?: boolean
}

export const SidebarMenu = forwardRef<HTMLUListElement, Props>(
  function SidebarMenu(props, ref) {
    const { bottom, style, className, children, ...rest } = props
    const { parentSidebarItemIndex, isSubMenu, parentMenu } =
      useSubMenuContext()

    const {
      variant,
      expandedItemKey,
      setExpandedItemKey,
      isCollapsed: isSidebarCollapsed,
    } = useSidebarContext()

    const expandSidebarItem = useCallback(setExpandedItemKey, [
      setExpandedItemKey,
    ])

    useEffect(() => {
      const hasSelectedItem = React.Children.toArray(children).some(
        child => React.isValidElement(child) && child.props.selected
      )

      if (hasSelectedItem && parentSidebarItemIndex !== undefined) {
        setExpandedItemKey(parentSidebarItemIndex)
      }
    }, [parentSidebarItemIndex, setExpandedItemKey, children])

    const items = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const itemProps: Partial<SidebarItemProps> = {
          variant,
          isSubMenu,
          compact: isSidebarCollapsed && !isSubMenu,
        }

        const expandibleProps: Partial<SidebarItemProps> = {
          index,
          expand: expandSidebarItem,
          isExpanded: expandedItemKey === index,
        }

        const newProps: Partial<SidebarItemProps> = {
          ...itemProps,
          ...(child.props.collapsible ? expandibleProps : {}),
        }

        return React.cloneElement(child, newProps)
      }

      return child
    })

    return (
      <Menu
        {...rest}
        allowNestedNavigation={false}
        ref={ref}
        style={style}
        className={cx(
          'shadow-0 order-1 [& &]:flex-1 flex-grow-0 flex-shrink-1 max-w-full',
          {
            ['order-[99]']: bottom,
            ['p-2']: parentMenu?.compact,
          },
          className
        )}
      >
        {items}
      </Menu>
    )
  }
)

SidebarMenu.defaultProps = {
  bottom: false,
}

SidebarMenu.displayName = 'SidebarMenu'

export default SidebarMenu
