# Tooltip

Tooltips display informative text when users hover over, focus on, or tap an element

## Props

### Tooltip

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Trigger element for tooltip |
| content | `ReactNode` | - | Content to be rendered inside tooltip |
| placement | `"bottom-end" \| "bottom-start" \| "bottom" \| "left-end" \| "left-start" \| "left" \| "right-end" \| "right-start" \| "right" \| "top-end" \| "top-start" \| "top"` | `top` | Where should the tooltip be positioned |
| onOpen | `((event: ChangeEvent<{}>) => void)` | - | Called when tooltip is opened |
| onClose | `((event: ChangeEvent<{}>) => void)` | - | Called when tooltip is closed |
| interactive | `boolean` | - | Whether user can interact with tooltip content |
| open | `boolean` | - | Programatically control tooltip's visibility |
| disableListeners | `boolean` | - | Disables all listener |
| preventOverflow | `boolean` | `true` | Allows tooltip to change its placement when it overflows |
| disablePortal | `boolean` | `false` | Disable the portal behavior. The children stay within it's parent |
| delay | `enum` | `short` | A delay in showing the tooltip |
| compact | `boolean` | - | Show a compact tooltip |
| followCursor | `boolean` | `false` | If `true`, the tooltip follow the cursor over the wrapped element. This prop exists in material-ui@5+ |
| maxWidth | `"none" \| "default"` | `default` | Max width of a tooltip |
| tooltipRef | `Ref<HTMLDivElement>` | - | Tooltip div ref |
| container | `ContainerValue` | - | A node, or a function that returns node. The container will have the portal children appended to it. |
| offset | `OffsetType` | `{
        left: SPACING_0,
        top: SPACING_0,
      }` | Offset to allow shifting tooltip's position from left and top. |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_6} left={SPACING_6}>
    <Tooltip content='Content goes here...' open>
      <Button>Test me</Button>
    </Tooltip>
  </Container>
)

export default Example
```

### Placement

```tsx
import React from 'react'
import { Tooltip, Button, Container, Grid } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container style={{ padding: 100, width: 600 }}>
    <Container>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <Tooltip placement='top-start' content='Content' open>
            <Button fullWidth>top-start</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4}>
          <Tooltip placement='top' content='Content' open>
            <Button fullWidth>top</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4}>
          <Tooltip placement='top-end' content='Content' open>
            <Button fullWidth>top-end</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <Tooltip placement='left-start' content='Content' open>
            <Button fullWidth>left-start</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <Tooltip placement='right-start' content='Content' open>
            <Button fullWidth>right-start</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <Tooltip placement='left' content='Content' open>
            <Button fullWidth>left</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <Tooltip placement='right' content='Content' open>
            <Button fullWidth>right</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <Tooltip placement='left-end' content='Content' open>
            <Button fullWidth>left-end</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <Tooltip placement='right-end' content='Content' open>
            <Button fullWidth>right-end</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <Tooltip placement='bottom-start' content='Content' open>
            <Button fullWidth>bottom-start</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4}>
          <Tooltip placement='bottom' content='Content' open>
            <Button fullWidth>bottom</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item sm={4}>
          <Tooltip placement='bottom-end' content='Content' open>
            <Button fullWidth>bottom-end</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
  </Container>
)

export default Example
```

### Trigger

```tsx
import React, { useState } from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8, ClickAwayListener } from '@toptal/picasso-utils'

const Example = () => {
  const [open, setOpen] = useState(false)

  const toogleTooltipOpen = () => setOpen(!open)
  const closeTooltip = () => setOpen(false)

  return (
    <div style={{ textAlign: 'center' }}>
      <Container
        top={SPACING_8}
        bottom={SPACING_8}
        left={SPACING_8}
        right={SPACING_8}
        inline
      >
        <Tooltip content='Some content...' placement='top'>
          <Button>Hover</Button>
        </Tooltip>
      </Container>
      <ClickAwayListener onClickAway={closeTooltip}>
        <Container
          top={SPACING_8}
          bottom={SPACING_8}
          left={SPACING_8}
          right={SPACING_8}
          inline
        >
          <Tooltip open={open} content='Some content...' placement='top'>
            <Button onClick={toogleTooltipOpen}>Click</Button>
          </Tooltip>
        </Container>
      </ClickAwayListener>
    </div>
  )
}

export default Example
```

### Interactive

```tsx
import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='You can not hover inside!' placement='top'>
        <Button>Non interactive</Button>
      </Tooltip>
    </Container>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='Hover inside' interactive placement='top'>
        <Button>Interactive</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
```

### Control Listeners

```tsx
import React, { useState } from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const TooltipControlListenersExample = () => {
  const [listenersEnabled, setListenersEnabled] = useState(true)

  const enableListeners = () => setListenersEnabled(true)
  const disableListeners = () => setListenersEnabled(false)

  const toggleListeners = () => {
    if (listenersEnabled) {
      disableListeners()
    } else {
      enableListeners()
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Button variant='secondary' onClick={toggleListeners}>
        {listenersEnabled ? 'Disable' : 'Enable'} listeners
      </Button>
      <Container
        top={SPACING_8}
        bottom={SPACING_8}
        left={SPACING_8}
        right={SPACING_8}
        inline
      >
        <Tooltip
          disableListeners={!listenersEnabled}
          content='Some content...'
          placement='top'
        >
          <Button>Hover</Button>
        </Tooltip>
      </Container>
    </div>
  )
}

export default TooltipControlListenersExample
```

### Tooltip on disabled element

```tsx
import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const TooltipControlListenersExample = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Container
        top={SPACING_8}
        bottom={SPACING_8}
        left={SPACING_8}
        right={SPACING_8}
        inline
      >
        <Tooltip content='Some content...' placement='top'>
          <span>
            <Button disabled>Hover</Button>
          </span>
        </Tooltip>
      </Container>
    </div>
  )
}

export default TooltipControlListenersExample
```

### Delay

```tsx
import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ textAlign: 'center' }}>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='Short delay is 200ms' delay='short' placement='top'>
        <Button>Short delay</Button>
      </Tooltip>
    </Container>
    <Container
      top={SPACING_8}
      bottom={SPACING_8}
      left={SPACING_8}
      right={SPACING_8}
      inline
    >
      <Tooltip content='Long delay is 500ms' delay='long' placement='top'>
        <Button>Long delay</Button>
      </Tooltip>
    </Container>
  </div>
)

export default Example
```

### Compact

```tsx
import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_8} left={SPACING_8} inline>
    <Tooltip content='Content' open placement='top' compact>
      <Button>Compact</Button>
    </Tooltip>
  </Container>
)

export default Example
```

### Max Width

```tsx
import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const longContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

const Example = () => (
  <Container
    flex
    justifyContent='space-between'
    padded={SPACING_8}
    style={{ height: '240px', width: '1000px', padding: '2rem 10rem' }}
  >
    <Container>
      <Tooltip open content={longContent} placement='bottom'>
        <Button>Default maxWidth</Button>
      </Tooltip>
    </Container>
    <Container>
      <Tooltip
        open
        maxWidth='none'
        content={
          <Container style={{ width: '400px' }}>{longContent}</Container>
        }
        placement='bottom'
      >
        <Button>None maxWidth</Button>
      </Tooltip>
    </Container>
  </Container>
)

export default Example
```

### Follow Cursor

```tsx
import React from 'react'
import { Tooltip, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const longContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

const Example = () => (
  <Container
    flex
    justifyContent='space-between'
    padded={SPACING_8}
    style={{ height: '240px', width: '1000px', padding: '2rem 10rem' }}
  >
    <Tooltip content={longContent} followCursor placement='right'>
      <Container>{longContent}</Container>
    </Tooltip>
  </Container>
)

export default Example
```

### Inside of a Dropdown

```tsx
import { Dropdown, Menu, Tooltip } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu>
          <Menu.Item>Option 1</Menu.Item>
          <Tooltip
            open
            content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quidem!'
          >
            <Menu.Item>Option 2</Menu.Item>
          </Tooltip>
          <Menu.Item>Option 3</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow data-testid='trigger' />
    </Dropdown>
  </div>
)

export default Example
```

### Tooltip with offset modifier

```tsx
import React from 'react'
import { Button, Container, Tooltip } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_6} left={SPACING_6}>
    <Tooltip
      interactive
      placement='right'
      offset={{
        left: SPACING_4,
      }}
      content='Right tooltip with left offset'
    >
      <Button>Right/Left</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='right'
      offset={{
        top: SPACING_4,
      }}
      content='Right tooltip with top offset'
    >
      <Button>Right/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='left'
      offset={{
        left: SPACING_4,
      }}
      content='Left tooltip with left offset'
    >
      <Button>Left/Left</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='left'
      offset={{
        top: SPACING_4,
      }}
      content='Left tooltip with top offset'
    >
      <Button>Left/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='bottom'
      offset={{
        top: SPACING_4,
      }}
      content='Bottom tooltip with top offset'
    >
      <Button>Bottom/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='bottom'
      offset={{
        left: SPACING_4,
      }}
      content='Bottom tooltip with left offset'
    >
      <Button>Bottom/Left</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='top'
      offset={{
        top: SPACING_4,
      }}
      content='Top tooltip with top offset'
    >
      <Button>Top/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='top'
      offset={{
        left: SPACING_4,
      }}
      content='Top tooltip with left offset'
    >
      <Button>Top/Left</Button>
    </Tooltip>
  </Container>
)

export default Example
```
