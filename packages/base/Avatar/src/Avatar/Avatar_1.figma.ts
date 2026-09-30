// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=7767-21674
// source=https://github.com/toptal/picasso/blob/master/packages/base/UserBadge/src/UserBadge/UserBadge.tsx
// component=UserBadge

import figma from 'figma'

const size = figma.selectedInstance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
})

export default {
  id: 'UserBadge',
  imports: ["import { UserBadge } from '@toptal/picasso'"],
  example: figma.code`<UserBadge name='John Doe'${figma.helpers.react.renderProp(
    'size',
    size
  )}/>`,
  metadata: { nestable: true },
}
