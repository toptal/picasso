import React from 'react'
import { Container } from '@toptal/picasso'
import { Settings16, Settings24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <div>
      <Settings16 style={{ marginRight: '0.5rem' }} />
      Vertical alignment of the icon with the same height as text
    </div>

    <Container flex alignItems='center' top='small'>
      <Settings24 style={{ marginRight: '0.5rem' }} />
      Vertical alignment of the icon with bigger height than text
    </Container>
  </div>
)

export default Example
