import React from 'react'
import { Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const IconExample = () => (
  <div>
    <Container inline right={1}>
      <Cog style={{ fontSize: '2em' }} />
    </Container>
    <Cog style={{ width: '3em', height: '3em' }} />
  </div>
)

export default IconExample
