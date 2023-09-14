import React from 'react'
import {
  AsteriskSolidResponsive,
  Container,
  DoneResponsive,
  ExclamationSolidResponsive,
} from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container inline right={SPACING_4} padded={SPACING_2}>
      <ExclamationSolidResponsive />
    </Container>
    <Container inline right={SPACING_4} padded={SPACING_2}>
      <DoneResponsive />
    </Container>
    <Container
      style={{ backgroundColor: 'black' }}
      inline
      right={SPACING_4}
      padded={SPACING_2}
    >
      <AsteriskSolidResponsive color='white' />
    </Container>
  </div>
)

export default Example
