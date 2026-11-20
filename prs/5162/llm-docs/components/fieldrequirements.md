# FieldRequirements

Component to list field requirements to be valid

## Props

### FieldRequirements

| Name | Type | Default | Description |
|------|------|---------|-------------|
| description | `string` | - | A string that defines the title of the requirement list |
| value | `TValueType` | `'' as unknown as TValueType` | Value of the related input. It will be used to validate the requirements |
| open | `boolean` | `false` | Open/Close the requirements section. Opening it with focus is the default behavior |
| error | `boolean` | - | Indicate whether `PasswordInput` is in error state |
| timeout | `number` | `500` | Duration for the collapse animation |
| **requirements** | `FieldRequirement<TValueType>[]` | - | Array of object to specify requirements. They will be executed |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React, { useState } from 'react'
import { Container, Input, FieldRequirements } from '@toptal/picasso'
import type { FieldRequirement } from '@toptal/picasso'

const requirements: FieldRequirement<string>[] = [
  {
    message: 'Min 5 characters',
    validator: value => value.length >= 5,
  },
  {
    message: 'Max 10 characters',
    validator: value => value.length <= 10,
  },
  { message: 'No space character', validator: value => !/\s/.test(value) },
]

const Example = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Input
        value={value}
        onChange={event => setValue(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <FieldRequirements
        style={{ maxWidth: 300 }}
        description='Please provide a value that fulfills the requirements'
        open={open}
        requirements={requirements}
        value={value}
      />
    </Container>
  )
}

export default Example
```

### Error

```tsx
import React, { useState } from 'react'
import type { FieldRequirement } from '@toptal/picasso'
import { Container, Input, FieldRequirements } from '@toptal/picasso'

const requirements: FieldRequirement<string>[] = [
  {
    message: 'Min 5 characters',
    validator: value => value.length >= 5,
  },
  {
    message: 'Max 10 characters',
    validator: value => value.length <= 10,
  },
  { message: 'No space character', validator: value => !/\s/.test(value) },
]

const Example = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Input
        status='error'
        value={value}
        onChange={event => setValue(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <FieldRequirements
        error
        style={{ maxWidth: 300 }}
        description='Please provide a value that fulfills the requirements'
        open={open}
        requirements={requirements}
        value={value}
      />
    </Container>
  )
}

export default Example
```
