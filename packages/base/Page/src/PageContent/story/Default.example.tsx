import React from 'react'
import { Page, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page.Content>
      <Content />
    </Page.Content>
  </div>
)

const Content = () => (
  <Container
    top={SPACING_4}
    bottom={SPACING_4}
    left={SPACING_4}
    right={SPACING_4}
  >
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
