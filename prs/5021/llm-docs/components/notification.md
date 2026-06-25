# Notification

Notification standard way to notify user about important information

## Props

### Notification

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Main content of the Notification |
| onClose | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | - | Callback invoked when close button is clicked |
| variant | `"red" \| "green" \| "white" \| "yellow"` | `yellow` | Style variant of Notification |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Add <Icon /> before Notification content |
| elevated | `boolean` | `false` | Enable elevated appearance for Notification |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Notification.Actions

Notification actions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Notification } from '@toptal/picasso'

const Example = () => (
  <div>
    <Notification>
      The time zone in your profile is set to (UTC -08:00) America - Los
      Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
    </Notification>
  </div>
)

export default Example
```

### With Action

```tsx
import React from 'react'
import { Notification, Link } from '@toptal/picasso'

const Example = () => (
  <div>
    <Notification>
      The time zone in your profile is set to (UTC -08:00) America - Los
      Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
      <Notification.Actions>
        <Link href='#' variant='action'>
          Change
        </Link>
      </Notification.Actions>
    </Notification>
  </div>
)

export default Example
```

## Notifications stream

In most cases, Notifications shouldn't be used in isolation.
The 'useNotifications' hook is providing the set of tools for
operating easily the most common notifications types, like 'info', 'error',
'warning', 'success' in a single stream of messages.

### How to use

'useNotifications' hook is providing the list of methods to show the notifications
of the corresponding type:

```javascript
const { showInfo, showError, showSuccess } = useNotifications()
```

Each of them has this list of props:

| Name | Type | Description |
|------|------|-------------|
| content | `string \| ReactNode` | The content of notification message |
| icon | `ReactElement` | The icon for the general notification |
| options | `OptionsObject` | Options of the single notification. |

### Default

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showInfo } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showInfo("That's one small step for a man, one giant leap for mankind.")
      }
    >
      Show general notification
    </Button>
  )
}

export default Example
```

### Variants

```tsx
import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showError, showInfo, showSuccess } = useNotifications()

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Button
          data-testid='error-trigger'
          variant='secondary'
          onClick={() => showError('Some error text is here')}
        >
          Show error notification
        </Button>
      </Container>
      <Container right={SPACING_4}>
        <Button
          data-testid='success-trigger'
          variant='secondary'
          onClick={() => showSuccess('Success message')}
        >
          Show success notification
        </Button>
      </Container>
      <Button
        variant='secondary'
        onClick={() =>
          showInfo(
            "That's one small step for a man, one giant leap for mankind."
          )
        }
      >
        Show general notification
      </Button>
    </Container>
  )
}

export default Example
```

### General Notifications

```tsx
import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Pencil16 } from '@toptal/picasso-icons'

const Example = () => {
  const { showInfo } = useNotifications()

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Button
          variant='secondary'
          onClick={() => showInfo('General information message')}
        >
          Show default general notification
        </Button>
      </Container>
      <Button
        data-testid='trigger'
        variant='secondary'
        onClick={() => showInfo('The record was edited', <Pencil16 />)}
      >
        Show general notification with icon
      </Button>
    </Container>
  )
}

export default Example
```

### Options

```tsx
import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showError } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() => {
        showError('Error message with custom options', undefined, {
          onClose: () => {
            console.log('Error notification closed!')
          },
          autoHideDuration: 1000,
        })
      }}
    >
      Show error with custom options
    </Button>
  )
}

export default Example
```

### Custom

```tsx
import React from 'react'
import { Button, Notification, Link } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showCustom } = useNotifications()

  const customNotification = (
    <Notification variant='white'>
      Art as the single superior counterforce against all will to negation of
      life. <br />
      Friedrich Nietzsche
      <Notification.Actions>
        <Link variant='action' href='#'>
          Do art
        </Link>
      </Notification.Actions>
    </Notification>
  )

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() => showCustom(customNotification, { persist: true })}
    >
      Show custom notification
    </Button>
  )
}

export default Example
```

### Custom Position

```tsx
import React from 'react'
import { Button, Notification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showCustom } = useNotifications()

  const customNotification = (
    <Notification elevated variant='white'>
      Message
    </Notification>
  )

  return (
    <Button
      variant='secondary'
      onClick={() =>
        showCustom(customNotification, {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
      }
    >
      Show custom notification
    </Button>
  )
}

export default Example
```

### MaxNotifications

```tsx
import React, { useState } from 'react'
import { NotificationsProvider } from '@toptal/picasso-provider'
import type { NotificationsProviderProps } from '@toptal/picasso-provider'
import { Button, Slider, Typography, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const App = () => {
  const { showInfo } = useNotifications()
  const handleClick = () => {
    showInfo('Message')
  }

  return <Button onClick={handleClick}>Open notification</Button>
}

const Example = () => {
  const [maxNotifications, setMaxNotifications] =
    useState<NotificationsProviderProps['maxNotifications']>(1)
  const [notificationContainer, setNotificationContainer] =
    useState<HTMLDivElement | null>(null)

  const handleChange = (
    _: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setMaxNotifications(
      Number(newValue) as NotificationsProviderProps['maxNotifications']
    )
  }

  return (
    <div style={{ width: 500 }}>
      <Container bottom={SPACING_8}>
        <Container bottom={SPACING_8}>
          <Typography variant='heading' size='small'>
            maxNotifications
          </Typography>
        </Container>

        <Slider
          defaultValue={maxNotifications}
          min={1}
          max={5}
          tooltip='on'
          compact
          marks
          onChange={handleChange}
        />
      </Container>

      {notificationContainer && (
        <NotificationsProvider
          maxNotifications={maxNotifications}
          container={notificationContainer}
        >
          <App />
        </NotificationsProvider>
      )}
      <div data-testid='notifications' ref={setNotificationContainer} />
    </div>
  )
}

export default Example
```
