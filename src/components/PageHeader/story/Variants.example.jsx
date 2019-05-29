import React from 'react'
import { Page, Container } from '@toptal/picasso'

const PageHeaderDefaultExample = () => (
  <div>
    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.Header variant='light' title='Light' />
    </Container>
    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.Header variant='dark' title='Dark' />
    </Container>
  </div>
)

export default PageHeaderDefaultExample
