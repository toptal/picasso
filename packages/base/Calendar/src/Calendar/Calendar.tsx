import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import type {
  SelectRangeEventHandler,
  SelectSingleEventHandler,
  DateRange,
} from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import isWeekend from 'date-fns/isWeekend'
import { format, isEqual } from 'date-fns'
import { useBreakpoint } from '@toptal/picasso-provider'

import styles from './styles'
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
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendar' })

const getDefaultNavigationMonth = (
  value: DateOrDateRangeType | undefined,
  rangeModeIsEnabled: boolean
) =>
  value
    ? rangeModeIsEnabled
      ? (value as DateRangeType)[0]
      : (value as Date)
    : undefined

export const Calendar = forwardRef<HTMLDivElement, Props>(function Calendar(
  props,
  ref
) {
  const classes = useStyles()
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

  const handleSingleDateChange: SelectSingleEventHandler = date =>
    date && onChange(date)

  // "handleRangeChange" is fired in two cases – either the range start or the range end is set
  // The handler needs to distinguish both cases to enable specific modifiers and call "onChange"
  // handler (if it is applicable when both range start and end are set)
  const handleRangeChange: SelectRangeEventHandler = (
    range,
    selectedDay,
    { range_middle: isRangeMiddle }
  ) => {
    const currentRangeExists = Boolean(rangeValue?.from && rangeValue?.to)

    if (isRangeMiddle || currentRangeExists) {
      setRangeValue({
        from: selectedDay,
        to: undefined,
      })
    } else {
      setRangeSelectionHoverDate(null)
      setRangeValue({
        from: range?.from,
        to: range?.to,
      })

      if (range?.from && range?.to) {
        onChange([range.from, range.to])
      }
    }
  }

  const handleDayEnter = (date: Date) =>
    range && rangeValue?.from && setRangeSelectionHoverDate(date)

  const modifiers = useMemo(
    () => ({
      weekend: isWeekend,
      indicated: isIndicated,
      temporaryRangeMiddle: isTemporaryRangeMiddle,
      temporaryRangeEnd: isTemporaryRangeEnd,
    }),
    [isWeekend, isIndicated, isTemporaryRangeMiddle, isTemporaryRangeEnd]
  )

  const mobileScreen = useBreakpoint(['xs', 'sm'])
  const shouldRenderMultipleMonths = numberOfMonths > 1 && !mobileScreen

  return (
    <div ref={ref} {...rest} tabIndex={0}>
      <CalendarContext.Provider
        value={{
          onDayMouseEnter: handleDayEnter,
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
            required
            showOutsideDays
            month={navigationMonth || activeMonth}
            mode={range ? 'range' : 'single'}
            selected={range ? rangeValue : value}
            // Moving mode-dependent props to a separate object to satisfy TypeScript breaks
            // the change detection, so error is ignored
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSelect={range ? handleRangeChange : handleSingleDateChange}
            fromDate={minDate}
            onMonthChange={month => setNavigationMonth(month)}
            toDate={maxDate}
            numberOfMonths={shouldRenderMultipleMonths ? numberOfMonths : 1}
            disabled={disabledIntervalsFormatted}
            weekStartsOn={weekStartsOn}
            formatters={{ formatWeekdayName: date => format(date, 'EEE') }}
            modifiers={modifiers}
            components={{
              Caption: CalendarMonthHeader,
              Day: CalendarDay,
            }}
            classNames={{
              months: shouldRenderMultipleMonths ? classes.months : undefined,
              head: classes.head,
              table: classes.table,
              head_row: classes.head_row,
              head_cell: classes.head_cell,
              row: classes.row,
              cell: classes.cell,
              vhidden: classes.vhidden,
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
