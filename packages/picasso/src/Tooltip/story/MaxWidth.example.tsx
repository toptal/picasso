import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const longContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content={longContent} placement='top'>
        <Button>Default maxWidth</Button>
      </Tooltip>
    </Container>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip
        maxWidth='none'
        content={
          <Container style={{ width: '500px' }}>{longContent}</Container>
        }
        placement='top'
      >
        <Button>None maxWidth</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
