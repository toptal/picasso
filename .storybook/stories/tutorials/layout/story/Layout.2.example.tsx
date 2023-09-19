import React from 'react'
import { Page, Container } from '@toptal/picasso'

import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <Container padded={SPACING_4}>Sidebar</Container>
        <Container padded={SPACING_4}>Main Content</Container>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
