import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16, Settings24 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Container inline right={SPACING_4}>
      <Settings16 scale={2} />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings24 scale={2} />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings16 scale={3} />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings24 scale={3} />
    </Container>
  </div>
)

export default Example
