import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  children: React.ReactNode
}

export const NoteTitle = forwardRef<HTMLDivElement, Props>(function NoteTitle(
  { children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={twMerge('mb-1', className)} {...rest}>
      <Typography variant='heading' size='small'>
        {children}
      </Typography>
    </div>
  )
})

NoteTitle.defaultProps = {}

NoteTitle.displayName = 'NoteTitle'

export default NoteTitle
