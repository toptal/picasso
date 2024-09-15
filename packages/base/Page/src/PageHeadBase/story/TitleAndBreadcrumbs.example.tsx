import React from 'react'
import { Link, PageHeadBase, Breadcrumbs } from '@toptal/picasso'

const breadcrumbs = (
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
)

const TitleAndBreadcrumbsExample = () => (
  <PageHeadBase breadcrumbs={breadcrumbs} title='Heading Large' />
)

export default TitleAndBreadcrumbsExample
