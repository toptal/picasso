import figma from '@figma/code-connect'
import { Notification } from '@toptal/picasso'

const NOTIFICATION_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16061-25761'

figma.connect(Notification, NOTIFICATION_URL, {
  variant: { Variant: 'Default' },
  example: () => (
    <Notification variant='white' onClose={() => {}}>
      Notification message
      <Notification.Actions>Actions go here</Notification.Actions>
    </Notification>
  ),
})

figma.connect(Notification, NOTIFICATION_URL, {
  variant: { Variant: 'Success' },
  example: () => (
    <Notification variant='green'>Notification message</Notification>
  ),
})

figma.connect(Notification, NOTIFICATION_URL, {
  variant: { Variant: 'Error' },
  example: () => (
    <Notification variant='red'>Notification message</Notification>
  ),
})
