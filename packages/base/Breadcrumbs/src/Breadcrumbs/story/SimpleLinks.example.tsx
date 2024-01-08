import React from 'react'
import { Container, Link, Breadcrumbs } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Breadcrumbs>
      <Breadcrumbs.Item
        as={Link}
        href='https://en.wikipedia.org/wiki/United_States'
        variant='action'
      >
        USA
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        as={Link}
        href='https://en.wikipedia.org/wiki/Software'
        variant='action'
      >
        Software
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} href='https://toptal.com' variant='action'>
        Toptal
      </Breadcrumbs.Item>
    </Breadcrumbs>
  </Container>
)

export default Example
