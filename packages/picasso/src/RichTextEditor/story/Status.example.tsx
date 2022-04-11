import React from 'react'
import { Form, RichTextEditor } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <RichTextEditor
          id='editor-default'
          placeholder='Write some cool rich text'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <RichTextEditor
          id='editor-error'
          placeholder='Write some cool rich text'
          status='error'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
