import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect
} from 'react'

import Menu from '../Menu'
import { useSidebarContext } from '../PageSidebar'
import { SidebarItemProps, useSubMenuContext } from '../SidebarItem'
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
    const { parentSidebarItemIndex, isSubMenu, parentMenu } =
      useSubMenuContext()

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
      const hasSelectedItem = React.Children.toArray(children).some(
        child => React.isValidElement(child) && child.props.selected
      )

      if (hasSelectedItem && parentSidebarItemIndex !== undefined) {
        setExpandedItemKey(parentSidebarItemIndex)
      }
    }, [parentSidebarItemIndex, setExpandedItemKey, children])

    const items = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const itemProps: Partial<SidebarItemProps> = {
          variant,
          isSubMenu,
          compact: isSidebarCollapsed && !isSubMenu
        }

        const expandibleProps: Partial<SidebarItemProps> = {
          index,
          expand: expandSidebarItem,
          isExpanded: expandedItemKey === index
        }

        const newProps: Partial<SidebarItemProps> = {
          ...itemProps,
          ...(child.props.collapsible ? expandibleProps : {})
        }

        return React.cloneElement(child, newProps)
      }

      return child
    })

    return (
      <Menu
        {...rest}
        allowNestedNavigation={false}
        ref={ref}
        style={style}
        className={cx(
          classes.root,
          {
            [classes.bottom]: bottom,
            [classes.compactParent]: parentMenu?.compact
          },
          className
        )}
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
