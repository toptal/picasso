import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const FileInputDisabledExample = () => (
  <div>
    <Container bottom='small'>
      <FileInput disabled status='No file uploaded.' />
    </Container>

    <Container>
      <FileInput
        disabled
        value={{ name: 'image.png', location: 'https://picsum.photos/200' }}
      />
    </Container>
  </div>
)

export default FileInputDisabledExample
