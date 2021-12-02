import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const customDateParser = (value: string): Date | null | undefined => {
  if (!/^[0-9]{1,4}$/.test(value)) {
    return
  }

  const currentYear = new Date().getFullYear().toString()
  const normalizedYear = parseInt(
    currentYear.slice(0, currentYear.length - value.length).concat(value)
  )

  const startDate = new Date(normalizedYear, 0, 1)
  const endDate = new Date(normalizedYear, 11, 31)

  return getRandomDate(startDate, endDate)
}

const WithHumanReadableDateParsing = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        parseInputValue={customDateParser}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithHumanReadableDateParsing
