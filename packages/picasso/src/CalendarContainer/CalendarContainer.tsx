import type { ReactNode } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import { useCalendar } from '../CalendarContext'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarContainer',
})

export type CalendarContainerProps = {
  children?: ReactNode
  hasFooter?: boolean
  showTwoMonths?: boolean
}

export type RenderRoot = (args: CalendarContainerProps) => JSX.Element

const CalendarContainer = ({
  children,
  hasFooter,
  showTwoMonths,
}: CalendarContainerProps) => {
  const classes = useStyles()
  const { renderRoot } = useCalendar()

  return renderRoot ? (
    <>{renderRoot({ hasFooter, children })}</>
  ) : (
    <div
      className={cx(classes.root, {
        [classes.hasFooter]: hasFooter,
        [classes.wide]: showTwoMonths,
      })}
    >
      {children}
    </div>
  )
}

export default CalendarContainer
