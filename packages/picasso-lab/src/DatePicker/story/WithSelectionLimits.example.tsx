import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Search16 } from '@toptal/picasso'

const WithSelectionLimitsExample = () => {
  const [value, setValue] = useState(new Date('2015-12-12'))
  const minDate = new Date('2015-12-01')
  const maxDate = new Date('2015-12-30')
  const disabledIntervals = [
    { start: new Date('2015-12-03'), end: new Date('2015-12-08') },
    { start: new Date('2015-12-20'), end: new Date('2015-12-30') }
  ]

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        icon={<Search16 />}
        iconPosition='end'
        placeholder='Please select date...'
        disabledIntervals={disabledIntervals}
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithSelectionLimitsExample
