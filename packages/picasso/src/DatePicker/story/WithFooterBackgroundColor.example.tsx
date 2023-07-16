import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const WithFooterBackgroundColorRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        footerProps={{
          render: <FooterComponent />,
          variant: 'dark',
        }}
      />
    </div>
  )
}

export default WithFooterBackgroundColorRendering
