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
        <Form.Label>Warning</Form.Label>
        <Input value='Ukraine' status='warning' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <Input value='Ukraine' status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success</Form.Label>
        <Input value='Ukraine' multiline rows={4} status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success With Counter</Form.Label>
        <Input
          value='Ukraine'
          multiline
          rows={4}
          status='success'
          counter='entered'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
