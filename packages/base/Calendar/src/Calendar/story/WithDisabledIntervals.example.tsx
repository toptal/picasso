import React from 'react'
import { Calendar } from '@toptal/picasso'
import { noop } from '@toptal/picasso-utils'

const WithDisabledIntervalsExample = () => {
  return (
    <Calendar
      activeMonth={new Date('2021-07-05')}
      onChange={noop}
      disabledIntervals={[
        { start: new Date('2021-07-11'), end: new Date('2021-07-14') },
        { start: new Date('2021-07-28'), end: new Date('2021-07-30') },
      ]}
    />
  )
}

export default WithDisabledIntervalsExample
