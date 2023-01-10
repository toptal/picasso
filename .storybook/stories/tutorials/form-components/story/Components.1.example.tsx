import React from 'react'
import {
  Container,
  Form,
  Input,
  Select,
  NumberInput,
  PasswordInput,
} from '@toptal/picasso'

const Example = () => (
  <Form>
    <Container flex justifyContent='space-between'>
      <Input width='auto' placeholder='Text input' />
      <Select
        options={[
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' },
        ]}
        placeholder='Select'
        width='auto'
      />
      <PasswordInput placeholder='Password input' />
      <NumberInput placeholder='Number input' />
    </Container>
  </Form>
)

export default Example
