# Quote

Use quotes to highlight quoted content.

## Props

### Quote

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Main content of the Quote |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import { Quote } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <Quote>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  </Quote>
)

export default Example
```
