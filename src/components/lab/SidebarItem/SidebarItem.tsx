import React, {
  FunctionComponent,
  ReactElement,
  Fragment,
  useContext
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../../Picasso'
import Container from '../../Container'
import Typography from '../../Typography'
import MenuItem, { MenuItemAttributes } from '../../MenuItem/MenuItem'
import Accordion from '../../Accordion'
import { ArrowDropDown16 } from '../../Icon'
import { SidebarContext } from '../Sidebar'
import { SidebarContextProps } from '../Sidebar/types'
import styles from './styles'

export interface Props extends StandardProps, MenuItemAttributes {
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
}

export const SidebarItem: FunctionComponent<Props> = ({
  children,
  icon,
  selected,
  collapsible,
  menu,
  disabled,
  classes,
  className,
  style,
  onClick,
  ...rest
}) => {
  const hasIcon = Boolean(icon)
  const hasMenu = Boolean(menu)
  const resolvedMenu = hasMenu ? React.cloneElement(menu!, { disabled }) : menu

  const { variant } = useContext<SidebarContextProps>(SidebarContext)

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!hasMenu) {
      onClick!(event)
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
    return (
      <Accordion
        className={classes[`${variant}Accordion`]}
        classes={{
          summary: classes.summary,
          details: classes.details,
          content: classes.content,
          expandIcon: classes.expandIcon
        }}
        content={resolvedMenu}
        bordered={false}
        disabled={disabled}
        // @ts-ignore
        expandIcon={ArrowDropDown16}
      >
        {menuItem}
      </Accordion>
    )
  }

  return (
    <Fragment>
      {menuItem}
      {resolvedMenu}
    </Fragment>
  )
}

SidebarItem.defaultProps = {
  collapsible: false,
  onClick: () => {},
  selected: false
}

SidebarItem.displayName = 'SidebarItem'

export default withStyles(styles)(SidebarItem)
