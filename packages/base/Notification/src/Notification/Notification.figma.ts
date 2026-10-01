// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16061-25761
// source=https://github.com/toptal/picasso/blob/master/packages/base/Notification/src/NotificationCompound/index.ts
// component=Notification

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Variant', {
  Default: 'white',
  Success: 'green',
  Error: 'red',
})
// Only the Default variant has the CTA buttons
const actions =
  variant === 'white'
    ? [
        figma.selectedInstance.getBoolean('CTA Action 1') &&
          '    <Button.Action>Action</Button.Action>',
        figma.selectedInstance.getBoolean('CTA Action 2') &&
          '    <Button.Action>Action</Button.Action>',
      ].filter(Boolean)
    : []

export default {
  id: 'Notification',
  imports: [
    actions.length
      ? "import { Button, Notification } from '@toptal/picasso'"
      : "import { Notification } from '@toptal/picasso'",
  ],
  example: actions.length
    ? figma.code`<Notification${figma.helpers.react.renderProp(
        'variant',
        variant
      )} onClose={() => {}}>
  Notification message
  <Notification.Actions>
${actions.join('\n')}
  </Notification.Actions>
</Notification>`
    : figma.code`<Notification${figma.helpers.react.renderProp(
        'variant',
        variant
      )} onClose={() => {}}>
  Notification message
</Notification>`,
} satisfies CodeConnectTemplate
