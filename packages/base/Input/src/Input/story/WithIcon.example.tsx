import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Search16 } from '@toptal/picasso/Icon'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom={SPACING_4}>
        <Input icon={<Search16 />} value={value} onChange={handleChange} />
      </Container>
      <Container bottom={SPACING_4}>
        <Input
          disabled
          icon={<Search16 />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Input
          iconPosition='end'
          icon={<Search16 />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Input
          iconPosition='end'
          icon={<Search16 />}
          placeholder='Placeholder'
          onChange={handleChange}
        />
      </Container>
    </Container>
  )
}

export default Example
