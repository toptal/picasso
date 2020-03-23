import { Amount, Container, Typography } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Typography>
        <Amount amount={1500} />
      </Typography>
    </Container>
    <Container bottom={1}>
      <Typography>
        <Amount amount={150} />
      </Typography>
    </Container>
    <Container bottom={1}>
      <Typography>
        <Amount amount={15} />
      </Typography>
    </Container>
  </div>
)

export default Example
