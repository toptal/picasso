import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const FileInputDefaultExample = () => (
  <div>
    <Container bottom='small'>
      <FileInput />
    </Container>

    <Container>
      <FileInput
        file={{ name: 'image.png', location: 'https://picsum.photos/200' }}
      />
    </Container>
  </div>
)

export default FileInputDefaultExample
