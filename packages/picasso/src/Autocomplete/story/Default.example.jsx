import React, { useState } from 'react'
import { Autocomplete, Form } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = ['Belarus', 'Croatia', 'Lithuania', 'Slovakia', 'Ukraine']

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item => item || EMPTY_INPUT_VALUE
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
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(allOptions)

  return (
    <div>
      <Form autoComplete='off'>
        <Autocomplete
          placeholder='Start typing country...'
          value={value}
          options={options}
          onSelect={item => {
            console.log('onSelect returns item value:', item)
            setValue(item)
          }}
          onChange={newValue => {
            console.log('onChange returns input value:', newValue)

            setOptions(filterOptions(newValue))
            setValue(newValue)
          }}
          getDisplayValue={getDisplayValue}
        />
      </Form>
    </div>
  )
}

export default Example
