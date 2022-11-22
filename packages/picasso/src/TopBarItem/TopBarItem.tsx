import {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import React, { forwardRef, memo, ElementType, ReactElement } from 'react'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import MenuItem from '../MenuItem'
import SidebarItem from '../SidebarItem'
import Typography from '../Typography'
import { useBreakpoint, noop } from '../utils'
import styles from './styles'

export interface Props extends BaseProps, TextLabelProps {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTopBarMenuItem' })

export const TopBarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function TopBarItem(props, ref) {
    const { className, icon, children, ...rest } = props
    const classes = useStyles()
    const isCompactLayout = useBreakpoint(['small', 'medium'])

    return isCompactLayout ? (
      <SidebarItem {...props} ref={ref} />
    ) : (
      <MenuItem
        {...rest}
        className={cx(classes.root, className, classes.dark, {
          [classes.selected]: props.selected,
        })}
        ref={ref}
      >
        {icon && <div className={classes.icon}>{icon}</div>}
        <Typography size='small' color='inherit'>
          {children}
        </Typography>
      </MenuItem>
    )
  })
)

TopBarItem.defaultProps = {
  onClick: noop,
  selected: false,
}

TopBarItem.displayName = 'TopBarItem'

export default TopBarItem
