import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso/utils'
import {
  CodeBlockPlugin,
  CodePlugin,
  RichTextEditor,
} from '@toptal/picasso-rich-text-editor'
import { htmlToHast } from '@toptal/picasso-rich-text-editor/utils'

import type { RichTextEditorChangeHandler } from '../types'

// we expect defaultValue to be HAST from BE
const defaultValue = htmlToHast(
  `<p>foo <code>bar</code> baz</p><p>qux <code>quux</code> quuz</p>
<pre>&lt;CodeBlock<br> {...props}<br>/&gt;</pre>`
)

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
        plugins={[<CodePlugin />, <CodeBlockPlugin />]}
        defaultValue={defaultValue}
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
