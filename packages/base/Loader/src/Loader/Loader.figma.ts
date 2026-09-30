// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=9669-33974
// source=https://github.com/toptal/picasso/blob/master/packages/base/Loader/src/Loader/Loader.tsx
// component=Loader

import figma from 'figma'

const size = figma.selectedInstance.getEnum('Size', {
  '16px': 'small',
  '32px': 'medium',
  '64px': 'large',
})

export default {
  id: 'Loader',
  imports: ["import { Loader } from '@toptal/picasso'"],
  example: figma.code`<Loader${figma.helpers.react.renderProp('size', size)}/>`,
  metadata: { nestable: true },
}
