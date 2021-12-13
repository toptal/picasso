import React, { useState } from 'react'
import { TextEditor, TextEditorChangeHandler } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: TextEditorChangeHandler = newValue => setValue(newValue)

  return (
    <>
      <Container style={{ height: '300px' }}>
        <TextEditor
          id='editor'
          onChange={handleChange}
          placeholder='Write some cool rich text'
          value={value}
          autofocus
        />
      </Container>
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
