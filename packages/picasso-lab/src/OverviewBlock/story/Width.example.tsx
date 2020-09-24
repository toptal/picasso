import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const WidthExample = () => {
  return (
    <Container>
      <Container>
        <OverviewBlock.Group>
          <OverviewBlock value='Narrow' label='Width' width='narrow' />
          <OverviewBlock value='Narrow' label='Width' width='narrow' />
          <OverviewBlock value='Narrow' label='Width' width='narrow' />
          <OverviewBlock value='Narrow' label='Width' width='narrow' />
          <OverviewBlock value='Narrow' label='Width' width='narrow' />
        </OverviewBlock.Group>
      </Container>

      <Container top='small'>
        <OverviewBlock.Group>
          <OverviewBlock value='Regular' label='Width' width='regular' />
          <OverviewBlock value='Regular' label='Width' width='regular' />
          <OverviewBlock value='Regular' label='Width' width='regular' />
          <OverviewBlock value='Regular' label='Width' width='regular' />
        </OverviewBlock.Group>
      </Container>

      <Container top='small'>
        <OverviewBlock.Group>
          <OverviewBlock value='Wide' label='Width' width='wide' />
          <OverviewBlock value='Wide' label='Width' width='wide' />
          <OverviewBlock value='Wide' label='Width' width='wide' />
        </OverviewBlock.Group>
      </Container>
    </Container>
  )
}

export default WidthExample
