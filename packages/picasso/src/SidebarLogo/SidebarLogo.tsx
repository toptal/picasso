import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children: ReactNode
}

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo({ children, ...rest }, ref) {
    return (
      <Container
        {...rest}
        ref={ref}
        flex
        bottom='small'
        left='large'
        alignItems='center'
      >
        {children}
      </Container>
    )
  }
)

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default SidebarLogo
