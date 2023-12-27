import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='Short delay is 200ms' delay='short' placement='top'>
        <Button>Short delay</Button>
      </Tooltip>
    </Container>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='Long delay is 500ms' delay='long' placement='top'>
        <Button>Long delay</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
