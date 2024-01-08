import { Amount, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} color='red' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} color='green' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={150} weight='semibold' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={15} size='large' />
    </Container>
  </div>
)

export default Example
