import React, {
  useState,
  useRef,
  KeyboardEvent,
  useLayoutEffect,
  ReactNode
} from 'react'
import formatDate from 'date-fns/format'
import isValid from 'date-fns/isValid'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Input, Form, InputAdornment } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'
import { Calendar16 } from '@toptal/picasso/Icon'
import { ClickAwayListener } from '@toptal/picasso/utils'

import Calendar, { DateOrDateRangeType, DateRangeType } from '../Calendar'

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'value'
      | 'onSelect'
      | 'type'
      | 'autoComplete'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'onChange'
    > {
  /** Date that will be selected in Datepicker */
  value?: DateOrDateRangeType
  /** Method that will be invoked with selected values */
  onChange: (value: DateOrDateRangeType) => void
  /** Invoked when user goes away from Datepicker input */
  onBlur?: () => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Whether calendar should be closed after date selection. True by default */
  hideOnSelect?: boolean
  /** Date format that user will see in the input */
  displayDateFormat?: string
  /** Date format that user will see during manual input */
  editDateFormat?: string
  /** Specify icon which should be rendered inside DatePicker */
  icon?: ReactNode
}

function isDateRange(value: DateOrDateRangeType): value is DateRangeType {
  return Array.isArray(value)
}

const formatDateRange = (dates: DateRangeType, format: string) =>
  dates.map(date => formatDate(date, format)).join(' - ')

// eslint-disable-next-line
const formatValue = (value: DateOrDateRangeType, format: string) => {
  if (isDateRange(value)) {
    return formatDateRange(value, format)
  } else {
    return formatDate(value, format)
  }
}

const DEFAULT_DISPLAY_DATE_FORMAT = 'MMM d, yyyy'
const DEFAULT_EDIT_DATE_FORMAT = 'MM-dd-yyyy'
const EMPTY_INPUT_VALUE = ''

const isDateValid = (date: string, pattern: string) => {
  return date.length === pattern.length && isValid(new Date(date))
}

export const DatePicker = ({
  range,
  hideOnSelect,
  displayDateFormat,
  editDateFormat,
  onBlur,
  onChange,
  value,
  width,
  icon,
  ...rest
}: Props) => {
  const inputProps = rest
  const errorMessage = `Entered date is invalid, please, check the format "${editDateFormat!.toLowerCase()}"`

  const [calendarIsShown, setCalendarIsShown] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  const hideCalendar = () => setCalendarIsShown(false)
  const showCalendar = () => setCalendarIsShown(true)

  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (!value) return

    if (range) {
      setInputValue(formatDateRange(value as DateRangeType, displayDateFormat!))
      return
    }

    if (isInputFocused) {
      setInputValue(formatDate(value as Date, editDateFormat!))
    } else {
      setInputValue(formatDate(value as Date, displayDateFormat!))
    }
  }, [value, isInputFocused])

  const handleInputBlur = () => {
    hideCalendar()

    if (isInputFocused) {
      onBlur!()
    }

    if (error) {
      setShowError(true)
    } else {
      setIsInputFocused(false)
    }
  }

  const resetError = () => {
    setError('')
    setShowError(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    // TODO: change this if manual entering of range is needed
    if (range) return

    const nextInputValue = e.target.value

    // TODO: add char filtering (only number , `-` or ` ` allowed)
    setInputValue(nextInputValue)

    if (isDateValid(nextInputValue, editDateFormat!)) {
      onChange(new Date(nextInputValue))

      resetError()
    } else {
      setError(errorMessage)
    }
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
    showCalendar()
  }

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }

    setIsInputFocused(true)
  }

  const handleCalendarChange = (value: DateOrDateRangeType) => {
    onChange(value)

    if (hideOnSelect) {
      focus()
      hideCalendar()
    }

    if (error) {
      resetError()
    }
  }

  const handleClickAway = () => {
    handleInputBlur()
  }

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key

    if (key === 'Escape') {
      hideCalendar()
      return
    }

    if (key === 'Tab') {
      handleInputBlur()
    }
  }

  const handleInputClick = () => {
    if (!calendarIsShown) {
      showCalendar()
    }
  }

  const startAdornment = (
    <InputAdornment position='start' disablePointerEvents>
      {icon || <Calendar16 />}
    </InputAdornment>
  )

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container inline={width !== 'full'}>
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
          ref={inputRef}
          error={showError}
          onKeyDown={handleInputKeydown}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          value={inputValue}
          onChange={handleInputChange}
          startAdornment={startAdornment}
        />

        {showError && <Form.Error>{error}</Form.Error>}

        {calendarIsShown && (
          <Calendar
            range={range}
            value={value}
            onChange={handleCalendarChange}
          />
        )}
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {
  range: false,
  hideOnSelect: true,
  onBlur: () => {},
  editDateFormat: DEFAULT_EDIT_DATE_FORMAT,
  displayDateFormat: DEFAULT_DISPLAY_DATE_FORMAT
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
