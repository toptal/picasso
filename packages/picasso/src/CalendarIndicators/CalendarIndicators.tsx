import React, { useMemo } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props {
  indicatedIntervals?: { start: Date; end: Date }[]
  date: Date
  isSelected: boolean
  isToday: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarIndicators',
})

export const CalendarIndicators = ({
  date,
  indicatedIntervals,
  isSelected,
  isToday,
}: Props) => {
  const classes = useStyles()

  const isIndicated = useMemo(() => {
    return (
      indicatedIntervals != null &&
      indicatedIntervals.some(({ start, end }) => date >= start && date <= end)
    )
  }, [indicatedIntervals, date])

  if (isToday || indicatedIntervals) {
    return (
      <div className={classes.indicators}>
        {isToday && (
          <div
            className={cx(classes.today, {
              [classes.selected]: isSelected,
            })}
          />
        )}
        {isIndicated && <div className={classes.indicated} />}
      </div>
    )
  }

  return null
}
