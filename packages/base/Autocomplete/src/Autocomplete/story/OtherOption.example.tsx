import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  item ? item.text || '' : EMPTY_INPUT_VALUE
const filterOptions = (str: string) =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const Example = () => {
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(allOptions)

  return (
    <div>
      <Autocomplete
        value={value}
        showOtherOption
        placeholder='Start typing country...'
        options={options}
        onSelect={item => {
          console.log('onSelect returns item object:', item)

          const itemValue = getDisplayValue(item)

          if (value !== itemValue) {
            setValue(itemValue)
          }
        }}
        onOtherOptionSelect={newValue => {
          console.log('onOtherOptionSelect returns item value:', newValue)
          setValue(newValue)
          setOptions(filterOptions(newValue))
        }}
        onChange={newValue => {
          console.log('onChange returns just item value:', newValue)

          setOptions(filterOptions(newValue))
          setValue(newValue)
        }}
        getDisplayValue={getDisplayValue}
        otherOptionText='Search for: '
      />
    </div>
  )
}

export default Example
