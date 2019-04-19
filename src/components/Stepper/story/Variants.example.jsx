import React from 'react'
import { Stepper, Container, Typography } from '@toptal/picasso'

const StepperVariantsExample = () => (
  <div>
    <Typography>Default:</Typography>
    <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    <Container mt={1}>
      <Typography>Without labels:</Typography>
      <Stepper hideLabels steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
  </div>
)

export default StepperVariantsExample
