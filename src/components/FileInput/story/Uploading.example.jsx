import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const FileInputUploadingExample = () => (
  <div>
    <Container bottom='small'>
      <FileInput progress={42} />
    </Container>

    <Container>
      <FileInput maxSize={2} progress />
    </Container>
  </div>
)

export default FileInputUploadingExample
