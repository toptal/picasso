import React, { useState } from 'react'
import {
  TagSelector,
  AutocompleteItem,
  Typography,
  Container
} from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

interface Country extends AutocompleteItem {
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
const getDisplayValue = (item: AutocompleteItem | null) =>
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
        getKey={(item: AutocompleteItem) => (item as Country).code}
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
        onChange={(selectedValues: AutocompleteItem[]) => {
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
