import React from 'react'
import { Stepper, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Typography>Default:</Typography>
    <Container padded='medium'>
      <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top='small'>
      <Typography>Without labels:</Typography>
      <Container padded='medium'>
        <Stepper hideLabels steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
      </Container>
    </Container>
  </div>
)

export default Example
