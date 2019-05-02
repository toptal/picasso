import React from 'react'
import { Stepper, Container } from '@toptal/picasso'

const StepperDefaultExample = () => (
  <div>
    <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    <Container top='small'>
      <Stepper active={1} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top='small'>
      <Stepper active={3} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top='small'>
      <Stepper active={4} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
  </div>
)

export default StepperDefaultExample
