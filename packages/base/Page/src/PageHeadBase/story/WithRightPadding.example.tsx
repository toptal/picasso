import React from 'react'
import { Button, PageHeadBase } from '@toptal/picasso'

const actions = (
  <>
    <Button size='small' variant='secondary'>
      Button
    </Button>
    <Button size='small' variant='negative'>
      Reject
    </Button>
    <Button size='small' variant='positive'>
      Accept
    </Button>
  </>
)

const WithRightPaddingExample = () => (
  <PageHeadBase rightPadding title='Heading Large' actions={actions} />
)

export default WithRightPaddingExample
