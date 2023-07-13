import React, { useState } from 'react'
import type { DateOrDateRangeType } from '@toptal/picasso'
import { Calendar } from '@toptal/picasso'

const WithSelectableDaysLimitExample = () => {
  const [value, setValue] = useState<DateOrDateRangeType>(
    new Date('2021-07-09')
  )

  return (
    <Calendar
      value={value}
      onChange={setValue}
      minDate={new Date('2021-07-08')}
      maxDate={new Date('2021-07-15')}
    />
  )
}

export default WithSelectableDaysLimitExample
