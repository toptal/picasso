import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const FullWidthExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        width='full'
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

export default FullWidthExample
