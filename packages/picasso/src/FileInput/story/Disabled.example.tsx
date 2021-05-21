import React from 'react'
import { FileInput } from '@toptal/picasso'

const Example = () => (
  <div>
    <FileInput
      value={[
        { file: new File(['image.png'], 'image.png') },
        { file: new File(['avatar.png'], 'avatar.png') },
        {
          file: new File(['resume.pdf'], 'resume.pdf'),
          error: 'File size exceeds the 25MB limit.'
        }
      ]}
      hint='Max file size: 25MB'
      onRemove={() => undefined}
      maxFiles={null}
      disabled
    />
  </div>
)

export default Example
