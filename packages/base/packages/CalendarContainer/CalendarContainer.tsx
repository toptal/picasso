/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { useCalendar } from '@toptal/picasso-calendar-context'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarContainer',
})

export type CalendarContainerProps = {
  children?: ReactNode
  hasFooter?: boolean
  isFlexible?: boolean
}

export type RenderRoot = (args: CalendarContainerProps) => JSX.Element

const CalendarContainer = ({
  children,
  hasFooter,
  isFlexible,
}: CalendarContainerProps) => {
  const classes = useStyles()
  const { renderRoot } = useCalendar()

  return renderRoot ? (
    <>{renderRoot({ hasFooter, children })}</>
  ) : (
    <div
      className={cx(classes.root, {
        [classes.hasFooter]: hasFooter,
        [classes.flexible]: isFlexible,
      })}
    >
      {children}
    </div>
  )
}

export default CalendarContainer
