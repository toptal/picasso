import React, { useState } from 'react'
import { TextEditor } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(
    '<p>Look at my test, my test is amazing!</p>'
  )

  return (
    <>
      <Container style={{ height: '300px' }}>
        <TextEditor
          id='foobar'
          onChange={setValue}
          placeholder='Write some cool rich text'
          value={value}
          autoFocus={false}
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
