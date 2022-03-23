import React, { useState } from 'react'
import { DatePicker, Form } from '@toptal/picasso'

const Example = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date as Date)
          }}
          status='default'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date as Date)
          }}
          status='error'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date as Date)
          }}
          status='success'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
