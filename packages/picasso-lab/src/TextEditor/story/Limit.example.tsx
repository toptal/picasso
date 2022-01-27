import React, { useState } from 'react'
import { TextEditor, TextEditorChangeHandler } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: TextEditorChangeHandler = newValue => setValue(newValue)

  return (
    <>
      <TextEditor
        id='limit'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        minLength={10}
        maxLength={100}
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
