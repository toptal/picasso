import type { ChangeEvent } from 'react'
import React from 'react'
import { Button, Container } from '@toptal/picasso'

const handleClick = (_: ChangeEvent<HTMLInputElement>, value: boolean) =>
  alert(value)

const Example = () => (
  <Container>
    <Button.Checkbox size='small' onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox size='medium' onChange={handleClick}>
      Button
    </Button.Checkbox>
    <Button.Checkbox size='large' onChange={handleClick}>
      Button
    </Button.Checkbox>
  </Container>
)

export default Example
