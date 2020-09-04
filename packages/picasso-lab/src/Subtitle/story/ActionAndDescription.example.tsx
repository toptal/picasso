import React from 'react'
import { Button } from '@toptal/picasso'
import { Subtitle } from '@toptal/picasso-lab'

const DefaultExample = () => {
  return (
    <Subtitle>
      <Subtitle.Main>
        <Subtitle.Content>
          <Subtitle.Title>Consolidated Invoices</Subtitle.Title>
          <Subtitle.Description>$3000.00</Subtitle.Description>
        </Subtitle.Content>
        <Subtitle.Actions>
          <Button size='small' variant='secondary-blue'>
            More
          </Button>
        </Subtitle.Actions>
      </Subtitle.Main>
    </Subtitle>
  )
}

export default DefaultExample
