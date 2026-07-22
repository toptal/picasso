# Autocomplete

## Props

### Autocomplete

| Name | Type | Default | Description |
|------|------|---------|-------------|
| onChange | `((value: string, options: ChangedOptions) => void)` | `() => {}` | Callback invoked when `input` element value is changed |
| **value** | `string` | - | The value of the selected option, required for a controlled component. |
| disabled | `boolean` | `false` | Whether a component is disabled |
| onSelect | `((item: Item, event: MouseEvent<Element, MouseEvent> \| KeyboardEvent<Element>) => void)` | `() => {}` | Callback invoked when selection changes |
| closeOnSelect | `boolean` | - | Whether to close popper upon selection |
| onOtherOptionSelect | `((value: string, event: MouseEvent<Element, MouseEvent> \| KeyboardEvent<Element>) => void)` | `() => {}` | Callback invoked when other option selected |
| placeholder | `string` | - | Placeholder for value |
| width | `"full" \| "shrink" \| "auto"` | `auto` | Width of the component |
| menuWidth | `string` | - | Width of the menu |
| loading | `boolean` | `false` | Shows the loading icon when options are loading |
| showOtherOption | `boolean` | `false` | Allow to show the other option in the list of options |
| options | `[]: 
{

  text?: string

  value?: string

}
        ` | `[]` | List of options |
| getDisplayValue | `((item: Item \| null) => string)` | `(item: Item \| null) =>
  (item && item.text) \|\| EMPTY_INPUT_VALUE` | A function that takes a display value from the option item |
| onKeyDown | `((event: KeyboardEvent<HTMLInputElement>, inputValue: string) => void)` | `() => {}` | Callback invoked when key is pressed |
| onFocus | `FocusEventHandler<HTMLInputElement>` | `() => {}` | Focus event handler |
| onBlur | `FocusEventHandler<HTMLInputElement>` | `() => {}` | Blur event handler |
| startAdornment | `ReactNode` | - | ReactNode for labels that will be used as start InputAdornment - |
| endAdornment | `ReactNode` | - | ReactNode for labels that will be used as end InputAdornment - |
| status | `"error" \| "success" \| "warning" \| "default"` | `default` | Indicate `Autocomplete` status |
| icon | `ReactNode` | - | Specify icon which should be rendered inside Input |
| inputComponent | `ComponentType<InputProps>` | - | Custom input component |
| getKey | `((item: Item) => string)` | - | Provide unique key for each option |
| enableAutofill | `boolean` | `false` | Specifies whether the autofill enabled or not, disabled by default |
| enableReset | `boolean` | `true` | Whether to render reset icon when there is a value in the input |
| onResetClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | `() => {}` | Callback invoked when reset button was clicked |
| popperContainer | `HTMLElement` | - | DOM element that wraps the Popper |
| popperOptions | `PopperOptions` | - | Options provided to the popper.js instance |
| size | `"medium" \| "large"` | - | Component size |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| otherOptionText | `string` | `Other option:` | Text prefix for other option |
| renderOtherOption | `((value: string) => ReactNode)` | - | Callback responsible for rendering the other option given the input's value |
| noOptionsText | `string \| null` | `No options` | Label to show when no options were found (pass "null" to hide label completely) |
| renderOption | `((option: Item, index: number) => ReactNode)` | - | Callback responsible for rendering the option given the option and its index in the list of options |
| poweredByGoogle | `boolean` | `false` | Show the "Powered By Google" label |

Autocomplete supports all the default HTML native props, as Input supports.

  ### A note about browser autofilling

  Standard browser autofilling feature is disabled in this component by default, because it's used pretty rarely.
  You can enable it by specifying `enableAutofill` property. Keep in mind that to enable browser autofilling
  you most likely need to specify `name` property as well.

  If you're still experiencing browser autofilling and you want to get rid of it, try to wrap
  your **Autocomplete** component into `<Form>`, you can also specify `autoComplete='off'` on that **Form** component
  if needed.

  ```jsx
  <Form autoComplete='off'>
    <Autocomplete ... />
  </Form>
  ```

### Default

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete, Form } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Finland' },
  { text: 'Lithuania' },
  { text: 'Micronesia' },
  { text: 'Moldova' },
  { text: 'Monaco' },
  { text: 'Mongolia' },
  { text: 'Norway' },
  { text: 'Slovakia' },
  { text: 'Spain' },
  { text: 'Sweden' },
  { text: 'Switzerland' },
  { text: 'Ukraine' },
]

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

export default Example
```

### Disabled

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete, Form } from '@toptal/picasso'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
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
```

### Other option

By default Autocomplete allows any entered input value to stay after focus is removed from input,
      you can set `showOtherOption={true}` prop to allow also this new item to appear in the suggestions list. Also,
      you can decorate this option with the prefix text by using `otherOptionText` or fully customize it with `renderOtherOption` and handle selection with
      `onOtherOptionSelect` event handler.

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: AutocompleteItem | null) =>
  item ? item.text || '' : EMPTY_INPUT_VALUE
const filterOptions = (str: string) =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const Example = () => {
  const [value, setValue] = useState(EMPTY_INPUT_VALUE)
  const [options, setOptions] = useState(allOptions)

  return (
    <div>
      <Autocomplete
        value={value}
        showOtherOption
        placeholder='Start typing country...'
        options={options}
        onSelect={item => {
          console.log('onSelect returns item object:', item)

          const itemValue = getDisplayValue(item)

          if (value !== itemValue) {
            setValue(itemValue)
          }
        }}
        onOtherOptionSelect={newValue => {
          console.log('onOtherOptionSelect returns item value:', newValue)
          setValue(newValue)
          setOptions(filterOptions(newValue))
        }}
        onChange={newValue => {
          console.log('onChange returns just item value:', newValue)

          setOptions(filterOptions(newValue))
          setValue(newValue)
        }}
        getDisplayValue={getDisplayValue}
        otherOptionText='Search for: '
      />
    </div>
  )
}

export default Example
```

### Initially set value

```tsx
import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      onSelect={item => console.log('onSelect value:', item)}
      onChange={inputValue => console.log('onChange value:', inputValue)}
      value='Belarus'
    />
  </div>
)

export default Example
```

### Controlled selection

```tsx
import React, { useState } from 'react'
import { Button, Container, Grid, Autocomplete } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' },
]

const Example = () => {
  const [value, setValue] = useState(options[0].text)

  return (
    <div>
      <Autocomplete
        placeholder='Start typing country...'
        options={options}
        value={value}
        onSelect={item => {
          console.log('onSelect returns item object:', item)
          setValue(item.text || '')
        }}
        onChange={newValue => {
          console.log('onChange returns just item value:', newValue)
          setValue(newValue)
        }}
      />
      <Container top={SPACING_8}>
        <Grid>
          <Grid.Item>
            <Button
              onClick={() => {
                setValue(options[3].text)
              }}
            >
              Set to country in your profile: Slovakia
            </Button>
            <Button
              onClick={() => {
                setValue('')
              }}
              variant='secondary'
            >
              Reset
            </Button>
          </Grid.Item>
        </Grid>
      </Container>
    </div>
  )
}

export default Example
```

### Full width

```tsx
import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      value=''
      width='full'
    />
  </div>
)

export default Example
```

### Menu width

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete, Form } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

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
          menuWidth='400px'
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
          onChange={newValue => {
            console.log('onChange returns just item value:', newValue)

            setOptions(filterOptions(newValue))
            setValue(newValue)
          }}
          getDisplayValue={getDisplayValue}
          data-testid='trigger'
        />
      </Form>
    </div>
  )
}

export default Example
```

### Large size

```tsx
import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      value=''
      size='large'
    />
  </div>
)

export default Example
```

### Loading

```tsx
import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Loading state...'
      options={options}
      value=''
      loading
    />
  </div>
)

export default Example
```

### Status

```tsx
import React from 'react'
import { Autocomplete, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <Autocomplete value='Ukraine' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <Autocomplete value='Ukraine' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <Autocomplete value='Ukraine' status='warning' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <Autocomplete value='Ukraine' status='success' />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### With Icon

```tsx
import React from 'react'
import { Afternoon16, Autocomplete } from '@toptal/picasso'

const Example = () => (
  <div>
    <Autocomplete
      icon={<Afternoon16 />}
      placeholder='Autocomplete with icon...'
      value=''
    />
  </div>
)

export default Example
```

### With Adornments

```tsx
import React from 'react'
import { Autocomplete, BankWire16, Globe16 } from '@toptal/picasso'

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Autocomplete with icon...'
      value=''
      startAdornment={<Globe16 />}
      endAdornment={<BankWire16 />}
    />
  </div>
)

export default Example
```

### With Description

```tsx
import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', description: 'Population: 9.5M' },
  { text: 'Croatia', description: 'Population: 4M' },
  { text: 'Lithuania', description: 'Population: 3M' },
  { text: 'Slovakia', description: 'Population: 5.5M' },
  { text: 'Ukraine', description: 'Population: 42M' },
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      value=''
      data-testid='trigger'
    />
  </div>
)

export default Example
```

### Custom options rendering

```tsx
import React, { useState } from 'react'
import type { Item } from '@toptal/picasso/Autocomplete'
import { Typography, Container, Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const renderOtherOption = (value: string) => (
  <Typography size='medium' color='dark-grey' weight='semibold'>
    Search for: {value}
  </Typography>
)

interface Country extends Item {
  country: string
  capital: string
  code: string
}

const EMPTY_INPUT_VALUE = ''

const allOptions: Country[] = [
  { country: 'Belarus', capital: 'Minsk', code: 'BE' },
  { country: 'Croatia', capital: 'Zagreb', code: 'HR' },
  { country: 'Lithuania', capital: 'Vilnius', code: 'LU' },
  { country: 'Slovakia', capital: 'Bratislava', code: 'SK' },
  { country: 'Ukraine', capital: 'Kyiv', code: 'UA' },
]

const getDisplayValue = (item: Item | null) =>
  (item && (item as Country).country) || ''

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
        options={options}
        getKey={(item: Item) => (item as Country).code}
        renderOption={(option: Partial<Country>, index) => (
          <Container>
            <Typography size='medium' weight='semibold'>
              {option.country}
            </Typography>
            <Typography size='inherit' style={{ fontSize: '12px' }}>
              {option.capital} ({index})
            </Typography>
          </Container>
        )}
        renderOtherOption={renderOtherOption}
        onSelect={(option: Partial<Country>) => {
          window.console.log('onSelect returns item object:', option)
          window.console.log('selected capital:', option.capital)

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
```

### Dynamic options

If you need to obtain the list of options dynamically from a server.
It is good practice to set debouncing and a minimum number of chars to limit the number of requests you send to the server.
Start typing "Mongolia" letter by letter to see this example in action.

```tsx
import React, { useCallback, useState } from 'react'
import debounce from 'debounce'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const remoteOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Finland' },
  { text: 'Lithuania' },
  { text: 'Micronesia' },
  { text: 'Moldova' },
  { text: 'Monaco' },
  { text: 'Mongolia' },
  { text: 'Norway' },
  { text: 'Slovakia' },
  { text: 'Spain' },
  { text: 'Sweden' },
  { text: 'Switzerland' },
  { text: 'Ukraine' },
]

const MIN_CHARS = 2

const loadOptions = (inputValue: string) =>
  new Promise<AutocompleteItem[] | null>(resolve => {
    const filteredOptions = remoteOptions.filter(({ text }) =>
      isSubstring(inputValue, text)
    )

    const result = filteredOptions.length ? filteredOptions : null

    setTimeout(() => resolve(result), 1000)
  })

const Example = () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<AutocompleteItem[] | null>()
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounced = useCallback(
    debounce(async (inputValue: string) => {
      const newOptions = await loadOptions(inputValue.trim().toLowerCase())

      setLoading(false)
      setOptions(newOptions)
    }, 500),
    []
  )

  const handleChange = (
    inputValue: string,
    handleOptions: { isSelected: boolean }
  ) => {
    setValue(inputValue)

    if (handleOptions.isSelected) {
      return
    }

    if (inputValue.length >= MIN_CHARS) {
      setLoading(true)
      handleChangeDebounced(inputValue)
    } else {
      setLoading(false)
      setOptions(null)
      handleChangeDebounced.clear()
    }
  }

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        options={options}
        loading={loading}
        placeholder='Start typing Mongolia...'
        data-testid='autocomplete'
      />
    </div>
  )
}

export default Example
```

### Form auto filling

This example shows how to use component inside the form with several fields
when it makes sense to have autofill enabled.

```tsx
import React from 'react'
import { Form, Grid, Input, Typography, Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
]

const AutofillExample = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Typography variant='heading'>Autofill enabled for country</Typography>
      <Form>
        <Form.Field>
          <Form.Label>Address</Form.Label>
          <Input
            name='ship-address'
            width='full'
            autoComplete='shipping street-address'
            placeholder='123 Any Street'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>City</Form.Label>
          <Input
            placeholder='New York'
            name='ship-city'
            autoComplete='shipping locality'
            width='full'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Zip</Form.Label>
          <Input
            name='ship-zip'
            autoComplete='shipping postal-code'
            width='full'
            placeholder='10011'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Country</Form.Label>
          <Autocomplete
            value=''
            options={options}
            width='full'
            name='country'
            autoComplete='shipping country-name'
            placeholder='USA'
            enableAutofill
          />
        </Form.Field>
      </Form>
    </Grid.Item>

    <Grid.Item sm={5}>
      <Typography variant='heading'>Autofill disabled for country</Typography>
      <Form>
        <Form.Field>
          <Form.Label>Address</Form.Label>
          <Input
            name='ship-address'
            width='full'
            autoComplete='shipping street-address'
            placeholder='123 Any Street'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>City</Form.Label>
          <Input
            placeholder='New York'
            name='ship-city'
            autoComplete='shipping locality'
            width='full'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Zip</Form.Label>
          <Input
            name='ship-zip'
            autoComplete='shipping postal-code'
            width='full'
            placeholder='10011'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Country</Form.Label>
          <Autocomplete
            value=''
            options={options}
            width='full'
            name='country'
            autoComplete='shipping country-name'
            placeholder='USA'
          />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default AutofillExample
```

### Powered By Google label

```tsx
import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'United Kingdom of Great Britain and Ireland' },
]

const Example = () => (
  <Autocomplete
    value=''
    placeholder='Start typing country...'
    options={allOptions}
    poweredByGoogle
  />
)

export default Example
```

### With onResetClick callback

If you need to trigger a callback after Autocomplete input is cleared

```tsx
import React, { useState } from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { Autocomplete, Form } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso-utils'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
]

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
          onChange={newValue => {
            console.log('onChange returns just item value:', newValue)

            setOptions(filterOptions(newValue))
            setValue(newValue)
          }}
          onResetClick={e => {
            console.log(e)
            alert('onResetClick has been called')
          }}
          getDisplayValue={getDisplayValue}
          data-testid='autocomplete'
        />
      </Form>
    </div>
  )
}

export default Example
```
