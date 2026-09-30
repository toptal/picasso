// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=146-2482
// source=https://github.com/toptal/picasso/blob/master/packages/base/Alert/src/AlertInline/AlertInline.tsx
// component=AlertInline

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Color', {
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
})

export default {
  id: 'AlertInline',
  imports: ["import { AlertInline } from '@toptal/picasso-alert'"],
  example: figma.code`<AlertInline${figma.helpers.react.renderProp(
    'variant',
    variant
  )}>Alert message</AlertInline>`,
  metadata: { nestable: true },
}
