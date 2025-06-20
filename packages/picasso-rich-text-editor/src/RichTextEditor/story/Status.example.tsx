import React from 'react'
import { FormNonCompound, RichTextEditor } from '@toptal/picasso-forms'

const Example = () => {
  return (
    <FormNonCompound onSubmit={() => {}}>
      <RichTextEditor
        label='Default'
        id='editor-default'
        placeholder='Write some cool rich text'
        name='default'
      />
      <RichTextEditor
        label='Error'
        id='editor-error'
        placeholder='Write some cool rich text'
        status='error'
        name='error'
      />
      <RichTextEditor
        label='Warning'
        id='editor-warning'
        placeholder='Write some cool rich text'
        status='warning'
        name='warning'
      />
    </FormNonCompound>
  )
}

export default Example
