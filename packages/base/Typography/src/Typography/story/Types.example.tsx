import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography size='large'>Body Large</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='black' size='medium'>
        Body Medium Black
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='medium'>Body Medium Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='small'>Body Small Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='xsmall'>Body Xsmall Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='xxsmall'>Body Xxsmall Grey</Typography>
    </Container>
  </div>
)

export default Example
