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

import styles from './styles'
import type { RenderDay } from '../CalendarDay'
import CalendarDay from '../CalendarDay'
import type { RenderMonthHeader } from '../CalendarMonthHeader'
import CalendarMonthHeader from '../CalendarMonthHeader'
import CalendarContext from '../CalendarContext'
import type {
  CalendarDateRange,
  CalendarProps,
  DateOrDateRangeType,
  DateRangeType,
  WeekStart,
} from './types'
import CalendarContainer from '../CalendarContainer'

export interface Props
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'> {
  onChange: (value: DateOrDateRangeType) => void
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
  minDate?: Date
  maxDate?: Date
  range?: boolean
  value?: DateOrDateRangeType
  activeMonth?: Date
  renderRoot?: (props: CalendarProps) => JSX.Element
  renderMonthHeader?: RenderMonthHeader
  renderDay?: RenderDay
  disabledIntervals?: CalendarDateRange[]
  indicatedIntervals?: CalendarDateRange[]
  weekStartsOn?: WeekStart
  hasFooter?: boolean
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
    renderDay,
    renderMonthHeader,
    weekStartsOn,
    hasFooter = false,
    renderRoot: RenderRoot = rootProps => (
      <CalendarContainer {...rootProps} hasFooter={hasFooter} />
    ),
    ...rest
  } = props

  const [navigationMonth, setNavigationMonth] = useState<Date | undefined>()

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

  return (
    <div ref={ref} {...rest} tabIndex={0}>
      <RenderRoot hasFooter={hasFooter}>
        <CalendarContext.Provider
          value={{
            onDayMouseEnter: handleDayEnter,
            renderDay,
            renderMonthHeader,
          }}
        >
          <DayPicker
            required
            showOutsideDays
            month={navigationMonth || activeMonth}
            mode={range ? 'range' : 'single'}
            selected={range ? rangeValue : value}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSelect={range ? handleRangeChange : handleSingleDateChange}
            fromDate={minDate}
            onMonthChange={month => setNavigationMonth(month)}
            toDate={maxDate}
            disabled={disabledIntervalsFormatted}
            weekStartsOn={weekStartsOn}
            formatters={{ formatWeekdayName: date => format(date, 'EEE') }}
            modifiers={{
              weekend: isWeekend,
              indicated: isIndicated,
              temporaryRangeMiddle: isTemporaryRangeMiddle,
              temporaryRangeEnd: isTemporaryRangeEnd,
            }}
            components={{
              Caption: CalendarMonthHeader,
              Day: CalendarDay,
            }}
            classNames={{
              head: classes.head,
              head_row: classes.head_row,
              head_cell: classes.head_cell,
              row: classes.row,
              cell: classes.cell,
              vhidden: classes.vhidden,
            }}
          />
        </CalendarContext.Provider>
      </RenderRoot>
    </div>
  )
})

Calendar.defaultProps = {
  range: false,
  weekStartsOn: 1,
}

Calendar.displayName = 'Calendar'

export default Calendar
