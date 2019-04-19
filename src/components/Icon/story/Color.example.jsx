import React from 'react'
import { Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const IconExample = () => (
  <div>
    <Container inline right={1}>
      <Cog color='red' />
    </Container>
    <Cog style={{ color: 'green' }} />
  </div>
)

export default IconExample
