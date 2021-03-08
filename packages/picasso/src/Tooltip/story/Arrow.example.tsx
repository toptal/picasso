import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const Example = () => (
  <div
    style={{
      textAlign: 'center',
      width: '400px',
      height: '200px',
      paddingTop: '3rem'
    }}
  >
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content='Content' open placement='top'>
        <Button>Arrow</Button>
      </Tooltip>
    </Container>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip arrow={false} content='Content' open placement='top'>
        <Button>No Arrow</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
