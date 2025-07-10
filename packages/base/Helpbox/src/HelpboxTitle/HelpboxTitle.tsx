import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Title of Helpbox */
  children: string
}

export const HelpboxTitle = forwardRef<HTMLDivElement, Props>(
  function HelpboxTitle(props, ref) {
    const { className, style, children, ...rest } = props

    return (
      <Container
        {...rest}
        ref={ref}
        className={className}
        style={style}
        bottom='small'
      >
        <Typography variant='heading' size='small'>
          {children}
        </Typography>
      </Container>
    )
  }
)

HelpboxTitle.displayName = 'HelpboxTitle'

export default HelpboxTitle
