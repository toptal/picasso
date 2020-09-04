import React from 'react'
import { Button } from '@toptal/picasso'
import { Subtitle } from '@toptal/picasso-lab'

const DefaultExample = () => {
  return (
    <Subtitle data-testid='Example-subtitle' topMargin>
      <Subtitle.Main>
        <Subtitle.Content>
          <Subtitle.Title data-testid='Example-subtitle__title'>
            Consolidated Invoices
          </Subtitle.Title>
          <Subtitle.Description data-testid='Example-subtitle__description'>
            $3000.00
          </Subtitle.Description>
        </Subtitle.Content>
        <Subtitle.Actions data-testid='Example-subtitle__action'>
          <Button size='small' variant='secondary-blue'>
            More
          </Button>
        </Subtitle.Actions>
      </Subtitle.Main>
    </Subtitle>
  )
}

export default DefaultExample
