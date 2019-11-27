import React, { useState } from 'react'
// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar'
import cx from 'classnames'
import format from 'date-fns/format'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Button, Typography } from '@toptal/picasso'
import { ChevronMinor16, BackMinor16 } from '@toptal/picasso/Icon'

import {
  CalendarProps,
  MonthHeaderProps,
  WeekProps,
  DaysOfWeekProps,
  DayOfWeekProps,
  DayProps
} from './types'
import styles from './styles'

type SimpleReactCalendarRangeType = {
  start: Date
  end: Date
}
export type DateOrDateRangeType = Date | DateRangeType
export type DateRangeType = [Date, Date]

export interface Props extends BaseProps {
  onChange: (value: DateOrDateRangeType) => void
  range?: boolean
  value?: Date
  open?: boolean
  activeMonth?: Date
}

function isDateRange(
  value: Date | SimpleReactCalendarRangeType
): value is SimpleReactCalendarRangeType {
  return !(value instanceof Date) && Boolean(value.start && value.end)
}

const useStyles = makeStyles<Theme, Props>(styles)

export const Calendar = (props: Props) => {
  const classes = useStyles(props)
  const {
    range = false,
    open = false,
    activeMonth = new Date(),
    value: initialValue,
    onChange
  } = props

  const [value, setValue] = useState<
    Date | SimpleReactCalendarRangeType | undefined
  >(initialValue)

  if (!open) return null

  const handleChange = (selection: Date | SimpleReactCalendarRangeType) => {
    setValue(selection)

    if (isDateRange(selection)) {
      const { start, end } = selection

      onChange([start, end])
    } else {
      onChange(selection)
    }
  }

  return (
    <SimpleReactCalendar
      selected={value}
      onSelect={handleChange}
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
      renderMonthHeader={({
        switchMonth,
        activeMonth: headerActiveMonth
      }: MonthHeaderProps) => {
        return (
          <div className={classes.actions}>
            <Button variant='flat' size='small' onClick={() => switchMonth(-1)}>
              <BackMinor16 />
            </Button>
            <Typography variant='heading' size='medium'>
              {format(headerActiveMonth, 'MMMM y')}
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
