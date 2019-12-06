import React from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const WithInitialValueExample = () => {
  const value = new Date(2019, 10, 10)

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={value}
        onChange={(date: Date | [Date, Date]) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)
        }}
      />
    </div>
  )
}

export default WithInitialValueExample
