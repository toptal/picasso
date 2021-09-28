import React from 'react'
import { Dropzone } from '@toptal/picasso-lab'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf')
  }
]

const Example = () => {
  return (
    <Dropzone
      disabled
      value={value}
      onDrop={() => alert('onDrop callback triggered')}
      onRemove={() => alert('onRemove callback triggered')}
      hint='Max file size: 25MB'
      accept='image/*'
    />
  )
}

export default Example
