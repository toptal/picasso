import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const FileInputDisabledExample = () => (
  <div>
    <Container bottom='small'>
      <FileInput disabled status='No file uploaded.' width='auto' />
    </Container>

    <Container>
      <FileInput
        disabled
        value={{ name: 'image.png', location: 'https://picsum.photos/200' }}
        width='auto'
      />
    </Container>
  </div>
)

export default FileInputDisabledExample
