import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso/utils'
import type { RichTextEditorChangeHandler } from '@toptal/picasso-rich-text-editor'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { htmlToHast } from '@toptal/picasso-rich-text-editor/utils'

const defaultValue =
  '<h3>Position Description</h3><p>We’re looking for hardworking, self-starting Designers for our <strong>Product Design</strong> team to help us define how talent interacts with Toptal.</p><p>You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.</p><h3>Requirements</h3><ol><li>Collaborate with PMs and other designers to ship your first product features.</li><li>Learn about our design system.</li></ol><h3>Requirements</h3><ul><li>Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.</li><li>An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.</li></ul>'

const Example = () => {
  const [value, setValue] = useState<string | undefined>(defaultValue)

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='defaultValueEditor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        defaultValue={htmlToHast(defaultValue)}
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
