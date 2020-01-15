import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Search16 } from '@toptal/picasso'

const WithSelectionLimitsExample = () => {
  const [value, setValue] = useState<Date>(new Date('12-12-2015'))
  const minDate = new Date('12-07-2015')
  const maxDate = new Date('12-15-2015')

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
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

export default WithSelectionLimitsExample
