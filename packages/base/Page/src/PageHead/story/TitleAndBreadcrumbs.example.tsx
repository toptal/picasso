import React from 'react'
import { Link, PageHead, Breadcrumbs } from '@toptal/picasso'

const TitleAndBreadcrumbsExample = () => (
  <PageHead>
    <Breadcrumbs>
      <Breadcrumbs.Item
        as={Link}
        variant='action'
        href='https://en.wikipedia.org/wiki/United_States'
      >
        USA
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        as={Link}
        variant='action'
        href='https://en.wikipedia.org/wiki/Software'
      >
        Software
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} variant='action' href='https://toptal.com'>
        Toptal
      </Breadcrumbs.Item>
    </Breadcrumbs>
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
    </PageHead.Main>
  </PageHead>
)

export default TitleAndBreadcrumbsExample
