import React from 'react'
import { Button } from '@toptal/picasso'
import { Subheader } from '@toptal/picasso-lab'

const WithRightPaddingExample = () => (
  <Subheader rightPadding>
    <Subheader.Main>
      <Subheader.Title>Heading Large</Subheader.Title>
      <Subheader.Actions>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='negative'>
          Reject
        </Button>
        <Button size='small' variant='positive'>
          Accept
        </Button>
      </Subheader.Actions>
    </Subheader.Main>
  </Subheader>
)

export default WithRightPaddingExample
