# PasswordInput

Input component for passwords

## Props

### PasswordInput

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | - | Value of the `input` element. |
| disabled | `boolean` | - | Indicates whether component is in disabled state |
| onChange | `((event: ChangeEvent<HTMLInputElement>) => void)` | `() => {}` | Callback invoked when `PasswordInput` changes its state. |
| size | `"small" \| "medium" \| "large"` | - | Component size |
| autoFocus | `boolean` | - | If true, the input element will be focused during the first mount |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| multilineResizable | `boolean` | - | If true, `TextArea` would be resizable vertical |
| status | `"error" \| "success" \| "warning" \| "default"` | `default` | Indicate input status |
| enableReset | `boolean` | - | Whether to render reset icon when there is a value in the input |
| onResetClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when reset button was clicked |
| inputRef | `Ref<HTMLInputElement>` | - | Ref of the input element |

### Default

```tsx
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { PasswordInput, Container } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState('asd')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <PasswordInput value={value} onChange={handleChange} />
    </Container>
  )
}

export default DefaultExample
```

### Disabled

```tsx
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { PasswordInput, Container } from '@toptal/picasso'

const DisabledExample = () => {
  const [value, setValue] = useState('asd')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <PasswordInput disabled value={value} onChange={handleChange} />
    </Container>
  )
}

export default DisabledExample
```

### Status

```tsx
import React from 'react'
import { PasswordInput, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <PasswordInput value='asd' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <PasswordInput value='asd' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <PasswordInput value='asd' status='warning' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <PasswordInput value='asd' status='success' />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### Sizes

```tsx
import React, { useState } from 'react'
import { PasswordInput, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <PasswordInput
            size='small'
            value={value}
            placeholder='Small'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <PasswordInput
            size='medium'
            value={value}
            placeholder='Medium (default)'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Large
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <PasswordInput
            size='large'
            value={value}
            placeholder='Large'
            onChange={handleChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```
