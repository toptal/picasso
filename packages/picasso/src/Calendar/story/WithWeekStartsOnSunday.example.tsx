import React from 'react'
import { Calendar } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithWeekStartsOnSundayExample = () => {
  return (
    <Calendar
      activeMonth={new Date(2020, 2, 2)}
      onChange={noop}
      weekStartsOn={0}
    />
  )
}

export default WithWeekStartsOnSundayExample
