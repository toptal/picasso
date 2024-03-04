import { Amount, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} currency='EUR' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={150} currency='USD' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={15} currency='HUF' />
    </Container>
  </div>
)

export default Example
