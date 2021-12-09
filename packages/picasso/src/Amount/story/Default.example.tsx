import { Amount, Container } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Amount amount={1500} color='green' weight='semibold' size='medium' />
    </Container>
    <Container bottom={1}>
      <Amount amount={150} color='grey' size='xsmall' />
    </Container>
    <Container bottom={1}>
      <Amount amount={15} inline={false} />
    </Container>
  </div>
)

export default Example
