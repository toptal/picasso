import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography size='large'>Body Large</Typography>
    </Container>
    <Container bottom='small'>
      <Typography color='black' size='medium'>
        Body Medium Black
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography size='medium'>Body Medium Grey</Typography>
    </Container>
    <Container bottom='small'>
      <Typography size='small'>Body Small Grey</Typography>
    </Container>
    <Container bottom='small'>
      <Typography size='xsmall'>Body Xsmall Grey</Typography>
    </Container>
    <Container bottom='small'>
      <Typography size='xxsmall'>Body Xxsmall Grey</Typography>
    </Container>
  </div>
)

export default Example
