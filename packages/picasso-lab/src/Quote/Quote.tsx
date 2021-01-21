import React, { forwardRef, ReactNode } from 'react'
import { BaseProps, Container, Typography } from '@toptal/picasso'

import QuoteMark from '../QuoteMark'

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
    // eslint-disable-next-line react/jsx-props-no-spreading
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
