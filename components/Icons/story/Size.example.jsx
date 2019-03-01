import React from 'react'
import { Icon, IconsLibrary, Container } from '@toptal/picasso'
import { Check } from '@toptal/picasso/Icons'

const IconExample = () => (
  <div>
    <Container inline right={1}>
      <Icon name='check' style={{ fontSize: '2em' }} />
    </Container>
    <Icon name='check' style={{ width: '2em', height: '2em' }} />
  </div>
)

// somewhere in the code
IconsLibrary.add(Check)

export default IconExample
