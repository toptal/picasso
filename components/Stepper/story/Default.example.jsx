import React from 'react'
import { Stepper, Container } from '@toptal/picasso'

const StepperDefaultExample = () => (
  <div>
    <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    <Container top={1}>
      <Stepper active={1} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
  </div>
)

export default StepperDefaultExample
