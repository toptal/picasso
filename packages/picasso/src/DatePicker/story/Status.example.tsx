import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker, Form } from '@toptal/picasso'

const Example = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='default'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='error'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <DatePicker
          value={datepickerValue}
          onChange={date => {
            setDatepickerValue(date)
          }}
          status='success'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
