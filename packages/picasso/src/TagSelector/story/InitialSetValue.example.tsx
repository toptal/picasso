import React, { useState } from 'react'
import { TagSelector, AutocompleteItem } from '@toptal/picasso'
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
  item && item.text ? item.text : EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | undefined>(
    allOptions
  )
  const [value, setValue] = useState<AutocompleteItem[]>(allOptions.slice(0, 3))
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
      />
    </div>
  )
}

export default Example
