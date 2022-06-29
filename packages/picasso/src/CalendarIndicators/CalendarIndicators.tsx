import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

export interface Props {
  indicatedIntervals?: { start: Date; end: Date }[]
  date: Date
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarIndicators',
})

export const CalendarIndicators = ({ indicatedIntervals, date }: Props) => {
  const classes = useStyles()

  const isIndicated = (day: Date) => {
    if (!indicatedIntervals) {
      return false
    }

    for (let index = 0; index < indicatedIntervals.length; index++) {
      const interval = indicatedIntervals[index]

      if (interval.start <= day && day <= interval.end) {
        return true
      }
    }
  }

  if (isIndicated(date)) {
    return <div className={classes.indicated} />
  }

  return <></>
}
