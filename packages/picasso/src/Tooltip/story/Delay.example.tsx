import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content='Short delay is 200ms' delay='short' placement='top'>
        <Button>Short delay</Button>
      </Tooltip>
    </Container>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content='Long delay is 500ms' delay='long' placement='top'>
        <Button>Long delay</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
