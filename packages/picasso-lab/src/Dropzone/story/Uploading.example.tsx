import React from 'react'
import { Dropzone } from '@toptal/picasso-lab'

const value = [
  {
    uploading: true,
    progress: 30,
    file: new File(['resume.pdf'], 'resume.pdf')
  }
]

const Example = () => {
  return <Dropzone value={value} hint='Max file size: 25MB' accept='image/*' />
}

export default Example
