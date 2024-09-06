import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector } from '@toptal/picasso'

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  item && item.text ? item.text : EMPTY_INPUT_VALUE

const Example = () => {
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        options={null}
        noOptionsText={null}
        placeholder='Type and press Enter to select...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onOtherOptionSelect={otherOption => {
          setValue([...value, { value: otherOption, text: otherOption }])
        }}
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
        }}
      />
    </div>
  )
}

export default Example
