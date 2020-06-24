import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Search16 } from '@toptal/picasso'

const WithTimezoneExample = () => {
  const timezone = 'Asia/Tokyo'
  const [value, setValue] = useState(new Date('2015-12-12 16:00:00'))

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        timezone={timezone}
        icon={<Search16 />}
        iconPosition='end'
        placeholder='Please select date...'
        onChange={date => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)

          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithTimezoneExample
