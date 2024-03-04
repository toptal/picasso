import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='ID'
          width='shrink'
          menuWidth='200px'
          data-testid='trigger'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' },
]

export default Example
