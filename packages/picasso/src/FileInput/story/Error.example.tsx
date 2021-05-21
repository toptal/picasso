import React from 'react'
import { FileInput } from '@toptal/picasso'

const Example = () => (
  <div>
    <FileInput
      value={[
        {
          file: new File(['resume.pdf'], 'resume.pdf'),
          error: 'File size exceeds the 25MB limit.'
        }
      ]}
      hint='Max file size: 25MB'
      onRemove={() => undefined}
    />
  </div>
)

export default Example
