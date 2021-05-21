import React from 'react'
import { FileInput, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='medium'>
      <Container bottom='small'>
        <Typography variant='heading' size='medium'>
          Progress:
        </Typography>
      </Container>

      <FileInput
        value={[
          {
            file: new File(['image.png'], 'image.png'),
            progress: 42,
            uploading: true
          }
        ]}
        hint='Max file size: 25MB'
      />
    </Container>

    <Container bottom='medium'>
      <Container bottom='small'>
        <Typography variant='heading' size='medium'>
          Undetermined:
        </Typography>
      </Container>

      <FileInput
        value={[
          {
            file: new File(['image.png'], 'image.png'),
            uploading: true
          }
        ]}
        hint='Max file size: 25MB'
      />
    </Container>
  </div>
)

export default Example
