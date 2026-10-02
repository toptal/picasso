// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=3886-16524
// source=https://github.com/toptal/picasso/blob/master/packages/base/AvatarUpload/src/AvatarUpload/AvatarUpload.tsx
// component=AvatarUpload

import figma from 'figma'

const size = figma.selectedInstance.getEnum('Size', {
  '80x80': 'small',
  '160x160': 'large',
})
const uploading = figma.selectedInstance.getEnum('State', {
  Loading: true,
})
const status = figma.selectedInstance.getEnum('State', {
  Error: 'error',
  'Error+Focus': 'error',
})

export default {
  id: 'AvatarUpload',
  imports: ["import { AvatarUpload } from '@toptal/picasso'"],
  example: figma.code`<AvatarUpload${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'uploading',
    uploading
  )}${figma.helpers.react.renderProp(
    'status',
    status
  )} onDropAccepted={() => { }}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
