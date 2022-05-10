import React, { forwardRef } from 'react'

import Container from '../Container'
import Dropdown from '../Dropdown'
import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'

export const SidebarItemCompact = forwardRef<HTMLElement, Props>(
  function CompactSidebarItem(props: Props, ref) {
    const { menu, index, compact, icon } = props

    const subMenu = (
      <SubMenuContextProvider
        parentMenu={{ compact, icon }}
        parentSidebarItemIndex={index}
      >
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <Container left='small' right='small'>
        <Dropdown placement='right-start' content={subMenu}>
          <SidebarItemHeader {...props} ref={ref} />
        </Dropdown>
      </Container>
    )
  }
)
