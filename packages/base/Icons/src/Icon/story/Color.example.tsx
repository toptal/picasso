import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Container inline right={SPACING_4}>
      <Settings16 color='red' />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings16 color='green' />
    </Container>
    <Container
      inline
      right={SPACING_4}
      style={{ backgroundColor: 'black' }}
      padded={SPACING_2}
    >
      <Settings16 color='white' />
    </Container>
  </div>
)

export default Example
