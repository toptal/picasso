import React, { useState } from 'react'
import { TagSelector, AutocompleteItem, Container } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
  { value: 'ALG', text: 'Algeria' },
  { value: 'BY', text: 'Belarus' },
  { value: 'HR', text: 'Croatia' },
  { value: 'LU', text: 'Lithuania' },
  { value: 'SK', text: 'Slovakia' },
  { value: 'SP', text: 'Spain' },
  { value: 'UA', text: 'Ukraine' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE
const filterOptions = (str = '') => {
  if (str === '') {
    return allOptions
  }

  const result = allOptions.filter(option =>
    isSubstring(str, getDisplayValue(option))
  )

  return result.length > 0 ? result : null
}

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | null>(allOptions)
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <TagSelector
          options={options}
          placeholder='default'
          value={value}
          inputValue={inputValue}
          getDisplayValue={getDisplayValue}
          onChange={selectedValues => {
            window.console.log('onChange values: ', selectedValues)
            setValue(selectedValues)
          }}
          onInputChange={newInputValue => {
            window.console.log('onInputChange value: ', newInputValue)
            setInputValue(newInputValue)
            setOptions(filterOptions(newInputValue))
          }}
          status='default'
        />
      </Container>
      <Container padded='small'>
        <TagSelector
          options={options}
          placeholder='error'
          value={value}
          inputValue={inputValue}
          getDisplayValue={getDisplayValue}
          onChange={selectedValues => {
            window.console.log('onChange values: ', selectedValues)
            setValue(selectedValues)
          }}
          onInputChange={newInputValue => {
            window.console.log('onInputChange value: ', newInputValue)
            setInputValue(newInputValue)
            setOptions(filterOptions(newInputValue))
          }}
          status='error'
        />
      </Container>
      <Container padded='small'>
        <TagSelector
          options={options}
          placeholder='success'
          value={value}
          inputValue={inputValue}
          getDisplayValue={getDisplayValue}
          onChange={selectedValues => {
            window.console.log('onChange values: ', selectedValues)
            setValue(selectedValues)
          }}
          onInputChange={newInputValue => {
            window.console.log('onInputChange value: ', newInputValue)
            setInputValue(newInputValue)
            setOptions(filterOptions(newInputValue))
          }}
          status='success'
        />
      </Container>
    </Container>
  )
}

export default Example
