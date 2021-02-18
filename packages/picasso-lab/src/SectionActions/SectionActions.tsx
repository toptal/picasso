import React, { forwardRef, ReactNode } from 'react'
import { BaseProps, Container } from '@toptal/picasso'

export interface Props extends BaseProps {
  children?: ReactNode
}

export const SectionActions = forwardRef<HTMLDivElement, Props>(
  function Section(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <Container ref={ref} className={className} style={style} {...rest}>
        {children}
      </Container>
    )
  }
)

SectionActions.displayName = 'SectionActions'

export default SectionActions
