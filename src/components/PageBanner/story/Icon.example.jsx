import React from 'react'
import { Page, Container, Github16 } from '@toptal/picasso'

const NotificationIconExample = () => (
  <Container>
    <Container bottom='small'>
      <Page.Banner icon={<Github16 />}>Please authorize</Page.Banner>
    </Container>
  </Container>
)

export default NotificationIconExample
