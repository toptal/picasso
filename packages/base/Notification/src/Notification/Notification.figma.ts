// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16061-25761
// source=https://github.com/toptal/picasso/blob/master/packages/base/Notification/src/NotificationCompound/index.ts
// component=Notification

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Variant', {
  Default: 'white',
  Success: 'green',
  Error: 'red',
})

export default {
  id: 'Notification',
  imports: ["import { Notification } from '@toptal/picasso'"],
  example:
    variant === 'white'
      ? figma.code`<Notification variant='white' onClose={() => {}}>
  Notification message
  <Notification.Actions>Actions go here</Notification.Actions>
</Notification>`
      : figma.code`<Notification${figma.helpers.react.renderProp(
          'variant',
          variant
        )}>Notification message</Notification>`,
}
