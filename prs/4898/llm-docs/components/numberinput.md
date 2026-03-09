# NumberInput

Input component for numbers

## Props

### NumberInput

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `string \| number` | `0` | Value of the `input` element. |
| min | `string \| number` | `-Infinity` | Minimum value for the `input` element |
| max | `string \| number` | - | Maximum value for the `input` element |
| step | `string \| number` | `1` | Next value of the `input` element will be calculated based on step |
| enableChangeOnMouseWheel | `boolean` | - | Enable value change on mouse wheel |
| hideControls | `boolean` | `false` | Should controls be hidden or not |
| icon | `ReactNode` | - | Specify icon which should be rendered inside NumberInput |
| disabled | `boolean` | - | Indicates whether component is in disabled state |
| onChange | `((event: ChangeEvent<HTMLInputElement>) => void)` | `() => {}` | Callback invoked when `NumberInput` changes its state. |
| size | `"small" \| "medium" \| "large"` | `medium` | Component size |
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
import { NumberInput, Container } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='1'
        max='100'
        min='-100'
      />
    </Container>
  )
}

export default DefaultExample
```

### Disabled

```tsx
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container } from '@toptal/picasso'

const DisabledExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        disabled
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
      />
    </Container>
  )
}

export default DisabledExample
```

### Status

```tsx
import React from 'react'
import { NumberInput, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <NumberInput value='100' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <NumberInput value='100' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <NumberInput value='100' status='warning' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <NumberInput value='100' status='success' />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### With Icon

```tsx
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container } from '@toptal/picasso'
import { ReferralBonus16 } from '@toptal/picasso-icons'

const WithIconExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
        icon={<ReferralBonus16 />}
      />
    </Container>
  )
}

export default WithIconExample
```

### With End Adornment

```tsx
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container, Typography } from '@toptal/picasso'

const WithEndAdornmentExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
        endAdornment={<Typography color='dark-grey'>$/hr</Typography>}
      />
    </Container>
  )
}

export default WithEndAdornmentExample
```

### Sizes

```tsx
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container, FormLabel } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const SizesExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <Container padded={SPACING_4}>
        <FormLabel htmlFor='small-number-input'>Small</FormLabel>
        <NumberInput
          id='small-number-input'
          value={value}
          size='small'
          onChange={handleChange}
          step='1'
          max='100'
          min='-100'
        />
      </Container>

      <Container padded={SPACING_4}>
        <FormLabel htmlFor='medium-number-input'>Medium (default)</FormLabel>
        <NumberInput
          id='medium-number-input'
          value={value}
          size='medium'
          onChange={handleChange}
          step='1'
          max='100'
          min='-100'
        />
      </Container>

      <Container padded={SPACING_4}>
        <FormLabel htmlFor='large-number-input'>Large</FormLabel>
        <NumberInput
          id='large-number-input'
          value={value}
          size='large'
          onChange={handleChange}
          step='1'
          max='100'
          min='-100'
        />
      </Container>
    </Container>
  )
}

export default SizesExample
```
