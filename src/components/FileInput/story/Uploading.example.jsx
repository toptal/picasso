import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const FileInputUploadingExample = () => (
  <div>
    <Container bottom='small'>
      <FileInput
        progress={42}
        status='File uploading in progress...'
        width='auto'
      />
    </Container>

    <Container>
      <FileInput
        maxSize={2}
        progress
        status='File uploading in progress...'
        width='auto'
      />
    </Container>
  </div>
)

export default FileInputUploadingExample
