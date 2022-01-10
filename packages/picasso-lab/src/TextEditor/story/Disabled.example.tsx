import React, { useState } from 'react'
import { TextEditor, TextEditorChangeHandler } from '@toptal/picasso-lab'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: TextEditorChangeHandler = newValue => setValue(newValue)

  return (
    <>
      <TextEditor
        id='foo'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        value={value}
        disabled
      />
    </>
  )
}

export default Example
