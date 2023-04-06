import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import Typography from '../Typography'

export interface Props extends BaseProps {
  children: ReactNode
}

export const NoteSubtitle = forwardRef<HTMLDivElement, Props>(
  function NoteSubtitle({ children, ...rest }, ref) {
    return (
      <Container ref={ref} bottom='small' {...rest}>
        <Typography color='dark-grey' size='xsmall'>
          {children}
        </Typography>
      </Container>
    )
  }
)

NoteSubtitle.defaultProps = {}

NoteSubtitle.displayName = 'NoteSubtitle'

export default NoteSubtitle
