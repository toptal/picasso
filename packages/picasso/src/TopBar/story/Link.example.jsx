import React from 'react'
import { Link, Page } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      title='Onboarding'
      logoLink={<Link href='https://www.toptal.com' />}
    />
  </div>
)

export default Example
