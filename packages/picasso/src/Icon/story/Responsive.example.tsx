import React from 'react'
import {
  AsteriskSolidResponsive,
  Container,
  DoneResponsive,
  ExclamationSolidResponsive,
} from '@toptal/picasso'

const Example = () => (
  <div>
    <Container inline right='small' padded='xsmall'>
      <ExclamationSolidResponsive />
    </Container>
    <Container inline right='small' padded='xsmall'>
      <DoneResponsive />
    </Container>
    <Container
      style={{ backgroundColor: 'black' }}
      inline
      right='small'
      padded='xsmall'
    >
      <AsteriskSolidResponsive color='white' />
    </Container>
  </div>
)

export default Example
