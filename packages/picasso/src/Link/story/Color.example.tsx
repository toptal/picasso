import React from 'react'
import { Container, Link } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const ColorLinkExample = () => (
  <div>
    <Container inline right='large'>
      <Link href={window.parent.location.href + '#'}>Blue Link</Link>
    </Container>
    <Container
      inline
      style={{ backgroundColor: palette.grey.darker }}
      padded='medium'
    >
      <Link color='white' href={window.parent.location.href + '#'}>
        White Link
      </Link>
    </Container>
  </div>
)

export default ColorLinkExample
