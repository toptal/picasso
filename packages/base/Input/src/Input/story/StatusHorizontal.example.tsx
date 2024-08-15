import React from 'react'
import { Input, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form layout='horizontal'>
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
