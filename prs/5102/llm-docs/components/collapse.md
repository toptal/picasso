# Collapse

## Props

### Collapse

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Content to expand and collapse |
| in | `boolean` | - | Show the content; toggling runs the enter or exit transition |
| appear | `boolean` | - | Run the enter transition when mounting with `in` already true |
| unmountOnExit | `boolean` | - | Unmount the component once it has fully exited |
| onEnter | `((node: HTMLElement, isAppearing: boolean) => void)` | - | Callback fired when the enter transition starts |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import { Container, Button } from '@toptal/picasso'
import { Collapse } from '@toptal/picasso-collapse'
import React, { useState } from 'react'

const Example = () => {
  const [faded, setFaded] = useState(false)

  const handleOnClick = () => setFaded(prevFaded => !prevFaded)

  return (
    <Container>
      <Button onClick={handleOnClick} className='mb-4'>
        Toggle Collapse
      </Button>
      <Collapse in={faded} timeout={400}>
        <div className='bg-gray-100 p-4 rounded-md'>Collapse content</div>
      </Collapse>
    </Container>
  )
}

export default Example
```

### Appear on render

```tsx
import { Container, Button } from '@toptal/picasso'
import { Collapse } from '@toptal/picasso-collapse'
import React, { useState } from 'react'

const Example = () => {
  const [faded, setFaded] = useState(false)

  const handleOnClick = () => setFaded(prevFaded => !prevFaded)

  return (
    <Container>
      <Button onClick={handleOnClick} className='mb-4'>
        {faded ? 'Unmount Collapse' : 'Render Collapse'}
      </Button>

      {faded && (
        <Collapse appear in timeout={400}>
          <div className='bg-gray-100 p-4 rounded-md'>Collapse content</div>
        </Collapse>
      )}
    </Container>
  )
}

export default Example
```
