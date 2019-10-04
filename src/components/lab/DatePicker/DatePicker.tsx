import React, { useState } from 'react'
import format from 'date-fns/format'

import { ClickAwayListener } from '../../utils'
import { Input, Container } from '../..'
import { BaseProps } from '../../Picasso'
import Calendar, { DateOrDateRangeType, DateRangeType } from '../Calendar'

export interface Props extends BaseProps {
  /** Method that will be invoked with selected values */
  onSelect: (value: DateOrDateRangeType) => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Initial value */
  value?: Date
}

function isDateRange(value: DateOrDateRangeType): value is DateRangeType {
  return Array.isArray(value)
}

const formatDate = (date: Date) => format(date, 'MMM d, yyyy')
const formatDateRange = (dates: DateRangeType) =>
  dates.map(formatDate).join(' - ')

const formatValue = (value: DateOrDateRangeType) => {
  if (isDateRange(value)) {
    return formatDateRange(value)
  } else {
    return formatDate(value)
  }
}

export const DatePicker = ({ onSelect, range, value: initialValue }: Props) => {
  const [calendarOpened, setCalendarOpened] = useState(false)
  const [inputValue, setInputValue] = useState<string | undefined>(
    initialValue ? formatValue(initialValue) : undefined
  )

  const openCalendar = () => setCalendarOpened(true)
  const closeCalendar = () => setCalendarOpened(false)

  const handleSelect = (value: DateOrDateRangeType) => {
    setInputValue(formatValue(value))
    onSelect(value)
  }

  return (
    <ClickAwayListener onClickAway={closeCalendar}>
      <Container inline>
        <Input value={inputValue} onFocus={openCalendar} />

        <Calendar
          activeMonth={initialValue}
          value={initialValue}
          open={calendarOpened}
          onSelect={handleSelect}
          range={range}
        />
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {
  range: false
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
