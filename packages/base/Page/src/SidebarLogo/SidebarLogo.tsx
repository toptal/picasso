import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { Container } from '@toptal/picasso-container'

import { useSidebarContext } from '../PageSidebar/SidebarContextProvider'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children?: ReactNode
  /** Logo to display when Sidebar is in collapsed state */
  collapsedLogo?: ReactNode
  /** Logo to display when Sidebar is in default state */
  fullLogo?: ReactNode
}

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo(
    { children, collapsedLogo, fullLogo, className, ...rest },
    ref
  ) {
    const { isCollapsed: isSidebarCollapsed } = useSidebarContext()

    const logo = isSidebarCollapsed ? collapsedLogo : fullLogo

    return (
      <Container
        {...rest}
        className={twMerge('flex-shrink-0 block overflow-hidden', className)}
        ref={ref}
        bottom='xsmall'
        left='large'
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
