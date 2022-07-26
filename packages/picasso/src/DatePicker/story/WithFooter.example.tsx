import React, { useState } from 'react'
import { DatePicker, Link, Typography } from '@toptal/picasso'

const WithFooterRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        footer={
          <Typography size='small'>
            Got a question? <Link href='#'>Talk to us</Link>
          </Typography>
        }
      />
    </div>
  )
}

export default WithFooterRendering
