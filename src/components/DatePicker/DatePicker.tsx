import React, { forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
// @ts-ignore
import Calendar from 'simple-react-calendar'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
}

const activeMonth = new Date()

export const DatePicker = forwardRef<HTMLElement, Props>(function DatePicker(props, ref) {
  const { classes } = props

  return (
    <Calendar
      className={classes.root}
      customRender={(props: any) => {
        return <div className={classes.root}>{props.children}</div>
      }}
      renderDay={(props: any) => {
      // console.log('day props', props)
      // console.log('classes', classes.day, classes.selected, classes)
        return (
          <button
            className={cx(classes.day, {
              [classes.selected]: props.isSelected,
              [classes.selectable]: props.isSelectable && !props.isMonthPrev && !props.isMonthNext,
              [classes.today]: props.isToday,
              [classes.grayed]: props.isMonthPrev || props.isMonthNext
            })}
            onClick={props.handleOnClick}
            onMouseEnter={props.handleOnEnter}
          >{props.children}
          </button>
        )
      }}
      renderWeek={(props: any) => {
        return <div className={classes.week}>{props.children}</div>
      }}
      daysOfWeek
      // renderMonthHeader={(props: any) => {
      //   console.log(props)
      //   return <div>
      //     {props.children}
      //   </div>
      // }}
      // mode="range"
      activeMonth={activeMonth}
    />
  )
})

DatePicker.defaultProps = {
}

DatePicker.displayName = 'DatePicker'

export default withStyles(styles)(DatePicker)
