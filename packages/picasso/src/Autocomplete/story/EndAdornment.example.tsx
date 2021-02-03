import React, { useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Form,
  Container,
  Dropdown,
  Menu,
  Typography
} from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

const allOptions = [{ text: 'Belarus' }]

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
          endAdornment={<SimpleMenu />}
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

const categories = [
  { name: 'first category', label: 'first category' },
  { name: 'second category', label: 'second category' }
]
const SimpleMenu = () => {
  return (
    <Dropdown
      content={
        <Menu data-testid='search-categories-dropdown'>
          {categories.map(category => {
            const { label, name } = category

            return <Menu.Item key={name}>{label || name}</Menu.Item>
          })}
        </Menu>
      }
    >
      <Typography color='grey' size='small' noWrap>
        <Container as='span'>Menu</Container>
      </Typography>
    </Dropdown>
  )
}

export default Example
