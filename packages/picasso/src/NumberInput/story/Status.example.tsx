import React from 'react'
import { NumberInput, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <NumberInput value='100' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <NumberInput value='100' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <NumberInput value='100' status='success' />
      </Form.Field>
    </Form>
  )
}

export default Example
