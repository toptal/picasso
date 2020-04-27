import React, { forwardRef, ReactNode } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
  DayOfWeekProps,
  DayProps,
  DaysOfWeekProps
} from './types'
import styles from './styles'

type SimpleReactCalendarRangeType = {
  start: Date
  end: Date
}
export type DateOrDateRangeType = Date | DateRangeType
export type DateRangeType = [Date, Date]

export { DayProps }

const getNormalizedValue = (value: DateOrDateRangeType | undefined) => {
  if (!value) return

  if (value instanceof Date) {
    return value
  }

  const [start, end] = value

  return { start, end }
}

export interface Props
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'> {
  onChange: (value: DateOrDateRangeType) => void
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
  renderDay?: (args: DayProps) => ReactNode
  minDate?: Date
  maxDate?: Date
  range?: boolean
  value?: DateOrDateRangeType
  activeMonth?: Date
  disabledIntervals?: { start: Date; end: Date }[]
}

function isDateRange(
  value: Date | SimpleReactCalendarRangeType
): value is SimpleReactCalendarRangeType {
  return !(value instanceof Date) && Boolean(value.start && value.end)
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoCalendar' })

export const Calendar = forwardRef<HTMLDivElement, Props>(function Calendar(
  props,
  ref
) {
  const classes = useStyles(props)
  const {
    range,
    activeMonth,
    value,
    onChange,
    minDate,
    maxDate,
    disabledIntervals,
    onBlur,
    renderDay,
    ...rest
  } = props

  const handleChange = (selection: Date | SimpleReactCalendarRangeType) => {
    if (isDateRange(selection)) {
      const { start, end } = selection

      onChange([start, end])
    } else {
      onChange(selection)
    }
  }

  return (
    <div {...rest} ref={ref} onBlur={onBlur}>
      <SimpleReactCalendar
        selected={getNormalizedValue(value)}
        onSelect={handleChange}
        customRender={({ children }: CalendarProps) => {
          return <div className={classes.root}>{children}</div>
        }}
        renderDay={(dayProps: DayProps) => {
          const {
            key,
            isDisabled,
            isSelected,
            isSelectable,
            isToday,
            isMonthNext,
            isMonthPrev,
            isSelectionStart,
            isSelectionEnd,
            handleOnClick,
            handleOnEnter,
            getDayFormatted,
            date,
            ISODate
          } = dayProps

          const defaultMarkup = (
            <button
              data-simple-react-calendar-day={ISODate}
              key={key}
              className={cx(classes.day, {
                [classes.selected]: isSelected,
                [classes.selectable]: isSelectable,
                [classes.today]: isToday,
                [classes.grayed]:
                  (isMonthPrev || isMonthNext) && !isSelected && !isDisabled,
                [classes.disabled]: isDisabled || !isSelectable,
                [classes.startSelection]: isSelectionStart,
                [classes.endSelection]: isSelectionEnd
              })}
              onClick={handleOnClick}
              onMouseEnter={handleOnEnter}
              value={date.toString()}
              tabIndex={-1}
              type='button'
            >
              {getDayFormatted(date)}
            </button>
          )

          return renderDay
            ? renderDay({
                ...dayProps,
                children: defaultMarkup
              })
            : defaultMarkup
        }}
        renderMonthHeader={({
          switchMonth,
          activeMonth: headerActiveMonth
        }: MonthHeaderProps) => {
          return (
            <div className={classes.actions}>
              <Button
                tabIndex={-1}
                variant='flat'
                size='small'
                onClick={() => switchMonth(-1)}
              >
                <BackMinor16 />
              </Button>
              <Typography variant='heading' size='medium'>
                {format(headerActiveMonth, 'MMMM y')}
              </Typography>
              <Button
                tabIndex={-1}
                variant='flat'
                size='small'
                onClick={() => switchMonth(1)}
              >
                <ChevronMinor16 />
              </Button>
            </div>
          )
        }}
        renderDaysOfWeek={({ children }: DaysOfWeekProps) => {
          return <div className={classes.weekDays}>{children}</div>
        }}
        renderDayOfWeek={({ day, key }: DayOfWeekProps) => {
          return (
            <div key={key} className={classes.weekDay}>
              {day}
            </div>
          )
        }}
        renderWeek={({ children }: WeekProps) => {
          return <div className={classes.week}>{children}</div>
        }}
        activeMonth={activeMonth || value}
        mode={range ? 'range' : 'single'}
        minDate={minDate}
        maxDate={maxDate}
        disabledIntervals={disabledIntervals}
      />
    </div>
  )
})

Calendar.defaultProps = {
  onBlur: () => {},
  range: false
}

Calendar.displayName = 'Calendar'

export default Calendar
