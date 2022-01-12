import React, { useState } from 'react'
import { Item } from '@toptal/picasso/Autocomplete'
import { Typography, Container, Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const renderOtherOption = (value: string) => (
  <Typography size='medium' color='dark-grey' weight='semibold'>
    Search for: {value}
  </Typography>
)

type Country =
  | (Item & {
      country: string
      capital: string
      code?: string
    })
  | null

const EMPTY_INPUT_VALUE = ''

const allOptions: Country[] = [
  { country: 'Belarus', capital: 'Minsk', code: 'BE' },
  null,
  { country: 'Croatia', capital: 'Zagreb' },
  { country: 'Lithuania', capital: 'Vilnius', code: 'LU' },
  { country: 'Slovakia', capital: 'Bratislava', code: 'SK' },
  { country: 'Ukraine', capital: 'Kyiv', code: 'UA' }
]

const getDisplayValue = (item: Item | null) =>
  (item && (item as Country)?.country) ?? ''

const filterOptions = (str: string) =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const CustomOptionRenderer = () => {
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(allOptions)

  return (
    <div>
      <Autocomplete
        showOtherOption
        value={value}
        placeholder='Start typing country...'
        options={options as Item[]}
        getKey={item => (item as Country)?.code}
        renderOption={(option: Partial<Country>, index) =>
          option && (
            <Container>
              <Typography size='medium' weight='semibold'>
                {option.country}
              </Typography>
              <Typography size='inherit' style={{ fontSize: '12px' }}>
                {option.capital} ({index})
              </Typography>
            </Container>
          )
        }
        renderOtherOption={renderOtherOption}
        onSelect={(option: Partial<Country>) => {
          window.console.log('onSelect returns item object:', option)
          window.console.log('selected capital:', option?.capital)

          const itemValue = getDisplayValue(option)

          if (value !== itemValue) {
            setValue(itemValue)
          }
        }}
        onOtherOptionSelect={newValue => {
          setValue(newValue)
          setOptions(filterOptions(newValue))
        }}
        onChange={newValue => {
          setOptions(filterOptions(newValue))
          setValue(newValue)
        }}
      />
    </div>
  )
}

export default CustomOptionRenderer
