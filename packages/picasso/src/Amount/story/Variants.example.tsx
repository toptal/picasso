import { Amount, Container } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Amount amount={1500} color='red' />
    </Container>
    <Container bottom={1}>
      <Amount amount={1500} color='green' />
    </Container>
    <Container bottom={1}>
      <Amount amount={150} weight='semibold' />
    </Container>
    <Container bottom={1}>
      <Amount amount={15} size='large' />
    </Container>
  </div>
)

export default Example
