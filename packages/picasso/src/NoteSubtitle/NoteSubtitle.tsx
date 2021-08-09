import React, { forwardRef, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import Typography from '../Typography'

export interface Props extends BaseProps {
  children: ReactNode
}

export const NoteSubtitle = forwardRef<HTMLDivElement, Props>(
  function NoteSubtitle ({ children, ...rest }, ref) {
    return (
      <Container ref={ref} bottom='small' {...rest}>
        <Typography color='dark-grey' size='small'>
          {children}
        </Typography>
      </Container>
    )
  }
)

NoteSubtitle.defaultProps = {}

NoteSubtitle.displayName = 'NoteSubtitle'

export default NoteSubtitle
