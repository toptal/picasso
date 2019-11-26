import React from 'react'
import { Link, Container } from '@toptal/picasso'

const UnderlineLinkExample = () => (
  <div>
    <Container inline right='large'>
      <Link href='https://toptal.com' underline='none'>
        Link with `underline: none`
      </Link>
    </Container>
    <Container inline right='large'>
      <Link href='https://toptal.com' underline='hover'>
        Link with `underline: hover`
      </Link>
    </Container>
    <Container inline>
      <Link href='https://toptal.com' underline='always'>
        Link with `underline: always`
      </Link>
    </Container>
  </div>
)

export default UnderlineLinkExample
