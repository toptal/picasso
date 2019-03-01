import React from 'react'
import { Label, Container } from '@toptal/picasso'

const LabelDefaultExample = () => (
  <div>
    <Container inline right={1}>
      <Label label="Yay! It's done!" variant='success' />
    </Container>
    <Label label='Nope! Please, try one more time' variant='error' />
  </div>
)

export default LabelDefaultExample
