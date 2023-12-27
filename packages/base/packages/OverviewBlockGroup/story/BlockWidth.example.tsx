import React from 'react'
import { OverviewBlock, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

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

      <Container top={SPACING_4}>
        <OverviewBlock.Group blockWidth='regular'>
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
        </OverviewBlock.Group>
      </Container>

      <Container top={SPACING_4}>
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
