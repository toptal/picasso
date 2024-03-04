import React from 'react'
import { Calendar, Tooltip } from '@toptal/picasso'
import { noop } from '@toptal/picasso-utils'

const WithCustomDayRenderingExample = () => {
  return (
    <Calendar
      value={new Date('2021-07-11')}
      onChange={noop}
      renderDay={({ children }) => {
        return <Tooltip content='Message in tooltip'>{children}</Tooltip>
      }}
    />
  )
}

export default WithCustomDayRenderingExample
