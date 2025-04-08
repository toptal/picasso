import React, { forwardRef } from 'react'
import { Container } from '@toptal/picasso-container'
import { Dropdown } from '@toptal/picasso-dropdown'
import { useBoolean as useOpen } from '@toptal/picasso-utils'

import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import type { Props } from './types'
import { ParentItemContextProvider } from './ParentItemContextProvider'

export const SidebarItemCompact = forwardRef<HTMLElement, Props>(
  function CompactSidebarItem(props: Props, ref) {
    const { menu, index, compact, icon, disabled } = props
    const [isOpened, handleOpen, handleClose] = useOpen()

    const subMenu = (
      <SubMenuContextProvider
        parentMenu={{ compact, icon }}
        parentSidebarItemIndex={index}
      >
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <ParentItemContextProvider isOpened={isOpened}>
        <Container left='small' right='small'>
          <Dropdown
            classes={{ popper: 'ml-2' }}
            disabled={disabled}
            placement='right-start'
            content={subMenu}
            keepMounted
            onOpen={handleOpen}
            onClose={handleClose}
            popperProps={{
              role: 'menu',
            }}
          >
            <SidebarItemHeader {...props} ref={ref} />
          </Dropdown>
        </Container>
      </ParentItemContextProvider>
    )
  }
)
