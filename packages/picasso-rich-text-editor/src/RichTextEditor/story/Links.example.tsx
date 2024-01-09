import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { LinkPlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

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
        plugins={[<LinkPlugin />]}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
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
