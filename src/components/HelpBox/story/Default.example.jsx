import React from 'react'
import { Helpbox, Container, Button, Close16 } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const HelpboxDefaultExample = () => (
  <Container>
    <Container bottom='small'>
      <Helpbox>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Actions>
          <Button size='small' variant='secondary-blue'>
            Button1
          </Button>
          <Button size='small'>Button2</Button>
          <Close16 color={palette.grey.dark} />
        </Helpbox.Actions>
        <Helpbox.Content>
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
      <Helpbox variant='red'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Actions>
          <Button size='small' variant='secondary-blue'>
            Button1
          </Button>
          <Button size='small'>Button2</Button>
          <Close16 color={palette.grey.dark} />
        </Helpbox.Actions>
        <Helpbox.Content>
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
      <Helpbox variant='yellow'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Actions>
          <Button size='small' variant='secondary-blue'>
            Button1
          </Button>
          <Button size='small'>Button2</Button>
          <Close16 color={palette.grey.dark} />
        </Helpbox.Actions>
        <Helpbox.Content>
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
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Actions>
          <Button size='small' variant='secondary-blue'>
            Button1
          </Button>
          <Button size='small'>Button2</Button>
          <Close16 color={palette.grey.dark} />
        </Helpbox.Actions>
        <Helpbox.Content>
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
    <Container>
      <Helpbox variant='blue'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Actions>
          <Button size='small' variant='secondary-blue'>
            Button1
          </Button>
          <Button size='small'>Button2</Button>
          <Close16 color={palette.grey.dark} />
        </Helpbox.Actions>
        <Helpbox.Content>
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

export default HelpboxDefaultExample
