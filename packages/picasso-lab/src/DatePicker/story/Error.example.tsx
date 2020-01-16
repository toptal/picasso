import React, { useState } from 'react'
import { Form } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <Form>
        <Form.Field>
          <Form.Label>Failed validation</Form.Label>
          <DatePicker
            value={datepickerValue}
            error
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

export default DefaultExample
