// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16061-25761
// source=https://github.com/toptal/picasso/blob/master/packages/base/Notification/src/NotificationCompound/index.ts
// component=Notification

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Variant') === 'Default') {
  template = {
    id: 'Notification',
    imports: ["import { Notification } from '@toptal/picasso'"],
    example: figma.code`<Notification variant='white' onClose={() => { }}>
      Notification message
      <Notification.Actions>Actions go here</Notification.Actions>
    </Notification>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Success') {
  template = {
    id: 'Notification',
    imports: ["import { Notification } from '@toptal/picasso'"],
    example: figma.code`<Notification variant='green'>Notification message</Notification>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Error') {
  template = {
    id: 'Notification',
    imports: ["import { Notification } from '@toptal/picasso'"],
    example: figma.code`<Notification variant='red'>Notification message</Notification>`,
  }
} else {
  template = {
    id: 'Notification',
    imports: ["import { Notification } from '@toptal/picasso'"],
    example: figma.code`<Notification variant='red'>Notification message</Notification>`,
  }
}

export default template
