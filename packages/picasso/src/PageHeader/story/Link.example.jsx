import React from 'react'
import { Link, Page } from '@toptal/picasso'

const PageHeaderLinkExample = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.Header
      title='Onboarding'
      logoLink={<Link href='https://www.toptal.com' />}
    />
  </div>
)

export default PageHeaderLinkExample
