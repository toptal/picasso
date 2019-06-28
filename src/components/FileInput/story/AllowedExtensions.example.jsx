import React from 'react'
import { FileInput, Form } from '@toptal/picasso'

const FileInputAllowedExtensionsExample = () => (
  <div>
    <Form.Field hint='Accept png image files'>
      <FileInput accept='image/png' />
    </Form.Field>

    <Form.Field hint='Accept all image files'>
      <FileInput accept='image/*' />
    </Form.Field>

    <Form.Field hint='Accept *.js files'>
      <FileInput accept='.js' />{' '}
    </Form.Field>

    <Form.Field hint='Accept pdf files'>
      <FileInput accept='application/pdf' />
    </Form.Field>
  </div>
)

export default FileInputAllowedExtensionsExample
