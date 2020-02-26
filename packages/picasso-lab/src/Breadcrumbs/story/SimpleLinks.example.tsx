import React from 'react'
import { Container } from '@toptal/picasso'
import { Breadcrumbs } from '@toptal/picasso-lab'

const Example = () => (
  <Container>
    <Breadcrumbs>
      <Breadcrumbs.Link href='https://en.wikipedia.org/wiki/United_States'>
        USA
      </Breadcrumbs.Link>
      <Breadcrumbs.Link href='https://en.wikipedia.org/wiki/Software'>
        Software
      </Breadcrumbs.Link>
      <Breadcrumbs.Link href='https://toptal.com'>Toptal</Breadcrumbs.Link>
    </Breadcrumbs>
  </Container>
)

export default Example
