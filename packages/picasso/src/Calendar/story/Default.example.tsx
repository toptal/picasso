import React, { useState } from 'react'
import type { DateOrDateRangeType } from '@toptal/picasso'
import { Calendar } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState<DateOrDateRangeType>(new Date())

  return <Calendar value={value} onChange={setValue} />
}

export default DefaultExample
