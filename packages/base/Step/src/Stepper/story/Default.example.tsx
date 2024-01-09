import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container padded={SPACING_6}>
      <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        active={1}
        steps={[
          { key: '1', content: <span>Step 1</span> },
          { key: 'key-2', content: <span>Step 2</span> },
          { key: 'Step 3', content: <span>Step 3</span> },
          { key: 'custom-key-4', content: <span>Step 4</span> },
        ]}
      />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper active={3} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper active={4} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
  </div>
)

export default Example
