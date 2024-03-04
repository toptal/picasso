import React from 'react'
import { Container, FileInput } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_2}>
      <FileInput accept='image/png' hint='Accept png image files' />
    </Container>

    <Container bottom={SPACING_2}>
      <FileInput accept='image/*' hint='Accept all image files' />
    </Container>

    <Container bottom={SPACING_2}>
      <FileInput accept='.js' hint='Accept *.js files' />
    </Container>

    <Container bottom={SPACING_2}>
      <FileInput accept='application/pdf' hint='Accept pdf files' />
    </Container>
  </div>
)

export default Example
