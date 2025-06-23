import React from 'react'
import { TimePicker, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <TimePicker status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <TimePicker status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <TimePicker status='warning' />
      </Form.Field>
    </Form>
  )
}

export default Example
