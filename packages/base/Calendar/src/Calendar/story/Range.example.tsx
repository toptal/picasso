import React from 'react'
import { Calendar } from '@toptal/picasso'
import { noop } from '@toptal/picasso-utils'

const RangeExample = () => {
  return (
    <Calendar
      value={[new Date('2021-07-11'), new Date('2021-07-18')]}
      range
      onChange={noop}
    />
  )
}

export default RangeExample
