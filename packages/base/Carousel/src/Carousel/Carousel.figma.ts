// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=7034-18634
// source=https://github.com/toptal/picasso/blob/master/packages/base/Carousel/src/Carousel/Carousel.tsx
// component=Carousel

import figma from 'figma'

const hasDots = figma.selectedInstance.getEnum('Variant', {
  'Pagination + Arrows': true,
  'Pagination Only': true,
})
const hasArrows = figma.selectedInstance.getEnum('Variant', {
  'Pagination + Arrows': true,
  'Arrows Only': true,
})

export default {
  id: 'Carousel',
  imports: ["import { Carousel } from '@toptal/picasso'"],
  example: figma.code`<Carousel${figma.helpers.react.renderProp(
    'hasDots',
    hasDots
  )}${figma.helpers.react.renderProp('hasArrows', hasArrows)}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`,
} satisfies CodeConnectTemplate
