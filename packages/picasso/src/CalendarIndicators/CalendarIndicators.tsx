/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props {
  isSelected: boolean
  isToday: boolean
  isIndicated: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarIndicators',
})

export const CalendarIndicators = ({
  isIndicated,
  isSelected,
  isToday,
}: Props) => {
  const classes = useStyles()

  if (isToday || isIndicated) {
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
