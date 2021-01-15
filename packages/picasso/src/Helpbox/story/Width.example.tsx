import React from 'react'
import { Helpbox, Container } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Container bottom='small'>
      <Helpbox variant='green'>
        <Helpbox.Title>Full width</Helpbox.Title>
        <Helpbox.Content width='full'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container bottom='small'>
      <Helpbox variant='green'>
        <Helpbox.Title>Shrink width</Helpbox.Title>
        <Helpbox.Content width='shrink'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
  </Container>
)

export default Example
