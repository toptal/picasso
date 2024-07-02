import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { HTMLAttributes, Ref } from 'react'
import { Paper } from '@toptal/picasso-paper'

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
        className={cx(
          className,
          'fixed top-0 h-full flex flex-col outline-0 z-drawer',
          'max-w-full overflow-y-auto webkit-overflow-scrolling-touch',
          {
            'left-0 right-auto': anchor === 'left',
            'left-auto right-0': anchor === 'right',
            'bottom-auto top-0 left-0 right-0 h-auto max-h-full':
              anchor === 'top',
            'bottom-0 top-auto left-0 right-0 h-auto max-h-full':
              anchor === 'bottom',
          }
        )}
      >
        {children}
      </Paper>
    )
  }
)

export default DrawerPaper
