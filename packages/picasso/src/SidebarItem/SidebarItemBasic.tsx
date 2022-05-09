import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { SidebarItemHeader } from './SidebarItemHeader'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemBasic'
})

export const SidebarItemBasic = forwardRef<HTMLElement, Props>(
  function BasicSidebarItem(props: Props, ref) {
    const { menu, index, icon } = props

    const classes = useStyles()

    const hasMenu = menu != null
    const hasIcon = icon != null

    return (
      <>
        <SidebarItemHeader {...props} ref={ref} />
        {hasMenu && (
          <div>
            <SubMenuContextProvider
              extraClasses={{
                header: hasIcon
                  ? classes.nestedMenuWithIcon
                  : classes.nestedMenu
              }}
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
