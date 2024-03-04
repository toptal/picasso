import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='You can not hover inside!' placement='top'>
        <Button>Non interactive</Button>
      </Tooltip>
    </Container>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='Hover inside' interactive placement='top'>
        <Button>Interactive</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
