import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const SelectWithIconExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom='small'>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Cog />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container bottom='small'>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          iconPosition='end'
          icon={<Cog />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container bottom='small'>
        <Select
          disabled
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Cog />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default SelectWithIconExample
