import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const Example = () => (
  <Container top='medium' left='medium'>
    <Tooltip content='Content goes here...' open>
      <Button>Test me</Button>
    </Tooltip>
  </Container>
)

export default Example
