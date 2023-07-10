import React from 'react'
import { Calendar } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithTwoMonthsExample = () => {
  return <Calendar onChange={noop} range numberOfMonths={2} />
}

export default WithTwoMonthsExample
