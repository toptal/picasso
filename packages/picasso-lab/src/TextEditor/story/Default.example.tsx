import React, { useState } from 'react'
import { TextEditor } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState()

  return (
    <>
      <Container style={{ height: '300px' }}>
        <TextEditor
          id='editor'
          onChange={setValue}
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
