import React, { useState } from 'react'
import { DatePicker, DateOrDateRangeType } from '@toptal/picasso-lab'

const WithOnBlurHandlerExample = () => {
  const [
    datepickerValue,
    setDatepickerValue
  ] = useState<DateOrDateRangeType | null>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onBlur={() => {
          /* eslint-disable-next-line no-console */
          console.log('fire of the onBlur handler')
        }}
        onChange={(date: DateOrDateRangeType | null) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)

          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithOnBlurHandlerExample
