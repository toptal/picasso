import React from 'react'
import { Label, Container } from '@toptal/picasso'

const LabelDefaultExample = () => (
  <div>
    <Container inline right={1}>
      <Label variant='success'>Yay! It&#39;s done!</Label>
    </Container>
    <Label variant='error'>Nope! Please, try one more time</Label>
  </div>
)

export default LabelDefaultExample
