import React, { useState, useRef, KeyboardEvent, useLayoutEffect } from 'react'
import formatDate from 'date-fns/format'
import isValid from 'date-fns/isValid'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Input, Form } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'
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
  value: DateOrDateRangeType
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

const DEFAULT_DATE_FORMAT = 'MMM d, yyyy'
const DEFAULT_RAW_DATE_FORMAT = 'MM-dd-yyyy'
const EMPTY_INPUT_VALUE = ''

// 2) fix range mode
// 3) update examples

export const DatePicker = ({
  // TODO: fix range variant
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  range,
  hideOnSelect,
  displayDateFormat,
  editDateFormat,
  onBlur,
  onChange,
  value,
  width,
  ...rest
}: Props) => {
  // TODO: fix range mode
  const inputProps = rest
  const errorMessae = `Entered date is invalid, please, check the format "${editDateFormat!.toLowerCase()}"`
  const [calendarIsShown, setCalendarIsShown] = useState(false)
  const [showRawValueInInput, setShowRawValueInInput] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  const hideCalendar = () => setCalendarIsShown(false)
  const showCalendar = () => setCalendarIsShown(true)

  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (!value) return

    if (showRawValueInInput) {
      setInputValue(formatDate(value as Date, editDateFormat!))
    } else {
      setInputValue(formatDate(value as Date, displayDateFormat!))
    }
  }, [value, showRawValueInInput])

  const leaveInput = () => {
    hideCalendar()
    onBlur!()

    if (error) {
      setShowError(true)
    } else {
      setShowRawValueInInput(false)
    }
  }

  const resetError = () => {
    setError('')
    setShowError(false)
  }

  const validateDate = (value: string) => {
    // TODO: make this check more serious
    return value.length === 10 && isValid(new Date(value))
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const nextInputValue = e.target.value

    // TODO: add char filtering (only number , `-` or ` ` allowed)
    setInputValue(nextInputValue)

    try {
      const isDateValid = validateDate(nextInputValue)

      if (isDateValid) {
        onChange(new Date(nextInputValue))

        resetError()
      } else {
        setError(errorMessae)
      }
    } catch {
      setError(errorMessae)
    }
  }

  const handleInputFocus = () => {
    setShowRawValueInInput(true)
    showCalendar()
  }

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }

    setShowRawValueInInput(true)
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
    leaveInput()
  }

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key

    if (key === 'Escape') {
      hideCalendar()
      return
    }

    if (key === 'Tab') {
      leaveInput()
    }
  }

  const handleInputClick = () => {
    if (!calendarIsShown) {
      showCalendar()
    }
  }

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
        />

        {showError && <Form.Error>{error}</Form.Error>}

        {calendarIsShown && (
          <Calendar value={value} onChange={handleCalendarChange} />
        )}
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {
  range: false,
  hideOnSelect: true,
  onBlur: () => {},
  editDateFormat: DEFAULT_RAW_DATE_FORMAT,
  displayDateFormat: DEFAULT_DATE_FORMAT
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
