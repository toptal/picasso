import React, { useState } from 'react'
import { Autocomplete } from '@toptal/picasso/lab'

const optionsList = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item => (item ? item.text : EMPTY_INPUT_VALUE)
const isSubstring = (subStr, str) =>
  str.toLowerCase().includes(subStr.trim().toLowerCase())

const AutocompleteDefaultExample = () => {
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(optionsList)

  return (
    <div>
      <Autocomplete
        placeholder='Start typing country...'
        value={value}
        options={options}
        onSelect={item => {
          console.log('onSelect returns item object:', item)

          const itemValue = getDisplayValue(item)

          if (value !== itemValue) {
            setValue(itemValue)
          }
        }}
        onChange={value => {
          console.log('onChange returns just item value:', value)

          const filteredOptions =
            value !== ''
              ? optionsList.filter(option =>
                  isSubstring(value, getDisplayValue(option))
                )
              : optionsList

          setOptions(filteredOptions)

          setValue(value)
        }}
        getDisplayValue={getDisplayValue}
      />
    </div>
  )
}

export default AutocompleteDefaultExample
