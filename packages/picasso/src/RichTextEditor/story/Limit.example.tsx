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
<<<<<<< HEAD
        minlength={10}
        maxlength={100}
=======
        minlength={2}
        maxlength={5}
>>>>>>> 403109da7 (chore: initial commit)
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
