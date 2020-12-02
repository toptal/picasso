import React, {
  forwardRef,
  ReactElement,
  ElementType,
  ChangeEvent,
  memo
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
  useTitleCase
} from '@toptal/picasso-shared'

import Container from '../Container'
import Typography from '../Typography'
import Accordion from '../Accordion'
import MenuItem, { MenuItemAttributes } from '../MenuItem'
import { ArrowDownMinor16 } from '../Icon'
import styles from './styles'
import { VariantType } from '../Sidebar/types'

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
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  variant?: VariantType
  isExpanded?: boolean
  expand?: (index: number | null) => void
  index?: number | null
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoSidebarItem'
})

export const SidebarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function SidebarItem(props, ref) {
    const classes = useStyles(props)
    const {
      children,
      icon,
      selected,
      collapsible,
      menu,
      disabled,
      className,
      style,
      onClick,
      as,
      variant,
      isExpanded,
      expand,
      index,
      titleCase: propsTitleCase,
      ...rest
    } = props

    const hasIcon = Boolean(icon)
    const hasMenu = Boolean(menu)

    const titleCase = useTitleCase(propsTitleCase)

    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      if (!hasMenu) {
        onClick!(event)
      }
    }

    const handleAccordionChange = (
      event: ChangeEvent<{}>,
      expansion: boolean
    ) => {
      event.stopPropagation()
      if (expansion) {
        expand!(index!)
      }
    }

    const resolvedChildren =
      typeof children === 'string' ? (
        <Typography
          className={classes.labelContent}
          color='inherit'
          size='medium'
          titleCase={titleCase}
          noWrap
        >
          {children}
        </Typography>
      ) : (
        children
      )

    const menuItem = (
      <MenuItem
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        as={as}
        ref={ref}
        style={style}
        className={cx(
          classes.root,
          classes.noWrap,
          classes.roundedBorder,
          classes[variant!],
          { [classes.selected]: !hasMenu && selected },
          className
        )}
        onClick={handleMenuItemClick}
        selected={!hasMenu && selected}
        disabled={disabled}
        variant={variant}
        nonSelectable
      >
        <Container className={classes.noWrap} inline flex alignItems='center'>
          {icon}
          <Container
            className={cx(classes.label, classes.noWrap, {
              [classes.withIcon]: hasIcon
            })}
            flex
            alignItems='center'
          >
            {resolvedChildren}
          </Container>
        </Container>
      </MenuItem>
    )

    if (hasMenu && collapsible) {
      return (
        <Container right='small'>
          <Accordion
            onChange={handleAccordionChange}
            classes={{
              summary: classes.summary,
              details: classes.details,
              content: classes.content
            }}
            content={menu}
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
        </Container>
      )
    }

    return (
      <Container right='small'>
        {menuItem}
        {hasMenu && <div className={classes.nonCollapsibleMenu}>{menu}</div>}
      </Container>
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
    (menuChild: ReactElement<Props>) => menuChild.props.selected
  )
}

SidebarItem.defaultProps = {
  collapsible: false,
  onClick: () => {},
  selected: false,
  expand: () => {}
}

SidebarItem.displayName = 'SidebarItem'

export default SidebarItem
