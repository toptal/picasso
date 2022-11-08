import React from 'react'
import { Input, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <Input value='Ukraine' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <Input value='Ukraine' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <Input value='Ukraine' status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success</Form.Label>
        <Input
          value='Ukraine'
          multiline
          multilineResizable
          limit={5}
          rows={2}
          status='success'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <Input size='large' value='Ukraine' status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success</Form.Label>
        <Input
          value='Ukraine'
          multiline
          size='large'
          multilineResizable
          limit={5}
          rows={2}
          status='success'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
