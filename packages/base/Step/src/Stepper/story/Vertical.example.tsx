import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_10 } from '@toptal/picasso/utils'

const Example = () => (
  <Container flex direction='row'>
    <Container padded={SPACING_6}>
      <Stepper.Vertical steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container padded={SPACING_6} left={SPACING_10}>
      <Stepper.Vertical
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container padded={SPACING_6} left={SPACING_10}>
      <Stepper.Vertical
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container padded={SPACING_6} left={SPACING_10}>
      <Stepper.Vertical
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
  </Container>
)

export default Example
