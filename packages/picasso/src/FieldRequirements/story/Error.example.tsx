import React, { useState } from 'react'
import { Container, Input, FieldRequirements } from '@toptal/picasso'
import type { FieldRequirement } from '@toptal/picasso'

const requirements: FieldRequirement[] = [
  {
    message: 'Min 5 characters',
    validator: value => value.length >= 5
  },
  {
    message: 'Max 10 characters',
    validator: value => value.length < 10
  },
  { message: 'No space character', validator: value => !/\s/.test(value) }
]

const Example = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Input
        error
        value={value}
        onChange={event => setValue(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <FieldRequirements
        error
        style={{ maxWidth: 300 }}
        description='Please provide a value that fulfills the requirements'
        open={open}
        requirements={requirements}
        value={value}
      />
    </Container>
  )
}

export default Example
