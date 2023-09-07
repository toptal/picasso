import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { HTMLAttributes, Ref } from 'react'

import type { AnchorType } from './types'

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  anchor?: AnchorType
}

const DrawerPaper = forwardRef(
  (
    { children, anchor = 'right', className, style }: PaperProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        style={style}
        ref={ref}
        className={cx(
          className,
          'top-0 h-full flex outline-0 z-drawer bg-white shadow-6',
          'fixed max-w-full overflow-y-auto flex-col webkit-overflow-scrolling-touch',
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
      </div>
    )
  }
)

export default DrawerPaper
