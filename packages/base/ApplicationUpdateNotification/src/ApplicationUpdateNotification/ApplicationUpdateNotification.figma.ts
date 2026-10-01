// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=13550-12430
// source=https://github.com/toptal/picasso/blob/master/packages/base/ApplicationUpdateNotification/src/ApplicationUpdateNotificationCompound/index.ts
// component=ApplicationUpdateNotification

import figma from 'figma'

const dismissable = figma.selectedInstance.getEnum('Variant', {
  Dismissible: true,
  Persistent: false,
})

export default {
  id: 'ApplicationUpdateNotification',
  imports: [
    "import { ApplicationUpdateNotification, Button } from '@toptal/picasso'",
  ],
  example: figma.code`<ApplicationUpdateNotification${figma.helpers.react.renderProp(
    'dismissable',
    dismissable
  )} onClose={() => { }} actions={onClose => (<ApplicationUpdateNotification.Actions>
            <Button variant='secondary' size='medium' onClick={onClose}>
              Update
            </Button>
          </ApplicationUpdateNotification.Actions>)}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
