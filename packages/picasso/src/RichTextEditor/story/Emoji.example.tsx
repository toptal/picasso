import React, { useState } from 'react'
import type { RichTextEditorChangeHandler } from '@toptal/picasso'
import { RichTextEditor, Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='allow-emojis-editor'
        onChange={handleChange}
        placeholder='Write some cool rich text with emojis!'
        plugins={['emoji']}
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
