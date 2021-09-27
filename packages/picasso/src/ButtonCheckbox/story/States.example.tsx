import React, { ChangeEvent } from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Checkbox hovered onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox focused onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox active onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox disabled onChange={handleClick}>
      Button
    </Button.Checkbox>
  </Container>
)

export default Example
