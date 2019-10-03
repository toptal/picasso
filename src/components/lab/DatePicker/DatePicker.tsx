import React, { useState } from 'react'
import format from 'date-fns/format'

import { ClickAwayListener } from '../../utils'
import { Input, Container } from '../..'
import Calendar, { DateOrDateRangeType, DateRangeType } from '../Calendar'

interface Props {
  range?: boolean
  onSelect: (value: DateOrDateRangeType) => void
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

        <Calendar open={calendarOpened} onSelect={handleSelect} range={range} />
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
