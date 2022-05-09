import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  HTMLAttributes
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import { useSidebarContext } from '../PageSidebar'
import { useSubMenuContext, SidebarItemProps } from '../SidebarItem'
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
    const { parentSidebarItemIndex, isSubMenu } = useSubMenuContext()

    const classes = useStyles()

    const {
      variant,
      expandedItemKey,
      setExpandedItemKey,
      isCollapsed: isSidebarCollapsed
    } = useSidebarContext()

    const expandSidebarItem = useCallback(setExpandedItemKey, [
      setExpandedItemKey
    ])

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
      const compact = isSidebarCollapsed && !isSubMenu

      const itemProps: Partial<SidebarItemProps> = {
        isSubMenu,
        compact,
        variant
      }

      if (!sidebarItem.props.collapsible) {
        return React.cloneElement(sidebarItem, itemProps)
      }

      const isExpanded = expandedItemKey === index

      const expandibleProps: Partial<SidebarItemProps> = {
        isExpanded,
        expand: expandSidebarItem,
        index
      }

      return React.cloneElement(sidebarItem, {
        ...itemProps,
        ...expandibleProps
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
