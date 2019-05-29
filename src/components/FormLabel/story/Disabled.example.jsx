import React from 'react'
import { Form, TextField } from '@toptal/picasso'

const DefaultExample = () => (
  <Form>
    <Form.Field>
      <Form.Label htmlFor='fullName' disabled>
        Disabled label:
      </Form.Label>
      <TextField id='fullName' fullWidth disabled />
    </Form.Field>
  </Form>
)

export default DefaultExample
