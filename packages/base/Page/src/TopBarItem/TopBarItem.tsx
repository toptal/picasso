import type {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import type { ReactElement } from 'react'
import React, { forwardRef, memo } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { noop } from '@toptal/picasso-utils'

import { SidebarItem } from '../SidebarItem'
import styles from './styles'

export interface Props extends BaseProps, TextLabelProps {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTopBarMenuItem' })

export const TopBarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function TopBarItem(props, ref) {
    const { className, icon } = props
    const classes = useStyles()

    return (
      <SidebarItem
        {...props}
        className={cx(classes.root, className, {
          [classes.selected]: props.selected,
          [classes.icon]: icon,
        })}
        ref={ref}
      />
    )
  })
)

TopBarItem.defaultProps = {
  onClick: noop,
  selected: false,
}

TopBarItem.displayName = 'TopBarItem'

export default TopBarItem
