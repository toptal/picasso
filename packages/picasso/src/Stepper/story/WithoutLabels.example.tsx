import React from 'react'
import { Stepper, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container padded='medium'>
      <Stepper hideLabels steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top='small' padded='medium'>
      <Stepper
        hideLabels
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container top='small' padded='medium'>
      <Stepper
        hideLabels
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container top='small' padded='medium'>
      <Stepper
        hideLabels
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
  </div>
)

export default Example
