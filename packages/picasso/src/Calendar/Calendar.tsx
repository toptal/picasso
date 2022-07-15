import React, {forwardRef, ReactNode, useMemo, useRef, useState} from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import SimpleReactCalendar from 'simple-react-calendar'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import {
  DayPicker,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
  Matcher,
  DateRange,
  DayProps,
  useDayRender,
  Button, useDayPicker,
  InternalModifier, CaptionProps, CaptionLabel, useNavigation
} from 'react-day-picker';
const {
  Selected,
  Disabled,
  Hidden,
  Today,
  RangeEnd,
  RangeMiddle,
  RangeStart,
  Outside
} = InternalModifier;
// import 'react-day-picker/dist/style.css';
import {
  CalendarProps,
  MonthHeaderProps,
  WeekProps,
  DayOfWeekProps,
  DaysOfWeekProps,
} from './types'
import styles from './styles-react-day-picker'
import CalendarMonthHeader from '../CalendarMonthHeader'
import CalendarContainer from '../CalendarContainer'
import isSameMonth from "date-fns/isSameMonth";
import ButtonCircular from "../ButtonCircular/ButtonCircular";
import {BackMinor24, ChevronMinor24} from "@toptal/picasso/Icon";
import Typography from "@toptal/picasso/Typography";
import {format} from "date-fns";
import Container from "../Container/Container";

type SimpleReactCalendarRangeType = {
  start: Date
  end: Date
}
export type DateOrDateRangeType = Date | DateRangeType
export type DateRangeType = [Date, Date]


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
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  renderMonthHeader?: (props: MonthHeaderProps) => JSX.Element | null
  renderRoot?: (props: CalendarProps) => JSX.Element
  hasFooter?: boolean
}

const isDateRange = (
  value: Date | SimpleReactCalendarRangeType
): value is SimpleReactCalendarRangeType => {
  return !(value instanceof Date) && Boolean(value.start && value.end)
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendar' })

const CustomCaption = (props: CaptionProps) => {
  const { formatters: { formatCaption }, locale, classNames, disableNavigation, styles, captionLayout, components, numberOfMonths, onMonthChange, dir, labels: { labelPrevious, labelNext }, } = useDayPicker()

  if (disableNavigation) {
    return (
      <div className={classNames.caption} style={styles.caption}>
        <Typography variant='heading' size='medium' aria-live="polite" aria-atomic="true">
          {formatCaption(props.displayMonth, { locale })}
        </Typography>
      </div>
    )
  }

  const { previousMonth, nextMonth, goToMonth, displayMonths } = useNavigation()
  const displayIndex = displayMonths.findIndex((month) => isSameMonth(props.displayMonth, month))

  let isFirst = displayIndex === 0
  let isLast = displayIndex === displayMonths.length - 1
  if (dir === 'rtl') {
    [isLast, isFirst] = [isFirst, isLast];
  }

  const hideNext = numberOfMonths > 1 && (isFirst || !isLast);
  const hidePrevious = numberOfMonths > 1 && (isLast || !isFirst);

  const handlePreviousClick: React.MouseEventHandler = () => {
    if (!previousMonth) return;
    goToMonth(previousMonth);
    onMonthChange?.(previousMonth);
  };

  const handleNextClick: React.MouseEventHandler = () => {
    if (!nextMonth) return;
    goToMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  return (
    <Container flex justifyContent='space-between' bottom='medium'>
      {!hidePrevious && (
        <ButtonCircular
          title='Previous month'
          aria-label='Previous month'
          variant='flat'
          icon={<BackMinor24 />}
          onClick={handlePreviousClick}
        />
      )}
      <Typography variant='heading' size='medium' aria-live="polite" aria-atomic="true">
        {formatCaption(props.displayMonth, { locale })}
      </Typography>
      {!hideNext && (
        <ButtonCircular
          title='Next month'
          aria-label='Next month'
          variant='flat'
          icon={<ChevronMinor24 />}
          onClick={handleNextClick}
        />
      )}
    </Container>
  )
}

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
    weekStartsOn,
    hasFooter,
    renderRoot = rootProps => (
      <CalendarContainer {...rootProps} hasFooter={hasFooter} />
    ),
    renderMonthHeader = CalendarMonthHeader,
    ...rest
  } = props

  const handleSingleChange: SelectSingleEventHandler = (date, selectedData, modifiers) => {
    date && onChange(date)
  }

  // @todo we have to partually implement range selection
  const initialRangeValue: DateRangeType | undefined = range ? value as DateRangeType : undefined
  const [rangeValue, setRangeValue] = useState<DateRange | undefined>(initialRangeValue ? {from: initialRangeValue[0], to: initialRangeValue[1]} : undefined);

  const handleRangeChange: SelectRangeEventHandler = (range) => {
    if (rangeValue?.from && rangeValue?.to) {
      setRangeValue({
        from: range?.from,
        to: undefined
      })
    } else if (rangeValue?.from && range?.to) {
      setRangeValue(range)
      onChange([rangeValue.from, range.to])
    } else {
      setRangeValue(range)
    }
  }

  // test disabled intervals. Coz the format is quite different we need to convert to another format
  const disabled = useMemo(() => {
    return disabledIntervals?.map((interval) => ({
      from: interval.start,
      to: interval.end
    }))
  }, [disabledIntervals])

  console.log('rest: ', rest)

  return (
    <div ref={ref} {...rest} tabIndex={0}>
      <DayPicker
        required
        mode={range ? 'range' : 'single'}
        // className={classes.root}
        selected={range ? rangeValue : value}
        // @ts-ignore
        onSelect={range ? handleRangeChange : handleSingleChange}
        fromDate={minDate}
        toDate={maxDate}
        disabled={disabled}
        weekStartsOn={weekStartsOn}
        components={{
          Caption: CustomCaption
        }}
        classNames={{
          root: classes.root,
          vhidden: classes.vhidden,
          day: classes.day,
          button: classes.button,
          table: classes.table,
          head: classes.head,
          head_row: classes.head_row,
          head_cell: classes.head_cell,
          row: classes.row,
          cell: classes.cell,
        }}
        modifiersClassNames={{
          [Selected]: classes.selected,
          [Disabled]: classes.disabled,
          // @todo
          // [Hidden]: undefined,
          [Today]: classes.today,
          [RangeEnd]: classes.endSelection,
          [RangeMiddle]: classes.selectable,
          [RangeStart]: classes.startSelection,
          // @todo
          // [Outside]: undefined
        }}
      />
    </div>
  )
})

Calendar.defaultProps = {
  range: false,
}

Calendar.displayName = 'Calendar'

export default Calendar
