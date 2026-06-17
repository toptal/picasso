import React, { forwardRef } from 'react'
import type { HTMLAttributes, Ref } from 'react'
import { Paper } from '@toptal/picasso-paper'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { AnchorType } from '../types'

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  anchor?: AnchorType
}

// Resting (open) position is `translate-*-0`; the off-screen position is
// applied for the enter (`data-starting-style`) and exit (`data-ending-style`)
// frames so @base-ui/react drives the slide transition the legacy Slide handled.
const anchorClassName: Record<AnchorType, string> = {
  left: 'left-0 right-auto translate-x-0 data-starting-style:-translate-x-full data-ending-style:-translate-x-full',
  right:
    'left-auto right-0 translate-x-0 data-starting-style:translate-x-full data-ending-style:translate-x-full',
  top: 'top-0 bottom-auto left-0 right-0 h-auto max-h-full translate-y-0 data-starting-style:-translate-y-full data-ending-style:-translate-y-full',
  bottom:
    'bottom-0 top-auto left-0 right-0 h-auto max-h-full translate-y-0 data-starting-style:translate-y-full data-ending-style:translate-y-full',
}

const DrawerPaper = forwardRef(
  (
    { anchor = 'right', className, children, ...rest }: PaperProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Paper
        ref={ref}
        elevation={16}
        className={twMerge(
          className,
          'fixed top-0 h-full flex flex-col outline-0 z-drawer',
          'max-w-full overflow-y-auto webkit-overflow-scrolling-touch',
          'transition-transform ease-out duration-300',
          anchorClassName[anchor]
        )}
        {...rest}
      >
        {children}
      </Paper>
    )
  }
)

DrawerPaper.displayName = 'DrawerPaper'

export default DrawerPaper
