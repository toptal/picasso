import React, { useState } from 'react'
import { DatePicker, Search16 } from '@toptal/picasso'

const WithDisabledDaysExample = () => {
  const [value, setValue] = useState(new Date('2015-12-10'))
  const minDate = new Date('2015-12-01')
  const maxDate = new Date('2015-12-30')

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        icon={<Search16 />}
        iconPosition='end'
        placeholder='Please select date...'
        disableDays={{ dayOfWeek: [0, 2] }}
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithDisabledDaysExample
