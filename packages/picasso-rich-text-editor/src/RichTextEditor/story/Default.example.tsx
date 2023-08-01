import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import {
  CodeBlockPlugin,
  RichTextEditor,
} from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='editor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        plugins={[<CodeBlockPlugin />]}
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
