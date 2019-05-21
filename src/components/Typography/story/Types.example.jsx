import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyTypesExample = () => (
  <div>
    <Container bottom='small'>
      <Typography size='large' color='black'>
        Body Large
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography color='black'>Body Medium Black</Typography>
    </Container>
    <Container bottom='small'>
      <Typography>Body Medium Grey</Typography>
    </Container>
    <Container bottom='small'>
      <Typography size='small'>Body Small Grey</Typography>
    </Container>
  </div>
)

export default TypographyTypesExample
