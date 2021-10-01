import React from 'react'
import { Dropzone } from '@toptal/picasso-lab'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf')
  },
  {
    uploading: false,
    progress: 0,
    file: new File(['portfolio.pdf'], 'portfolio.pdf')
  }
]

const Example = () => {
  return (
    <Dropzone
      value={value}
      onDrop={() => alert('onDrop callback triggered')}
      onRemove={() => alert('onRemove callback triggered')}
      hint='Files allowed: 2. Max file size: 25MB'
      accept='image/*'
      disabled
    />
  )
}

export default Example
