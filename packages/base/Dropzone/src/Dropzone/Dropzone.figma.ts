// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=3474-16335
// source=https://github.com/toptal/picasso/blob/master/packages/base/Dropzone/src/Dropzone/Dropzone.tsx
// component=Dropzone

import figma from 'figma'

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
})

export default {
  id: 'Dropzone',
  imports: ["import { Dropzone } from '@toptal/picasso'"],
  example: figma.code`<Dropzone${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
