import React, { useState } from 'react'
import { DatePicker, Typography } from '@toptal/picasso'

const DefaultExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <Typography>
        Requires minDate and maxDate to be set in order to work
      </Typography>
      <br />
      <DatePicker
        value={datepickerValue}
        minDate={new Date('1990-01-01')}
        maxDate={new Date('2022-11-30')}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        dropdownNavigation
      />
    </div>
  )
}

export default DefaultExample
