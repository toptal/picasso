import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete, Form } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Finland' },
  { text: 'Lithuania' },
  { text: 'Micronesia' },
  { text: 'Moldova' },
  { text: 'Monaco' },
  { text: 'Mongolia' },
  { text: 'Norway' },
  { text: 'Slovakia' },
  { text: 'Spain' },
  { text: 'Sweden' },
  { text: 'Switzerland' },
  { text: 'Ukraine' },
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  item ? item.text || '' : EMPTY_INPUT_VALUE

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
  const [options, setOptions] = useState<AutocompleteItem[] | null>(allOptions)

  return (
    <div>
      <Form autoComplete='off'>
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
          data-testid='autocomplete'
        />
      </Form>
    </div>
  )
}

export default Example
