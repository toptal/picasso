import React from 'react'
import { Button, PageHead } from '@toptal/picasso'

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
  <PageHead rightPadding title='Heading Large' actions={actions} />
)

export default WithRightPaddingExample
