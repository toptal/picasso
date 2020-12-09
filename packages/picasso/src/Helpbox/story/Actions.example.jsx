import React from 'react'
import { Helpbox, Container, Button } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Helpbox variant='yellow'>
      <Helpbox.Title>Heading Small</Helpbox.Title>
      <Helpbox.Actions>
        <Button size='small' variant='secondary'>
          Action1
        </Button>
        <Button size='small'>Action2</Button>
      </Helpbox.Actions>
      <Helpbox.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Helpbox.Content>
    </Helpbox>
  </Container>
)

export default Example
