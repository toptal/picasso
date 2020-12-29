import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <FileInput disabled status='No file uploaded.' />
    </Container>

    <Container>
      <FileInput disabled value={new File(['image.png'], 'image.png')} />
    </Container>
  </div>
)

export default Example
