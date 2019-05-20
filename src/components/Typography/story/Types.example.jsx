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
    <Container bottom='small'>
      <Typography variant='hint'>Hint</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='error'>Error</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='table-head'>Table Header</Typography>
    </Container>
    <Typography variant='table-text'>Table Text</Typography>
  </div>
)

export default TypographyTypesExample
