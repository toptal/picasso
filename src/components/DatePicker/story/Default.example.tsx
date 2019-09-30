import React from 'react'
import { DatePicker } from '@toptal/picasso'

const DefaultExample = () => {
  return (
    <div>
      <DatePicker onSelect={(date: any) => {
        console.log('selected date is: ', date)
      }}
      />
    </div>
  )
}

export default DefaultExample
