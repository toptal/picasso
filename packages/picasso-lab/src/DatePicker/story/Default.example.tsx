import React from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const DefaultExample = () => {
  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        onChange={(date: Date | [Date, Date]) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)
        }}
      />
    </div>
  )
}

export default DefaultExample
