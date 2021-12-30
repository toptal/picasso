import React, { forwardRef } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso'

import TimelineRow from '../TimelineRow'

export type Props = BaseProps & {
  /** Timeline rows */
  children: React.ReactNode
}

export const Timeline = forwardRef<HTMLDivElement, Props>(function Timeline(
  { className, children },
  ref
) {
  return (
    <Container ref={ref} className={className} flex direction='column'>
      {children}
    </Container>
  )
})

Timeline.displayName = 'Timeline'

export default Object.assign(Timeline, { Row: TimelineRow })
