import React, { forwardRef, ReactNode } from 'react'
import { BaseProps, Container, Typography } from '@toptal/picasso'

export interface Props extends BaseProps {
  children?: ReactNode
}

export const SectionSubtitle = forwardRef<HTMLDivElement, Props>(
  function Section(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <Container ref={ref} className={className} style={style} {...rest}>
        <Typography size='medium' color='dark-grey'>
          {children}
        </Typography>
      </Container>
    )
  }
)

SectionSubtitle.displayName = 'SectionSubtitle'

export default SectionSubtitle
