import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip
        content='You can not hover inside!'
        placement='top'
        disableInteractive
      >
        <Button>Non interactive</Button>
      </Tooltip>
    </Container>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content='Hover inside' placement='top'>
        <Button>Interactive</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
