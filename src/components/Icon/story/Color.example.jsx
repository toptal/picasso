import React from 'react'
import { Container } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

const IconExample = () => (
  <div>
    <Container inline right='small'>
      <Settings16 color={palette.red.main} />
    </Container>
    <Settings16 style={{ color: palette.green.main }} />
  </div>
)

export default IconExample
