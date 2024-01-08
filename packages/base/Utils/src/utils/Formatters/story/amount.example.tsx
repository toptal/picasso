import { Container, Typography } from '@toptal/picasso'
import { SPACING_4, formatAmount } from '@toptal/picasso/utils'
import React from 'react'

const exampleAmount1 = 1575
const exampleAmount2 = '890'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography>
        This component exposes a currency formatting utility, which converts
        numbers, into string decorated with currency symbols/codes in the
        required locale format.
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Without using Amount format helper
      </Typography>
      <Typography>
        This is an example pure string usage of the amount ${exampleAmount1} and{' '}
        €{exampleAmount2}.
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using Amount format helper
      </Typography>
      <Typography>
        This is an example pure string usage of the amount{' '}
        {formatAmount({ amount: exampleAmount1 })} and{' '}
        {formatAmount({ amount: exampleAmount2, currency: 'EUR' })}.
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using fraction digits options:
      </Typography>
      <Typography>
        minimumFractionDigits: 3 with value: {exampleAmount1}
      </Typography>
      <Typography>
        output:{' '}
        {formatAmount({
          amount: exampleAmount1,
          options: { minimumFractionDigits: 3 },
        })}
      </Typography>
      <Typography>minimumFractionDigits: 1 with value: 1575.1234</Typography>
      <Typography>
        output:{' '}
        {formatAmount({
          amount: 890.1234,
          options: { maximumFractionDigits: 1 },
          currency: 'EUR',
        })}
      </Typography>
    </Container>
  </div>
)

export default Example
