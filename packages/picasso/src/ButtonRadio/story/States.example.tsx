import React, { ChangeEvent } from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Radio hovered onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio focused onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio active onChange={handleClick}>
      Button
    </Button.Radio>
    <Button.Radio disabled onChange={handleClick}>
      Button
    </Button.Radio>
  </Container>
)

export default Example
