import React, {
  forwardRef,
  ReactElement,
  ElementType,
  ChangeEvent,
  memo,
  useMemo
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import {
  BaseProps,
  TextLabelProps,
  OverridableComponent
} from '@toptal/picasso-shared'

import Accordion from '../Accordion'
import MenuItem, { MenuItemAttributes } from '../MenuItem'
import { ArrowDownMinor16 } from '../Icon'
import styles from './styles'
import { VariantType } from '../Sidebar/types'
import noop from '../utils/noop'
import { ItemContent } from './ItemContent'

export const SubMenuContext = React.createContext<{
  parentSidebarItemIndex?: number | null
}>({
  parentSidebarItemIndex: undefined
})

export interface Props extends BaseProps, TextLabelProps, MenuItemAttributes {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Whether to render disabled item */
  disabled?: boolean
  /** If item has menu defines can menu be collapsed */
  collapsible?: boolean
  /** Renders nested sidebar menu */
  menu?: ReactElement
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  variant?: VariantType
  isExpanded?: boolean
  expand?: (index: number | null) => void
  index?: number | null
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Indicates sidebar has collapsed */
  isSidebarCollapsed?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItem'
})

export const SidebarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function SidebarItem(props, ref) {
    const {
      as,
      className,
      collapsible,
      disabled,
      expand = noop,
      icon,
      index,
      isExpanded,
      menu,
      onClick = noop,
      selected,
      style,
      variant = 'light',
      ...rest
    } = props
    const classes = useStyles()

    const hasIcon = Boolean(icon)
    const hasMenu = Boolean(menu)

    const subMenu = useMemo(
      () => (
        <SubMenuContext.Provider
          value={{
            parentSidebarItemIndex: index
          }}
        >
          {menu}
        </SubMenuContext.Provider>
      ),
      [index, menu]
    )

    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      if (!hasMenu) {
        onClick(event)
      }
    }

    const handleAccordionChange = (
      event: ChangeEvent<{}>,
      expansion: boolean
    ) => {
      event.stopPropagation()
      if (expansion) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expand(index!)
      }
    }

    const menuItem = (
      <MenuItem
        {...rest}
        as={as}
        ref={ref}
        style={style}
        className={cx(
          classes.root,
          classes.noWrap,
          classes.roundedBorder,
          classes[variant],
          {
            [classes.selected]: !hasMenu && selected,
            [classes.collapsible]: hasMenu && collapsible
          },
          className
        )}
        onClick={handleMenuItemClick}
        selected={!hasMenu && selected}
        disabled={disabled}
        variant={variant}
        nonSelectable
      >
        <ItemContent {...props} classes={classes} />
      </MenuItem>
    )

    if (hasMenu && collapsible) {
      return (
        <Accordion
          onChange={handleAccordionChange}
          classes={{
            summary: classes.collapsibleWrapper,
            details: hasIcon ? classes.nestedMenuWithIcon : classes.nestedMenu,
            content: classes.content
          }}
          content={subMenu}
          borders='none'
          disabled={disabled}
          expanded={isExpanded}
          expandIcon={
            <ArrowDownMinor16
              className={cx(
                classes.expandIcon,
                classes[`${variant}ExpandIcon`],
                {
                  [classes.expandIconDisabled]: disabled
                }
              )}
            />
          }
        >
          {menuItem}
        </Accordion>
      )
    }

    return (
      <>
        {menuItem}
        {hasMenu && (
          <div
            className={
              hasIcon ? classes.nestedMenuWithIcon : classes.nestedMenu
            }
          >
            {subMenu}
          </div>
        )}
      </>
    )
  })
)

export const getSelectedSubMenu = (sidebarItem: ReactElement<Props>) => {
  const menu = sidebarItem.props.menu

  if (!menu) {
    return null
  }

  const subMenuItems = React.Children.toArray(menu.props.children)

  return subMenuItems.find(
    menuChild => (menuChild as ReactElement<Props>).props.selected
  )
}

SidebarItem.defaultProps = {
  collapsible: false,
  onClick: noop,
  selected: false,
  expand: noop
}

SidebarItem.displayName = 'SidebarItem'

export default SidebarItem
