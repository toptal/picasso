import React from 'react'
import { Form, TextField } from '@toptal/picasso'

const DefaultExample = () => (
  <Form>
    <Form.Field>
      <Form.Label htmlFor='fullName-4' required>
        Required Label
      </Form.Label>
      <TextField id='fullName-4' fullWidth required />
    </Form.Field>
  </Form>
)

export default DefaultExample
