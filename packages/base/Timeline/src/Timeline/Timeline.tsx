import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@toptal/picasso-container'

import { TimelineRow } from '../TimelineRow'
import styles from './styles'

export type Props = BaseProps & {
  /** Timeline rows */
  children: React.ReactNode
}

const useStyles = makeStyles(styles, {
  name: 'PicassoTimeline',
})

export const Timeline = forwardRef<HTMLDivElement, Props>(function Timeline(
  { className, children },
  ref
) {
  const classes = useStyles()

  return (
    <Container ref={ref} className={cx(classes.root, className)}>
      {children}
    </Container>
  )
})

Timeline.displayName = 'Timeline'

export default Object.assign(Timeline, { Row: TimelineRow })
