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
| strategy | `absolute \| fixed` | `absolute` |  CSS positioning strategy for the underlying `useFloating` call.  - `absolute` (default) — the popper is positioned relative to its nearest positioned ancestor. If the popper is a real DOM descendant of a scrolling or `overflow: hidden` container (i.e. `disablePortal`, or a custom `container` nested inside one), it gets clipped by that container's edge and scrolls with it. - `fixed` — the popper is positioned relative to the viewport instead, escaping that clipping/scrolling ancestor. Positioning still recomputes on scroll/resize either way (`autoUpdate`); `strategy` only changes what the coordinates are measured against, not whether they update.  Not needed for the default portaled case — portaling already moves the popper out of the clipping container's DOM subtree regardless of strategy. See the "Fixed Strategy" example below.  Defaults to `popperOptions.positionFixed ? 'fixed' : 'absolute'` for popper.js v1 compatibility; an explicit `strategy` prop always overrides `popperOptions.positionFixed`.        |
| keepMounted | `boolean` | `false` | Always keep the popper children in the DOM |
| autoWidth | `boolean` | `true` | Automatically resize the popper to match the anchor element width |
| width | `string` | - | Explicit popper width (overrides autoWidth) |
| enableCompactMode | `boolean` | `false` | Take full window width on small and medium screens |
| container | `HTMLElement \| (() => HTMLElement)` | - | Container node for the portal. Defaults to the Picasso root node |
| popperOptions | `object` | - |  Options forwarded to the popper instance, including `onCreate` and `onUpdate` lifecycle callbacks and popper.js v1-shaped `modifiers` (`flip`, `offset`, `preventOverflow`, `hide`).  `positionFixed` is also accepted here for popper.js v1 compatibility — `positionFixed: true` behaves like `strategy="fixed"`. It's deprecated; prefer the `strategy` prop in new code.        |

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
      <div className='relative overflow-hidden h-[60px] mt-4 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
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

### Fixed Strategy

```tsx
import React, { useState } from 'react'
import { Button, Container, Typography, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const PopperContent = ({ children }: { children: React.ReactNode }) => (
  <Container
    top={SPACING_4}
    bottom={SPACING_4}
    left={SPACING_4}
    right={SPACING_4}
    className='bg-white border border-gray-400 rounded-sm'
  >
    {children}
  </Container>
)

const Example = () => {
  const [absoluteAnchorEl, setAbsoluteAnchorEl] =
    useState<HTMLButtonElement | null>(null)
  const [fixedAnchorEl, setFixedAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  return (
    <Container>
      <Typography variant='body'>
        Both boxes below have <code>overflow: hidden</code> and the Popper uses{' '}
        <code>disablePortal</code>, so it renders in place as a real descendant
        of the clipping box (a portaled Popper would already escape the clip
        regardless of strategy). The default <code>absolute</code> strategy is
        clipped by the box&apos;s edge. <code>strategy=&quot;fixed&quot;</code>{' '}
        positions relative to the viewport instead, escaping the clip.
      </Typography>

      <Typography variant='heading' size='small' weight='semibold'>
        strategy=&quot;absolute&quot; (default) — clipped
      </Typography>
      <div className='relative overflow-hidden h-[80px] mt-2 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setAbsoluteAnchorEl(absoluteAnchorEl ? null : event.currentTarget)
          }
        >
          Toggle Popper
        </Button>
        <Popper
          open={Boolean(absoluteAnchorEl)}
          anchorEl={absoluteAnchorEl}
          placement='bottom-start'
          disablePortal
        >
          <PopperContent>Clipped by overflow: hidden</PopperContent>
        </Popper>
      </div>

      <Typography
        variant='heading'
        size='small'
        weight='semibold'
        className='mt-6'
      >
        strategy=&quot;fixed&quot; — escapes the clip
      </Typography>
      <div className='overflow-hidden h-[80px] mt-2 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setFixedAnchorEl(fixedAnchorEl ? null : event.currentTarget)
          }
        >
          Toggle Popper
        </Button>
        <Popper
          open={Boolean(fixedAnchorEl)}
          anchorEl={fixedAnchorEl}
          placement='bottom-start'
          disablePortal
          strategy='fixed'
        >
          <PopperContent>
            Not clipped — strategy=&quot;fixed&quot;
          </PopperContent>
        </Popper>
      </div>
    </Container>
  )
}

export default Example
```
