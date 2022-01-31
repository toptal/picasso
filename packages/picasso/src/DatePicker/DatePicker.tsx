/* eslint-disable max-lines-per-function, max-lines */
/* eslint-disable complexity, max-statements */ // Squiggly lines makes code difficult to work with
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Calendar16 } from '@toptal/picasso/Icon'
import formatDate from 'date-fns/format'
import PopperJs from 'popper.js'
import React, {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import Popper from '../Popper'
import Container from '../Container'
import Input, { InputProps } from '../Input'
import InputAdornment from '../InputAdornment'
import { noop } from '../utils'
import Calendar, {
  DateOrDateRangeType,
  DateRangeType,
  DayProps
} from '../Calendar'
import {
  DEFAULT_DATE_PICKER_DISPLAY_DATE_FORMAT,
  DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT,
  DEFAULT_POPPER_OPTIONS
} from './constants'
import styles from './styles'
import { DatePickerValue, DatePickerInputCustomValueParser } from './types'
import {
  formatDateRange,
  datePickerParseDateString,
  timezoneConvert,
  timezoneFormat,
  getStartOfTheDayDate
} from './utils'

const EMPTY_INPUT_VALUE = ''

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDatePicker'
})

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
      | 'testIds'
    > {
  /** Date that will be selected in `DatePicker` */
  value?: DatePickerValue
  /** Method that will be invoked with selected values */
  onChange: (value: DatePickerValue) => void
  /** Invoked when user goes away from `DatePicker` input */
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
  /** Specify icon which should be rendered inside `DatePicker` */
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
  /** Custom parser for `DatePicker`'s input value to process custom input value, like, human-readable dates */
  parseInputValue?: DatePickerInputCustomValueParser
  testIds?: InputProps['testIds'] & {
    calendar?: string
    input?: string
  }
}

export const DatePicker = (props: Props) => {
  const {
    range,
    hideOnSelect,
    displayDateFormat = DEFAULT_DATE_PICKER_DISPLAY_DATE_FORMAT,
    editDateFormat = DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT,
    onBlur = noop,
    onChange,
    onResetClick,
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
    parseInputValue,
    testIds,
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

  const [normalizedMinDate, normalizedMaxDate] = useMemo(() => {
    return [getStartOfTheDayDate(minDate), getStartOfTheDayDate(maxDate)]
  }, [minDate, maxDate])

  const hideCalendar = () => setCalendarIsShown(false)
  const showCalendar = () => setCalendarIsShown(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const popperRef = useRef<PopperJs>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputWrapperRef = useRef<HTMLDivElement>(null)

  // Active (visible) month of the calendar that required for manual entering of
  // a single date
  const activeMonth = calendarValue instanceof Date ? calendarValue : undefined

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

  const updateInputValue = useCallback(
    ({ preventUpdateOnFocus }: { preventUpdateOnFocus?: boolean }) => {
      if (preventUpdateOnFocus && isInputFocused) {
        return
      }

      setInputValue(() => {
        if (!value) {
          return EMPTY_INPUT_VALUE
        }

        return formatInputValue(timezoneConvert(value, timezone))
      })
    },
    [value, isInputFocused, timezone, formatInputValue]
  )

  // Keep the input value in sync with date value update
  // Updating on incoming date value or timezone change
  // Should not update when input is focused to prevent overriding it's value
  useLayoutEffect(() => {
    updateInputValue({ preventUpdateOnFocus: true })
  }, [value, timezone])

  // Keep the input format in sync with its 'focus' state
  // Updating on input focus state change
  useLayoutEffect(() => {
    updateInputValue({ preventUpdateOnFocus: false })
  }, [isInputFocused])

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
    const nextValue = e.target.value

    // TODO: change this if manual entering of range is needed
    if (range && nextValue) {
      return
    }

    // TODO: add char filtering (only number , `-` or ` ` allowed) in case if `parseInputValue` is not set
    setInputValue(nextValue)

    if (!nextValue) {
      return onChange(null)
    }

    const parsedInputDate = datePickerParseDateString(nextValue, {
      customParser: parseInputValue,
      dateFormat: editDateFormat,
      timezone,
      minDate: normalizedMinDate,
      maxDate: normalizedMaxDate
    })

    if (parsedInputDate) {
      onChange(parsedInputDate)
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
    setInputValue(formatInputValue(nextValue))
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
        const firstButton = calendarRef.current?.querySelector<HTMLButtonElement>(
          'button:not([tabindex="-1"])'
        )

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

  const handleResetClick = (
    event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    setInputValue(EMPTY_INPUT_VALUE)
    onResetClick?.(event)
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
          onResetClick={handleResetClick}
          value={inputValue}
          onChange={handleInputChange}
          size={size}
          startAdornment={startAdornment}
          width={width}
          testIds={testIds}
          data-testid={testIds?.input}
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
          popperOptions={DEFAULT_POPPER_OPTIONS}
          ref={popperRef}
        >
          <Calendar
            activeMonth={activeMonth}
            data-testid={testIds?.calendar}
            ref={calendarRef}
            range={range}
            value={calendarValue ?? undefined}
            minDate={normalizedMinDate}
            maxDate={normalizedMaxDate}
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
