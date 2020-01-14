import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Form } from '@toptal/picasso'

const AutocompleteExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <Form>
        <Form.Field>
          <Form.Label>Disabled by default</Form.Label>
          <DatePicker
            name='date'
            value={datepickerValue}
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Enabled</Form.Label>
          <DatePicker
            name='date'
            value={datepickerValue}
            autoComplete='cc-exp'
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>
      </Form>
    </div>
  )
}

export default AutocompleteExample
