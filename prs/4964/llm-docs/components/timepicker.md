# TimePicker

Time Picker component

## Props

### TimePicker

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | - | Time value that will be selected in TimePicker |
| status | `"error" \| "warning" \| "default"` | `default` | Indicate whether `TimePicker` is in `error`, `warning` or `default` state |
| onChange | `((value: string) => void)` | - | Called on input change |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| size | `"small" \| "medium" \| "large"` | - | Component size |
| autoFocus | `boolean` | - | If true, the input element will be focused during the first mount |
| disabled | `boolean` | - | If true, the `Input` will be disabled |
| name | `string` | - | Name attribute of the input element |
| width | `"full" \| "shrink" \| "auto"` | - | Width of the component |
| enableReset | `boolean` | - | Whether to render reset icon when there is a value in the input |
| onResetClick | `((event: MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => void)` | - | Callback invoked when reset button was clicked |
| outlineRef | `Ref<HTMLElement>` | - | Ref of the input outline |

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
