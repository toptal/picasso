import React from 'react'
import { Button } from '@toptal/picasso'
import { Title } from '@toptal/picasso-lab'

const WithRightPaddingExample = () => (
  <Title rightPadding>
    <Title.Main>
      <Title.Title>Heading Large</Title.Title>
      <Title.Actions>
        <Button size='small' variant='secondary-blue'>
          Button
        </Button>
        <Button size='small' variant='secondary-red'>
          Reject
        </Button>
        <Button size='small' variant='primary-green'>
          Accept
        </Button>
      </Title.Actions>
    </Title.Main>
  </Title>
)

export default WithRightPaddingExample
