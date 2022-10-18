import { Amount, Container, Typography } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Typography variant='heading' size='medium'>
        minimumFractionDigits: 5
      </Typography>
      <Amount amount={1234.67} minimumFractionDigits={5} />
    </Container>
    <Container bottom={1}>
      <Typography variant='heading' size='medium'>
        maximumFractionDigits: 1
      </Typography>
      <Amount amount={1234.67} maximumFractionDigits={1} />
    </Container>
  </div>
)

export default Example
