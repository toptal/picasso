import React from 'react'
import { Button } from '@toptal/picasso'
import { Subheader } from '@toptal/picasso-lab'

const WithRightPaddingExample = () => (
  <Subheader rightPadding>
    <Subheader.Main>
      <Subheader.Title>Heading Large</Subheader.Title>
      <Subheader.Actions>
        <Button size='small' variant='secondary-blue'>
          Button
        </Button>
        <Button size='small' variant='secondary-blue'>
          Reject
        </Button>
        <Button size='small' variant='primary-green'>
          Accept
        </Button>
      </Subheader.Actions>
    </Subheader.Main>
  </Subheader>
)

export default WithRightPaddingExample
