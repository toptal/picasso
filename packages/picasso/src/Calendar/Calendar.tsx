import React, { forwardRef, ReactNode } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import {
  CalendarProps,
  MonthHeaderProps,
  WeekProps,
  DayOfWeekProps,
  DayProps,
  DaysOfWeekProps,
} from './types'
import styles from './styles'
import CalendarMonthHeader from '../CalendarMonthHeader'
import CalendarContainer from '../CalendarContainer'
import { CalendarIndicators } from '../CalendarIndicators'
import { CalendarTooltip } from '../CalendarTooltip'

type SimpleReactCalendarRangeType = {
  start: Date
  end: Date
}
export type DateOrDateRangeType = Date | DateRangeType
export type DateRangeType = [Date, Date]

export type { DayProps }

const getNormalizedValue = (value: DateOrDateRangeType | undefined) => {
  if (!value) {
    return
  }

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
  indicatedIntervals?: { start: Date; end: Date }[]
  tooltipIntervals?: { start: Date; end: Date; tooltip: string }[]
  weekStartsOn?: number
  renderMonthHeader?: (props: MonthHeaderProps) => JSX.Element | null
  renderRoot?: (props: CalendarProps) => JSX.Element
}

const isDateRange = (
  value: Date | SimpleReactCalendarRangeType
): value is SimpleReactCalendarRangeType => {
  return !(value instanceof Date) && Boolean(value.start && value.end)
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendar' })

export const Calendar = forwardRef<HTMLDivElement, Props>(function Calendar(
  props,
  ref
) {
  const classes = useStyles()
  const {
    range,
    activeMonth,
    value,
    onChange,
    minDate,
    maxDate,
    disabledIntervals,
    indicatedIntervals,
    tooltipIntervals,
    renderDay,
    weekStartsOn,
    renderRoot = rootProps => <CalendarContainer {...rootProps} />,
    renderMonthHeader = CalendarMonthHeader,
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
    <div ref={ref} {...rest} tabIndex={0}>
      <SimpleReactCalendar
        className={classes.root}
        selected={getNormalizedValue(value)}
        onSelect={handleChange}
        customRender={renderRoot}
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
            ISODate,
          } = dayProps

          const innerMarkup = (
            <button
              data-testid={`day-button-${
                isSelected ? 'selected' : getDayFormatted(date)
              }`}
              data-simple-react-calendar-day={ISODate}
              key={key}
              tabIndex={isDisabled || !isSelectable ? -1 : undefined}
              className={cx(classes.day, {
                [classes.selected]: isSelected,
                [classes.selectable]: isSelectable,
                [classes.grayed]:
                  (isMonthPrev || isMonthNext) && !isSelected && !isDisabled,
                [classes.disabled]: isDisabled || !isSelectable,
                [classes.startSelection]: isSelectionStart,
                [classes.endSelection]: isSelectionEnd,
              })}
              onClick={handleOnClick}
              onMouseEnter={handleOnEnter}
              value={date.toString()}
              type='button'
            >
              {getDayFormatted(date)}
              <div className={classes.indicators}>
                {isToday && <div className={classes.today} />}
                <CalendarIndicators
                  indicatedIntervals={indicatedIntervals}
                  date={date}
                />
              </div>
            </button>
          )

          return renderDay ? (
            renderDay({
              ...dayProps,
              children: (
                <CalendarTooltip
                  date={date}
                  tooltipIntervals={tooltipIntervals}
                >
                  {innerMarkup}
                </CalendarTooltip>
              ),
            })
          ) : (
            <CalendarTooltip date={date} tooltipIntervals={tooltipIntervals}>
              {innerMarkup}
            </CalendarTooltip>
          )
        }}
        renderMonthHeader={renderMonthHeader}
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
        activeMonth={activeMonth}
        mode={range ? 'range' : 'single'}
        minDate={minDate}
        maxDate={maxDate}
        disabledIntervals={disabledIntervals}
        getNoticeContent={() => null}
        weekStartsOn={weekStartsOn}
      />
    </div>
  )
})

Calendar.defaultProps = {
  range: false,
}

Calendar.displayName = 'Calendar'

export default Calendar
