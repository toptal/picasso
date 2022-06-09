import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { forwardRef } from 'react'

import Container from '../Container'
import Dropdown from '../Dropdown'
import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemCompact',
})

export const SidebarItemCompact = forwardRef<HTMLElement, Props>(
  function CompactSidebarItem(props: Props, ref) {
    const { menu, index, compact, icon } = props

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
      <Container left='small' right='small'>
        <Dropdown
          classes={{ popper: classes.compactDropdown }}
          placement='right-start'
          content={subMenu}
        >
          <SidebarItemHeader {...props} ref={ref} />
        </Dropdown>
      </Container>
    )
  }
)
