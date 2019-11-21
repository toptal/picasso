import React, { useState } from 'react'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = [
  { value2: 'AF', text2: 'Afghanistan' },
  { value2: 'AI', text2: 'Aland Islands' },
  { value2: 'ALB', text2: 'Albania' },
  { value2: 'ALG', text2: 'Algeria' },
  { value2: 'BY', text2: 'Belarus' },
  { value2: 'HR', text2: 'Croatia' },
  { value2: 'LU', text2: 'Lithuania' },
  { value2: 'SK', text2: 'Slovakia' },
  { value2: 'SP', text2: 'Spain' },
  { value2: 'UA', text2: 'Ukraine' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item =>
  item && item.text2 ? item.text2 : EMPTY_INPUT_VALUE
const filterOptions = value =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const TagSelectorDefaultExample = () => {
  const [options, setOptions] = useState(allOptions)
  const [value, setValue] = useState([])
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
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
        showOtherOption
        onOtherOptionSelect={newValue => {
          console.log('onOtherOptionSelect returns item object:', newValue)
          setValue([...value, { value2: newValue, text2: newValue }])
        }}
      />
    </div>
  )
}

export default TagSelectorDefaultExample
