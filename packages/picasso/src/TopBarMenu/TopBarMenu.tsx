import { BaseProps } from '@toptal/picasso-shared'
import React, { forwardRef, HTMLAttributes, useEffect, useContext } from 'react'

import Menu from '../Menu'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {}

export const TopBarMenu = forwardRef<HTMLUListElement, Props>(
  function TopBarMenu(props, ref) {
    const { style, children, ...rest } = props
    const { setShowHamburger } = useContext<PageContextProps>(PageContext)

    useEffect(() => {
      setShowHamburger?.(true)
    }, [])

    return (
      <Menu {...rest} allowNestedNavigation={false} ref={ref} style={style}>
        {children}
      </Menu>
    )
  }
)

TopBarMenu.displayName = 'TopBarMenu'

export default TopBarMenu
