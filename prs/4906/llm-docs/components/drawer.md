# Drawer

Allows rendering a sidebar with custom content

## Props

### Drawer

| Name | Type | Default | Description |
|------|------|---------|-------------|
| anchor | `"bottom" \| "left" \| "right" \| "top"` | `right` | Side from which the drawer will appear. |
| **children** | `ReactNode` | - | Drawer content |
| disablePortal | `boolean` | `false` | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| **open** | `boolean` | - | Specify if the drawer is opened or not |
| title | `ReactNode` | - | Specify the drawer title |
| onClose | `(() => void)` | `() => {}` | Callback fired when the component requests to be closed. |
| width | `"narrow" \| "regular" \| "medium" \| "wide" \| "ultra-wide"` | `regular` | Width of Drawer |
| transitionProps | `TransitionProps` | - | Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) |
| maintainBodyScrollLock | `boolean` | - | enable Drawer to maintain body scroll lock |
| transparentBackdrop | `boolean` | - | Specify the backdrop transparency |
| disableBackdrop | `boolean` | - | Remove the backdrop and leave elements behind interactive |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import { Button, Container, List, Drawer } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
      >
        <Container data-testid='content' padded={SPACING_6}>
          <List variant='ordered'>
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### With body scroll lock

```tsx
import { Button, Container, List, Drawer, Checkbox } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)
  const [maintainBodyScrollLock, setMaintainBodyScrollLock] = useState(true)

  return (
    <div>
      <Checkbox
        checked={maintainBodyScrollLock}
        onChange={(evt, val) => {
          setMaintainBodyScrollLock(val)
        }}
        label='Maintain body scroll lock'
      />
      <Container top={SPACING_4}>
        <Button data-testid='trigger' onClick={() => setOpen(!open)}>
          Show drawer
        </Button>
      </Container>
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
        maintainBodyScrollLock={maintainBodyScrollLock}
      >
        <Container data-testid='content' padded={SPACING_6}>
          <List variant='ordered'>
            {Array(100)
              .fill(undefined)
              .map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <List.Item key={index}>Row {index}</List.Item>
              ))}
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### Without Title

```tsx
import { Button, Typography, Container, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Container data-testid='content' padded={SPACING_4}>
          <Typography>This is the content. The title is omitted.</Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### Custom Title

```tsx
import { Button, Typography, Container, List, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Title = () => (
  <Container flex alignItems='center' padded={SPACING_4}>
    <Typography>This Drawer has a custom title</Typography>
    <Button size='small'>OK!</Button>
  </Container>
)

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer title={<Title />} open={open} onClose={() => setOpen(false)}>
        <Container data-testid='content' padded={SPACING_4}>
          <List variant='ordered'>
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### Width

```tsx
import { Container, List, Button, Drawer } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

type WidthType = 'narrow' | 'regular' | 'medium' | 'wide' | 'ultra-wide'

const types: WidthType[] = ['narrow', 'regular', 'medium', 'wide', 'ultra-wide']

const Example = () => {
  const [width, setWidth] = useState<WidthType>('narrow')
  const [open, setOpen] = useState(false)

  const handleClick = (type: WidthType) => {
    setWidth(type)
    setOpen(!open)
  }

  return (
    <div>
      {types.map(type => (
        <Button
          data-testid={`show-${type}`}
          onClick={() => handleClick(type)}
          key={type}
        >
          Show {type} drawer
        </Button>
      ))}
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
        width={width}
      >
        <Container data-testid='content' padded={SPACING_6}>
          <List variant='ordered'>
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### With notification

```tsx
import { Button, Container, List, Drawer } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-provider'
import { useNotifications } from '@toptal/picasso-notification'
import React, { useState } from 'react'

const Example = () => {
  const { showSuccess } = useNotifications()
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(!open)
    showSuccess("That's one small step for a man, one giant leap for mankind.")
  }

  return (
    <div>
      <Button onClick={showDrawer}>Show drawer</Button>
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
      >
        <Container padded={SPACING_6}>
          <List variant='ordered'>
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### With transparent backdrop

```tsx
import { Button, Typography, Container, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer open={open} transparentBackdrop onClose={() => setOpen(false)}>
        <Container data-testid='content' padded={SPACING_4}>
          <Typography>
            This is the content. The backdrop doesn't have dark overlay, it is
            transparent.
          </Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```

### With disabled backdrop

```tsx
import { Button, Typography, Container, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer
        open={open}
        disableBackdrop
        onClose={() => setOpen(false)}
        maintainBodyScrollLock={false}
      >
        <Container data-testid='content' padded={SPACING_4}>
          <Typography>
            The backdrop does not block the interaction with page content.
          </Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
```
