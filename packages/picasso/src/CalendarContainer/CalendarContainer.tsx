import React from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

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
