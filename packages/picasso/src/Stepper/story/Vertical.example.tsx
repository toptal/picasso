import React from 'react'
import { Stepper, Container } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='row'>
    <Container padded='medium'>
      <Stepper.Vertical steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container padded='medium' left='xlarge'>
      <Stepper.Vertical
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container padded='medium' left='xlarge'>
      <Stepper.Vertical
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container padded='medium' left='xlarge'>
      <Stepper.Vertical
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
  </Container>
)

export default Example
