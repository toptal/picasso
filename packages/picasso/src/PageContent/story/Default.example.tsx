import React from 'react'
import { Page, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page.Content>
      <Content />
    </Page.Content>
  </div>
)

const Content = () => (
  <Container top='small' bottom='small' left='small' right='small'>
    <Typography align='center' variant='heading' size='large'>
      Default example
    </Typography>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Container>
)

export default Example
