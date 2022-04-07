import React, { forwardRef, ReactNode, HTMLAttributes, useContext } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import { SidebarContextProps } from '../Sidebar/types'
import { SidebarContext } from '../Sidebar'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children?: ReactNode
  /** Logo to display when Sidebar is in collapsed state */
  collapseLogo?: ReactNode
  /** Logo to display when Sidebar is in default state */
  fullLogo?: ReactNode
}

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo({ children, collapseLogo, fullLogo, ...rest }, ref) {
    const { isCollapsed: isSidebarCollapsed } =
      useContext<SidebarContextProps>(SidebarContext)

    const logo = isSidebarCollapsed ? collapseLogo : fullLogo

    return (
      <Container
        {...rest}
        ref={ref}
        flex
        bottom='small'
        left='large'
        alignItems='center'
      >
        {logo}
        {children}
      </Container>
    )
  }
)

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default SidebarLogo
