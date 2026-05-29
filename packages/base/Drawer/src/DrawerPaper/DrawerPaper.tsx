import React, { forwardRef } from 'react'
import type { HTMLAttributes, Ref } from 'react'
import { Paper } from '@toptal/picasso-paper'
import { twMerge } from '@toptal/picasso-tailwind-merge'

type PaperProps = HTMLAttributes<HTMLDivElement>

const DrawerPaper = forwardRef(
  (
    { children, className, style }: PaperProps,
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
          'h-full flex flex-col outline-0',
          'max-w-full overflow-y-auto webkit-overflow-scrolling-touch'
        )}
      >
        {children}
      </Paper>
    )
  }
)

export default DrawerPaper
