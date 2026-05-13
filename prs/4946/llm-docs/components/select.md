# Select

Selects are interactive elements that prompt users to make selections
    or take actions from a set of list of available options.

## Props

### Select

| Name | Type | Default | Description |
|------|------|---------|-------------|
| disabled | `boolean` | - | If true, the 'Select' will be disabled |
| disablePortal | `boolean` | - | Whether to render select options in portal. Should be disabled in Modals |
| status | `"error" \| "warning" \| "default"` | - | Indicate whether `Select` is in `error`, `warning` or `default` state |
| id | `string` | - | Component ID |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| menuWidth | `string` | - | Width of the menu |
| loading | `boolean` | - | Shows the loading icon when options are loading |
| placeholder | `string` | - | Placeholder option which is selected by default |
| searchPlaceholder | `string` | - | Placeholder for search input |
| iconPosition | `"start" \| "end"` | - | Whether icon should be placed at the beginning or end of the `Input` |
| icon | `ReactNode` | - | Specify icon which should be rendered inside Input |
| onChange | `((event: ChangeEvent<{ name?: string; value: M extends true ? T[] : T; }>) => void)` | - | Callback invoked when `Select` changes its state. |
| noOptionsText | `string` | - | Label to show when no options were found |
| **options** | `Option[] \| OptionGroups: 
    [

      { text: string, value: string },

      { text: string, value: string }

    }

or

    {

      string: [

        { text: string, value: string },

        { text: string, value: string }

      ],

      string: [

        { text: string, value: string },

        { text: string, value: string }

      ]

    }
        ` | - | List of options or option groups to be rendered as `Select` |
| renderOption | `((option: Option<T>, index?: number) => ReactNode)` | - | Callback responsible for rendering the option given the option and its index in the list of options |
| getDisplayValue | `((option: Option<string \| number> \| null) => string)` | - | A function that takes a display value from the option item |
| value | `ValueType \| T[]` | - | Selected value |
| multiple | `boolean` | - | Allow selecting multiple values |
| native | `boolean` | - | Whether to render native browser select or not |
| size | `"small" \| "medium" \| "large"` | `medium` | Component size |
| enableReset | `boolean` | - | Whether to render reset icon which clears selected value |
| enableResetSearch | `boolean` | - | Whether to render reset icon which clears search input value |
| searchThreshold | `number` | `10` | Defines the minimum options number to show the search |
| limit | `number` | `200` | Limits number of options to display on the list |
| enableAutofill | `boolean` | - | Specifies whether the autofill enabled or not, disabled by default |
| filterOptions | `((options: Option<string \| number>[], searchValue: string, getDisplayValue?: ((option: Option<string \| number> \| null) => string)) => Option<string \| number>[])` | `optionIncludesSearchCaseInsensitive` | A function that is invoked during search. It takes an array of options and a search value and returns filtered options |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' },
  { value: '6', text: 'Option 6' },
  { value: '7', text: 'Option 7' },
  { value: '8', text: 'Option 8' },
  { value: '9', text: 'Option 9' },
  { value: '10', text: 'Option 10' },
  { value: '11', text: 'Option 11' },
  { value: '12', text: 'Option 12' },
  { value: '13', text: 'Option 13' },
  { value: '14', text: 'Option 14' },
]

export default Example
```

### Native

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Container, Form, Select } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Label>Reset disabled</Form.Label>
        <Select
          native
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container>
        <Form.Label>Reset enabled</Form.Label>
        <Select
          enableReset
          native
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Search behavior

Search is enabled when the number of options is greater or equal to `searchThreshold`.
    ⚠️ When used in Drawer, we need to use `disablePortal` to enable the mouse focus of the search input.

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>('')
  const [threshold, setThreshold] = useState(4)

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  const handleThresholdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThreshold(parseInt(event.target.value, 10))
  }

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Field>
          <Form.Label>Search for an option</Form.Label>
          <Select
            onChange={handleChange}
            value={value}
            options={OPTIONS}
            placeholder='Choose an option...'
            width='auto'
            searchThreshold={threshold}
            data-testid='select'
          />
        </Form.Field>
      </Container>
      <Container right={SPACING_4}>
        <Form.Field>
          <Form.Label>Search threshold</Form.Label>
          <NumberInput
            value={threshold}
            onChange={handleThresholdChange}
            data-testid='input-threshold'
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Search with input reset</Form.Label>
          <Select
            onChange={handleChange}
            value={value}
            options={OPTIONS}
            placeholder='Choose an option...'
            width='auto'
            enableResetSearch
            searchThreshold={threshold}
            data-testid='select'
          />
        </Form.Field>
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' },
]

export default SelectSearchBehaviourExample
```

### Limit

Maximum number of options on the list can be controlled through `limit` property

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>('')
  const [multipleValues, setMultipleValues] = useState<string[]>([])
  const [limit, setLimit] = useState(50)

  const handlerForSelectChange =
    (setState: (state: string) => void) =>
    (
      event: ChangeEvent<{
        name?: string
        value: string
      }>
    ) => {
      setState(event.target.value)
    }

  const handleMultipleChange =
    (setState: (state: string[]) => void) =>
    (event: React.ChangeEvent<{ value: string[] }>) => {
      setState(event.target.value)
    }

  const handlerForInputChange =
    (setState: (state: number) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(parseInt(event.target.value, 10))
    }

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Field>
          <Form.Label>Flat options</Form.Label>
          <Select
            onChange={handlerForSelectChange(setValue)}
            value={value}
            options={LOTS_OF_OPTIONS}
            placeholder='Choose an option...'
            width='auto'
            limit={limit}
            data-testid='select'
          />
        </Form.Field>
      </Container>
      <Container right={SPACING_4}>
        <Form.Field>
          <Form.Label>Grouped options</Form.Label>
          <Select
            onChange={handleMultipleChange(setMultipleValues)}
            options={LOTS_OF_OPTION_GROUPS}
            value={multipleValues}
            placeholder='Choose an options...'
            width='auto'
            limit={limit}
            multiple
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Limit</Form.Label>
          <NumberInput
            min={1}
            value={limit}
            onChange={handlerForInputChange(setLimit)}
            data-testid='input-threshold'
          />
        </Form.Field>
      </Container>
    </Container>
  )
}

const optionsGenerator =
  (start = 1) =>
  (value: number, key: number) => ({
    value: `${key + start}`,
    text: `Option ${key + start}`,
  })

const LOTS_OF_OPTION_GROUPS = {
  'Group 1': Array.from({ length: 200 }, optionsGenerator()),
  'Group 2': Array.from({ length: 200 }, optionsGenerator(200)),
  'Group 3': Array.from({ length: 200 }, optionsGenerator(400)),
  'Group 4': Array.from({ length: 200 }, optionsGenerator(600)),
}

const LOTS_OF_OPTIONS = Array.from({ length: 1000 }, optionsGenerator())

export default SelectSearchBehaviourExample
```

### Disabled

```tsx
import React, { useState } from 'react'
import { Select, Container, Form } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex gap={SPACING_4}>
      <Container>
        <Form.Field>
          <Form.Label>Select is disabled</Form.Label>
          <Select
            disabled
            onChange={handleChange}
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Options are disabled</Form.Label>
          <Select
            onChange={handleChange}
            options={OPTIONS.map((option, index) => ({
              ...option,
              disabled: index % 2 === 0,
            }))}
            value={value}
            placeholder='Choose an option...'
            width='auto'
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Native options are disabled</Form.Label>
          <Select
            onChange={handleChange}
            options={OPTIONS.map((option, index) => ({
              ...option,
              disabled: index % 2 !== 0,
            }))}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            native
          />
        </Form.Field>
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Status

```tsx
import React from 'react'
import { Select, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <Select options={[]} status='default' width='auto' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <Select options={[]} status='error' width='auto' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <Select options={[]} status='warning' width='auto' />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### With icon

```tsx
import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Settings16 />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          iconPosition='end'
          icon={<Settings16 />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Select
          disabled
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Settings16 />}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### With description

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose an option...'
      width='auto'
      data-testid='trigger'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1', description: 'Description 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3', description: 'Description 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Loading

```tsx
import React, { useState } from 'react'
import { Container, Form, Select } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Label>Default</Form.Label>
        <Select
          loading
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container>
        <Form.Label>Native</Form.Label>
        <Select
          native
          loading
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Sizes

```tsx
import React, { useState } from 'react'
import { Select, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Select
            size='small'
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Select
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Large
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Select
            size='large'
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            onChange={handleChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Full width

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose an option...'
      width='full'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Shrink width

```tsx
import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='ID'
          width='shrink'
        />
      </Container>
      <Container right={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          icon={<Settings16 />}
          placeholder='ID'
          width='shrink'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' },
]

export default Example
```

### Custom menu width

```tsx
import React, { useState } from 'react'
import { Select, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='ID'
          width='shrink'
          menuWidth='200px'
          data-testid='trigger'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' },
]

export default Example
```

### Chosen option

Renders Select component with already chosen one of the options

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('3')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Custom options

Options of the Select component could be not only text, but custom components

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<number>()

  const handleChange = (event: React.ChangeEvent<{ value: number }>) => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      renderOption={option => (
        <div>
          Custom <b>{option.text}</b>
        </div>
      )}
      value={value}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: 1, text: 'option 1' },
  {
    value: 2,
    text: 'option 2',
  },
]

export default Example
```

### Custom display value

Display value of selected value in input can be customized

```tsx
import React, { useState } from 'react'
import type { SelectOption } from '@toptal/picasso'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  const getDisplayValue = (option: SelectOption | null) => {
    if (!option) {
      return ''
    }

    const { text, value } = option

    return `You selected ${text} with value ${value}`
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      getDisplayValue={getDisplayValue}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Multiple options

Select component allows to select multiple options

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

const Example = () => {
  const [values, setValues] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setValues(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={values}
      placeholder='Choose an option...'
      width='auto'
      multiple
    />
  )
}

export default Example
```

### Grouped options

Select component allows to define grouped options

```tsx
import React, { useState } from 'react'
import { Container, Select, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const OPTION_GROUPS = {
  'Group 1': [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
  ],
  'Group 2': [
    { value: '3', text: 'Option 3' },
    { value: '4', text: 'Option 4' },
    { value: '5', text: 'Option 5' },
  ],
  'Group 3': [
    { value: '6', text: 'Option 6' },
    { value: '7', text: 'Option 7' },
  ],
  'Group 4': [
    { value: '8', text: 'Option 8' },
    { value: '9', text: 'Option 9' },
    { value: '10', text: 'Option 10' },
  ],
}

const Example = () => {
  const [value, setValue] = useState<string>()
  const [values, setValues] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }
  const handleMultipleChange = (
    event: React.ChangeEvent<{ value: string[] }>
  ) => {
    setValues(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Typography variant='heading' size='small'>
          Native
        </Typography>
        <Select
          onChange={handleChange}
          options={OPTION_GROUPS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          native
        />
      </Container>
      <Container right={SPACING_4}>
        <Typography variant='heading' size='small'>
          Non native
        </Typography>
        <Select
          onChange={handleMultipleChange}
          options={OPTION_GROUPS}
          value={values}
          placeholder='Choose an option...'
          width='auto'
          searchThreshold={2}
          multiple
        />
      </Container>
    </Container>
  )
}

export default Example
```

### Auto focus

Demonstrate auto focus capability by switching visibility of Select

```tsx
import React, { useState } from 'react'
import { Select, Button, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')
  const [show, setShow] = useState(false)

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <Container>
      <Container bottom={SPACING_4}>
        <Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
      </Container>
      {show && (
        <Select
          autoFocus
          placeholder='Choose an option...'
          width='auto'
          options={OPTIONS}
          value={value}
          onChange={handleChange}
        />
      )}
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### With reset button

```tsx
import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

const Example = () => {
  const [values, setValues] = useState<string[]>([OPTIONS[1].value])

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setValues(event.target.value)
  }

  return (
    <Select
      enableReset
      onChange={handleChange}
      options={OPTIONS}
      value={values}
      placeholder='Choose an option...'
      width='auto'
      multiple
    />
  )
}

export default Example
```

### Disable autofilling

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Container, Form, Select } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Label>Autofill disabled</Form.Label>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          name='country'
        />
      </Container>
      <Container>
        <Form.Label>Autofill enabled</Form.Label>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          name='country'
          enableAutofill
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
  { text: 'Romania', value: 'RO' },
]

export default Example
```

### Filter options

Use a custom filter function for search results (e.g. option text ends with search input)

```tsx
import type { ChangeEvent } from 'react'
import React, { useState, useCallback } from 'react'
import type { SelectOption } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Select, Container, Typography } from '@toptal/picasso'

const FilterOptionsExample = () => {
  const [value, setValue] = useState<string>('')
  const [values, setValues] = useState<string[]>([])

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  const handleMultipleChange = (
    event: React.ChangeEvent<{ value: string[] }>
  ) => {
    setValues(event.target.value)
  }

  const filterOptions = useCallback(
    (options: SelectOption[], searchValue: string) => {
      // custom filtering logic (e.g. filtering by the last word)
      const filteredOptions = options.filter(option =>
        option.text.toLowerCase().endsWith(searchValue.toLowerCase())
      )

      return filteredOptions
    },
    []
  )

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Typography variant='heading' size='small'>
          Non grouped
        </Typography>
        <Select
          onChange={handleChange}
          value={value}
          options={OPTIONS}
          placeholder='Choose an option...'
          width='auto'
          data-testid='select'
          searchThreshold={4}
          filterOptions={filterOptions}
        />
      </Container>
      <Container right={SPACING_4}>
        <Typography variant='heading' size='small'>
          Grouped
        </Typography>
        <Select
          onChange={handleMultipleChange}
          options={OPTION_GROUPS}
          value={values}
          placeholder='Choose an option...'
          width='auto'
          searchThreshold={4}
          filterOptions={filterOptions}
          multiple
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
  { text: 'Romania', value: 'RO' },
]

const OPTION_GROUPS = {
  'Group 1': [
    { text: 'Belarus', value: 'BY' },
    { text: 'Croatia', value: 'HR' },
  ],
  'Group 2': [
    { text: 'Lithuania', value: 'LU' },
    { text: 'Slovakia', value: 'SK' },
  ],
  'Group 3': [
    { text: 'Ukraine', value: 'UA' },
    { text: 'Romania', value: 'RO' },
  ],
}

export default FilterOptionsExample
```
