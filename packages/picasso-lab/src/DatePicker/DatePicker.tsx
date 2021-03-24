/* eslint-disable complexity, max-statements */ // Squiggly lines makes code difficult to work with

import React, {
  useState,
  useRef,
  KeyboardEvent,
  ReactNode,
  useLayoutEffect,
  useCallback
} from 'react'
import PopperJs from 'popper.js'
import formatDate from 'date-fns/format'
import parse from 'date-fns/parse'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Input, InputAdornment, InputProps } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import { Calendar16 } from '@toptal/picasso/Icon'
import { noop } from '@toptal/picasso/utils'

import Calendar, {
  DateOrDateRangeType,
  DateRangeType,
  DayProps
} from '../Calendar'
import styles from './styles'
import {
  formatDateRange,
  timezoneConvert,
  isDateValid,
  timezoneFormat,
  isDateWithinInterval
} from './utils'

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'value'
      | 'onSelect'
      | 'type'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'onChange'
    > {
  /** Date that will be selected in Datepicker */
  value?: DateOrDateRangeType | null
  /** Method that will be invoked with selected values */
  onChange: (value: DateOrDateRangeType | null) => void
  /** Invoked when user goes away from Datepicker input */
  onBlur?: () => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Earliest date available for selection */
  minDate?: Date
  /** Latest date available for selection */
  maxDate?: Date
  /** Whether calendar should be closed after date selection. True by default */
  hideOnSelect?: boolean
  /** Date format that user will see in the input */
  displayDateFormat?: string
  /** Date range where selection is not allowed */
  disabledIntervals?: { start: Date; end: Date }[]
  /** Date format that user will see during manual input */
  editDateFormat?: string
  /** Specify icon which should be rendered inside DatePicker */
  icon?: ReactNode
  /** Specify a value if want to enable browser autofill */
  autoComplete?: string
  /** Indicate whether `DatePicker`'s input is in error state */
  error?: boolean
  /** Function to override default markup to show Date */
  renderDay?: (args: DayProps) => ReactNode
  popperContainer?: HTMLElement
  /** Index of the first day of the week (0 - Sunday). Default is 1 - Monday */
  weekStartsOn?: number
  /** IANA timezone to display and edit date(s) */
  timezone?: string
}

const EMPTY_INPUT_VALUE = ''

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDatePicker'
})

export const DatePicker = (props: Props) => {
  const {
    range,
    hideOnSelect,
    displayDateFormat = 'MMM d, yyyy',
    editDateFormat = 'MM-dd-yyyy',
    onBlur = noop,
    onChange,
    value,
    width,
    icon,
    minDate,
    maxDate,
    disabledIntervals,
    popperContainer,
    renderDay,
    weekStartsOn,
    timezone,
    size,
    ...rest
  } = props
  const classes = useStyles()

  const inputProps = rest

  const [calendarIsShown, setCalendarIsShown] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)
  const [
    calendarValue,
    setCalendarValue
  ] = useState<DateOrDateRangeType | null>(null)

  const hideCalendar = () => setCalendarIsShown(false)
  const showCalendar = () => setCalendarIsShown(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const popperRef = useRef<PopperJs>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputWrapperRef = useRef<HTMLDivElement>(null)

  // Format the input based on its 'focus' state
  const formatInputValue = useCallback(
    (valueToFormat: DateOrDateRangeType) => {
      return Array.isArray(valueToFormat)
        ? formatDateRange(valueToFormat as DateRangeType, displayDateFormat)
        : formatDate(
            valueToFormat as Date,
            isInputFocused ? editDateFormat : displayDateFormat
          )
    },
    [isInputFocused, editDateFormat, displayDateFormat]
  )

  // Keep the input format in sync with its 'focus' state
  useLayoutEffect(() => {
    setInputValue(() => {
      if (!value) {
        return EMPTY_INPUT_VALUE
      }

      return formatInputValue(timezoneConvert(value, timezone))
    })
  }, [value, timezone, formatInputValue])

  // Keep the calendar in sync with the input value
  useLayoutEffect(() => {
    setCalendarValue(() => {
      if (!value) {
        return null
      }

      return timezoneConvert(value, timezone)
    })
  }, [value, timezone])

  const isInsideDatePicker = (node: Node) => {
    return (
      popperRef.current?.popper.contains(node) ||
      inputWrapperRef.current?.contains(node)
    )
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const isFocusedInsideDatePicker = isInsideDatePicker(
      (event.relatedTarget || document.activeElement) as Node
    )

    if (isFocusedInsideDatePicker) {
      return
    }

    hideCalendar()
    onBlur()

    setIsInputFocused(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    // TODO: change this if manual entering of range is needed
    if (range) {
      return
    }

    const nextValue = e.target.value

    // TODO: add char filtering (only number , `-` or ` ` allowed)
    setInputValue(nextValue)

    if (!nextValue) {
      onChange(null)
    } else if (isDateValid(nextValue, editDateFormat)) {
      const parsedNextValue = parse(nextValue, editDateFormat, new Date())
      const nextTimezoneValue = timezoneFormat(parsedNextValue, timezone)

      if (!isDateWithinInterval(nextTimezoneValue, minDate, maxDate)) {
        return
      }

      onChange(nextTimezoneValue)
    }
  }

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleCalendarChange = (nextValue: DateOrDateRangeType) => {
    const nextTimezoneValue = Array.isArray(nextValue)
      ? (nextValue.map((date: Date) =>
          timezoneFormat(date, timezone)
        ) as DateRangeType)
      : timezoneFormat(nextValue, timezone)

    onChange(nextTimezoneValue)
    setCalendarValue(nextTimezoneValue)

    if (hideOnSelect) {
      focus()
      hideCalendar()
    }
  }

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key

    if (key === 'Escape') {
      hideCalendar()
      event.currentTarget.blur()

      return
    }

    if (key === 'Enter') {
      if (!calendarIsShown) {
        showCalendar()
      } else {
        hideCalendar()
      }

      return
    }

    if (key === 'Tab' && calendarIsShown) {
      event.preventDefault()
      event.stopPropagation()

      if (!calendarIsShown) {
        event.currentTarget.blur()
      } else {
        // TODO: Manage this whole logic inside simple-react-calendar
        const firstButton = calendarRef.current?.querySelector<
          HTMLButtonElement
        >('button:not([tabindex="-1"])')

        if (firstButton) {
          firstButton.focus()
        }
      }
    }
  }

  const handleFocusOrClick = () => {
    showCalendar()
    setIsInputFocused(true)
  }

  const startAdornment =
    size !== 'small' ? (
      <InputAdornment position='start' disablePointerEvents>
        {icon || <Calendar16 />}
      </InputAdornment>
    ) : undefined

  return (
    <>
      <Container inline={width !== 'full'} ref={inputWrapperRef}>
        <Input
          {...inputProps}
          ref={inputRef}
          onKeyDown={handleInputKeydown}
          onClick={handleFocusOrClick}
          onFocus={handleFocusOrClick}
          onBlur={handleBlur}
          value={inputValue}
          onChange={handleInputChange}
          size={size}
          startAdornment={startAdornment}
          width={width}
        />
      </Container>
      {inputWrapperRef.current && (
        <Popper
          placement='bottom-start'
          open={calendarIsShown}
          anchorEl={inputWrapperRef.current}
          autoWidth={false}
          enableCompactMode
          container={popperContainer}
          ref={popperRef}
        >
          <Calendar
            data-testid='calendar'
            ref={calendarRef}
            range={range}
            value={calendarValue ?? undefined}
            minDate={minDate}
            maxDate={maxDate}
            disabledIntervals={disabledIntervals}
            renderDay={renderDay}
            onChange={handleCalendarChange}
            onBlur={handleBlur}
            className={classes.calendar}
            weekStartsOn={weekStartsOn}
          />
        </Popper>
      )}
    </>
  )
}

DatePicker.defaultProps = {
  range: false,
  hideOnSelect: true,
  onBlur: noop,
  editDateFormat: 'MM-dd-yyyy',
  displayDateFormat: 'MMM d, yyyy',
  autoComplete: 'off'
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
