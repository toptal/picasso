import React from 'react'
import { Form, Input, Container } from '@toptal/picasso'

const Example = () => (
  <Container
    style={{
      display: 'grid',
      gap: '4rem',
      gridTemplateColumns: 'repeat(auto-fit, 350px)'
    }}
  >
    <Form style={{ maxWidth: '350px' }}>
      <Form.Field>
        <Form.Label htmlFor='district'>District</Form.Label>
        <Input id='district' width='full' placeholder='e.g., Sant Marti' />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor='city' optional>
          City
        </Form.Label>
        <Input id='city' width='full' placeholder='e.g., Barcelona' />
      </Form.Field>
    </Form>
  </Container>
)

export default Example
