import React, { useState } from 'react'
import { Tooltip } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso-lab'
import { isBefore, isWithinInterval } from 'date-fns'

const WithCustomDayRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState(new Date('2015-12-12'))

  const minDate = new Date('2015-12-07')

  const disabledIntervals = [
    { start: new Date('2015-12-20'), end: new Date('2015-12-30') }
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        minDate={minDate}
        disabledIntervals={disabledIntervals}
        renderDay={({ date, children, isSelectable }) => {
          const day = new Date(date)

          if (!isSelectable) {
            if (isBefore(day, minDate)) {
              return <Tooltip content='It is vacation time'>{children}</Tooltip>
            }
            const isWithinDisabledInterval = disabledIntervals.some(interval =>
              isWithinInterval(day, interval)
            )

            if (isWithinDisabledInterval) {
              return <Tooltip content='In a meeting'>{children}</Tooltip>
            }
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

export default WithCustomDayRendering
