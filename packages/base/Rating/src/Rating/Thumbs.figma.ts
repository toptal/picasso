// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=66-470
// source=https://github.com/toptal/picasso/blob/master/packages/base/Rating/src/Rating/index.ts
// component=Rating.Thumbs

import figma from 'figma'

const size = figma.selectedInstance.getEnum('Size', {
  Large: 'large',
  Small: 'small',
})

export default {
  id: 'Rating.Thumbs',
  imports: ["import { Rating } from '@toptal/picasso'"],
  example: figma.code`<Rating.Thumbs name='rating'${figma.helpers.react.renderProp(
    'size',
    size
  )}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
