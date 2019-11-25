import React, { useState } from 'react'
import { TagSelector, Typography, Container } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'
import { Item } from '@toptal/picasso/TagSelector'

interface Country extends Item {
  country: string
  capital: string
  code: string
}

const allOptions: Country[] = [
  { country: 'Belarus', capital: 'Minsk', code: 'BE' },
  { country: 'Croatia', capital: 'Zagreb', code: 'HR' },
  { country: 'Lithuania', capital: 'Vilnius', code: 'LU' },
  { country: 'Slovakia', capital: 'Bratislava', code: 'SK' },
  { country: 'Ukraine', capital: 'Kyiv', code: 'UA' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: Item | null) =>
  (item && (item as Country).country) || EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const TagSelectorCustomOptionRendererExample = () => {
  const [options, setOptions] = useState(allOptions)
  const [value, setValue] = useState<Country[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getKey={(item: Item) => (item as Country).code}
        getDisplayValue={getDisplayValue}
        renderOption={(option: Partial<Country>, index?: number) => (
          <Container>
            <Typography size='medium' weight='semibold'>
              {option.country}
            </Typography>
            <Typography size='inherit' style={{ fontSize: '12px' }}>
              {option.capital} ({index})
            </Typography>
          </Container>
        )}
        onChange={(selectedValues: Item[]) => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues as Country[])
        }}
        onInputChange={(newInputValue: string) => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
        showOtherOption
        onOtherOptionSelect={(newValue: string) => {
          console.log('onOtherOptionSelect returns item value:', newValue)
          setValue([
            ...value,
            {
              country: newValue,
              code: newValue.substring(0, 2).toUpperCase(),
              capital: 'Unknown'
            }
          ])
        }}
      />
    </div>
  )
}

export default TagSelectorCustomOptionRendererExample
