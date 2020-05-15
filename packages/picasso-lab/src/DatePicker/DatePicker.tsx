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
import parse from 'date-fns/parse'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Input, InputAdornment, InputProps } from '@toptal/picasso'
import Popper from '@toptal/picasso/Popper'
import { Calendar16 } from '@toptal/picasso/Icon'

import Calendar, {
  DateOrDateRangeType,
  DateRangeType,
  DayProps
} from '../Calendar'
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
}

const formatDateRange = (dates: DateRangeType, format: string) =>
  dates.map(date => formatDate(date, format)).join(' - ')

const DEFAULT_DISPLAY_DATE_FORMAT = 'MMM d, yyyy'
const DEFAULT_EDIT_DATE_FORMAT = 'MM-dd-yyyy'
const EMPTY_INPUT_VALUE = ''

const isDateValid = (date: string, pattern: string) => {
  return (
    date.length === pattern.length && isValid(parse(date, pattern, new Date()))
  )
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
    maxDate,
    disabledIntervals,
    error,
    popperContainer,
    renderDay,
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
  const popperRef = useRef<PopperJs>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
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
  }, [value, isInputFocused, range, displayDateFormat, editDateFormat])

  const isInsideDatePicker = (node: Node) => {
    if (!inputWrapperRef.current) {
      return
    }

    if (!popperRef.current) {
      return
    }

    return (
      popperRef.current.popper.contains(node) ||
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

    if (!nextInputValue) {
      onChange(null)
    } else if (isDateValid(nextInputValue, editDateFormat!)) {
      onChange(parse(nextInputValue, editDateFormat!, new Date()))
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
          placement='bottom-start'
          open={calendarIsShown}
          anchorEl={inputWrapperRef.current}
          autoWidth={false}
          container={popperContainer}
          ref={popperRef}
        >
          <Calendar
            ref={calendarRef}
            range={range}
            value={value ?? undefined}
            minDate={minDate}
            maxDate={maxDate}
            disabledIntervals={disabledIntervals}
            renderDay={renderDay}
            onChange={handleCalendarChange}
            onBlur={handleBlur}
            className={classes.calendar}
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
