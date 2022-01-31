import React from 'react'
import { Dropzone } from '@toptal/picasso'

const errorMessages = ['resume.pdf: File is too large']

const Example = () => {
  return (
    <Dropzone
      hint='Max file size: 25MB'
      accept='image/*'
      errorMessages={errorMessages}
    />
  )
}

export default Example
