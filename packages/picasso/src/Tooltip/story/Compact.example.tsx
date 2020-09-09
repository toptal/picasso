import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const Example = () => (
  <Container top='large' left='large' inline>
    <Tooltip content='Content' open placement='top' compact>
      <Button>Compact</Button>
    </Tooltip>
  </Container>
)

export default Example
