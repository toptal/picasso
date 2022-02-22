import React from 'react'
import { Page, Container } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <Container padded='small'>Sidebar</Container>
        <Container padded='small'>Main Content</Container>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
