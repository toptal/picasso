import React from 'react'
import { PasswordInput, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <PasswordInput value='asd' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <PasswordInput value='asd' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <PasswordInput value='asd' status='warning' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <PasswordInput value='asd' status='success' />
      </Form.Field>
    </Form>
  )
}

export default Example
