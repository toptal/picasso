import React, { forwardRef, ReactElement } from 'react'
import { BaseProps } from '@toptal/shared'
import { Container } from '@toptal/picasso'

import TimelineRow, { TimelineRowProps } from '../TimelineRow'

export type Props = BaseProps & {
  children: ReactElement<TimelineRowProps> | ReactElement<TimelineRowProps>[]
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

export default Object.assign(Timeline, { Row: TimelineRow })
