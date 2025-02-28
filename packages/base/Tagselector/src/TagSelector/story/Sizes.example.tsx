import React, { useState } from 'react'
import type { AutocompleteItem, TagSelectorProps } from '@toptal/picasso'
import { Container, TagSelector, Typography } from '@toptal/picasso'
import { isSubstring, SPACING_4 } from '@toptal/picasso-utils'

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
  { value: 'UA', text: 'Ukraine' },
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

const filterOptions = (str = '') => {
  if (str === '') {
    return allOptions
  }

  const result = allOptions.filter(option =>
    isSubstring(str, getDisplayValue(option))
  )

  return result.length > 0 ? result : null
}

const TagSelectWithSize = ({
  size,
  value,
  options,
  inputValue,
  onChange,
  onInputChange,
}: TagSelectorProps) => (
  <TagSelector
    size={size}
    data-testid='component'
    options={options}
    placeholder='Start typing...'
    value={value}
    inputValue={inputValue}
    getDisplayValue={getDisplayValue}
    onChange={onChange}
    onInputChange={onInputChange}
  />
)

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | null>(allOptions)
  const [value, setValue] = useState<AutocompleteItem[]>([
    allOptions[0],
    allOptions[1],
    allOptions[2],
  ])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  const onChange = selectedValues => {
    window.console.log('onChange values: ', selectedValues)
    setValue(selectedValues)
  }

  const onInputChange = newInputValue => {
    window.console.log('onInputChange value: ', newInputValue)
    setInputValue(newInputValue)
    setOptions(filterOptions(newInputValue))
  }

  return (
    <div>
      {(['medium', 'large'] as const).map(size => (
        <Container key={size} bottom={SPACING_4}>
          <Typography variant='body' titleCase>
            {size}
          </Typography>
          <TagSelectWithSize
            options={options}
            size={size}
            value={value}
            inputValue={inputValue}
            onChange={onChange}
            onInputChange={onInputChange}
          />
        </Container>
      ))}
    </div>
  )
}

export default Example
