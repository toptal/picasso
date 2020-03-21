import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <FileInput status='No file uploaded.' />
    </Container>

    <Container>
      <FileInput
        value={{ name: 'image.png', location: 'https://picsum.photos/200' }}
      />
    </Container>
  </div>
)

export default Example
