import React from 'react'
import { Form } from '@toptal/picasso-forms'

const Example = () => {
  return (
    <Form onSubmit={() => {}}>
      <Form.RichTextEditor
        label='Default'
        id='editor-default'
        placeholder='Write some cool rich text'
        name='default'
      />
      <Form.RichTextEditor
        label='Error'
        id='editor-error'
        placeholder='Write some cool rich text'
        status='error'
        name='error'
      />
    </Form>
  )
}

export default Example
