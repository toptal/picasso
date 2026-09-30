// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=65-74
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/Indicator/Indicator.tsx
// component=Indicator

import figma from 'figma'

const color = figma.selectedInstance.getEnum('Color', {
  Negative: 'red',
  Warning: 'yellow',
  Primary: 'blue',
  Positive: 'green',
  Secondary: 'grey-darker',
  'Light Blue': 'light-blue',
})

export default {
  id: 'Indicator',
  imports: ["import { Indicator } from '@toptal/picasso'"],
  example: figma.code`<Indicator${figma.helpers.react.renderProp(
    'color',
    color
  )}/>`,
  metadata: { nestable: true },
}
