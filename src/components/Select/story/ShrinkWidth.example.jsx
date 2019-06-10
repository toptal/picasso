import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const SelectDefaultExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='ID'
          width='shrink'
        />
      </Container>
      <Container right='small'>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Cog />}
          placeholder='ID'
          width='shrink'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' }
]

export default SelectDefaultExample
