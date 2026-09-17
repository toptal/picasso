import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => {
  const [value, setValue] = useState<string>('1')

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
          placeholder='Sort by'
          width='shrink'
        />
      </Container>
      <Container right={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Settings16 />}
          placeholder='Sort by'
          width='shrink'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Newest first' },
  { value: '2', text: 'Oldest first' },
  { value: '3', text: 'A-Z' },
  { value: '4', text: 'Z-A' },
]

export default Example
