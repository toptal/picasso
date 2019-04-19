import React from 'react'
import { Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const IconWithTextExample = () => (
  <div>
    <div>
      <Cog style={{ marginRight: '0.5em' }} />
      Vertical alignment of the icon with the same height as text
    </div>

    <Container flex direction='row' alignItems='center' mt={1}>
      <Cog size={1.5} style={{ marginRight: '0.5em' }} />
      Vertical alignment of the icon with bigger height than text
    </Container>
  </div>
)

export default IconWithTextExample
