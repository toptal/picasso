import React from 'react'
import { Container, Link, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const ColorLinkExample = () => (
  <div>
    <Container inline right='large'>
      <Typography size='medium'>
        <Link href={window.parent.location.href + '#'}>Blue Link</Link>
      </Typography>
    </Container>
    <Container
      inline
      style={{ backgroundColor: palette.grey.darker }}
      padded='medium'
    >
      <Typography size='medium'>
        <Link color='white' href={window.parent.location.href + '#'}>
          White Link
        </Link>
      </Typography>
    </Container>
  </div>
)

export default ColorLinkExample
