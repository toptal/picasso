import React from 'react'
import { Autocomplete, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <Autocomplete value='Ukraine' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <Autocomplete value='Ukraine' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <Autocomplete value='Ukraine' status='success' />
      </Form.Field>
    </Form>
  )
}

export default Example
