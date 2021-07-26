import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const VerticalSeparatorExample = () => {
  return (
    <Container>
      <Container>
        <OverviewBlock.Group>
          <OverviewBlock value='Default' label='Vertical Separator' />
          <OverviewBlock value='Default' label='Vertical Separator' />
          <OverviewBlock value='Default' label='Vertical Separator' />
          <OverviewBlock value='Default' label='Vertical Separator' />
          <OverviewBlock value='Default' label='Vertical Separator' />
        </OverviewBlock.Group>
      </Container>

      <Container top='small'>
        <OverviewBlock.Group separatorVariant='dark'>
          <OverviewBlock value='Dark' label='Vertical Separator' />
          <OverviewBlock value='Dark' label='Vertical Separator' />
          <OverviewBlock value='Dark' label='Vertical Separator' />
          <OverviewBlock value='Dark' label='Vertical Separator' />
        </OverviewBlock.Group>
      </Container>
    </Container>
  )
}

export default VerticalSeparatorExample
