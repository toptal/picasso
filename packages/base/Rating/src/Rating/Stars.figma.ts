// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=66-368
// source=https://github.com/toptal/picasso/blob/master/packages/base/Rating/src/Rating/index.ts
// component=Rating.Stars

import figma from 'figma'

const size = figma.selectedInstance.getEnum('Size', {
  Large: 'large',
  Small: 'small',
})
const value = figma.selectedInstance.getEnum('Rating', {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
})

export default {
  id: 'Rating.Stars',
  imports: ["import { Rating } from '@toptal/picasso'"],
  example: figma.code`<Rating.Stars name='rating'${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('value', value)}/>`,
  metadata: { nestable: true },
}
