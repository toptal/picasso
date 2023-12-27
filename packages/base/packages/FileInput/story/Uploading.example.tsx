import React from 'react'
import { FileInput, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='medium'>
          Progress:
        </Typography>
      </Container>

      <FileInput
        value={[
          {
            file: new File(['image.png'], 'image.png'),
            progress: 42,
            uploading: true,
          },
        ]}
        hint='Max file size: 25MB'
      />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='medium'>
          Undetermined:
        </Typography>
      </Container>

      <FileInput
        value={[
          {
            file: new File(['image.png'], 'image.png'),
            uploading: true,
          },
        ]}
        hint='Max file size: 25MB'
      />
    </Container>
  </div>
)

export default Example
