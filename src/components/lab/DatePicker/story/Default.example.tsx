import React from 'react'
import { DatePicker } from '@toptal/picasso/lab'

const DefaultExample = () => {
  return (
    <div style={{ height: '50vh' }}>
      <DatePicker onSelect={(date: any) => {
        console.log('selected date is: ', date)
      }}
      />
    </div>
  )
}

export default DefaultExample
