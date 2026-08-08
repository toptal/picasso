# Modal

A modal displays content that temporarily blocks interactions with the main view of a site.

## Props

### Modal

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Content of Modal component |
| **open** | `boolean` | - | Whether modal should be displayed |
| size | `"xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "full-screen"` | `medium` | Width of modal |
| onBackdropClick | `(() => void)` | - | Callback executed when backdrop was clicked |
| disableBackdropClick | `boolean` | `false` | If `true`, clicking the backdrop will not fire `onClose` or `onBackdropClick` |
| onClose | `(() => void)` | - | Callback executed when attempting to close modal |
| onOpen | `(() => void)` | - | Callback executed when modal is being opened |
| container | `ContainerValue` | - | A node, or a function that returns node. The container will have the portal children appended to it. |
| hideBackdrop | `boolean` | `false` | If `true`, the backdrop is not rendered |
| align | `"top" \| "centered"` | `centered` | Position of the modal relative to the browser's viewport |
| transitionProps | `TransitionProps` | - | Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) |
| paperProps | `HTMLAttributes<HTMLDivElement>` | - | used for specifying aria attributes, changing role, or customizing styles |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Modal.Title

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Title content |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Modal.Content

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Content of Modal |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Modal.Actions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Action content (e.g. Buttons) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

To show the 'Modal' component you should use 'useModal' hook. And if you need
any additional logic inside the 'Modal' component you should create a wrapper 
component and manage the internal state there.

```tsx
import React, { useState } from 'react'
import {
  Modal,
  Button,
  Input,
  Checkbox,
  Select,
  Form,
  DatePicker,
} from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const STATES = [
  {
    text: 'Alabama',
    value: 'Alabama',
  },
  {
    text: 'Utah',
    value: 'Utah',
  },
]

const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [isLoading, setLoading] = useState(false)
  const [date, setDate] = useState<Date>()

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Edit address details</Modal.Title>
      <Modal.Content>
        <Form.Field>
          <Input width='full' placeholder='City' value='Alabaster' />
        </Form.Field>
        <Form.Field>
          <Input width='full' placeholder='Street' value='John Fruit' />
        </Form.Field>
        <Form.Field>
          <Select placeholder='State' options={STATES} value='Alabama' />
        </Form.Field>
        <Form.Field>
          <DatePicker
            width='full'
            value={date}
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setDate(date as Date)
            }}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Use shipping address for billing' />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={isLoading} variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          data-testid='close'
          loading={isLoading}
          onClick={() => {
            setLoading(true)

            setTimeout(() => {
              setLoading(false)
              onClose()
            }, 1000)
          }}
          variant='positive'
        >
          Update
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```

### Sizes

```tsx
import React from 'react'
import type { ModalProps } from '@toptal/picasso'
import {
  Modal,
  Button,
  Input,
  Select,
  Checkbox,
  Form,
  Container,
} from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const STATES = [
  {
    text: 'Alabama',
    value: 'Alabama',
  },
  {
    text: 'Utah',
    value: 'Utah',
  },
]

const ModalDialog = ({
  open,
  onClose,
  size,
}: {
  open: boolean
  onClose: () => void
  size: ModalProps['size']
}) => (
  <Modal open={open} size={size} onClose={onClose} transitionDuration={0}>
    <Modal.Title>Edit address details</Modal.Title>
    <Modal.Content>
      <Form.Field>
        <Input width='full' placeholder='City' value='Alabaster' />
      </Form.Field>
      <Form.Field>
        <Input width='full' placeholder='Street' value='John Fruit' />
      </Form.Field>
      <Form.Field>
        <Select placeholder='State' options={STATES} value='Alabama' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='Use shipping address for billing' />
      </Form.Field>
    </Modal.Content>
    <Modal.Actions>
      <Button data-testid='cancel' variant='secondary' onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onClose} variant='positive'>
        Update
      </Button>
    </Modal.Actions>
  </Modal>
)

const Example = () => {
  const {
    showModal: showModalExtraSmall,
    hideModal: hideModalExtraSmall,
    isOpen: isOpenExtraSmall,
  } = useModal()
  const {
    showModal: showModalSmall,
    hideModal: hideModalSmall,
    isOpen: isOpenSmall,
  } = useModal()
  const {
    showModal: showModalMedium,
    hideModal: hideModalMedium,
    isOpen: isOpenMedium,
  } = useModal()
  const {
    showModal: showModalLarge,
    hideModal: hideModalLarge,
    isOpen: isOpenLarge,
  } = useModal()
  const {
    showModal: showModalExtraLarge,
    hideModal: hideModalExtraLarge,
    isOpen: isOpenExtraLarge,
  } = useModal()
  const {
    showModal: showModalFullscreen,
    hideModal: hideModalFullscreen,
    isOpen: isOpenFullscreen,
  } = useModal()

  return (
    <Container flex>
      <Button onClick={showModalExtraSmall} data-testid='trigger-extra-small'>
        Open extra-small ("xsmall")
      </Button>
      <ModalDialog
        open={isOpenExtraSmall}
        onClose={hideModalExtraSmall}
        size='xsmall'
      />

      <Button onClick={showModalSmall} data-testid='trigger-small'>
        Open small
      </Button>
      <ModalDialog open={isOpenSmall} onClose={hideModalSmall} size='small' />

      <Button onClick={showModalMedium} data-testid='trigger-medium'>
        Open medium (default)
      </Button>
      <ModalDialog
        open={isOpenMedium}
        onClose={hideModalMedium}
        size='medium'
      />

      <Button onClick={showModalLarge} data-testid='trigger-large'>
        Open large
      </Button>
      <ModalDialog open={isOpenLarge} onClose={hideModalLarge} size='large' />

      <Button onClick={showModalExtraLarge} data-testid='trigger-extra-large'>
        Open extra-large ("xlarge")
      </Button>
      <ModalDialog
        open={isOpenExtraLarge}
        onClose={hideModalExtraLarge}
        size='xlarge'
      />

      <Button onClick={showModalFullscreen} data-testid='trigger-full-screen'>
        Open full-screen
      </Button>
      <ModalDialog
        open={isOpenFullscreen}
        onClose={hideModalFullscreen}
        size='full-screen'
      />
    </Container>
  )
}

export default Example
```

### Max Height

```tsx
import React from 'react'
import { Modal, Button } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>A lot of data</Modal.Title>
      <Modal.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Modal.Content>
      <Modal.Actions>
        <Button data-testid='cancel' variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='trigger' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```

### Two tooltips on the page

```tsx
import React, { useState } from 'react'
import { Modal, Button, Form, Tooltip, DatePicker } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const initialDate = new Date(2020, 10, 10)
const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [date, setDate] = useState(initialDate)

  return (
    <Modal
      onClose={onClose}
      open={open}
      transitionDuration={0} // Only for demo purposes, should not be used
    >
      <Modal.Title>
        You can select a date with other tooltips on the page
      </Modal.Title>
      <Modal.Content>
        <Form.Field>
          <DatePicker
            data-testid='datepicker'
            width='full'
            value={date}
            onChange={newDate => {
              setDate(newDate as Date)
            }}
          />
          <Tooltip open content='Inner Tooltip' placement='bottom'>
            <span>
              Lorem facere corrupti accusantium asperiores magnam Atque
              doloribus asperiores corrupti!
            </span>
          </Tooltip>
        </Form.Field>
      </Modal.Content>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Tooltip open content='tooltip'>
        <Button data-testid='trigger' onClick={showModal}>
          Open
        </Button>
      </Tooltip>

      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```

### Alignment

Demonstrate how `align` prop works

```tsx
import React, { useState } from 'react'
import { Modal, Button, Typography } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const ModalDialog = ({
  open,
  onClose,
  align = 'centered',
}: {
  open: boolean
  onClose: () => void
  align?: 'top' | 'centered'
}) => {
  const [isLoading] = useState(false)

  return (
    <Modal align={align} onClose={onClose} open={open}>
      <Modal.Title>Alignment is "{align}"</Modal.Title>
      <Modal.Content>
        <Typography variant='heading'>
          This Window is aligned as "{align}".
        </Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={isLoading} variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const {
    showModal: showTopAlignedModal,
    hideModal: hideTopAlignedModal,
    isOpen: isTopAlignedModalOpen,
  } = useModal()
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='align-top-open' onClick={showTopAlignedModal}>
        Open Top Aligned Modal
      </Button>

      <Button data-testid='align-centered-open' onClick={showModal}>
        Open Centered Aligned Modal
      </Button>

      <ModalDialog
        open={isTopAlignedModalOpen}
        onClose={hideTopAlignedModal}
        align='top'
      />
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```

### Disable backdrop click

Demonstrate how `disableBackdropClick` prop can be used to avoid closing modal on backdrop click

```tsx
import React from 'react'
import { Modal, Button } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button onClick={showModal}>Open</Button>

      <Modal onClose={hideModal} open={isOpen} disableBackdropClick>
        <Modal.Title>Disable backdrop click</Modal.Title>
        <Modal.Content>
          Clicking backdrop won't cause Modal to close.
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Example
```

### Dynamic Content

```tsx
import React, { useState } from 'react'
import { Modal, Button, Typography } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

const ModalDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [isLong, setLong] = useState(false)

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Edit address details</Modal.Title>
      <Modal.Content>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
        {isLong && (
          <>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={!isLong}
          onClick={() => {
            setLong(false)
          }}
          variant='positive'
        >
          Short Content
        </Button>
        <Button
          disabled={isLong}
          onClick={() => {
            setLong(true)
          }}
          variant='positive'
        >
          Long Content
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```
