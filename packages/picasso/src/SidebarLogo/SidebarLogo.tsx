import React, { forwardRef, ReactNode, HTMLAttributes, useContext } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import { SidebarContextProps } from '../Sidebar/types'
import { SidebarContext } from '../Sidebar'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children?: ReactNode
  /** Icon to display when Sidebar is collapsed */
  logoIcon?: ReactNode
  /** Icon to display when Sidebar is default */
  fullLogo?: ReactNode
}

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo({ children, logoIcon, fullLogo, ...rest }, ref) {
    const { isCollapsed: isSidebarCollapsed } =
      useContext<SidebarContextProps>(SidebarContext)

    const content = isSidebarCollapsed ? logoIcon : fullLogo

    return (
      <Container
        {...rest}
        ref={ref}
        flex
        bottom='small'
        left='large'
        alignItems='center'
      >
        {content ?? children}
      </Container>
    )
  }
)

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default SidebarLogo
