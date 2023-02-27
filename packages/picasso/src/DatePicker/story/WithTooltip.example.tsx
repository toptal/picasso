import React, { useState } from 'react'
import { Tooltip, DatePicker } from '@toptal/picasso'

const WithTooltip = () => {
  const [datepickerValue, setDatepickerValue] = useState(new Date('2015-12-12'))

  const minDate = new Date('2015-12-07')

  const disabledIntervals = [
    { start: new Date('2015-12-20'), end: new Date('2015-12-30') },
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        minDate={minDate}
        disabledIntervals={disabledIntervals}
        renderDay={({ children, isDisabled }) => {
          if (isDisabled) {
            return (
              <Tooltip compact content='Disabled day'>
                <span>{children}</span>
              </Tooltip>
            )
          }

          return children
        }}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithTooltip
