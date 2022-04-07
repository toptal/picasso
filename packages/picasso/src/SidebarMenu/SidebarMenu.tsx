import React, {
  forwardRef,
  useContext,
  ReactElement,
  useCallback,
  useEffect,
  HTMLAttributes
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import { SidebarContext } from '../PageSidebar'
import { SidebarContextProps } from '../PageSidebar/types'
import * as SidebarItem from '../SidebarItem'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Defines is sidebar menu pushed to bottom of sidebar */
  bottom?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarMenu'
})

export const SidebarMenu = forwardRef<HTMLUListElement, Props>(
  function SidebarMenu(props, ref) {
    const { bottom, style, className, children, ...rest } = props
    const { parentSidebarItemIndex } = useContext(SidebarItem.SubMenuContext)

    const classes = useStyles()

    const {
      variant,
      expandedItemKey,
      setExpandedItemKey,
      isCollapsed: isSidebarCollapsed
    } = useContext<SidebarContextProps>(SidebarContext)

    const expandSidebarItem = useCallback(
      index => setExpandedItemKey(index),
      [setExpandedItemKey]
    )

    useEffect(() => {
      const hasSelectedItem = React.Children.map(children, child => {
        const sidebarItem = child as ReactElement

        return sidebarItem.props.selected
      })?.some(selected => Boolean(selected) === true)

      if (hasSelectedItem && parentSidebarItemIndex !== undefined) {
        setExpandedItemKey(parentSidebarItemIndex)
      }
    }, [parentSidebarItemIndex, setExpandedItemKey, children])

    const items = React.Children.map(children, (child, index) => {
      const sidebarItem = child as ReactElement
      const isContentVisible = !isSidebarCollapsed

      if (!sidebarItem.props.collapsible) {
        return React.cloneElement(sidebarItem, {
          variant,
          isContentVisible
        })
      }

      const isExpanded = expandedItemKey === index

      return React.cloneElement(sidebarItem, {
        variant,
        isExpanded,
        expand: expandSidebarItem,
        isContentVisible,
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
