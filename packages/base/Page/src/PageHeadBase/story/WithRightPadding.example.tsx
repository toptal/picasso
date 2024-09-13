import React from 'react'
import { Button, PageHead } from '@toptal/picasso'

const WithRightPaddingExample = () => (
  <PageHead rightPadding>
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
      <PageHead.Actions>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='negative'>
          Reject
        </Button>
        <Button size='small' variant='positive'>
          Accept
        </Button>
      </PageHead.Actions>
    </PageHead.Main>
  </PageHead>
)

export default WithRightPaddingExample
