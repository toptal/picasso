import React, { useState } from 'react'
import {
  RichTextEditor,
  RichTextEditorChangeHandler,
  Container,
} from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='allow-links-editor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        plugins={['link']}
      />
      <Container
        padded='small'
        top='large'
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
