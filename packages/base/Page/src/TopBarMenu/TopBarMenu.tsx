import type { BaseProps } from '@toptal/picasso-shared'
import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Menu } from '@toptal/picasso-menu'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Menu content */
  children: ReactNode
}

export const TopBarMenu = forwardRef<HTMLUListElement, Props>(
  function TopBarMenu(props, ref) {
    const { children, ...rest } = props

    // not more than 6 menu items are allowed by BASE design
    const items = React.Children.toArray(children).slice(0, 6)

    return (
      <Menu
        {...rest}
        allowNestedNavigation={false}
        ref={ref}
        className='block min-[1280px]:flex shadow-0'
      >
        {items}
      </Menu>
    )
  }
)

TopBarMenu.displayName = 'TopBarMenu'

export default TopBarMenu
