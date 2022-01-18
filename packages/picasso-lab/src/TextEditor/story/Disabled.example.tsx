import React from 'react'
import { TextEditor } from '@toptal/picasso-lab'
import { noop } from '@toptal/picasso/utils'

const Example = () => {
  return (
    <TextEditor
      id='foo'
      onChange={noop}
      placeholder='Write some cool rich text'
      disabled
    />
  )
}

export default Example
