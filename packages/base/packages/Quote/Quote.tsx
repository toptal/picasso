/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import QuoteMark from '@toptal/picasso-quote-mark'
import Container from '@toptal/picasso-container'
import Typography from '@toptal/picasso-typography'

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
