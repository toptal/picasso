import React from 'react'
import { Page } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>Here goes content!</Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
