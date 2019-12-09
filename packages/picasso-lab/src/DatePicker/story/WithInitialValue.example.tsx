import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const WithInitialValueExample = () => {
  const [datepickerValue, setDatepickerValue] = useState(new Date(2019, 10, 10))

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)

          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithInitialValueExample
