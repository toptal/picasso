import React, { useState } from 'react'
import { Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = ['Belarus', 'Croatia', 'Lithuania', 'Slovakia', 'Ukraine']

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item => item || EMPTY_INPUT_VALUE
const filterOptions = str =>
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
          setValue(item)
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
      />
    </div>
  )
}

export default Example
