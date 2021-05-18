import React from 'react'
import { Container, FileInput } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='xsmall'>
      <FileInput accept='image/png' hint='Accept png image files' />
    </Container>

    <Container bottom='xsmall'>
      <FileInput accept='image/*' hint='Accept all image files' />
    </Container>

    <Container bottom='xsmall'>
      <FileInput accept='.js' hint='Accept *.js files' />
    </Container>

    <Container bottom='xsmall'>
      <FileInput accept='application/pdf' hint='Accept pdf files' />
    </Container>
  </div>
)

export default Example
