import { BaseProps } from '@toptal/picasso-shared'
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useContext,
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import Menu from '../Menu'
import {
  PageHamburgerContext,
  PageHamburgerContextProps,
} from '../PageHamburger'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Menu content */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTopBarMenu' })

export const TopBarMenu = forwardRef<HTMLUListElement, Props>(
  function TopBarMenu(props, ref) {
    const { children, ...rest } = props
    const classes = useStyles()
    const { setShowHamburger } =
      useContext<PageHamburgerContextProps>(PageHamburgerContext)

    // not more than 6 menu items are allowed
    const items = React.Children.map(children, (child, index) =>
      index < 6 ? child : null
    )

    useEffect(() => {
      setShowHamburger?.(true)
    }, [])

    return (
      <Menu
        {...rest}
        allowNestedNavigation={false}
        ref={ref}
        className={classes.root}
      >
        {items}
      </Menu>
    )
  }
)

TopBarMenu.displayName = 'TopBarMenu'

export default TopBarMenu
