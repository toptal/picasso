# ApplicationUpdateNotification

## Props

### ApplicationUpdateNotification

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | `ReactNode` | `A New Update is Available` | Notification title |
| description | `ReactNode` | `Get performance improvements and bug fixes with this update. Make sure to save any data on this page before updating.` | Notification decription text |
| actions | `((onClose?: (() => void)) => ReactNode)` | `null` | Actions to be rendered |
| dismissable | `boolean` | `false` | Controls the dismissability of the notification |
| onClose | `(() => void)` | `() => {}` | On close click callback |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { ApplicationUpdateNotification } from '@toptal/picasso'

const Example = () => <ApplicationUpdateNotification />

export default Example
```

### With Actions

```tsx
import React from 'react'
import { ApplicationUpdateNotification, Button } from '@toptal/picasso'

const Example = () => (
  <ApplicationUpdateNotification
    actions={() => (
      <ApplicationUpdateNotification.Actions>
        <Button
          key='btn-update-now'
          variant='secondary'
          onClick={() => console.log('Update Now')}
        >
          Update Now
        </Button>
      </ApplicationUpdateNotification.Actions>
    )}
  />
)

export default Example
```

### Actions Alignment

```tsx
import React from 'react'
import { ApplicationUpdateNotification, Button } from '@toptal/picasso'

const Example = () => (
  <ApplicationUpdateNotification
    actions={() => (
      <ApplicationUpdateNotification.Actions justifyContent='flex-end'>
        <Button
          key='btn-update-now'
          variant='secondary'
          onClick={() => console.log('Update Now')}
        >
          Update Now
        </Button>
        <Button
          key='btn-update-later'
          variant='secondary'
          onClick={() => console.log('Update Later')}
        >
          Update Later
        </Button>
      </ApplicationUpdateNotification.Actions>
    )}
  />
)

export default Example
```

### Dismissable

```tsx
import React from 'react'
import { ApplicationUpdateNotification } from '@toptal/picasso'

const Example = () => <ApplicationUpdateNotification dismissable />

export default Example
```

### In Action

```tsx
import React, { createElement } from 'react'
import { Button, ApplicationUpdateNotification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showCustom } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showCustom(
          createElement(ApplicationUpdateNotification, {
            onClose: () => console.log('close click'),
            dismissable: true,
          }),
          { persist: true }
        )
      }
    >
      Show App Update Notification
    </Button>
  )
}

export default Example
```

### In Action with Action Buttons

```tsx
import React, { createElement } from 'react'
import { Button, ApplicationUpdateNotification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showCustom } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showCustom(
          createElement(ApplicationUpdateNotification, {
            onClose: () => console.log('close click'),
            dismissable: true,
            actions: () => (
              <ApplicationUpdateNotification.Actions>
                <Button
                  key='btn-update-now'
                  variant='secondary'
                  onClick={() => console.log('Update Now')}
                >
                  Update Now
                </Button>
              </ApplicationUpdateNotification.Actions>
            ),
          }),
          { persist: true }
        )
      }
    >
      Show App Update Notification
    </Button>
  )
}

export default Example
```

### In Action not Dismissable

```tsx
import React, { createElement } from 'react'
import { Button, ApplicationUpdateNotification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showCustom } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showCustom(
          createElement(ApplicationUpdateNotification, {
            actions: () => (
              <ApplicationUpdateNotification.Actions>
                <Button
                  key='btn-update-now'
                  variant='secondary'
                  onClick={() => console.log('Update Now')}
                >
                  Update Now
                </Button>
              </ApplicationUpdateNotification.Actions>
            ),
          }),
          { persist: true }
        )
      }
    >
      Show App Update Notification
    </Button>
  )
}

export default Example
```
