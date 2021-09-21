import React from 'react'
import { Button, Container } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Button.Checkbox size='small' onChange={(_, value) => alert(value)}>
      Button
    </Button.Checkbox>
    <Button.Checkbox onChange={(_, value) => alert(value)}>
      Button
    </Button.Checkbox>
    <Button.Checkbox size='large' onChange={(_, value) => alert(value)}>
      Button
    </Button.Checkbox>
  </Container>
)

export default Example
