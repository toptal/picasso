import React from 'react'
import { Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const IconExample = () => (
  <div>
    <Container inline right='small'>
      <Cog color='red' />
    </Container>
    <Cog style={{ color: 'green' }} />
  </div>
)

export default IconExample
