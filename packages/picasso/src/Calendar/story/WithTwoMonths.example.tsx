import React from 'react'
import { Calendar } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithTwoMonthsExample = () => {
  return (
    <Calendar
      value={new Date(2020, 2, 2)}
      onChange={noop}
      range
      numberOfMonths={2}
    />
  )
}

export default WithTwoMonthsExample
