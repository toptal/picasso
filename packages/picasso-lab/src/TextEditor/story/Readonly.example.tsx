import React from 'react'
import { TextEditor } from '@toptal/picasso-lab'
import { noop } from '@toptal/picasso/utils'

const Example = () => {
  return (
    <TextEditor
      id='readonly'
      onChange={noop}
      placeholder='Write some cool rich text'
      readonly
    />
  )
}

export default Example
