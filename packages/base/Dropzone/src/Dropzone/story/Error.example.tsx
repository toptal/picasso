import React from 'react'
import { Dropzone } from '@toptal/picasso'

const Example = () => {
  return (
    <Dropzone
      hint='Files allowed: 2. Max file size: 25MB'
      accept={{
        'image/*': [],
      }}
      value={[
        {
          file: new File(['resume.pdf'], 'resume.pdf'),
          error: 'File size exceeds the 25MB limit.',
        },
        {
          file: new File(['portfolio.pdf'], 'portfolio.pdf'),
        },
      ]}
      onRemove={() => undefined}
    />
  )
}

export default Example
