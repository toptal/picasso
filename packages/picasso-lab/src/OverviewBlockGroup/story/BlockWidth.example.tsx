import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const BlockWidthExample = () => {
  return (
    <Container>
      <Container>
        <OverviewBlock.Group blockWidth='narrow'>
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
        </OverviewBlock.Group>
      </Container>

      <Container top='small'>
        <OverviewBlock.Group blockWidth='regular'>
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
        </OverviewBlock.Group>
      </Container>

      <Container top='small'>
        <OverviewBlock.Group blockWidth='wide'>
          <OverviewBlock value='Wide' label='Width' />
          <OverviewBlock value='Wide' label='Width' />
          <OverviewBlock value='Wide' label='Width' />
        </OverviewBlock.Group>
      </Container>
    </Container>
  )
}

export default BlockWidthExample
