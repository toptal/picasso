import React from 'react'
import { FileInput, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <FileInput progress={42} status='File uploading in progress...' />
    </Container>

    <Container>
      <FileInput progress status='File uploading in progress...' />
    </Container>
  </div>
)

export default Example
