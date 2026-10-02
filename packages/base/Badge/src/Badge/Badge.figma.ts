// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=60-45
// source=https://github.com/toptal/picasso/blob/master/packages/base/Badge/src/Badge/Badge.tsx
// component=Badge

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Style', {
  Primary: 'red',
  Secondary: 'white',
})
const size = figma.selectedInstance.getEnum('Size', {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
})

export default {
  id: 'Badge',
  imports: ["import { Badge } from '@toptal/picasso'"],
  example: figma.code`<Badge${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp('size', size)} content={42}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
