import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container padded={SPACING_6}>
      <Stepper hideLabels steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        hideLabels
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        hideLabels
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        hideLabels
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
  </div>
)

export default Example
