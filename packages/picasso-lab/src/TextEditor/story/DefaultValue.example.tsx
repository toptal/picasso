import React, { useState } from 'react'
import { TextEditor, TextEditorChangeHandler } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string | undefined>(
    '<h3>Position Description</h3><p>We’re looking for hardworking, self-starting Designers for our Product Design team to help us define how talent interacts with Toptal. You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.</p><p>We’re looking for hardworking, self-starting Designers for our Product Design team to help us define how talent interacts with Toptal. You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.</p><h3>Requirements</h3><ol><li>Collaborate with PMs and other designers to ship your first product features.</li><li>Learn about our design system.</li></ol><h3>Requirements</h3><ul><li>Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.</li><li>An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.</li></ul>'
  )

  const handleChange: TextEditorChangeHandler = newValue => setValue(newValue)

  return (
    <>
      <Container style={{ height: '300px' }}>
        <TextEditor
          id='foobar'
          onChange={handleChange}
          placeholder='Write some cool rich text'
          value={value}
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
