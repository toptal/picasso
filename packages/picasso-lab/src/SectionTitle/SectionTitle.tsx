import React, { forwardRef, ReactNode } from 'react'
import { BaseProps, Container, Typography } from '@toptal/picasso'

export interface Props extends BaseProps {
  children?: ReactNode
}

export const SectionTitle = forwardRef<HTMLDivElement, Props>(function Section(
  props,
  ref
) {
  const { children, className, style, ...rest } = props

  return (
    <Container ref={ref} className={className} style={style} {...rest}>
      <Typography variant='heading' size='medium'>
        {children}
      </Typography>
    </Container>
  )
})

SectionTitle.displayName = 'SectionTitle'

export default SectionTitle
