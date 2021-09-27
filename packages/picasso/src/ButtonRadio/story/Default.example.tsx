import React, { ChangeEvent } from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Radio size='small' onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio size='medium' onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio size='large' onChange={handleClick}>
      Button
    </Button.Radio>
  </Container>
)

export default Example
