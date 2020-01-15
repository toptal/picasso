import React, {
  useState,
  useRef,
  KeyboardEvent,
  useLayoutEffect,
  ReactNode,
  Fragment
} from 'react'
import PopperJs from 'popper.js'
import formatDate from 'date-fns/format'
import isValid from 'date-fns/isValid'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Input, InputAdornment } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import { Props as InputProps } from '@toptal/picasso/Input'
import { Calendar16 } from '@toptal/picasso/Icon'

import Calendar, { DateOrDateRangeType, DateRangeType } from '../Calendar'
import styles from './styles'

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
  value?: DateOrDateRangeType
  /** Method that will be invoked with selected values */
  onChange: (value: DateOrDateRangeType) => void
  /** Invoked when user goes away from Datepicker input */
  onBlur?: () => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Minimal start date for calendar */
  minDate?: Date
  /** Whether calendar should be closed after date selection. True by default */
  hideOnSelect?: boolean
  /** Date format that user will see in the input */
  displayDateFormat?: string
  /** Date format that user will see during manual input */
  editDateFormat?: string
  /** Specify icon which should be rendered inside DatePicker */
  icon?: ReactNode
  /** Specify a value if want to enable browser autofill */
  autoComplete?: string
  /** Indicate whether `DatePicker`'s input is in error state */
  error?: boolean
}

const formatDateRange = (dates: DateRangeType, format: string) =>
  dates.map(date => formatDate(date, format)).join(' - ')

const DEFAULT_DISPLAY_DATE_FORMAT = 'MMM d, yyyy'
const DEFAULT_EDIT_DATE_FORMAT = 'MM-dd-yyyy'
const EMPTY_INPUT_VALUE = ''

const isDateValid = (date: string, pattern: string) => {
  return date.length === pattern.length && isValid(new Date(date))
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoDatePicker'
})

export const DatePicker = (props: Props) => {
  const {
    range,
    hideOnSelect,
    displayDateFormat,
    editDateFormat,
    onBlur,
    onChange,
    value,
    width,
    icon,
    autoComplete,
    minDate,
    error,
    ...rest
  } = props
  const classes = useStyles(props)

  const inputProps = rest

  const [calendarIsShown, setCalendarIsShown] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  const hideCalendar = () => setCalendarIsShown(false)
  const showCalendar = () => setCalendarIsShown(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const calendarRef = useRef<PopperJs>(null)
  const inputWrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!value) {
      setInputValue(EMPTY_INPUT_VALUE)
      return
    }

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

  const isInsideDatePicker = (node: Node) => {
    if (!inputWrapperRef.current) {
      return
    }

    if (!calendarRef.current) {
      return
    }

    return (
      calendarRef.current.popper.contains(node) ||
      inputWrapperRef.current.contains(node)
    )
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const isFocusedInsideDatePicker = isInsideDatePicker(
      event.relatedTarget as Node
    )

    if (isFocusedInsideDatePicker) {
      return
    }

    hideCalendar()
    onBlur!()

    setIsInputFocused(false)
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
    }
  }

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleCalendarChange = (value: DateOrDateRangeType) => {
    onChange(value)

    if (hideOnSelect) {
      focus()
      hideCalendar()
    }
  }

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key

    if (key === 'Escape') {
      hideCalendar()
      return
    }

    if (key === 'Enter') {
      hideCalendar()
    }
  }

  const handleFocusOrClick = () => {
    showCalendar()
    setIsInputFocused(true)
  }

  const startAdornment = (
    <InputAdornment position='start' disablePointerEvents>
      {icon || <Calendar16 />}
    </InputAdornment>
  )

  return (
    <Fragment>
      <Container inline={width !== 'full'} ref={inputWrapperRef}>
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
          autoComplete={autoComplete}
          ref={inputRef}
          error={error}
          onKeyDown={handleInputKeydown}
          onClick={handleFocusOrClick}
          onFocus={handleFocusOrClick}
          onBlur={handleBlur}
          value={inputValue}
          onChange={handleInputChange}
          startAdornment={startAdornment}
          width={width}
        />
      </Container>
      {inputWrapperRef.current && (
        <Popper
          open={calendarIsShown}
          anchorEl={inputWrapperRef.current}
          autoWidth={false}
          ref={calendarRef}
        >
          <Calendar
            range={range}
            value={value}
            minDate={minDate}
            onChange={handleCalendarChange}
            onBlur={handleBlur}
            className={classes.calendar}
            tabIndex={-1}
          />
        </Popper>
      )}
    </Fragment>
  )
}

DatePicker.defaultProps = {
  range: false,
  hideOnSelect: true,
  onBlur: () => {},
  editDateFormat: DEFAULT_EDIT_DATE_FORMAT,
  displayDateFormat: DEFAULT_DISPLAY_DATE_FORMAT,
  autoComplete: 'off'
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
