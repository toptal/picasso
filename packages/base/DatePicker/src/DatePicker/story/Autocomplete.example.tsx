import type { FormEvent } from 'react'
import React, { useState } from 'react'
import { DatePicker, Form, Button, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const AutocompleteExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
        }}
      >
        <Form.Field>
          <Form.Label>Disabled by default</Form.Label>
          <DatePicker
            name='date'
            value={datepickerValue}
            onChange={date => {
              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Enabled</Form.Label>
          <DatePicker
            name='cc-exp'
            value={datepickerValue}
            autoComplete='cc-exp'
            onChange={date => {
              setDatepickerValue(date as Date)
            }}
          />
        </Form.Field>

        <Container top={SPACING_4}>
          <Button type='submit'>
            Submit to include value to the browser autocomplete
          </Button>
        </Container>
      </Form>
    </div>
  )
}

export default AutocompleteExample
