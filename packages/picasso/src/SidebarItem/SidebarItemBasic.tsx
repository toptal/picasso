/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef } from 'react'

import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import type { Props } from './types'

export const SidebarItemBasic = forwardRef<HTMLElement, Props>(
  function BasicSidebarItem(props: Props, ref) {
    const { menu, index, icon, compact } = props

    const hasMenu = menu != null

    return (
      <>
        <SidebarItemHeader {...props} ref={ref} />
        {hasMenu && (
          <div>
            <SubMenuContextProvider
              parentMenu={{ icon, compact }}
              parentSidebarItemIndex={index}
            >
              {menu}
            </SubMenuContextProvider>
          </div>
        )}
      </>
    )
  }
)
