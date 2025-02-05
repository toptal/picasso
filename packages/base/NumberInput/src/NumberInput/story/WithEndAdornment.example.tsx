import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container, Typography } from '@toptal/picasso'

const WithEndAdornmentExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
        endAdornment={<Typography color='dark-grey'>$/hr</Typography>}
      />
    </Container>
  )
}

export default WithEndAdornmentExample
