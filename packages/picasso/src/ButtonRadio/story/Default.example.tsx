import React from 'react'
import { Button, Container } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Button.Radio size='small' onChange={(_, value) => alert(value)}>
      Button
    </Button.Radio>
    <Button.Radio onChange={(_, value) => alert(value)}>Button</Button.Radio>
    <Button.Radio size='large' onChange={(_, value) => alert(value)}>
      Button
    </Button.Radio>
  </Container>
)

export default Example
