import React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { CalendarProps } from '../Calendar/types'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarContainer',
})

const CalendarContainer = ({ children }: CalendarProps) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default CalendarContainer
