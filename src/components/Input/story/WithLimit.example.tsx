import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

const useInputValue = (
  defaultValue: string
): [string, InputProps['onChange']] => {
  const [value, setValue] = useState(defaultValue)

  const handleChange: InputProps['onChange'] = event => {
    setValue(event.target.value)
  }

  return [value, handleChange]
}

const InputWithLimitExample = () => {
  const [inputRemainingValue, handleInputRemainingChange] = useInputValue(
    'Polonius, Hamler'
  )
  const [textAreaRemainingValue, handleTextareaRemainingChange] = useInputValue(
    'Brevity is the soul of wit...'
  )
  const [inputEnteredValue, handleInputEnteredChange] = useInputValue(
    'Bruce Wayne'
  )
  const [textAreaEnteredValue, handleTextareaEnteredChange] = useInputValue(
    "It's not who I am underneath, but what I do that defines me."
  )

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Remaining chars counter:
        </Typography>
        <Container top='small' bottom='small'>
          <Input
            limit={10}
            value={inputRemainingValue}
            onChange={handleInputRemainingChange}
          />
        </Container>

        <Container>
          <Input
            limit={10}
            multiline
            rows={4}
            value={textAreaRemainingValue}
            onChange={handleTextareaRemainingChange}
          />
        </Container>
      </Container>

      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Entered chars counter:
        </Typography>
        <Container top='small' bottom='small'>
          <Input
            counter='entered'
            value={inputEnteredValue}
            onChange={handleInputEnteredChange}
          />
        </Container>

        <Container>
          <Input
            counter='entered'
            multiline
            rows={4}
            value={textAreaEnteredValue}
            onChange={handleTextareaEnteredChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default InputWithLimitExample
