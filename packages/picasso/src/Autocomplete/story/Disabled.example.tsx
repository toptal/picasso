import React, { useState } from 'react'
import { Autocomplete, AutocompleteItem, Form } from '@toptal/picasso'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  item ? item.text || '' : EMPTY_INPUT_VALUE

const Example = () => {
  const [value] = useState(EMPTY_INPUT_VALUE)
  const [options] = useState<AutocompleteItem[] | null>(allOptions)

  return (
    <div>
      <Form autoComplete='off'>
        <Autocomplete
          disabled
          placeholder='Start typing country...'
          value={value}
          options={options}
          getDisplayValue={getDisplayValue}
          data-testid='autocomplete'
        />
      </Form>
    </div>
  )
}

export default Example
