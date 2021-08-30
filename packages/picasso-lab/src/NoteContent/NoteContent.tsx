import React, { forwardRef, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso'

export interface Props extends BaseProps {
  children: ReactNode
}

export const NoteContent = forwardRef<HTMLDivElement, Props>(
  function NoteContent({ children, ...rest }, ref) {
    return (
      <Typography ref={ref} as='p' size='medium' color='black' {...rest}>
        {children}
      </Typography>
    )
  }
)

NoteContent.defaultProps = {}

NoteContent.displayName = 'NoteContent'

export default NoteContent
