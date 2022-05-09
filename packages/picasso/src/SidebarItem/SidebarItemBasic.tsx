import React, { forwardRef } from 'react'

import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'

export const SidebarItemBasic = forwardRef<HTMLElement, Props>(
  function BasicSidebarItem(props: Props, ref) {
    const { menu, index } = props

    const hasMenu = menu != null

    return (
      <>
        <SidebarItemHeader {...props} ref={ref} />
        {hasMenu && (
          <div>
            <SubMenuContextProvider parentSidebarItemIndex={index}>
              {menu}
            </SubMenuContextProvider>
          </div>
        )}
      </>
    )
  }
)
