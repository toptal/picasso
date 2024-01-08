import React from 'react'
import { Form, Input, Container, Typography } from '@toptal/picasso'
import { SPACING_12 } from '@toptal/picasso/utils'

const Example = () => (
  <Container
    style={{
      display: 'grid',
      gap: '4rem',
      gridTemplateColumns: 'repeat(auto-fit, 350px)',
    }}
  >
    <Form style={{ maxWidth: '350px' }}>
      <Container bottom={SPACING_12}>
        <Typography weight='semibold'>Recommended:</Typography>
      </Container>
      <Form.Field>
        <Form.Label htmlFor='district'>District</Form.Label>
        <Input id='district' width='full' placeholder='e.g., Sant Marti' />
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor='city' requiredDecoration='optional'>
          City
        </Form.Label>
        <Input id='city' width='full' placeholder='e.g., Barcelona' />
      </Form.Field>
    </Form>

    <Form style={{ maxWidth: '350px' }}>
      <Container bottom={SPACING_12}>
        <Typography weight='semibold'>Deprecated:</Typography>
      </Container>
      <Form.Field>
        <Form.Label htmlFor='district' requiredDecoration='asterisk'>
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
