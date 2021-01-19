import { Amount, Container } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Amount amount={1500} currency='EUR' />
    </Container>
    <Container bottom={1}>
      <Amount amount={150} currency='USD' />
    </Container>
    <Container bottom={1}>
      <Amount amount={15} currency='HUF' />
    </Container>
  </div>
)

export default Example
