import React from 'react'
import { Container, Link, Breadcrumbs } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Breadcrumbs>
      <Breadcrumbs.Item
        as={Link}
        href='https://en.wikipedia.org/wiki/United_States'
      >
        USA
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} href='https://en.wikipedia.org/wiki/Software'>
        Software
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} href='https://toptal.com'>
        Toptal
      </Breadcrumbs.Item>
    </Breadcrumbs>
  </Container>
)

export default Example
