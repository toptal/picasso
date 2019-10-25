import React from 'react'
import { Helpbox, Container, Typography } from '@toptal/picasso'

const HelpboxBlockContentExample = () => (
  <Container>
    <Container bottom='small'>
      <Helpbox>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content as='div'>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

          <Typography color='blue'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Helpbox.Content>
      </Helpbox>
    </Container>
  </Container>
)

export default HelpboxBlockContentExample
