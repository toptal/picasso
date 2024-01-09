import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Settings16 />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          iconPosition='end'
          icon={<Settings16 />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Select
          disabled
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Settings16 />}
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
  { value: '4', text: 'Option 4' },
]

export default Example
