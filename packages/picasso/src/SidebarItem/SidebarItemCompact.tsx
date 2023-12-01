/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import React, { forwardRef } from 'react'
import Container from '@toptal/picasso-container'
import Dropdown from '@toptal/picasso-dropdown'
import useOpen from '@toptal/picasso-utils/use-boolean'

import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import type { Props } from './types'
import styles from './styles'
import { ParentItemContextProvider } from './ParentItemContextProvider'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemCompact',
})

export const SidebarItemCompact = forwardRef<HTMLElement, Props>(
  function CompactSidebarItem(props: Props, ref) {
    const { menu, index, compact, icon } = props
    const [isOpened, handleOpen, handleClose] = useOpen()
    const classes = useStyles()

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
            classes={{ popper: classes.compactDropdown }}
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
