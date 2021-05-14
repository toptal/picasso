import React from 'react'
import { FileList } from '@toptal/picasso'

const Example = () => {
  const files = [
    {
      uploading: false,
      progress: 0,
      name: 'File 1'
    },
    {
      uploading: true,
      progress: 30,
      name: 'File under upload'
    },
    {
      uploading: true,
      progress: 30,
      name: 'File under upload with error',
      error: 'File is too large'
    },
    {
      uploading: false,
      progress: 0,
      name: 'File with error',
      error: 'File too large'
    }
  ]

  return (
    <div style={{ maxWidth: '300px' }}>
      <FileList files={files} onItemRemove={() => {}} />
    </div>
  )
}

export default Example
