import React, { useState } from 'react'
import { Container, DatePicker, Typography } from '@toptal/picasso'

const Example = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography>Default</Typography>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date as Date)
          }}
          status='default'
        />
      </Container>
      <Container padded='small'>
        <Typography>Error</Typography>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date as Date)
          }}
          status='error'
        />
      </Container>
      <Container padded='small'>
        <Typography>Success</Typography>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date as Date)
          }}
          status='success'
        />
      </Container>
    </Container>
  )
}

export default Example
