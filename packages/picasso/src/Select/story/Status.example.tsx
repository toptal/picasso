import React from 'react'
import { Select, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <Select options={[]} status='default' width='auto' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <Select options={[]} status='error' width='auto' />
      </Form.Field>
    </Form>
  )
}

export default Example
