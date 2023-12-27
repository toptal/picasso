import React from 'react'
import { Page, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <Container bottom={SPACING_4}>
    <Page.Banner>
      We are now in the process of reviewing your profile. After your profile
      has been checked, we will reach to you via email about next steps.
    </Page.Banner>
  </Container>
)

export default Example
