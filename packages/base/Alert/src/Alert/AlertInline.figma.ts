// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=146-2482
// source=https://github.com/toptal/picasso/blob/master/packages/base/Alert/src/AlertInline/AlertInline.tsx
// component=Alert.Inline

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Color', {
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
})

export default {
  id: 'Alert.Inline',
  imports: ["import { Alert } from '@toptal/picasso'"],
  example: figma.code`<Alert.Inline${figma.helpers.react.renderProp(
    'variant',
    variant
  )}>Alert message</Alert.Inline>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
