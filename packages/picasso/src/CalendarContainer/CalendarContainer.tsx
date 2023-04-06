import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import type { CalendarProps } from '../Calendar/types'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarContainer',
})

const CalendarContainer = ({ children, hasFooter }: CalendarProps) => {
  const classes = useStyles()

  return (
    <div
      className={cx(classes.root, {
        [classes.hasFooter]: hasFooter,
      })}
    >
      {children}
    </div>
  )
}

export default CalendarContainer
