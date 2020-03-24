import React from 'react'
import { Page, Container, Link, Exclamation16 } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Page.Banner icon={<Exclamation16 color='yellow' />}>
      <Page.Banner.Message>
        You need to sign STA agreement in order to be able to hire talent.
      </Page.Banner.Message>
      <Page.Banner.Actions>
        <Link>Sign STA Agreement</Link>
      </Page.Banner.Actions>
    </Page.Banner>

    <Page.Banner icon={<Exclamation16 color='yellow' />}>
      <Page.Banner.Message>
        It looks like your credit card or ACH payment method is not working.
        Please update your payment information.
      </Page.Banner.Message>
      <Page.Banner.Actions>
        <Link>Update Billing Details</Link>
      </Page.Banner.Actions>
    </Page.Banner>
  </Container>
)

export default Example
