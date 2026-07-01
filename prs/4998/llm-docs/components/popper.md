# Popper

Popper is a low-level positioning primitive. It anchors floating content to a reference element and handles placement, overflow avoidance, and portal rendering.

## Props

### Popper

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Content to position inside the popper |
| open | `boolean` | `false` | If true, the popper is visible |
| **anchorEl** | `null \| PopperReferenceObject \| (() => PopperReferenceObject)` | - | HTML Element instance or a referenceObject used to position the popper |
| placement | `bottom-end \| bottom-start \| bottom \| left-end \| left-start \| left \| right-end \| right-start \| right \| top-end \| top-start \| top` | `bottom` | Popper placement relative to the anchor element |
| disablePortal | `boolean` | `false` | Disable portal rendering — children stay within the parent DOM hierarchy |
| keepMounted | `boolean` | `false` | Always keep the popper children in the DOM |
| autoWidth | `boolean` | `true` | Automatically resize the popper to match the anchor element width |
| width | `string` | - | Explicit popper width (overrides autoWidth) |
| enableCompactMode | `boolean` | `false` | Take full window width on small and medium screens |
| container | `HTMLElement \| (() => HTMLElement)` | - | Container node for the portal. Defaults to the Picasso root node |
| popperOptions | `object` | - | Options forwarded to the popper instance, including onCreate and onUpdate lifecycle callbacks |

### Default

```tsx
import React, { useState } from 'react'
import { Button, Container, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
  }

  return (
    <Container className='h-[120px]'>
      <Button onClick={handleClick}>Toggle Popper</Button>
      <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
        <Container
          top={SPACING_4}
          bottom={SPACING_4}
          left={SPACING_4}
          right={SPACING_4}
          className='bg-white border border-gray-400 rounded-sm'
        >
          Popper content
        </Container>
      </Popper>
    </Container>
  )
}

export default Example
```

### Placement

```tsx
import React, { useState } from 'react'
import { Button, Container, Grid, Typography, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end'

const PlacementDemo = ({ placement }: { placement: Placement }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Button fullWidth ref={setAnchorEl}>
        {placement}
      </Button>
      {anchorEl && (
        <Popper
          open
          anchorEl={anchorEl}
          placement={placement}
          autoWidth={false}
        >
          <Container
            top={SPACING_4}
            bottom={SPACING_4}
            left={SPACING_4}
            right={SPACING_4}
            className='bg-white border border-gray-400 rounded-sm p-2'
          >
            <Typography size='small'>Content</Typography>
          </Container>
        </Popper>
      )}
    </>
  )
}

const Example = () => (
  <Container style={{ padding: 100, width: 600 }}>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='top-start' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='top' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='top-end' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='left-start' />
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <PlacementDemo placement='right-start' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='left' />
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <PlacementDemo placement='right' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='left-end' />
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <PlacementDemo placement='right-end' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='bottom-start' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='bottom' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='bottom-end' />
        </Grid.Item>
      </Grid>
    </Container>
  </Container>
)

export default Example
```

### Disable Portal

```tsx
import React, { useState } from 'react'
import { Button, Container, Typography, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
  }

  return (
    <Container>
      <Typography variant='body'>
        The box below has <code>overflow: hidden</code>. With{' '}
        <code>disablePortal</code> the Popper renders inline and gets clipped.
        Without it, the Popper escapes to the document root via a portal.
      </Typography>
      <div className='overflow-hidden h-[60px] mt-4 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
        <Button onClick={handleClick}>Toggle Popper</Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement='bottom-start'
          disablePortal
        >
          <Container
            top={SPACING_4}
            bottom={SPACING_4}
            left={SPACING_4}
            right={SPACING_4}
            className='bg-white border border-gray-400 rounded-sm'
          >
            Clipped by overflow: hidden
          </Container>
        </Popper>
      </div>
    </Container>
  )
}

export default Example
```

### Inside Modal

```tsx
import React, { useState } from 'react'
import { Button, Container, Modal, Popper, Typography } from '@toptal/picasso'
import { useModal, SPACING_4 } from '@toptal/picasso-utils'

const FILLER =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const ModalWithPopper = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const popperOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(popperOpen ? null : event.currentTarget)
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Popper inside a scrollable Modal</Modal.Title>
      <Modal.Content>
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          <Typography variant='heading' size='medium'>
            Scroll down to find the Toggle Popper button. With{' '}
            <code>disablePortal</code> the Popper renders inside the scrollable
            container, so floating-ui detects the scroll boundary and flips the
            Popper upward when there is no room below.
          </Typography>
          {Array.from({ length: 6 }, (_, index) => (
            <Container key={index} top={SPACING_4}>
              <Typography variant='body'>{FILLER}</Typography>
            </Container>
          ))}
          <Container className='p-2'>
            <Button
              variant={popperOpen ? 'primary' : 'secondary'}
              onClick={handleClick}
            >
              Toggle Popper
            </Button>
            <Popper
              open={popperOpen}
              anchorEl={anchorEl}
              placement='bottom'
              autoWidth={false}
              disablePortal
            >
              <Container
                top={SPACING_4}
                bottom={SPACING_4}
                left={SPACING_4}
                right={SPACING_4}
                className='bg-white border border-gray-400 rounded-sm p-2'
              >
                <Typography size='small'>Popper content</Typography>
                <Typography size='small'>Popper content</Typography>
                <Typography size='small'>Popper content</Typography>
                <Typography size='small'>Popper content</Typography>
              </Container>
            </Popper>
          </Container>
          {Array.from({ length: 6 }, (_, index) => (
            <Container key={index} top={SPACING_4}>
              <Typography variant='body'>{FILLER}</Typography>
            </Container>
          ))}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>
      <ModalWithPopper open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```
