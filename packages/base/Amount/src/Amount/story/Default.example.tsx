import { Amount, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Amount amount={1500} color='green' weight='semibold' size='medium' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={150} color='grey' size='xsmall' />
    </Container>
    <Container bottom={SPACING_4}>
      <Amount amount={15} inline={false} />
    </Container>
  </div>
)

export default Example
