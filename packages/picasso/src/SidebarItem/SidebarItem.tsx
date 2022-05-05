import React, {
  forwardRef,
  ReactElement,
  ElementType,
  ChangeEvent,
  memo,
  useCallback
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
import Container from '../Container'
import Dropdown from '../Dropdown'
import MenuItem, { MenuItemAttributes } from '../MenuItem'
import { ArrowDownMinor16 } from '../Icon'
import styles from './styles'
import { VariantType } from '../PageSidebar/types'
import noop from '../utils/noop'
import { BadgeProps } from '../Badge'
import SidebarItemContent from '../SidebarItemContent'
import { SubMenuContextProvider } from './SubMenuContextProvider'

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
  /** Definition of the embedded badge  */
  badge?: Omit<BadgeProps, 'size' | 'children'>
  variant?: VariantType
  isExpanded?: boolean
  expand?: (index: number | null) => void
  index?: number | null
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Should it be shown as a compact variant. It becomes a single icon, content becomes a tooltip and badges become overlaid */
  compact?: boolean
  testIds?: {
    content?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItem'
})

const SidebarItemHeader = forwardRef<HTMLElement, Props>(
  function SidebarItemHeader(props: Props, ref) {
    const {
      className,
      disabled,
      menu,
      selected,
      compact,
      variant = 'light',
      onClick,
      collapsible,
      // these props are being destructured only for the purpose of excluding them from `...rest`
      /* eslint-disable @typescript-eslint/no-unused-vars */
      badge,
      testIds,
      icon,
      isExpanded,
      expand,
      index,
      /* eslint-enable */
      ...rest
    } = props

    const classes = useStyles()

    const hasMenu = menu != null

    const handleMenuItemClick = useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!hasMenu) {
          onClick?.(event)
        }
      },
      [hasMenu, onClick]
    )

    return (
      <MenuItem
        {...rest}
        classes={classes}
        ref={ref}
        className={cx(
          classes.root,
          classes.noWrap,
          classes.roundedBorder,
          classes[variant],
          {
            [classes.compact]: compact,
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
        <SidebarItemContent {...props} />
      </MenuItem>
    )
  }
)

const BasicSidebarItem = forwardRef<HTMLElement, Props>(
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

const SidebarItemAccordion = forwardRef<HTMLElement, Props>(
  function SidebarItemAccordion(props: Props, ref) {
    const { expand, index, icon, menu, disabled, variant, isExpanded } = props

    const classes = useStyles()

    const hasIcon = icon != null

    const handleAccordionChange = useCallback(
      (event: ChangeEvent<{}>, isAccordionExpanded: boolean) => {
        event.stopPropagation()

        if (isAccordionExpanded) {
          expand?.(index ?? null)
        }
      },
      [index, expand]
    )

    const content = (
      <SubMenuContextProvider parentSidebarItemIndex={index}>
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <Accordion
        onChange={handleAccordionChange}
        classes={{
          summary: classes.collapsibleWrapper,
          details: hasIcon ? classes.nestedMenuWithIcon : classes.nestedMenu,
          content: classes.content
        }}
        content={content}
        borders='none'
        disabled={disabled}
        expanded={isExpanded}
        expandIcon={
          <ArrowDownMinor16
            className={cx(classes.expandIcon, classes[`${variant}ExpandIcon`], {
              [classes.expandIconDisabled]: disabled
            })}
          />
        }
      >
        <SidebarItemHeader {...props} ref={ref} />
      </Accordion>
    )
  }
)

const CompactSidebarItem = forwardRef<HTMLElement, Props>(
  function CompactSidebarItem(props: Props, ref) {
    const { menu, index } = props

    const classes = useStyles()

    const subMenu = (
      <SubMenuContextProvider parentSidebarItemIndex={index}>
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <Dropdown placement='right-start' content={subMenu}>
        <Container className={classes.collapsibleWrapper}>
          <SidebarItemHeader
            {...props}
            className={classes.collapsibleWrapper}
            ref={ref}
          />
        </Container>
      </Dropdown>
    )
  }
)

export const SidebarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function SidebarItem(props, ref) {
    const { compact, collapsible, menu } = props

    const hasMenu = menu != null

    let SidebarItemImpl = BasicSidebarItem

    if (hasMenu) {
      if (compact) {
        SidebarItemImpl = CompactSidebarItem
      } else if (collapsible) {
        SidebarItemImpl = SidebarItemAccordion
      }
    }

    return <SidebarItemImpl {...props} ref={ref} />
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
  expand: noop,
  variant: 'light',
  compact: false
}

SidebarItem.displayName = 'SidebarItem'

export default SidebarItem
