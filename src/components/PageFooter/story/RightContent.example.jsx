import React from 'react'
import { Page, Link, Container } from '@toptal/picasso'

const FooterRightContentExample = () => (
  <div>
    <Page.Footer rightContent={<Links />} />
  </div>
)

const Links = () => (
  <Container flex justifyContent='space-between'>
    <Link href='#' underline='none' invert style={{ marginLeft: '2.5em' }}>
      +1.888.604.3188
    </Link>

    <Link href='#' underline='none' invert style={{ marginLeft: '2.5em' }}>
      Contact Us
    </Link>

    <Link href='#' underline='none' invert style={{ marginLeft: '2.5em' }}>
      Privacy Policy
    </Link>

    <Link href='#' underline='none' invert style={{ marginLeft: '2.5em' }}>
      Portal Agreement
    </Link>

    <Link href='#' underline='none' invert style={{ marginLeft: '2.5em' }}>
      Toptal Training
    </Link>
  </Container>
)

export default FooterRightContentExample
