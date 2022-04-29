import React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { CalendarProps } from '../../types'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendarRoot' })

const CalendarRoot = ({ children }: CalendarProps) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default CalendarRoot
