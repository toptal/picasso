import { Amount, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        minimumFractionDigits: 5
      </Typography>
      <Amount amount={1234.67} minimumFractionDigits={5} />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        maximumFractionDigits: 1
      </Typography>
      <Amount amount={1234.67} maximumFractionDigits={1} />
    </Container>
  </div>
)

export default Example
