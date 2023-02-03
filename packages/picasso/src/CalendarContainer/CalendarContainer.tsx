import React from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import cx from 'classnames'

import { CalendarProps } from '../Calendar/types'
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
