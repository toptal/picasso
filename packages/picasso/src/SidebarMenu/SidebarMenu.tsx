import React, { forwardRef, useContext, ReactElement, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Menu, { ListNativeProps } from '../Menu'
import { SidebarContext } from '../Sidebar'
import { SidebarContextProps } from '../Sidebar/types'
import * as SidebarItem from '../SidebarItem'
import styles from './styles'

export interface Props extends BaseProps, ListNativeProps {
  /** Defines is sidebar menu pushed to bottom of sidebar */
  bottom?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarMenu'
})

export const SidebarMenu = forwardRef<HTMLUListElement, Props>(
  function SidebarMenu(props, ref) {
    const { bottom, style, className, children, ...rest } = props

    const classes = useStyles()

    const { variant, expandedItemKey, setExpandedItemKey } = useContext<
      SidebarContextProps
    >(SidebarContext)

    const expandSidebarItem = useCallback(index => setExpandedItemKey(index), [
      setExpandedItemKey
    ])
    const items = React.Children.map(children, (child, index) => {
      const sidebarItem = child as ReactElement

      if (!sidebarItem.props.collapsible) {
        return React.cloneElement(sidebarItem, { variant })
      }

      const selectedChild = SidebarItem.getSelectedSubMenu(sidebarItem)
      const hasSelectedChild = Boolean(selectedChild)

      const isNothingExpandedOnSidebar = expandedItemKey === null
      const isExpanded =
        (isNothingExpandedOnSidebar && hasSelectedChild) ||
        expandedItemKey === index

      return React.cloneElement(sidebarItem, {
        variant,
        isExpanded,
        expand: expandSidebarItem,
        index
      })
    })

    return (
      <Menu
        {...rest}
        allowNestedNavigation={false}
        ref={ref}
        style={style}
        className={cx(classes.root, { [classes.bottom]: bottom }, className)}
      >
        {items}
      </Menu>
    )
  }
)

SidebarMenu.defaultProps = {
  bottom: false
}

SidebarMenu.displayName = 'SidebarMenu'

export default SidebarMenu
