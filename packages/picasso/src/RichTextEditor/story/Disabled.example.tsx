import React from 'react'
import { RichTextEditor } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const Example = () => {
  return (
    <RichTextEditor
      id='foo'
      onChange={noop}
      placeholder='Write some cool rich text'
      disabled
    />
  )
}

export default Example
