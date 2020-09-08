import React from 'react'
import { Link } from '@toptal/picasso'
import { Subheader, Breadcrumbs } from '@toptal/picasso-lab'

const TitleAndBreadcrumbsExample = () => (
  <Subheader>
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
    <Subheader.Main>
      <Subheader.Title>Heading Large</Subheader.Title>
    </Subheader.Main>
  </Subheader>
)

export default TitleAndBreadcrumbsExample
