import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import React, { forwardRef } from 'react'

import Container from '../Container'
import Dropdown from '../Dropdown'
import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'
import styles from './styles'
import { ParentItemContextProvider } from './ParentItemContextProvider'
import useOpen from '../utils/useBoolean'

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
