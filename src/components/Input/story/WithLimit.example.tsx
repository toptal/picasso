import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

const InputWithLimitExample = () => {
  const [value, setValue] = useState('Text')
  const [textAreaValue, setTextAreaValue] = useState('Text')

  const handleChange: InputProps['onChange'] = event => {
    setValue(event.target.value)
  }

  const handleTextareaChange: InputProps['onChange'] = event => {
    setTextAreaValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom='small'>
        <Input limit={10} value={value} onChange={handleChange} />
      </Container>

      <Container>
        <Input
          limit={10}
          multiline
          rows={4}
          value={textAreaValue}
          onChange={handleTextareaChange}
        />
      </Container>
    </Container>
  )
}

export default InputWithLimitExample
