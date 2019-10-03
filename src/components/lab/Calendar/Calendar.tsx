import React, { useState } from 'react'
// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar'
import cx from 'classnames'
import format from 'date-fns/format'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { BaseProps } from '../../Picasso'
import { Button, Typography } from '../..'
import { ChevronMinor16, BackMinor16 } from '../../Icon'
import {
  CalendarProps,
  MonthHeaderProps,
  WeekProps,
  DaysOfWeekProps,
  DayOfWeekProps,
  DayProps
} from './types'
import styles from './styles'

type SimpleReactCalendarRangeType = { start: Date; end: Date }
export type DateOrDateRangeType = Date | DateRangeType
export type DateRangeType = [Date, Date]

export interface Props extends BaseProps {
  onSelect: (value: DateOrDateRangeType) => void
  range?: boolean
  open?: boolean
  activeMonth?: Date
}

const useStyles = makeStyles<Theme, Props>(styles)

export const Calendar = (props: Props) => {
  const classes = useStyles(props)
  const {
    range = false,
    open = false,
    activeMonth = new Date(),
    onSelect
  } = props

  const [value, setValue] = useState<
    Date | SimpleReactCalendarRangeType | undefined
  >()

  if (!open) return null

  const handleSelect = (selection: Date | SimpleReactCalendarRangeType) => {
    setValue(selection)

    if (range) {
      onSelect([
        (selection as SimpleReactCalendarRangeType).start,
        (selection as SimpleReactCalendarRangeType).end
      ])
    } else {
      onSelect(selection as Date)
    }
  }

  return (
    <SimpleReactCalendar
      selected={value}
      onSelect={handleSelect}
      customRender={({ children }: CalendarProps) => {
        return <div className={classes.root}>{children}</div>
      }}
      renderDay={({
        isSelected,
        isSelectable,
        isToday,
        isMonthNext,
        isMonthPrev,
        isSelectionStart,
        isSelectionEnd,
        handleOnClick,
        handleOnEnter,
        date,
        children
      }: DayProps) => {
        return (
          <button
            className={cx(classes.day, {
              [classes.selected]: isSelected,
              [classes.selectable]: isSelectable,
              [classes.today]: isToday,
              [classes.grayed]: (isMonthPrev || isMonthNext) && !isSelected,
              [classes.startSelection]: isSelectionStart,
              [classes.endSelection]: isSelectionEnd
            })}
            onClick={handleOnClick}
            onMouseEnter={handleOnEnter}
            value={date.toString()}
            type='button'
          >
            {children}
          </button>
        )
      }}
      renderMonthHeader={({ switchMonth, activeMonth }: MonthHeaderProps) => {
        return (
          <div className={classes.actions}>
            <Button variant='flat' size='small' onClick={() => switchMonth(-1)}>
              <BackMinor16 />
            </Button>
            <Typography variant='heading' size='medium'>
              {format(activeMonth, 'MMMM y')}
            </Typography>
            <Button variant='flat' size='small' onClick={() => switchMonth(1)}>
              <ChevronMinor16 />
            </Button>
          </div>
        )
      }}
      renderDaysOfWeek={({ children }: DaysOfWeekProps) => {
        return <div className={classes.weekDays}>{children}</div>
      }}
      renderDayOfWeek={({ children }: DayOfWeekProps) => {
        return <div className={classes.weekDay}>{children}</div>
      }}
      renderWeek={({ children }: WeekProps) => {
        return <div className={classes.week}>{children}</div>
      }}
      activeMonth={activeMonth}
      mode={range ? 'range' : 'single'}
    />
  )
}

Calendar.displayName = 'Calendar'

export default Calendar
