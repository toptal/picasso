import React, { useState } from 'react'
import { DatePickerValue, DatePicker } from '@toptal/picasso-lab'

const AllowCustomValue = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>(
    'some custom value'
  )

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        allowCustomValue
        onChange={setDatepickerValue}
      />
    </div>
  )
}

export default AllowCustomValue
