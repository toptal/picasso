import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container, FormLabel } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const SizesExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <Container padded={SPACING_4}>
        <FormLabel htmlFor='small-number-input'>Small</FormLabel>
        <NumberInput
          id='small-number-input'
          value={value}
          size='small'
          onChange={handleChange}
          step='1'
          max='100'
          min='-100'
        />
      </Container>

      <Container padded={SPACING_4}>
        <FormLabel htmlFor='medium-number-input'>Medium (default)</FormLabel>
        <NumberInput
          id='medium-number-input'
          value={value}
          size='medium'
          onChange={handleChange}
          step='1'
          max='100'
          min='-100'
        />
      </Container>

      <Container padded={SPACING_4}>
        <FormLabel htmlFor='large-number-input'>Large</FormLabel>
        <NumberInput
          id='large-number-input'
          value={value}
          size='large'
          onChange={handleChange}
          step='1'
          max='100'
          min='-100'
        />
      </Container>
    </Container>
  )
}

export default SizesExample
