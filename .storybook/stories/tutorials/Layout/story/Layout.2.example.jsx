import React from 'react'
import { Page, Container } from '@toptal/picasso'

const LayoutExample = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.Header title='How to layout a page' />
      <Page.Content>
        <Container padded='small'>Sidebar</Container>
        <Container padded='small'>Main Content</Container>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default LayoutExample
