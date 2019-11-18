import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
const useInputValue = defaultValue => {
  const [value, setValue] = useState(defaultValue)
  const handleChange = event => {
    setValue(event.target.value)
  }
  return [value, handleChange]
}
const InputWithLimitExample = () => {
  const [inputRemainingValue, handleInputRemainingChange] = useInputValue(
    'Polonius, Hamlet'
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
  return React.createElement(
    Container,
    { flex: true, direction: 'column' },
    React.createElement(
      Container,
      { padded: 'small' },
      React.createElement(
        Typography,
        { variant: 'heading', size: 'small' },
        'Remaining chars counter:'
      ),
      React.createElement(
        Container,
        { top: 'small', bottom: 'small' },
        React.createElement(Input, {
          limit: 10,
          value: inputRemainingValue,
          onChange: handleInputRemainingChange
        })
      ),
      React.createElement(
        Container,
        null,
        React.createElement(Input, {
          limit: 10,
          multiline: true,
          rows: 4,
          value: textAreaRemainingValue,
          onChange: handleTextareaRemainingChange
        })
      )
    ),
    React.createElement(
      Container,
      { padded: 'small' },
      React.createElement(
        Typography,
        { variant: 'heading', size: 'small' },
        'Entered chars counter:'
      ),
      React.createElement(
        Container,
        { top: 'small', bottom: 'small' },
        React.createElement(Input, {
          counter: 'entered',
          value: inputEnteredValue,
          onChange: handleInputEnteredChange
        })
      ),
      React.createElement(
        Container,
        null,
        React.createElement(Input, {
          counter: 'entered',
          multiline: true,
          rows: 4,
          value: textAreaEnteredValue,
          onChange: handleTextareaEnteredChange
        })
      )
    )
  )
}
export default InputWithLimitExample
//# sourceMappingURL=WithLimit.example.js.map
