import React from 'react'
import { Container, Tag } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => (
  <Container style={{ width: '500px' }}>
    <Tag variant='grey'>
      <TypographyOverflow inline weight='semibold'>
        Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong
      </TypographyOverflow>
    </Tag>
  </Container>
)

export default Example
