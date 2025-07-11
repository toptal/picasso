import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'

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

NoteContent.displayName = 'NoteContent'

export default NoteContent
