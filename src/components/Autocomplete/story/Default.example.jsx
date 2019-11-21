import React, { useState } from 'react'
import { Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = [
  { country: 'Belarus', code: 'BY' },
  { country: 'Croatia', code: 'HR' },
  { country: 'Lithuania', code: 'LU' },
  { country: 'Slovakia', code: 'SK' },
  { country: 'Ukraine', code: 'UA' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item => (item ? item.country : EMPTY_INPUT_VALUE)
const filterOptions = str =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const AutocompleteDefaultExample = () => {
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(allOptions)

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
        onChange={newValue => {
          console.log('onChange returns just item value:', newValue)

          setOptions(filterOptions(newValue))
          setValue(newValue)
        }}
        getDisplayValue={getDisplayValue}
      />
    </div>
  )
}

export default AutocompleteDefaultExample
