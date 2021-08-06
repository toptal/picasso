import React, { forwardRef, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import Typography from '../Typography'

export interface Props extends BaseProps {
  children: ReactNode
}

export const NotesSubtitle = forwardRef<HTMLDivElement, Props>(
  function NotesSubtitle ({ children, ...rest }, ref) {
    return (
      <Container ref={ref} flex direction='row' bottom='small' {...rest}>
        <Typography color='dark-grey' size='small'>
          {children}
        </Typography>
      </Container>
    )
  }
)

NotesSubtitle.defaultProps = {}

NotesSubtitle.displayName = 'NotesSubtitle'

export default NotesSubtitle
