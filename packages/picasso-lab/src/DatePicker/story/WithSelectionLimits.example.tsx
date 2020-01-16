import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Search16 } from '@toptal/picasso'

const WithSelectionLimitsExample = () => {
  const [value, setValue] = useState<Date>(new Date('12-12-2015'))
  const minDate = new Date('12-01-2015')
  const maxDate = new Date('12-30-2015')
  const disabledIntervals = [
    { start: new Date('12-03-2015'), end: new Date('12-08-2015') },
    { start: new Date('12-20-2015'), end: new Date('12-30-2015') }
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
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)

          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithSelectionLimitsExample
