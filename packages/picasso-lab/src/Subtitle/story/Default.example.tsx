import React from 'react'
import { Subtitle } from '@toptal/picasso-lab'

const DefaultExample = () => {
  return (
    <Subtitle data-testid='Example-subtitle'>
      <Subtitle.Main>
        <Subtitle.Content>
          <Subtitle.Title data-testid='Example-subtitle__title'>
            Consolidated Invoices
          </Subtitle.Title>
        </Subtitle.Content>
      </Subtitle.Main>
    </Subtitle>
  )
}

export default DefaultExample
