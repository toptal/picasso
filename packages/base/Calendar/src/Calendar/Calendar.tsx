import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { FOCUS_RING } from '@toptal/picasso-shared'
import type { DateRange, DayProps, Matcher } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import {
  addMonths,
  format,
  isBefore,
  isEqual,
  isSameMonth,
  isWeekend,
  max,
  min,
} from 'date-fns'
import { useBreakpoint } from '@toptal/picasso-provider'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { RenderDay } from '../CalendarDay'
import { CalendarDay } from '../CalendarDay'
import type { RenderMonthHeader } from '../CalendarMonthHeader'
import { CalendarMonthHeader } from '../CalendarMonthHeader'
import CalendarContext from '../CalendarContext'
import type {
  CalendarDateRange,
  DateOrDateRangeType,
  DateRangeType,
  WeekStart,
} from './types'
import type { RenderRoot } from '../CalendarContainer'
import { CalendarContainer } from '../CalendarContainer'
import { CalendarDateSelector } from '../CalendarDateSelector'

export type CalendarMonthsAmount = 1 | 2

export interface Props
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'> {
  /** Callback invoked when date is selected */
  onChange: (value: DateOrDateRangeType) => void
  /** Callback invoked when calendar loses focus */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
  /** Minimum date that can be selected */
  minDate?: Date
  /** Maximum date that can be selected */
  maxDate?: Date
  /** Whether to use range mode */
  range?: boolean
  /** Selected date or date range */
  value?: DateOrDateRangeType
  /** Active (visible) month of the calendar that is required for manual entering of a single date */
  activeMonth?: Date
  /** Custom root renderer */
  renderRoot?: RenderRoot
  /** Custom month header renderer */
  renderMonthHeader?: RenderMonthHeader
  /** Custom day renderer */
  renderDay?: RenderDay
  /** Days to disable. e.g. Disable Sundays and Saturdays {dayOfWeek: [0, 6]} */
  disableDays?: { dayOfWeek: number[] }
  /** Intervals that should be indicated as disabled */
  disabledIntervals?: CalendarDateRange[]
  /** Intervals that should be indicated with orange dots */
  indicatedIntervals?: CalendarDateRange[]
  /** First day of the week */
  weekStartsOn?: WeekStart
  /** Whether to display footer */
  hasFooter?: boolean
  /** Number of months to display */
  numberOfMonths?: CalendarMonthsAmount
  /** Display dropdown navigation between months and years (requires minDate and maxDate to be set) */
  dropdownNavigation?: boolean
}

const getDefaultNavigationMonth = (
  value: DateOrDateRangeType | undefined,
  rangeModeIsEnabled: boolean
) =>
  value
    ? rangeModeIsEnabled
      ? (value as DateRangeType)[0]
      : (value as Date)
    : undefined

// react-day-picker hides the outside days of the months past minDate and
// maxDate; render them as disabled days instead
const CalendarDayCell = ({ day, modifiers, children, ...props }: DayProps) => (
  <td {...props}>
    {modifiers.hidden ? (
      <CalendarDay day={day} modifiers={modifiers} />
    ) : (
      children
    )}
  </td>
)

const getRootClassName = (hasFooter: boolean, className?: string) =>
  twMerge(
    'outline-hidden',
    FOCUS_RING.blue.focusVisible,
    hasFooter ? 'rounded-t-sm' : 'rounded-sm',
    className
  )

export const Calendar = forwardRef<HTMLDivElement, Props>(function Calendar(
  props,
  ref
) {
  const {
    range = false,
    activeMonth,
    value,
    onChange,
    minDate,
    maxDate,
    disabledIntervals,
    indicatedIntervals,
    renderDay,
    renderMonthHeader,
    weekStartsOn = 1,
    hasFooter = false,
    renderRoot,
    numberOfMonths = 1,
    dropdownNavigation = false,
    disableDays,
    className,
    ...rest
  } = props

  const [navigationMonth, setNavigationMonth] = useState(
    getDefaultNavigationMonth(value, range)
  )

  useEffect(() => {
    setNavigationMonth(undefined)
  }, [value])

  const [rangeValue, setRangeValue] = useState<DateRange | undefined>(
    range && value
      ? { from: (value as DateRangeType)[0], to: (value as DateRangeType)[1] }
      : undefined
  )

  const disabledIntervalsFormatted = useMemo(() => {
    return disabledIntervals?.map(interval => ({
      from: interval.start,
      to: interval.end,
    }))
  }, [disabledIntervals])

  const [rangeSelectionHoverDate, setRangeSelectionHoverDate] =
    useState<Date | null>(null)
  const isTemporaryRangeMiddle = useCallback(
    (date: Date) => {
      if (!rangeSelectionHoverDate || !rangeValue?.from || rangeValue?.to) {
        return false
      }

      return (
        (date > rangeValue.from && date < rangeSelectionHoverDate) ||
        (date < rangeValue.from && date > rangeSelectionHoverDate)
      )
    },
    [rangeSelectionHoverDate, rangeValue]
  )

  const isTemporaryRangeEnd = useCallback(
    (date: Date) => {
      if (!rangeSelectionHoverDate || !rangeValue?.from || rangeValue?.to) {
        return false
      }

      return isEqual(date, rangeSelectionHoverDate)
    },
    [rangeSelectionHoverDate, rangeValue]
  )

  const isIndicated = useCallback(
    (date: Date) =>
      (indicatedIntervals || []).some(
        ({ start, end }) => date >= start && date <= end
      ),
    [indicatedIntervals]
  )

  // A click starts a range unless one is half-picked, in which case it
  // completes it and "onChange" is called
  const handleRangeSelect = (date: Date) => {
    const rangeStart = rangeValue?.to ? undefined : rangeValue?.from

    setRangeSelectionHoverDate(null)

    if (!rangeStart) {
      setRangeValue({ from: date, to: undefined })

      return
    }

    const [from, to] = isBefore(date, rangeStart)
      ? [date, rangeStart]
      : [rangeStart, date]

    setRangeValue({ from, to })
    onChange([from, to])
  }

  const handleDaySelect = (date: Date) =>
    range ? handleRangeSelect(date) : onChange(date)

  const handleDayEnter = (date: Date) =>
    range && rangeValue?.from && setRangeSelectionHoverDate(date)

  const modifiers = useMemo(
    () => ({
      weekend: isWeekend,
      indicated: isIndicated,
      temporaryRangeMiddle: isTemporaryRangeMiddle,
      temporaryRangeEnd: isTemporaryRangeEnd,
      // react-day-picker flags no range start or end until both are picked;
      // the picked start counts as both
      rangeStart: rangeValue?.from ?? false,
      rangeEnd: rangeValue?.to ?? rangeValue?.from ?? false,
    }),
    [
      isWeekend,
      isIndicated,
      isTemporaryRangeMiddle,
      isTemporaryRangeEnd,
      rangeValue,
    ]
  )

  // startMonth and endMonth only bound the navigation, so minDate and maxDate
  // also disable the days outside them
  const disabledDays: Matcher[] = [
    ...(disabledIntervalsFormatted ?? (disableDays ? [disableDays] : [])),
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
  ]

  const selection = range
    ? { mode: 'range' as const, selected: rangeValue }
    : {
        mode: 'single' as const,
        selected: Array.isArray(value) ? undefined : value,
      }

  const mobileScreen = useBreakpoint(['xs', 'sm'])
  const shouldRenderMultipleMonths = numberOfMonths > 1 && !mobileScreen
  const visibleMonths = shouldRenderMultipleMonths ? numberOfMonths : 1
  const month = navigationMonth || activeMonth

  // react-day-picker pulls a month outside startMonth/endMonth inside them, and
  // keeps showing the last one once "month" is undefined, so widen from it
  const [shownMonth, setShownMonth] = useState(month)

  if (month && !(shownMonth && isSameMonth(month, shownMonth))) {
    setShownMonth(month)
  }

  const startMonth =
    minDate && shownMonth ? min([minDate, shownMonth]) : minDate
  const endMonth =
    maxDate && shownMonth
      ? max([maxDate, addMonths(shownMonth, visibleMonths - 1)])
      : maxDate
  const shouldDisplayDropdownNavigation =
    dropdownNavigation && minDate && maxDate

  return (
    <div
      ref={ref}
      {...rest}
      tabIndex={0}
      className={getRootClassName(hasFooter, className)}
    >
      <CalendarContext.Provider
        value={{
          onDayMouseEnter: handleDayEnter,
          onDaySelect: handleDaySelect,
          renderRoot,
          renderDay,
          renderMonthHeader,
        }}
      >
        <CalendarContainer
          hasFooter={hasFooter}
          isFlexible={shouldRenderMultipleMonths}
        >
          <DayPicker
            {...selection}
            // Selection goes through CalendarDay; react-day-picker needs
            // onSelect to keep "selected" controlled
            onSelect={() => {}}
            showOutsideDays
            hideNavigation
            month={month}
            startMonth={startMonth}
            onMonthChange={setNavigationMonth}
            endMonth={endMonth}
            numberOfMonths={visibleMonths}
            disabled={disabledDays}
            weekStartsOn={weekStartsOn}
            formatters={{ formatWeekdayName: date => format(date, 'EEE') }}
            modifiers={modifiers}
            captionLayout={
              shouldDisplayDropdownNavigation ? 'dropdown' : undefined
            }
            components={{
              ...(!shouldDisplayDropdownNavigation && {
                MonthCaption: CalendarMonthHeader,
              }),
              Day: CalendarDayCell,
              DayButton: CalendarDay,
              Dropdown: CalendarDateSelector,
            }}
            classNames={{
              months: shouldRenderMultipleMonths ? 'flex gap-6' : undefined,
              dropdowns: 'flex gap-4 pb-4',
              month_grid: 'flex flex-col border-spacing-0',
              weekdays:
                'flex text-center uppercase text-xxs pt-[3px] pb-[11px] text-gray-600',
              weekday: 'p-0 basis-[15%] w-40 font-regular',
              week: 'flex',
              day: 'p-0 basis-[15%]',
            }}
            // Keeping the legacy classname as it is heavily used as a locator in tests
            className='calendar-month'
          />
        </CalendarContainer>
      </CalendarContext.Provider>
    </div>
  )
})

Calendar.displayName = 'Calendar'

export default Calendar
