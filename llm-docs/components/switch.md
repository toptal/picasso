# Switch

Switches are used to toggle the state of an element on or off.

## Props

### Switch

| Name | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | - | Show Switch initially as checked |
| disabled | `boolean` | `false` | Disable changing `Switch` state |
| label | `ReactNode` | - | Text label for the `Switch` |
| onChange | `((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)` | `() => {}` | Callback invoked when `Switch` changed its value |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Uncontrolled

Can control its state by itself

```tsx
import React from 'react'
import { Switch } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: 26 }}>
    <Switch />
  </div>
)

export default Example
```

### Controlled

Stateless Switch, state should be controlled using prop

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Switch } from '@toptal/picasso'

const Example = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <div style={{ height: 26 }}>
      <Switch
        checked={checked}
        onChange={handleChange}
        name='checkedA'
        label={checked ? 'Checked' : 'Unchecked'}
      />
    </div>
  )
}

export default Example
```

### Disabled

```tsx
import React from 'react'
import { Switch, Container } from '@toptal/picasso'

const Example = () => (
  <Container
    flex
    direction='column'
    style={{ height: 80 }}
    justifyContent='space-between'
  >
    <Switch disabled label='Unchecked' />
    <Switch checked disabled label='Checked' />
    <Switch disabled />
  </Container>
)

export default Example
```
