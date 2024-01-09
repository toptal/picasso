import React from 'react'
import { Container, Link, Typography } from '@toptal/picasso'
import { SPACING_8, SPACING_6, palette } from '@toptal/picasso-utils'

const ColorLinkExample = () => (
  <div>
    <Container inline right={SPACING_8}>
      <Typography size='medium'>
        <Link href={window.parent.location.href + '#'}>Blue Link</Link>
      </Typography>
    </Container>
    <Container
      inline
      style={{ backgroundColor: palette.grey.darker }}
      padded={SPACING_6}
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
