import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import QuoteMark from '../QuoteMark'
import Container from '../Container'
import { SPACING_4 } from '../utils'
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
      <Container right={SPACING_4}>
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
