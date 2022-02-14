import React, { useState } from 'react'
import {
  Container,
  RichTextEditor,
  RichTextEditorChangeHandler
} from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='limit'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        minlength={10}
        maxlength={100}
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
