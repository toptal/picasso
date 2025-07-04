import React, { forwardRef } from 'react'
import type { HTMLAttributes, Ref } from 'react'
import { Paper } from '@toptal/picasso-paper'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { AnchorType } from '../types'

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  anchor?: AnchorType
}

const DrawerPaper = forwardRef(
  (
    { children, anchor = 'right', className, style }: PaperProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Paper
        style={style}
        ref={ref}
        tabIndex={-1}
        elevation={16}
        className={twMerge(
          className,
          'fixed top-0 h-full flex flex-col outline-0 z-drawer',
          'max-w-full overflow-y-auto webkit-overflow-scrolling-touch',
          anchor === 'left' && 'left-0 right-auto',
          anchor === 'right' && 'left-auto right-0',
          anchor === 'top' &&
            'bottom-auto top-0 left-0 right-0 h-auto max-h-full',
          anchor === 'bottom' &&
            'bottom-0 top-auto left-0 right-0 h-auto max-h-full'
        )}
      >
        {children}
      </Paper>
    )
  }
)

export default DrawerPaper
