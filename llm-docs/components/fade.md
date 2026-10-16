# Fade

## Props

### Fade

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `TransitionChild` | - | Element that accepts ref |
| **in** | `boolean` | - | Show the component; toggling runs the enter or exit transition |
| onEnter | `((node: HTMLElement \| null, isAppearing: boolean) => void)` | - | Callback fired when the enter transition starts, with `null` for a child that takes no ref |
| onExited | `((node: HTMLElement \| null) => void)` | - | Callback fired when the exit transition settles, with `null` for a child that takes no ref |
| timeout | `number \| { enter?: number; exit?: number; appear?: number \| undefined; } \| undefined` | `300` | The duration for the transition, in milliseconds; one value, or one per phase |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import { Container, Button } from '@toptal/picasso'
import { Fade } from '@toptal/picasso-fade'
import React, { useState } from 'react'

const Example = () => {
  const [faded, setFaded] = useState(false)

  const handleOnClick = () => setFaded(prevFaded => !prevFaded)

  return (
    <Container>
      <Button onClick={handleOnClick} className='mb-4'>
        Toggle Fade
      </Button>
      <Fade in={faded} timeout={350}>
        <div className='bg-gray-100 p-4 rounded-md'>Fade in content</div>
      </Fade>
    </Container>
  )
}

export default Example
```
