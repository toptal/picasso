import React from 'react'
import { Container, Link } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const DefaultLinkExample = () => (
  <Container style={{ backgroundColor: palette.grey.darker }} padded='medium'>
    <Link invert href='#' style={{ paddingRight: '2em' }}>
      About us
    </Link>
    <Link invert href='#' style={{ paddingRight: '2em' }}>
      Privacy Policy
    </Link>
    <Link invert href='#'>
      Contact Us
    </Link>
  </Container>
)

export default DefaultLinkExample
