import React, { forwardRef, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'

export interface Props extends BaseProps {
  children: ReactNode
}

export const NotesContent = forwardRef<HTMLDivElement, Props>(
  function NotesContent ({ children, ...rest }, ref) {
    return (
      <Typography ref={ref} as='p' size='medium' color='black' {...rest}>
        {children}
      </Typography>
    )
  }
)

NotesContent.defaultProps = {}

NotesContent.displayName = 'NotesContent'

export default NotesContent
