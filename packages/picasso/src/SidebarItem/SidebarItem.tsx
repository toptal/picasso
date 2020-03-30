import React, {
  forwardRef,
  ReactElement,
  Fragment,
  ElementType,
  ChangeEvent
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import { BaseProps, OverridableComponent } from '@toptal/picasso-shared'

import { Container, Typography, Accordion, MenuItem } from '../'
import { ArrowDropDown16 } from '../Icon'
import { MenuItemAttributes } from '../MenuItem'
import styles from './styles'
import useSidebar from '../Sidebar/useSidebar'

export interface Props extends BaseProps, MenuItemAttributes {
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
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoSidebarItem'
})

const SidebarItem: OverridableComponent<Props> = forwardRef<HTMLElement, Props>(
  function SidebarItem(props, ref) {
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
      ...rest
    } = props

    const hasIcon = Boolean(icon)
    const hasMenu = Boolean(menu)

    const {
      variant,
      isExpanded,
      isNothingExpanded: isNothingExpandedOnSidebar,
      expand
    } = useSidebar()

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
        expand()
      }
    }

    const resolvedChildren =
      typeof children === 'string' ? (
        <Typography
          className={classes.labelContent}
          color='inherit'
          size='medium'
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
          classes[variant!],
          { [classes.selected]: !hasMenu && selected },
          className
        )}
        onClick={handleMenuItemClick}
        selected={!hasMenu && selected}
        disabled={disabled}
        variant={variant}
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
      const menuChildren = React.Children.toArray(menu!.props.children)

      const isExpandedableByDefault =
        menuChildren.find(
          (menuChild: ReactElement) => menuChild.props.selected
        ) !== undefined

      if (isNothingExpandedOnSidebar && isExpandedableByDefault) {
        expand()
      }

      return (
        <Accordion
          onChange={handleAccordionChange}
          classes={{
            summary: classes.summary,
            details: classes.details,
            content: classes.content
          }}
          content={menu}
          bordered={false}
          disabled={disabled}
          expanded={isExpanded}
          expandIcon={
            <ArrowDropDown16
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
      <Fragment>
        {menuItem}
        {hasMenu && <div className={classes.nonCollapsibleMenu}>{menu}</div>}
      </Fragment>
    )
  }
)

SidebarItem.defaultProps = {
  collapsible: false,
  onClick: () => {},
  selected: false
}

SidebarItem.displayName = 'SidebarItem'

export default SidebarItem
