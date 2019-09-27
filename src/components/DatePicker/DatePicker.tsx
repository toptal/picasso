import React, { forwardRef, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
// @ts-ignore
import Calendar from 'simple-react-calendar'
import cx from 'classnames'
import { Button, Typography } from '@toptal/picasso'
import { ChevronMinor16, BackMinor16 } from '@toptal/picasso/Icon'
import format from 'date-fns/format'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {}

const activeMonth = new Date()

export const DatePicker = forwardRef<HTMLElement, Props>(function DatePicker(
  props,
  ref
) {
  const { classes } = props
  const [selected, setSelected] = useState({} as {start: Date, end: Date})
  let mode = 'range'

  return (
    <Calendar
      selected={selected}
      onSelect={(selection: any) => {
        console.log('args', selection)
        setSelected(selection)
      }}
      customRender={(props: any) => {
        return <div className={classes.root}>{props.children}</div>
      }}
      renderDay={(props: any) => {
        // console.log(props)
        return (
          <button
            className={cx(classes.day, {
              [classes.selected]: props.isSelected,
              [classes.selectable]: props.isSelectable,
              [classes.today]: props.isToday,
              [classes.grayed]: (props.isMonthPrev || props.isMonthNext) && !props.isSelected,
              [classes.startSelection]: props.isSelectionStart,
              [classes.endSelection]: props.isSelectionEnd
            })}
            onClick={props.handleOnClick}
            onMouseEnter={props.handleOnEnter}
            value={props.date}
          >
            {props.children}
          </button>
        )
      }}
      renderMonthHeader={(props: any) => {
        // console.log('month header props', props)
        return (
          <div className={classes.actions}>
            <Button
              variant='flat'
              size='small'
              onClick={() => props.switchMonth(-1)}
            >
              <BackMinor16 />
            </Button>
            <Typography variant='heading' size='medium'>{format(props.activeMonth, 'MMMM y')}</Typography>
            <Button
              variant='flat'
              size='small'
              onClick={() => props.switchMonth(+1)}
            ><ChevronMinor16 />
            </Button>
          </div>
        )
      }}
      renderDaysOfWeek={(props: any) => {
        return <div className={classes.weekDays}>{props.children}</div>
      }}
      renderDayOfWeek={(props: any) => {
        return <div className={classes.weekDay}>{props.children}</div>
      }}
      renderWeek={(props: any) => {
        return <div className={classes.week}>{props.children}</div>
      }}
      activeMonth={activeMonth}
      mode={mode}
    />
  )
})

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default withStyles(styles)(DatePicker)
