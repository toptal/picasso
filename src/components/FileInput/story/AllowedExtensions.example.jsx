import React from 'react'
import { FileInput, Form } from '@toptal/picasso'

const FileInputAllowedExtensionsExample = () => (
  <div>
    <Form.Field hint='Accept png image files'>
      <FileInput accept='image/png' status='No file uploaded.' width='auto' />
    </Form.Field>

    <Form.Field hint='Accept all image files'>
      <FileInput accept='image/*' status='No file uploaded.' width='auto' />
    </Form.Field>

    <Form.Field hint='Accept *.js files'>
      <FileInput accept='.js' status='No file uploaded.' width='auto' />
    </Form.Field>

    <Form.Field hint='Accept pdf files'>
      <FileInput
        accept='application/pdf'
        status='No file uploaded.'
        width='auto'
      />
    </Form.Field>
  </div>
)

export default FileInputAllowedExtensionsExample
