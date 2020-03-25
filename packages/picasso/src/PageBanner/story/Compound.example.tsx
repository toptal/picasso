import React from 'react'
import { Page, Container, Link, ExclamationSolid16 } from '@toptal/picasso'
const { Banner } = Page

const Example = () => (
  <Container>
    <Banner icon={<ExclamationSolid16 color='yellow' />}>
      <Banner.Message>
        You need to sign STA agreement in order to be able to hire talent.
      </Banner.Message>
      <Banner.Actions>
        <Link>Sign STA Agreement</Link>
      </Banner.Actions>
    </Banner>

    <Banner icon={<ExclamationSolid16 color='yellow' />}>
      <Banner.Message>
        It looks like your credit card or ACH payment method is not working.
        Please update your payment information.
      </Banner.Message>
      <Banner.Actions>
        <Link>Update Billing Details</Link>
      </Banner.Actions>
    </Banner>
  </Container>
)

export default Example
