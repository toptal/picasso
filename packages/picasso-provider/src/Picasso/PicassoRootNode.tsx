import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { root } from './styles'

export interface PicassoRootNodeProps {
  children?: ReactNode
}

const PicassoRootNode = forwardRef<HTMLDivElement, PicassoRootNodeProps>(
  ({ children }, ref) => (
    <div ref={ref} className={root}>
      {children}
    </div>
  )
)

PicassoRootNode.displayName = 'PicassoRootNode'

export default PicassoRootNode
