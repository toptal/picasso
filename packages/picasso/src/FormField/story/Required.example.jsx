import React from 'react'
import { Form, Input, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container
    style={{
      display: 'grid',
      gap: '4rem',
      gridTemplateColumns: 'repeat(auto-fit, 350px)'
    }}
  >
    <Form style={{ maxWidth: '350px' }}>
      <Container bottom={3}>
        <Typography>New school:</Typography>
      </Container>
      <Form.Field>
        <Form.Label htmlFor='district' required>
          District
        </Form.Label>
        <Input id='district' width='full' placeholder='e.g., Sant Marti' />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor='city' required={false}>
          City
        </Form.Label>
        <Input id='city' width='full' placeholder='e.g., Barcelona' />
      </Form.Field>
    </Form>

    <Form style={{ maxWidth: '350px' }}>
      <Container bottom={3}>
        <Typography>Old school:</Typography>
      </Container>
      <Form.Field>
        <Form.Label htmlFor='district' required requiredVariant='asterisk'>
          District
        </Form.Label>
        <Input id='district' width='full' placeholder='e.g., Sant Marti' />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor='city'>City</Form.Label>
        <Input id='city' width='full' placeholder='e.g., Barcelona' />
      </Form.Field>
    </Form>
  </Container>
)

export default Example
