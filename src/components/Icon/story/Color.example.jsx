import React from 'react'
import { Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

const IconExample = () => (
  <div>
    <Container inline right='small'>
      <Cog color={palette.red.main} />
    </Container>
    <Cog style={{ color: palette.green.main }} />
  </div>
)

export default IconExample
