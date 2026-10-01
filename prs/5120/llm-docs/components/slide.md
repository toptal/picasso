# Slide

## Props

### Slide

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `TransitionChild` | - | Element that accepts ref |
| **in** | `boolean` | - | Show the component; toggling runs the enter or exit transition |
| onEnter | `((node: HTMLElement, isAppearing: boolean) => void)` | - | Callback fired when the enter transition starts |
| **direction** | `"up" \| "down" \| "left" \| "right"` | - | Direction in which the component will slide |
| onExited | `((node: HTMLElement) => void)` | - | Callback fired when the exit transition settles |
| timeout | `number \| { enter?: number; exit?: number; appear?: number \| undefined; } \| undefined` | `300` | The duration for the transition, in milliseconds; one value, or one per phase |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import { Container, Button } from '@toptal/picasso'
import { Slide } from '@toptal/picasso-slide'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [slided, setSlided] = useState(false)

  const handleOnClick = () => setSlided(prevSlided => !prevSlided)

  return (
    <Container bottom={SPACING_4}>
      <Button onClick={handleOnClick}>Toggle Slide</Button>
      <Slide in={slided} timeout={3000} direction='right'>
        <div className='bg-red-500 p-4'>Slide in</div>
      </Slide>
    </Container>
  )
}

export default Example
```
