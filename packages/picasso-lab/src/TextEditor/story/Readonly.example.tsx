import React, { useState } from 'react'
import { TextEditor, TextEditorChangeHandler } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: TextEditorChangeHandler = newValue => setValue(newValue)

  return (
    <>
      <TextEditor
        id='readonly'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        value={value}
        readonly
      />
      <Container
        padded='small'
        top='large'
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow'
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
