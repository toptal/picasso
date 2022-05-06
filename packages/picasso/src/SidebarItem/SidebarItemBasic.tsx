import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { forwardRef } from 'react'

import styles from './styles'
import { Props } from './types'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { SidebarItemHeader } from './SidebarItemHeader'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemBasic'
})

export const SidebarItemBasic = forwardRef<HTMLElement, Props>(
  function BasicSidebarItem(props: Props, ref) {
    const { menu, icon, index } = props

    const classes = useStyles()

    const hasMenu = menu != null
    const hasIcon = icon != null

    return (
      <>
        <SidebarItemHeader {...props} ref={ref} />
        {hasMenu && (
          <div
            className={
              hasIcon ? classes.nestedMenuWithIcon : classes.nestedMenu
            }
          >
            <SubMenuContextProvider parentSidebarItemIndex={index}>
              {menu}
            </SubMenuContextProvider>
          </div>
        )}
      </>
    )
  }
)
