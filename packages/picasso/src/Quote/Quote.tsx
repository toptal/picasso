import React, { forwardRef, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import QuoteMark from '../QuoteMark'
import Container from '../Container'
import Typography from '../Typography'

export interface Props extends BaseProps {
  /** Main content of the Quote */
  children?: ReactNode
}

export const Quote = forwardRef<HTMLDivElement, Props>(function Quote(
  props,
  ref
) {
  const { children, className, style, ...rest } = props

  return (
    <Container ref={ref} className={className} style={style} flex {...rest}>
      <Container right='small'>
        <QuoteMark />
      </Container>
      <Typography size='medium' color='dark-grey'>
        {children}
      </Typography>
    </Container>
  )
})

Quote.displayName = 'Quote'

export default Quote
