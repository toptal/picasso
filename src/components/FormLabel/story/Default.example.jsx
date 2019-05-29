import React from 'react'
import { Form, TextField } from '@toptal/picasso'

const DefaultExample = () => (
  <Form>
    <Form.Field>
      <Form.Label htmlFor='fullName-1'>Label:</Form.Label>
      <TextField id='fullName-1' />
    </Form.Field>
  </Form>
)

export default DefaultExample
