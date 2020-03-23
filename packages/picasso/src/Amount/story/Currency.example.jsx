import { Amount, Container, Typography } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Typography>
        <Amount amount={1500} currency='EUR' />
      </Typography>
    </Container>
    <Container bottom={1}>
      <Typography>
        <Amount amount={150} currency='EUR' />
      </Typography>
    </Container>
    <Container bottom={1}>
      <Typography>
        <Amount amount={15} currency='EUR' />
      </Typography>
    </Container>
  </div>
)

export default Example
