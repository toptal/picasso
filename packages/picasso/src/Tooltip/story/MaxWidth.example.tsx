import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const longContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

const Example = () => (
  <Container
    flex
    justifyContent='space-between'
    padded='large'
    style={{ height: '240px', width: '1000px', padding: '2rem 10rem' }}
  >
    <Container>
      <Tooltip open content={longContent} placement='bottom'>
        <Button>Default maxWidth</Button>
      </Tooltip>
    </Container>
    <Container>
      <Tooltip
        open
        maxWidth='none'
        content={
          <Container style={{ width: '400px' }}>{longContent}</Container>
        }
        placement='bottom'
      >
        <Button>None maxWidth</Button>
      </Tooltip>
    </Container>
  </Container>
)

export default Example
