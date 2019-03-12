import React from 'react'
import { Icon, IconsLibrary, Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const IconExample = () => (
  <div>
    <Container inline right={1}>
      <Icon name='cog' style={{ fontSize: '2em' }} />
    </Container>
    <Icon name='cog' style={{ width: '3em', height: '3em' }} />
  </div>
)

// somewhere in the code
IconsLibrary.add(Cog)

export default IconExample
