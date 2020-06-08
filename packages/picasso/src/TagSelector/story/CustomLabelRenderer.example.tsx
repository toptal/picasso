import React, { useState } from 'react'
import { TagSelector, Link } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'
import { Item } from '@toptal/picasso/TagSelector'

interface Country extends Item {
  country: string
  capital: string
  code: string
  required?: boolean
  href?: string
}

const allOptions: Country[] = [
  {
    country: 'Belarus',
    capital: 'Minsk',
    code: 'BE',
    required: true,
    href: 'https://en.wikipedia.org/wiki/Belarus'
  },
  {
    country: 'Croatia',
    capital: 'Zagreb',
    code: 'HR',
    href: 'https://en.wikipedia.org/wiki/Croatia'
  },
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
        renderLabel={({ item, displayValue, onDelete }) => {
          const { href, required } = item as Country

          return (
            <TagSelector.Label onDelete={required ? undefined : onDelete}>
              {href ? <Link href={href}>{displayValue}</Link> : displayValue}
            </TagSelector.Label>
          )
        }}
        onChange={(selectedValues: Item[]) => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues as Country[])
        }}
        onInputChange={(newInputValue: string) => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
      />
    </div>
  )
}

export default TagSelectorCustomOptionRendererExample
