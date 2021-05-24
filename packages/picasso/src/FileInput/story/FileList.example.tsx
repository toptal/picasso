import React from 'react'
import { FileList } from '@toptal/picasso'

const Example = () => {
  const files = [
    {
      uploading: false,
      progress: 0,
      name: 'File 1',
      file: new File(['resume.pdf'], 'resume.pdf')
    },
    {
      uploading: true,
      progress: 30,
      name: 'File under upload',
      file: new File(['resume.pdf'], 'resume.pdf')
    },
    {
      uploading: true,
      progress: 30,
      name: 'File under upload with error',
      error: 'File is too large',
      file: new File(['resume.pdf'], 'resume.pdf')
    }
  ]

  return (
    <div style={{ maxWidth: '300px' }}>
      <FileList files={files} onItemRemove={() => {}} />
    </div>
  )
}

export default Example
