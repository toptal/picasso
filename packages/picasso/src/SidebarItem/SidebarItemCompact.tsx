import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { forwardRef } from 'react'

import Container from '../Container'
import Dropdown from '../Dropdown'
import styles from './styles'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'
import { SidebarItemHeader } from './SidebarItemHeader'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemCompact'
})

export const SidebarItemCompact = forwardRef<HTMLElement, Props>(
  function CompactSidebarItem(props: Props, ref) {
    const { menu, index } = props

    const classes = useStyles()

    const subMenu = (
      <SubMenuContextProvider
        extraClasses={{ header: classes.nestedMenuNoMargin }}
        parentSidebarItemIndex={index}
      >
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <Dropdown placement='right-start' content={subMenu}>
        <Container className={classes.collapsibleWrapper}>
          <SidebarItemHeader {...props} ref={ref} />
        </Container>
      </Dropdown>
    )
  }
)
