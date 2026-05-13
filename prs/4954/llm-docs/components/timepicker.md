# TimePicker

Time Picker component

## Props

### TimePicker

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | - | Time value that will be selected in TimePicker |
| status | `"error" \| "warning" \| "default"` | `default` | Indicate whether `TimePicker` is in `error`, `warning` or `default` state |
| onChange | `((value: string) => void)` | - | Called on input change |

### Default

```tsx
import React, { useState } from 'react'
import { TimePicker } from '@toptal/picasso'

const DefaultExample = () => {
  const [timepickerValue, setTimepickerValue] = useState<string>('18:00')

  return <TimePicker onChange={setTimepickerValue} value={timepickerValue} />
}

export default DefaultExample
```

### Status

```tsx
import React from 'react'
import { TimePicker, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <TimePicker status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <TimePicker status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <TimePicker status='warning' />
      </Form.Field>
    </Form>
  )
}

export default Example
```
