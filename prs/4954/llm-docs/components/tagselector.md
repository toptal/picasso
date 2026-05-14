# TagSelector

Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.

## Props

### TagSelector

| Name | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | `string` | - | Placeholder for value |
| disabled | `boolean` | - | Disables `TagSelector` |
| status | `"error" \| "success" \| "warning" \| "default"` | `default` | Indicate `TagSelector` status |
| loading | `boolean` | `false` | Shows the loading icon when options are loading |
| otherOptionLabel | `string` | `Add new option:` | Text prefix for other option |
| onOtherOptionSelect | `((value: string) => void)` | - | Callback invoked when other option selected |
| submitOtherOptionOnEnter | `boolean` | - | Select other option on Enter key press |
| showOtherOption | `boolean` | `false` | Allow to show the other option in the list of options |
| noOptionsText | `string \| null` | `No matches found` | Label to show when no options were found (pass "null" to hide label completely) |
| options | `Item[] \| null` | `[]` | List of options with unique labels |
| value | `Item[]` | - | The list of values of the selected options, required for a controlled component. |
| getDisplayValue | `((item: Item \| null) => string)` | `(item: Item \| null) =>
  (item && item.text) \|\| EMPTY_INPUT_VALUE` | A function that takes a display value from the option item |
| onChange | `((value: Item[]) => void)` | - | Callback invoked when selection changes |
| closeOnSelect | `boolean` | `true` | Whether to close popper upon selection |
| inputValue | `string` | - | The value of the `input` element, required for a controlled component. |
| onInputChange | `((inputValue: string) => void)` | - | Callback invoked when `input` element value is changed |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Focus event handler |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Blur event handler |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| enableAutofill | `boolean` | `false` | Specifies whether the autofill enabled or not, disabled by default |
| getKey | `((item: Item) => string)` | - | Provide unique key for each option |
| renderOption | `((option: Item, index: number) => ReactNode)` | - | Callback responsible for rendering the option given the option and its index in the list of options |
| renderLabel | `((props: { item: Item; displayValue: string; onDelete: () => void; disabled?: boolean; }) => ReactNode)` | - | Callback responsible for rendering the label given the option and Label props |
| size | `"medium" \| "large"` | `medium` | Component size |
| popperContainer | `HTMLElement` | - | DOM element that wraps the Popper |
| popperOptions | `PopperOptions` | - | Options provided to the popper.js instance |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### TagSelector.Label

Tag Selector Label

| Name | Type | Default | Description |
|------|------|---------|-------------|
| as | `ElementType<any>` | - | The component used for the root node. Either a string to use a DOM element or a component. |
| children | `ReactNode` | - | Text content of the `Tag` component |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Specify the icon which should be rendered inside Tag |
| disabled | `boolean` | - | Defines if `Tag` is disabled |
| onDelete | `(() => void)` | - | A callback which is invoked after remove `Icon` is clicked  Please note that specifying this callback automatically adds remove `Icon` as children of the `Tag` |
| variant | `"light-grey" \| "blue" \| "green" \| "yellow" \| "red"` | - | Variant of the `Tag` |
| endAdornment | `ReactNode` | - | ReactNode rendered after label |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | null>(allOptions)
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        data-testid='component'
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
      />
    </div>
  )
}

export default Example
```

### Other option

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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
  item && item.text ? item.text : EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | undefined>(
    allOptions
  )
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
        showOtherOption
        onOtherOptionSelect={newValue => {
          console.log('onOtherOptionSelect returns item value:', newValue)
          setValue([...value, { value: newValue, text: newValue }])
        }}
      />
    </div>
  )
}

export default Example
```

### Other option submission on Enter

Press Enter to submit other option value. Combine it with empty `options` and `noOptionsText` properties to hide the options dropdown and achieve regular input behavior and look.

```tsx
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
```

### Initially set value

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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
  item && item.text ? item.text : EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | undefined>(
    allOptions
  )
  const [value, setValue] = useState<AutocompleteItem[]>(allOptions.slice(0, 3))
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
      />
    </div>
  )
}

export default Example
```

### With closeOnSelect disabled

Disabling closeOnSelect can be useful when the user always have to select multiple values at the same time

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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

const Example = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | null>(allOptions)
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div>
      <TagSelector
        data-testid='component'
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        closeOnSelect={false}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
      />
    </div>
  )
}

export default Example
```

### Custom option rendering

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector, Typography, Container } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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
  { country: 'Ukraine', capital: 'Kyiv', code: 'UA' },
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
              capital: 'Unknown',
            },
          ])
        }}
      />
    </div>
  )
}

export default TagSelectorCustomOptionRendererExample
```

### Custom label rendering

```tsx
import type { AnchorHTMLAttributes } from 'react'
import React, { useState } from 'react'
import type { AutocompleteItem, TagProps } from '@toptal/picasso'
import { TagSelector, Link } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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
    href: 'https://en.wikipedia.org/wiki/Belarus',
  },
  {
    country: 'Croatia',
    capital: 'Zagreb',
    code: 'HR',
    href: 'https://en.wikipedia.org/wiki/Croatia',
  },
  {
    country: 'Lithuania',
    capital: 'Vilnius',
    code: 'LU',
    href: 'https://en.wikipedia.org/wiki/Lithuania',
    required: true,
  },
  {
    country: 'Slovakia',
    capital: 'Bratislava',
    code: 'SK',
    href: 'https://en.wikipedia.org/wiki/Slovakia',
  },
  {
    country: 'Ukraine',
    capital: 'Kyiv',
    code: 'UA',
    href: 'https://en.wikipedia.org/wiki/Ukraine',
  },
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  (item && (item as Country).country) || EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const LinkTag = (props: TagProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
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
            <LinkTag
              disabled={disabled}
              onDelete={required ? undefined : onDelete}
              href={href}
            >
              {displayValue}
            </LinkTag>
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
```

### Loading

```tsx
import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' },
]

const Example = () => (
  <div>
    <TagSelector placeholder='Loading state...' options={options} loading />
  </div>
)

export default Example
```

### Disabled

```tsx
import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Kyrgyzstan', value: 'KG' },
]

const Example = () => (
  <div>
    <TagSelector options={options} value={options} disabled />
  </div>
)

export default Example
```

### Full width

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { TagSelector } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

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
  item && item.text ? item.text : EMPTY_INPUT_VALUE
const filterOptions = (value: string) =>
  value !== ''
    ? allOptions.filter(option => isSubstring(value, getDisplayValue(option)))
    : allOptions

const TagSelectorFullWidth = () => {
  const [options, setOptions] = useState<AutocompleteItem[] | undefined>(
    allOptions
  )
  const [value, setValue] = useState<AutocompleteItem[]>([])
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)

  return (
    <div className='find-me'>
      <TagSelector
        width='full'
        data-testid='component'
        options={options}
        placeholder='Start typing...'
        value={value}
        inputValue={inputValue}
        getDisplayValue={getDisplayValue}
        onChange={selectedValues => {
          window.console.log('onChange values: ', selectedValues)
          setValue(selectedValues)
        }}
        onInputChange={newInputValue => {
          window.console.log('onInputChange value: ', newInputValue)
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
      />
    </div>
  )
}

export default TagSelectorFullWidth
```

### Status

```tsx
import React from 'react'
import { Container, TagSelector, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const value = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
]

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography>Default</Typography>
        <TagSelector placeholder='default' status='default' value={value} />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Error</Typography>
        <Container flex gap={'small'}>
          <TagSelector placeholder='error' status='error' value={value} />
          <TagSelector
            placeholder='error'
            status='error'
            value={[
              ...value,
              { value: 'CZE', text: 'Czech Republic', status: 'error' },
            ]}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Warning</Typography>
        <TagSelector placeholder='warning' status='warning' value={value} />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Success with long placeholder</Typography>
        <TagSelector placeholder='Very long placeholder' status='success' />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Success on one line</Typography>
        <TagSelector
          placeholder='success'
          status='success'
          value={value.slice(0, 2)}
        />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Success</Typography>
        <TagSelector placeholder='success' status='success' value={value} />
      </Container>
    </Container>
  )
}

export default Example
```

### Sizes

```tsx
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
```
