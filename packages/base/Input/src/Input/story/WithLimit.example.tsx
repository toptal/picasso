import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

type ChangeHandler = (event: React.ChangeEvent<{ value: string }>) => void

const useInputValue = (defaultValue: string): [string, ChangeHandler] => {
  const [value, setValue] = useState(defaultValue)

  const handleChange: ChangeHandler = event => {
    setValue(event.target.value)
  }

  return [value, handleChange]
}

const InputWithLimitExample = () => {
  const [inputRemainingValue, handleInputRemainingChange] =
    useInputValue('Polonius, Hamlet')
  const [textAreaRemainingValue, handleTextareaRemainingChange] = useInputValue(
    'Brevity is the soul of wit...'
  )
  const [inputEnteredValue, handleInputEnteredChange] =
    useInputValue('Bruce Wayne')
  const [textAreaEnteredValue, handleTextareaEnteredChange] = useInputValue(
    "It's not who I am underneath, but what I do that defines me."
  )

  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Remaining chars counter:
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
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

      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Entered chars counter:
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
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
