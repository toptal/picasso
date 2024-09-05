import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TimelineRow } from '../TimelineRow'

export type Props = BaseProps & {
  /** Timeline rows */
  children: React.ReactNode
}

export const Timeline = forwardRef<HTMLDivElement, Props>(function Timeline(
  { className, children },
  ref
) {
  return (
    <Container ref={ref} className={twMerge('table h-fit w-fit', className)}>
      {children}
    </Container>
  )
})

Timeline.displayName = 'Timeline'

export default Object.assign(Timeline, { Row: TimelineRow })
