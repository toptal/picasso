import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const FileInputDefaultExample = () => (
  <div>
    <Container bottom='small'>
      <FileInput status='No file uploaded.' width='auto' />
    </Container>

    <Container>
      <FileInput
        value={{ name: 'image.png', location: 'https://picsum.photos/200' }}
        width='auto'
      />
    </Container>
  </div>
)

export default FileInputDefaultExample
