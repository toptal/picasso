import React, { useState } from 'react'
import { TagSelector } from '@toptal/picasso'
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
const getDisplayValue = item =>
  item && item.text ? item.text : EMPTY_INPUT_VALUE
const filterOptions = value =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const TagSelectorDefaultExample = () => {
  const [options, setOptions] = useState(allOptions)
  const [value, setValue] = useState(allOptions.slice(0, 3))
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onInputChange={inputValue => {
          window.console.log('onInputChange value: ', inputValue)
          setInputValue(inputValue)
          setOptions(filterOptions(inputValue))
        }}
      />
    </div>
  )
}

export default TagSelectorDefaultExample
