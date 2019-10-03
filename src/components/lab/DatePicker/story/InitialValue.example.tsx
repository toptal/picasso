import React from 'react'
import { DatePicker } from '@toptal/picasso/lab'

const ControlledExample = () => {
  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={new Date(2019, 10, 10)}
        onSelect={(date: Date | [Date, Date]) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)
        }}
      />
    </div>
  )
}

export default ControlledExample
