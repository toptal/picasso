import React, { useState } from 'react'
import { Autocomplete } from '@toptal/picasso/lab'
import { isSubstring, useNotifications } from '@toptal/picasso/utils'

const allOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
  { text: 'Belarus2', value: 'BY2' },
  { text: 'Croatia2', value: 'HR2' },
  { text: 'Lithuania2', value: 'LU2' },
  { text: 'Slovakia2', value: 'SK2' },
  { text: 'Ukraine2', value: 'UA2' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item => (item ? item.text : EMPTY_INPUT_VALUE)
const filterOptions = str =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const AutocompleteDefaultExample = () => {
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(allOptions)

  const { showInfo } = useNotifications()

  return (
    <div>
      <Autocomplete
        placeholder='Start typing country...'
        value={value}
        options={options}
        onSelect={item => {
          console.log('onSelect returns item object:', item)

          const itemValue = getDisplayValue(item)

          showInfo(itemValue)

          if (value !== itemValue) {
            setValue(itemValue)
          }
        }}
        onChange={value => {
          console.log('onChange returns just item value:', value)

          setOptions(filterOptions(value))
          setValue(value)
        }}
        getDisplayValue={getDisplayValue}
      />
    </div>
  )
}

export default AutocompleteDefaultExample
