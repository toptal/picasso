import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { Search16 } from '@toptal/picasso/Icon'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom='small'>
        <Input icon={<Search16 />} value={value} onChange={handleChange} />
      </Container>
      <Container bottom='small'>
        <Input
          disabled
          icon={<Search16 />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
        <Input
          iconPosition='end'
          icon={<Search16 />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
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
