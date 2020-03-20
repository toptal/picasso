import React from 'react'
import { Page, Container, Time16 } from '@toptal/picasso'

const Example = () => (
  <Container bottom='small'>
    <Page.Banner icon={<Time16 />}>
      We are now in the process of reviewing your profile. After your profile
      has been checked, we will reach to you via email about next steps.
    </Page.Banner>
  </Container>
)

export default Example
