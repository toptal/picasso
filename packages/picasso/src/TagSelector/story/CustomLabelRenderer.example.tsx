import React, { useState, AnchorHTMLAttributes } from 'react'
import { TagSelector, AutocompleteItem, Link, TagProps } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

interface Country extends AutocompleteItem {
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
  {
    country: 'Lithuania',
    capital: 'Vilnius',
    code: 'LU',
    href: 'https://en.wikipedia.org/wiki/Lithuania',
    required: true
  },
  {
    country: 'Slovakia',
    capital: 'Bratislava',
    code: 'SK',
    href: 'https://en.wikipedia.org/wiki/Slovakia'
  },
  {
    country: 'Ukraine',
    capital: 'Kyiv',
    code: 'UA',
    href: 'https://en.wikipedia.org/wiki/Ukraine'
  }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  (item && (item as Country).country) || EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const TagLink = (props: TagProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <TagSelector.Label as={Link} {...props} />
)

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
        renderLabel={({ item, displayValue, disabled, onDelete }) => {
          const { href, required } = item as Country

          return (
            <TagLink
              disabled={disabled}
              onDelete={required ? undefined : onDelete}
              href={href}
            >
              {displayValue}
            </TagLink>
          )
        }}
        onChange={(selectedValues: AutocompleteItem[]) => {
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
