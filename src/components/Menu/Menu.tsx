import React, { FunctionComponent } from 'react'
import MUIMenu from '@material-ui/core/Menu'
import MUIMenuList from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'
import { Overwrite } from '@material-ui/core'

import MenuItem from '../MenuItem'
import { StandardProps, JssProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /**
   * The DOM element used to set the position of the menu.
   * If anchor specified it automatically displaying the menu.
   */
  anchor?: null | HTMLElement
  /** Min width of the menu */
  minWidth?: number
  /** Callback fired when the component requests to be closed */
  onClose?: () => void
  /** Whether menu should be displayed */
  open?: boolean
}

interface StaticProps {
  Item: typeof MenuItem
}

export const Menu: FunctionComponent<Props> & StaticProps = ({
  anchor,
  children,
  minWidth,
  onClose,
  open
}) => {
  return onClose ? (
    <MUIMenu
      anchorEl={anchor}
      onClose={onClose}
      open={open || !!anchor}
      PaperProps={{
        style: {
          minWidth
        }
      }}
    >
      {children}
    </MUIMenu>
  ) : (
    <MUIMenuList>{children}</MUIMenuList>
  )
}

Menu.defaultProps = {
  open: false
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default withStyles(styles)(Menu) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
