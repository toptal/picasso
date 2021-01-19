import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { formatAmount } from '@toptal/picasso/utils'

const exampleAmount1 = 1575
const exampleAmount2 = '890'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography>
        This component exposes a currency formatting utility, which converts
        numbers, into string decorated with currency symbols/codes in the
        required locale format.
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='heading' size='medium'>
        Without using Amount format helper
      </Typography>
      <Typography>
        This is an example pure string usage of the amount ${exampleAmount1} and{' '}
        €{exampleAmount2}.
      </Typography>
    </Container>
    <Container>
      <Typography variant='heading' size='medium'>
        Using Amount format helper
      </Typography>
      <Typography>
        This is an example pure string usage of the amount{' '}
        {formatAmount({ amount: exampleAmount1 })} and{' '}
        {formatAmount({ amount: exampleAmount2, currency: 'EUR' })}.
      </Typography>
    </Container>
  </div>
)

export default Example
