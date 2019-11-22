import React, { useState } from 'react'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = [
  { code: 'AF', country: 'Afghanistan' },
  { code: 'AI', country: 'Aland Islands' },
  { code: 'ALB', country: 'Albania' },
  { code: 'ALG', country: 'Algeria' },
  { code: 'BY', country: 'Belarus' },
  { code: 'HR', country: 'Croatia' },
  { code: 'LU', country: 'Lithuania' },
  { code: 'SK', country: 'Slovakia' },
  { code: 'SP', country: 'Spain' },
  { code: 'UA', country: 'Ukraine' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item =>
  item && item.country ? item.country : EMPTY_INPUT_VALUE
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
          setValue([...value, { code: newValue, country: newValue }])
        }}
      />
    </div>
  )
}

export default TagSelectorDefaultExample
